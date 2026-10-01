import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Bot, ArrowUpRight, Sparkles, HelpCircle } from "lucide-react";
import { DashboardShell, DashboardStats, ChatbotCard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Nexora AI Workspace",
  description: "Build, teach, test, and deploy AI chatbots for your business.",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-10">
        {/* Workspace Greeting & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Workspace Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Your AI workspace
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              Build, teach, test, and deploy AI chatbots for your business.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/studio/new"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-450 hover:to-violet-550 border border-indigo-400/30 transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create chatbot</span>
            </Link>
          </div>
        </div>

        {/* Overview Metric Stats */}
        <section aria-label="Workspace Metrics">
          <DashboardStats />
        </section>

        {/* Your Chatbots Section */}
        <section className="space-y-5" aria-label="Your Chatbots">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Your chatbots
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
                1
              </span>
            </div>

            <Link
              href="/studio/new"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>New chatbot</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Chatbots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Acme Support AI Card */}
            <ChatbotCard
              name="Acme Support AI"
              status="Draft"
              knowledgeCount="12 sources"
              conversationsCount="—"
              lastUpdated="Just now"
              studioUrl="/studio/new"
            />

            {/* Template / Secondary Creation Teaser Card */}
            <div className="rounded-2xl border border-dashed border-zinc-800/90 bg-zinc-900/20 hover:bg-zinc-900/40 p-6 flex flex-col items-center justify-center text-center transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 group-hover:scale-105 transition-all mb-3">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-1">
                Deploy another specialized agent
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs mb-4">
                Connect dedicated knowledge bases for sales, technical documentation, or onboarding.
              </p>
              <Link
                href="/studio/new"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 border border-zinc-700/60 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create new assistant</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Knowledge & Deployment Architecture Hint */}
        <section className="rounded-2xl bg-gradient-to-r from-indigo-950/20 via-zinc-900/40 to-violet-950/20 border border-indigo-500/20 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  How Nexora Chatbot Studio Works
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed max-w-2xl">
                  Teach Nexora with PDFs, DOCX, text, or URLs &rarr; Configure tone, colors, and behavior &rarr; Test with real-time interactive preview &rarr; Generate an embed snippet for your SaaS.
                </p>
              </div>
            </div>

            <Link
              href="/studio/new"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <span>Open Acme Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
