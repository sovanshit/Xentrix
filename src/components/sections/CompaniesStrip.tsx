const companies = ["MediaPipe", "TensorFlow.js", "React", "Vite", "Firebase", "WebGPU"];

export function CompaniesStrip() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-widest text-muted">
          Built on best-in-class open technology
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((name) => (
            <span key={name} className="font-display text-lg font-medium text-muted/70 transition-colors hover:text-white">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
