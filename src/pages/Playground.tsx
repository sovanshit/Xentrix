import { useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint, Sparkles, PenTool, MousePointer2, LayoutGrid, Gauge } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useHandLandmarker } from "@/hooks/useHandLandmarker";
import { CameraStage } from "@/components/playground/CameraStage";
import { StatsPanel } from "@/components/playground/StatsPanel";
import { FingerCounter } from "@/components/playground/FingerCounter";
import { GestureDisplay } from "@/components/playground/GestureDisplay";
import { AirDrawing } from "@/components/playground/AirDrawing";
import { VirtualMouse } from "@/components/playground/VirtualMouse";
import { GestureGallery } from "@/components/playground/GestureGallery";
import { PerformanceDashboard } from "@/components/playground/PerformanceDashboard";

type ModuleKey = "gesture" | "fingers" | "draw" | "mouse" | "gallery" | "performance";

const tabs: { key: ModuleKey; label: string; icon: typeof Sparkles }[] = [
  { key: "gesture", label: "Gesture Recognition", icon: Sparkles },
  { key: "fingers", label: "Finger Counter", icon: Fingerprint },
  { key: "draw", label: "Air Drawing", icon: PenTool },
  { key: "mouse", label: "Virtual Mouse", icon: MousePointer2 },
  { key: "gallery", label: "Gesture Gallery", icon: LayoutGrid },
  { key: "performance", label: "Performance", icon: Gauge }
];

const STAGE_WIDTH = 960;
const STAGE_HEIGHT = 540;

export default function Playground() {
  const controller = useHandLandmarker({ numHands: 2, minDetectionConfidence: 0.6 });
  const [active, setActive] = useState<ModuleKey>("gesture");
  const hands = controller.frame?.hands ?? [];

  return (
    <>
      <SEO
        title="AI Playground"
        description="Live hand gesture recognition, finger counting, air drawing, and a virtual mouse demo — all running in your browser via MediaPipe."
        path="/playground"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="section-heading">AI Playground</h1>
            <p className="mt-4 text-muted">
              Grant camera access once and explore every gesture module below — all
              processing happens locally in this browser tab.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CameraStage controller={controller} showLandmarks={active !== "draw" && active !== "mouse"} />
            </div>
            <StatsPanel frame={controller.frame} />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active === tab.key
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                    : "glass text-muted hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {active === "gesture" && <GestureDisplay hands={hands} />}
            {active === "fingers" && <FingerCounter hands={hands} />}
            {active === "draw" && <AirDrawing hands={hands} width={STAGE_WIDTH} height={STAGE_HEIGHT} />}
            {active === "mouse" && <VirtualMouse hands={hands} width={STAGE_WIDTH} height={STAGE_HEIGHT} />}
            {active === "gallery" && <GestureGallery />}
            {active === "performance" && <PerformanceDashboard frame={controller.frame} />}
          </motion.div>
        </div>
      </section>
    </>
  );
}
