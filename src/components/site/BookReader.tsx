import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { faNum } from "@/lib/books";

const toolBtn =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/50 px-3 text-sm text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40";

const pageArrow =
  "absolute z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/80 bg-black/70 text-primary shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_55%,transparent)] disabled:cursor-not-allowed disabled:opacity-30";

export function BookReader({ bookId }: { bookId: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const swipeRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const [pageDraft, setPageDraft] = useState("1");
  const [fullscreen, setFullscreen] = useState(false);
  const [fillBrowser, setFillBrowser] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const expanded = fullscreen || fillBrowser;

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
    const observer = new ResizeObserver(() => setStageSize({ w: stage.clientWidth, h: stage.clientHeight }));
    observer.observe(stage);
    setStageSize({ w: stage.clientWidth, h: stage.clientHeight });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!fillBrowser) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFillBrowser(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [fillBrowser]);

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
    if (status !== "ready" || !pdf || !canvas || !stage || stageSize.w <= 0) return;
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
        const availW = Math.max(stage.clientWidth, 1);
        const availH = Math.max(stage.clientHeight, 1);
        const fit = expanded ? Math.min(availW / base.width, availH / base.height) : availW / base.width;
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
  }, [expanded, page, stageSize.h, stageSize.w, status, zoom]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const place = () => {
      const rect = frame.getBoundingClientRect();
      const top = Math.max(rect.top, 0);
      const bottom = Math.min(rect.bottom, window.innerHeight);
      if (bottom <= top) return;
      frame.style.setProperty("--page-arrow-top", `${(top + bottom) / 2 - rect.top}px`);
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    frame.addEventListener("scroll", place, { passive: true });
    const observer = new ResizeObserver(place);
    observer.observe(frame);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
      frame.removeEventListener("scroll", place);
      observer.disconnect();
    };
  }, [status, page, zoom]);

  const busy = status !== "ready";

  function turnPage(direction: -1 | 1) {
    setPage((current) => Math.min(pageCount, Math.max(1, current + direction)));
  }

  function onPagePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button, input, a")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }

  function onPagePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start || start.id !== event.pointerId || busy) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    turnPage(dx > 0 ? 1 : -1);
  }

  async function enterFullscreen(element: HTMLElement) {
    if (document.fullscreenElement === element) {
      await document.exitFullscreen();
      return;
    }
    if (document.fullscreenElement) await document.exitFullscreen();
    await element.requestFullscreen();
  }

  async function toggleFullscreen() {
    const stage = stageRef.current;
    if (!stage) return;
    await enterFullscreen(stage);
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

  return (
    <section
      id="reader"
      ref={stageRef}
      aria-label="نمایشگر کتاب"
      aria-busy={busy}
      className={`book-stage scroll-mt-24 ${expanded ? "is-expanded flex h-dvh w-full flex-col bg-black p-0" : "card-lux p-3 sm:p-5"} ${fillBrowser ? "fixed inset-0 z-[60]" : ""}`}
    >
      {expanded && (
        <button
          type="button"
          className={`${toolBtn} absolute left-4 top-4 z-20 bg-black`}
          onClick={() => {
            if (fillBrowser) setFillBrowser(false);
            else void toggleFullscreen();
          }}
        >
          {fillBrowser ? "خروج از تمام‌صفحه مرورگر" : "خروج از تمام‌صفحه"}
        </button>
      )}
      <div className="book-tools mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
          <button type="button" className={toolBtn} onClick={() => setFillBrowser((current) => !current)}>
            {fillBrowser ? "خروج از تمام‌صفحه مرورگر" : "تمام‌صفحه مرورگر"}
          </button>
          <Link to="/books" className={`${toolBtn} no-underline`}>
            بازگشت به کتابخانه
          </Link>
        </div>
      </div>

      <form className="book-tools mb-4 flex flex-wrap items-center gap-2" onSubmit={goToDraft}>
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

      <div
        ref={frameRef}
        className={`book-frame relative touch-pan-y overflow-auto ${expanded ? "min-h-0 flex-1 bg-black" : "rounded-xl bg-white"}`}
        onPointerDown={onPagePointerDown}
        onPointerUp={onPagePointerUp}
        onPointerCancel={() => {
          swipeRef.current = null;
        }}
      >
        {status === "loading" && <p className="px-4 py-16 text-center text-sm text-neutral-600">در حال بارگذاری صفحات</p>}
        {status === "error" && (
          <div className="px-4 py-16 text-center">
            <p className="text-sm text-neutral-700">بارگذاری کتاب ممکن نشد.</p>
            <button type="button" className={`${toolBtn} mt-4`} onClick={() => setAttempt((current) => current + 1)}>
              تلاش دوباره
            </button>
          </div>
        )}
        <div className={expanded ? "relative" : "contents"}>
          <canvas ref={canvasRef} className={status === "ready" ? "mx-auto block" : "hidden"} />
          {status === "ready" && (
            <>
              <button
                type="button"
                className={`${pageArrow} right-3`}
                style={{ top: expanded ? "50%" : "var(--page-arrow-top, 50%)" }}
                aria-label="صفحه قبل"
                disabled={page <= 1}
                onClick={() => turnPage(-1)}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <button
                type="button"
                className={`${pageArrow} left-3`}
                style={{ top: expanded ? "50%" : "var(--page-arrow-top, 50%)" }}
                aria-label="صفحه بعد"
                disabled={page >= pageCount}
                onClick={() => turnPage(1)}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
