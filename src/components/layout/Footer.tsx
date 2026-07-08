import { Link } from "react-router-dom";
import { Hand, Github, Linkedin, Globe } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { to: "/playground", label: "AI Playground" },
      { to: "/#features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/docs", label: "Documentation" }
    ]
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/license", label: "License" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Hand className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              Xentrix
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Real-time AI hand gesture recognition, powered entirely by your browser.
              No backend, no install, no data leaving your device.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/sovanshit"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg p-2 text-muted hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sovan-shit-a4a767374/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg p-2 text-muted hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://sovanportfolio.web.app/"
                target="_blank"
                rel="noreferrer"
                aria-label="Portfolio website"
                className="rounded-lg p-2 text-muted hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Xentrix. All rights reserved.</p>
          <p>v1.0.0 — Built with React, Vite &amp; MediaPipe</p>
        </div>
      </div>
    </footer>
  );
}
