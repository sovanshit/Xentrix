export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-aurora animate-gradientMove bg-[length:200%_200%] opacity-80" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />
    </div>
  );
}
