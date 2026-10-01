"use client";

import React from "react";
import { KnowledgeStats } from "@/types/studio";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export interface KnowledgeHealthProps {
  stats: KnowledgeStats;
}

export const KnowledgeHealth: React.FC<KnowledgeHealthProps> = ({ stats }) => {
  const isHealthy = stats.healthStatus === "Ready for testing";

  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 backdrop-blur-sm space-y-4">
      {/* Header with Health Status Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Knowledge Overview & Health
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Concrete metrics derived from processed document chunks and verified sources.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              isHealthy
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-300 border-amber-500/20 animate-pulse"
            }`}
          >
            {isHealthy ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{stats.healthStatus}</span>
          </span>
        </div>
      </div>

      {/* Concrete Information Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Sources</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">
            {stats.totalSources}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Documents</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">
            {stats.totalDocuments}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Sections</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">
            {stats.totalSections}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Indexed</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
            {stats.indexedPercentage}%
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Duplicates</div>
          <div className="text-xl font-bold text-zinc-300 font-mono mt-0.5">
            {stats.potentialDuplicates}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <div className="text-[11px] text-zinc-500 font-medium">Warnings</div>
          <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
            {stats.warnings}
          </div>
        </div>
      </div>
    </div>
  );
};
