export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-primary" />
          <div
            className="absolute inset-1.5 animate-spin rounded-full border-2 border-white/5 border-t-accent"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          />
        </div>
        <p className="text-sm text-muted">Loading Xentrix…</p>
      </div>
    </div>
  );
}
