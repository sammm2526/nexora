import React from "react";
import { DashboardNav } from "./DashboardNav";

export interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#080809] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle Atmospheric Gradient Mesh */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-600/10 via-sky-500/5 to-transparent blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[160px] rounded-full -z-10"
        aria-hidden="true"
      />

      {/* Top Navigation */}
      <DashboardNav />

      {/* Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#080809] py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-400">Nexora</span>
            <span>&middot;</span>
            <span>AI Chatbot Studio for Enterprise SaaS</span>
          </div>
          <div>
            <span>Status: Engine Online &middot; WebGL 2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
