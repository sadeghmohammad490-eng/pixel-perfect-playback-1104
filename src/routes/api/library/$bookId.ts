import { createFileRoute } from "@tanstack/react-router";
import { bookObjectKey } from "@/server/books.server";

const READER_HEADER = "x-khatir-reader";

type BookObject = {
  body: ReadableStream;
  size: number;
};

type BookBucket = {
  head(key: string): Promise<{ size: number } | null>;
  get(
    key: string,
    options?: { range?: { offset: number; length: number } },
  ): Promise<BookObject | null>;
};

export const Route = createFileRoute("/api/library/$bookId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!isReaderRequest(request)) {
          return new Response("Not found", { status: 404 });
        }

        const key = bookObjectKey(params.bookId);
        if (!key) return new Response("Not found", { status: 404 });

        const bucket = bookBucket(request);
        if (!bucket) return new Response("Not found", { status: 404 });
        return readFromBucket(bucket, key, request);
      },
    },
  },
});

function isReaderRequest(request: Request) {
  if (request.headers.get("sec-fetch-dest") === "document") return false;
  return request.headers.get(READER_HEADER) === "1";
}

function bookBucket(request: Request): BookBucket | null {
  const fromRuntime = (request as Request & {
    runtime?: { cloudflare?: { env?: { KHATIRTRADER_BOOKS?: BookBucket } } };
  }).runtime?.cloudflare?.env?.KHATIRTRADER_BOOKS;
  if (fromRuntime) return fromRuntime;

  const fromEnv = (globalThis as { __env__?: { KHATIRTRADER_BOOKS?: BookBucket } }).__env__
    ?.KHATIRTRADER_BOOKS;
  return fromEnv ?? null;
}

async function readFromBucket(bucket: BookBucket, key: string, request: Request) {
  const rangeHeader = request.headers.get("range");
  if (!rangeHeader) {
    const object = await bucket.get(key);
    if (!object) return new Response("Not found", { status: 404 });
    return new Response(object.body, { status: 200, headers: responseHeaders(object.size) });
  }

  const head = await bucket.head(key);
  if (!head) return new Response("Not found", { status: 404 });
  const total = head.size;
  const parsed = parseRange(rangeHeader, total);
  if (!parsed) {
    const headers = responseHeaders(total);
    headers.set("content-range", `bytes */${total}`);
    return new Response(null, { status: 416, headers });
  }

  const length = parsed.end - parsed.start + 1;
  const object = await bucket.get(key, { range: { offset: parsed.start, length } });
  if (!object) return new Response("Not found", { status: 404 });
  const headers = responseHeaders(length);
  headers.set("content-range", `bytes ${parsed.start}-${parsed.end}/${total}`);
  return new Response(object.body, { status: 206, headers });
}

function responseHeaders(length: number) {
  return new Headers({
    "accept-ranges": "bytes",
    "cache-control": "private, no-store",
    "content-disposition": "inline",
    "content-length": String(length),
    "content-type": "application/octet-stream",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
  });
}

function parseRange(header: string, total: number) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  const startText = match?.[1] ?? "";
  const endText = match?.[2] ?? "";
  const start = startText ? Number(startText) : 0;
  const end = endText ? Number(endText) : total - 1;
  if (!match || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > end || start >= total) {
    return null;
  }
  return { start, end: Math.min(end, total - 1) };
}
