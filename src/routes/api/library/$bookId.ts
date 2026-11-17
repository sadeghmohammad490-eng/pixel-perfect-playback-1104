import { createFileRoute } from "@tanstack/react-router";

const READER_HEADER = "x-khatir-reader";

export const Route = createFileRoute("/api/library/$bookId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!isReaderRequest(request)) {
          return new Response("Not found", { status: 404 });
        }

        const { readBookBytes } = await import("@/server/books.server");
        const bytes = readBookBytes(params.bookId);
        if (!bytes) return new Response("Not found", { status: 404 });
        return bytesResponse(bytes, request);
      },
    },
  },
});

function isReaderRequest(request: Request) {
  if (request.headers.get("sec-fetch-dest") === "document") return false;
  return request.headers.get(READER_HEADER) === "1";
}

function bytesResponse(bytes: Uint8Array, request: Request) {
  const total = bytes.byteLength;
  const headers = new Headers({
    "accept-ranges": "bytes",
    "cache-control": "private, no-store",
    "content-disposition": "inline",
    "content-type": "application/octet-stream",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
  });

  const range = request.headers.get("range");
  if (!range) {
    headers.set("content-length", String(total));
    return new Response(asBody(bytes), { status: 200, headers });
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  const startText = match?.[1] ?? "";
  const endText = match?.[2] ?? "";
  const start = startText ? Number(startText) : 0;
  const end = endText ? Number(endText) : total - 1;
  if (!match || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > end || start >= total) {
    headers.set("content-range", `bytes */${total}`);
    return new Response(null, { status: 416, headers });
  }

  const safeEnd = Math.min(end, total - 1);
  const slice = bytes.subarray(start, safeEnd + 1);
  headers.set("content-range", `bytes ${start}-${safeEnd}/${total}`);
  headers.set("content-length", String(slice.byteLength));
  return new Response(asBody(slice), { status: 206, headers });
}

function asBody(bytes: Uint8Array) {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return copy;
}
