"use client";

import React from "react";
import { Badge, Button } from "@/components/ui";

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-extrabold text-lg shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
            <span>N</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-tight">
              Nexora<span className="text-indigo-400">.ai</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
              Neural SaaS Platform
            </span>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#hero"
            className="text-zinc-200 hover:text-white transition-colors"
          >
            Overview
          </a>
          <a
            href="#capabilities"
            className="hover:text-zinc-200 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#architecture"
            className="hover:text-zinc-200 transition-colors"
          >
            Architecture
          </a>
          <a
            href="#documentation"
            className="hover:text-zinc-200 transition-colors"
          >
            Docs
          </a>
        </nav>

        {/* Right action group */}
        <div className="flex items-center gap-3">
          <Badge variant="accent" pulse className="hidden sm:inline-flex text-xs py-1">
            Engine Online
          </Badge>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              const el = document.getElementById("capabilities");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
