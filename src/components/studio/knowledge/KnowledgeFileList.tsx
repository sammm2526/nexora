"use client";

import React from "react";
import { KnowledgeSource } from "@/types/studio";
import {
  FileText,
  Globe,
  MessageSquare,
  BookOpen,
  Trash2,
  CheckCircle2,
  Loader2,
  Layers,
} from "lucide-react";

export interface KnowledgeFileListProps {
  sources: KnowledgeSource[];
  onRemoveSource: (id: string) => void;
}

export const KnowledgeFileList: React.FC<KnowledgeFileListProps> = ({
  sources,
  onRemoveSource,
}) => {
  const getSourceIcon = (source: KnowledgeSource) => {
    if (source.type === "url") {
      return <Globe className="w-4 h-4 text-sky-400" />;
    }
    if (source.type === "faq") {
      return <MessageSquare className="w-4 h-4 text-emerald-400" />;
    }
    if (source.fileType === "pdf") {
      return <BookOpen className="w-4 h-4 text-rose-400" />;
    }
    return <FileText className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Connected Knowledge Sources ({sources.length})
        </h4>
        <span className="text-xs text-zinc-500 font-mono">
          Ready for Semantic Retrieval
        </span>
      </div>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {sources.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20 text-zinc-500 text-xs">
            No knowledge sources added yet. Drop a PDF or add a website URL above.
          </div>
        ) : (
          sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group"
            >
              {/* Left icon & name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-750/70 flex items-center justify-center shrink-0">
                  {getSourceIcon(source)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-200 truncate group-hover:text-white transition-colors">
                      {source.name}
                    </span>
                    {source.size && (
                      <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
                        {source.size}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-zinc-600" />
                      <span>{source.sectionsCount} indexed sections</span>
                    </span>
                    <span>&middot;</span>
                    <span>{source.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {/* Right status badge & delete button */}
              <div className="flex items-center gap-2 shrink-0">
                {source.status === "processing" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                    <span>Processing</span>
                  </span>
                ) : source.status === "indexed" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Indexed</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
                    <span>Ready</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onRemoveSource(source.id)}
                  aria-label={`Remove source ${source.name}`}
                  className="w-8 h-8 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
