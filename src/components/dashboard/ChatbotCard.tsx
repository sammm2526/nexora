import React from "react";
import Link from "next/link";
import { Bot, ArrowRight, Sparkles, BookOpen, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui";

export interface ChatbotCardProps {
  name?: string;
  status?: string;
  knowledgeCount?: string;
  conversationsCount?: string;
  lastUpdated?: string;
  studioUrl?: string;
}

export const ChatbotCard: React.FC<ChatbotCardProps> = ({
  name = "Acme Support AI",
  status = "Draft",
  knowledgeCount = "12 sources",
  conversationsCount = "—",
  lastUpdated = "Just now",
  studioUrl = "/studio/new",
}) => {
  return (
    <div className="relative group rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 p-6 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-indigo-500/5">
      {/* Subtle top corner gradient highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full -z-10 group-hover:bg-indigo-500/10 transition-colors" />

      {/* Header with Icon, Name & Status */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors shadow-inner">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              General Customer Assistant
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-300 text-[11px] font-mono tracking-wide"
        >
          {status}
        </Badge>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 py-4 border-y border-zinc-800/60 mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Knowledge</span>
          </div>
          <div className="text-sm font-semibold text-zinc-200 font-mono">
            {knowledgeCount}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
            <span>Conversations</span>
          </div>
          <div className="text-sm font-semibold text-zinc-200 font-mono">
            {conversationsCount}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Updated</span>
          </div>
          <div className="text-sm font-semibold text-zinc-200 font-mono">
            {lastUpdated}
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Configured & Ready for Testing</span>
        </div>

        <Link
          href={studioUrl}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-800 hover:bg-indigo-600 text-zinc-200 hover:text-white border border-zinc-700/60 hover:border-indigo-500/50 transition-all duration-200 group/btn"
        >
          <span>Open Studio</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
