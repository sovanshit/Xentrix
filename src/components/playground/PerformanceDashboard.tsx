import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { FrameResult, PerformanceSample } from "@/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const MAX_SAMPLES = 40;

export function PerformanceDashboard({ frame }: { frame: FrameResult | null }) {
  const [samples, setSamples] = useState<PerformanceSample[]>([]);
  const lastPush = useRef(0);

  useEffect(() => {
    if (!frame) return;
    const now = performance.now();
    if (now - lastPush.current < 250) return;
    lastPush.current = now;
    setSamples((prev) => {
      const next = [...prev, { fps: frame.fps, detectionTimeMs: frame.detectionTimeMs, timestamp: frame.timestamp }];
      return next.slice(-MAX_SAMPLES);
    });
  }, [frame]);

  const data = {
    labels: samples.map((_, i) => String(i)),
    datasets: [
      {
        label: "FPS",
        data: samples.map((s) => s.fps),
        borderColor: "#06B6D4",
        backgroundColor: "rgba(6,182,212,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  const avgFps = samples.length ? samples.reduce((a, s) => a + s.fps, 0) / samples.length : 0;
  const avgDetect = samples.length ? samples.reduce((a, s) => a + s.detectionTimeMs, 0) / samples.length : 0;
  const memoryEstimateMb = ((performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
    ? ((performance as unknown as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1048576)
    : 45 + samples.length * 0.4
  ).toFixed(1);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold">Performance Dashboard</h3>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Avg FPS" value={avgFps.toFixed(0)} />
        <Metric label="Avg Detection" value={`${avgDetect.toFixed(1)} ms`} />
        <Metric label="Resolution" value="1280×720" />
        <Metric label="Est. Memory" value={`${memoryEstimateMb} MB`} />
      </div>
      <div className="mt-6 h-48">
        {samples.length > 1 ? (
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { min: 0, max: 60, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9CA3AF" } }
              }
            }}
          />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-muted">
            Start the camera to see live performance data.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">
        Browser support: Chrome, Edge, Firefox, and Safari (WebAssembly + WebRTC required).
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
      <p className="font-display text-xl font-semibold gradient-text">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
