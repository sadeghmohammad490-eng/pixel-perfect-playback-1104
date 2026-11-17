import { useEffect, useRef, useState, type FormEvent } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { faNum } from "@/lib/books";

const toolBtn =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/50 px-3 text-sm text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40";

export function BookReader({ bookId }: { bookId: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [stageWidth, setStageWidth] = useState(0);
  const [pageDraft, setPageDraft] = useState("1");
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    setPageDraft(String(page));
  }, [page]);

  useEffect(() => {
    setCanFullscreen(document.fullscreenEnabled);
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => setStageWidth(stage.clientWidth));
    observer.observe(stage);
    setStageWidth(stage.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setStatus("loading");
    setPage(1);
    setPageDraft("1");
    setZoom(1);

    void (async () => {
      try {
        const response = await fetch(`/api/library/${bookId}`, {
          headers: { "x-khatir-reader": "1" },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("book request failed");
        const data = await response.arrayBuffer();
        const pdfjs = await import("pdfjs-dist");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const loadingTask = pdfjs.getDocument({
          data,
          disableAutoFetch: true,
          disableStream: true,
          isEvalSupported: false,
        });
        const pdf = await loadingTask.promise;
        if (cancelled) {
          await pdf.destroy();
          return;
        }
        await pdfRef.current?.destroy();
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [bookId, attempt]);

  useEffect(() => {
    return () => {
      renderTaskRef.current?.cancel();
      void pdfRef.current?.destroy();
      pdfRef.current = null;
    };
  }, []);

  useEffect(() => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (status !== "ready" || !pdf || !canvas || !stage || stageWidth <= 0) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let cancelled = false;

    void (async () => {
      try {
        const pdfPage = await pdf.getPage(page);
        if (cancelled) {
          pdfPage.cleanup();
          return;
        }
        const base = pdfPage.getViewport({ scale: 1 });
        const fit = Math.max(stage.clientWidth, 1) / base.width;
        const viewport = pdfPage.getViewport({ scale: fit * zoom });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        const task = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        renderTaskRef.current = task;
        await task.promise;
        pdfPage.cleanup();
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (!cancelled && name !== "RenderingCancelledException") setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [page, stageWidth, status, zoom]);

  async function toggleFullscreen() {
    const stage = stageRef.current;
    if (!stage) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await stage.requestFullscreen();
  }

  function goToDraft(event: FormEvent) {
    event.preventDefault();
    const normalized = pageDraft.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
    const next = Number(normalized);
    if (!Number.isInteger(next) || pageCount < 1) return;
    const target = Math.min(pageCount, Math.max(1, next));
    setPage(target);
    setPageDraft(String(target));
  }

  const busy = status !== "ready";

  return (
    <section id="reader" ref={stageRef} aria-label="نمایشگر کتاب" aria-busy={busy} className="book-stage card-lux scroll-mt-24 p-3 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {status === "loading" && "در حال آماده‌سازی کتاب"}
          {status === "error" && "نمایش کتاب ممکن نشد"}
          {status === "ready" && `صفحه ${faNum(page)} از ${faNum(pageCount)}`}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={toolBtn} disabled={busy || page <= 1} onClick={() => setPage((current) => current - 1)}>
            صفحه قبل
          </button>
          <button type="button" className={toolBtn} disabled={busy || page >= pageCount} onClick={() => setPage((current) => current + 1)}>
            صفحه بعد
          </button>
          <button type="button" className={toolBtn} disabled={busy || zoom <= 0.7} onClick={() => setZoom((current) => Math.max(0.7, Number((current - 0.2).toFixed(2))))}>
            کوچک‌نمایی
          </button>
          <button type="button" className={toolBtn} disabled={busy || zoom >= 2.4} onClick={() => setZoom((current) => Math.min(2.4, Number((current + 0.2).toFixed(2))))}>
            بزرگ‌نمایی
          </button>
          {canFullscreen && (
            <button type="button" className={toolBtn} onClick={() => void toggleFullscreen()}>
              {fullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
            </button>
          )}
        </div>
      </div>

      <form className="mb-4 flex flex-wrap items-center gap-2" onSubmit={goToDraft}>
        <label htmlFor="book-page" className="text-sm text-muted-foreground">
          برو به صفحه
        </label>
        <input
          id="book-page"
          value={pageDraft}
          onChange={(event) => setPageDraft(event.target.value)}
          inputMode="numeric"
          dir="ltr"
          className="h-11 w-20 rounded-lg border border-input bg-background px-3 text-center"
          aria-label="شماره صفحه"
        />
        <button type="submit" className={toolBtn} disabled={busy}>
          برو
        </button>
      </form>

      <div className="overflow-auto rounded-xl bg-white">
        {status === "loading" && <p className="px-4 py-16 text-center text-sm text-neutral-600">در حال بارگذاری صفحات</p>}
        {status === "error" && (
          <div className="px-4 py-16 text-center">
            <p className="text-sm text-neutral-700">بارگذاری کتاب ممکن نشد.</p>
            <button type="button" className={`${toolBtn} mt-4`} onClick={() => setAttempt((current) => current + 1)}>
              تلاش دوباره
            </button>
          </div>
        )}
        <canvas ref={canvasRef} className={status === "ready" ? "mx-auto block" : "hidden"} />
      </div>
    </section>
  );
}
