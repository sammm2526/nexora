import React from "react";
import { Navbar, HeroSection, CapabilitiesSection } from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 ai-grid-pattern antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dark Luxury Navigation */}
      <Navbar />

      {/* Main Landing Page Experience */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section with 3D Neural Core & Parallax Field */}
        <HeroSection />

        {/* Conceptual Capability Cards Section */}
        <CapabilitiesSection />
      </main>

      {/* Enterprise Dark Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              N
            </div>
            <span className="font-semibold text-zinc-300">
              Nexora AI Platform
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              Checkpoint 2: Immersive 3D Hero
            </span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <span>Enterprise Conversational AI</span>
            <span>&copy; {new Date().getFullYear()} Nexora</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
