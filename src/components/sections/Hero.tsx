import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlayCircle, Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-40 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              100% Browser-Based · Zero Backend
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Hand Gestures,
              <br />
              <span className="gradient-text">Understood Instantly.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-muted"
            >
              Xentrix recognizes hand gestures in real time, entirely inside your
              browser. No installs, no servers, no data ever leaving your device — just
              open a tab and start gesturing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link to="/playground" className="btn-primary">
                Try Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#demo" className="btn-secondary">
                <PlayCircle className="h-4 w-4" /> Watch Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-6 text-sm text-muted"
            >
              <span>✓ No sign-up required</span>
              <span>✓ Runs 100% on-device</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="gradient-border glass-card relative aspect-square overflow-hidden p-2">
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-card/60 p-8 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30">
                  <span className="text-6xl animate-pulseGlow">🖐️</span>
                </div>
                <p className="font-display text-lg font-medium">Live Camera Preview</p>
                <p className="max-w-xs text-sm text-muted">
                  Head to the AI Playground to enable your camera and see hand tracking,
                  gesture recognition, and finger counting in action.
                </p>
                <Link to="/playground" className="btn-primary text-sm">
                  Launch Playground
                </Link>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 animate-float rounded-2xl bg-gradient-to-br from-secondary/40 to-transparent blur-xl" />
            <div className="absolute -top-6 -right-6 h-28 w-28 animate-float rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
