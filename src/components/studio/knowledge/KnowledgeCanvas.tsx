"use client";

import React, { useMemo } from "react";
import { KnowledgeSource } from "@/types/studio";
import { FileText, Globe, MessageSquare, BookOpen, Sparkles, Cpu } from "lucide-react";

export interface KnowledgeCanvasProps {
  sources: KnowledgeSource[];
  isProcessing?: boolean;
}

export const KnowledgeCanvas: React.FC<KnowledgeCanvasProps> = ({
  sources,
  isProcessing = false,
}) => {
  // Select up to 6 representative sources to render on the dynamic node canvas
  const canvasNodes = useMemo(() => {
    return sources.slice(0, 6).map((source, index, arr) => {
      const total = arr.length;
      // Distribute evenly around the center core
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      const radiusX = 140; // horizontal ellipse radius
      const radiusY = 75; // vertical ellipse radius
      const x = 50 + (Math.cos(angle) * radiusX) / 4;
      const y = 50 + (Math.sin(angle) * radiusY) / 2.5;

      let icon = <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      if (source.type === "url") icon = <Globe className="w-3.5 h-3.5 text-sky-400" />;
      if (source.type === "faq") icon = <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      if (source.fileType === "pdf") icon = <BookOpen className="w-3.5 h-3.5 text-rose-400" />;

      return {
        ...source,
        x: Math.max(12, Math.min(88, x)),
        y: Math.max(15, Math.min(85, y)),
        icon,
      };
    });
  }, [sources]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-950/80 via-zinc-900/40 to-zinc-950/90 border border-zinc-800/80 p-6 backdrop-blur-md">
      {/* Background glow and subtle vector grid */}
      <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 ai-grid-pattern opacity-40 pointer-events-none" />

      {/* Canvas Header */}
      <div className="relative flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Interactive Knowledge Canvas
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>{sources.length} Linked Nodes</span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-56 sm:h-64 flex items-center justify-center select-none overflow-hidden rounded-xl border border-zinc-850 bg-black/40">
        {/* SVG Synaptic Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="coreBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="activePulse" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {canvasNodes.map((node) => (
            <g key={`beam-${node.id}`}>
              <line
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={node.status === "processing" ? "url(#activePulse)" : "url(#coreBeam)"}
                strokeWidth={node.status === "processing" ? "2" : "1.2"}
                strokeDasharray={node.status === "processing" ? "4 4" : "none"}
                className={node.status === "processing" ? "animate-pulse" : ""}
              />
            </g>
          ))}
        </svg>

        {/* Central Nexora Neural Core Node */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          {/* Concentric subtle radar pulse rings */}
          <div className="absolute w-24 h-24 rounded-full border border-indigo-500/20 animate-ping opacity-30" />
          <div className="absolute w-16 h-16 rounded-full border border-indigo-400/30" />

          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 border border-indigo-400/50 transition-all ${
              isProcessing ? "scale-110 shadow-indigo-500/50" : ""
            }`}
          >
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>

          <div className="mt-2 text-center">
            <span className="text-[11px] font-semibold tracking-wide text-zinc-200">
              Nexora Core
            </span>
            <div className="text-[9px] text-indigo-400 font-mono">
              {isProcessing ? "Indexing..." : "Active Memory"}
            </div>
          </div>
        </div>

        {/* Orbiting Knowledge Source Nodes */}
        {canvasNodes.map((node) => (
          <div
            key={node.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group/node transition-all duration-300"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-[11px] transition-all max-w-[130px] sm:max-w-[170px] truncate shadow-lg shadow-black/40 ${
                node.status === "processing"
                  ? "bg-indigo-950/80 border-indigo-500 text-indigo-200 animate-pulse"
                  : "bg-zinc-900/90 hover:bg-zinc-850 border-zinc-750 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <div className="shrink-0">{node.icon}</div>
              <span className="truncate font-medium">{node.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Explanatory Caption */}
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>Your business knowledge is becoming an organized AI knowledge base.</span>
        <span className="hidden sm:inline font-mono text-[11px] text-zinc-400">
          Semantic Vectors &middot; 768-dim
        </span>
      </div>
    </div>
  );
};
