"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Plus, Layers, Database, BarChart3, Settings } from "lucide-react";

export const DashboardNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 border border-indigo-400/30 group-hover:scale-105 transition-transform">
              <span>N</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white leading-tight">
                Nexora<span className="text-indigo-400">.ai</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">
                SaaS Studio
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                pathname === "/dashboard"
                  ? "bg-zinc-800/80 text-white border border-zinc-700/60"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 transition-colors"
            >
              <Bot className="w-4 h-4 text-zinc-400" />
              <span>Chatbots</span>
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-400 cursor-not-allowed transition-colors">
              <Database className="w-4 h-4 text-zinc-600" />
              <span>Knowledge</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-zinc-900 text-zinc-500 rounded border border-zinc-800 font-mono">
                Soon
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-400 cursor-not-allowed transition-colors">
              <BarChart3 className="w-4 h-4 text-zinc-600" />
              <span>Analytics</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-zinc-900 text-zinc-500 rounded border border-zinc-800 font-mono">
                Soon
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-400 cursor-not-allowed transition-colors">
              <Settings className="w-4 h-4 text-zinc-600" />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-3">
          <Link
            href="/studio/new"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-450 hover:to-violet-550 border border-indigo-400/30 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create chatbot</span>
          </Link>

          <div className="h-6 w-px bg-zinc-800 hidden sm:block" />

          {/* Org / Profile indicator */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-xs font-semibold text-zinc-300">
              AC
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-medium text-zinc-200">Acme Inc.</span>
              <span className="text-[10px] text-zinc-500">Enterprise AI Plan</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
