import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Github, Linkedin, Globe, Send, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/Button";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Contact form isn't configured yet. Add your EmailJS keys to .env");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );
      toast.success("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with the Xentrix team via our contact form, GitHub, or LinkedIn."
        path="/contact"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="section-heading">Get in touch</h1>
            <p className="mt-4 text-muted">
              Questions, feedback, or collaboration ideas — we&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
            <form onSubmit={handleSubmit} className="glass-card space-y-5 p-8 lg:col-span-3">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="Tell us what's on your mind…"
                />
              </div>
              <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-6 lg:col-span-2">
              <div className="glass-card p-6">
                <h2 className="font-display text-lg font-semibold">Find us elsewhere</h2>
                <div className="mt-4 space-y-3">
                  <a
                    href="https://github.com/sovanshit"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
                    >
                    <Github className="h-4 w-4 text-accent" /> GitHub </a>
                  <a
                    href="https://www.linkedin.com/in/sovan-shit-a4a767374/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4 text-accent" /> LinkedIn
                  </a>
                  <a
                    href="https://sovanportfolio.web.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10"
                  >
                    <Globe className="h-4 w-4 text-accent" /> Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
