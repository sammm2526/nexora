"use client";

import React, { useEffect, useState } from "react";
import { HeroSceneCanvas } from "@/components/three";
import { Badge, Button } from "@/components/ui";

export const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle scroll-driven scale and opacity transition
  const scrollRatio = Math.min(1, scrollY / 600);
  const heroTransformStyle = {
    opacity: 1 - scrollRatio * 0.25,
    transform: `scale(${1 - scrollRatio * 0.04})`,
  };

  const scrollToCapabilities = () => {
    const el = document.getElementById("capabilities");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32"
      aria-label="Hero Section"
    >
      {/* Dark Luxury Ambient Background Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[550px] bg-gradient-to-b from-indigo-600/15 via-indigo-900/10 to-transparent blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 w-[450px] h-[450px] bg-sky-500/10 blur-[130px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-20 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 2D Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 z-10">
            {/* Platform Badge */}
            <div className="inline-flex">
              <Badge variant="accent">
                <span className="text-indigo-400 font-semibold">Nexora OS</span>
                <span className="text-zinc-600 dark:text-zinc-500 mx-1">|</span>
                <span>Conversational AI Platform for SaaS</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Conversational Intelligence for{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                  Modern SaaS
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Orchestrate context-aware customer dialogues, autonomous API tools, and multi-session memory with enterprise-grade neural precision. Built specifically for high-growth SaaS ecosystems.
              </p>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={scrollToCapabilities}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                }
              >
                Explore Platform
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={scrollToCapabilities}
                icon={
                  <svg
                    className="w-4 h-4 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                }
              >
                View Architecture
              </Button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-6 text-left w-full max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  &lt;95ms
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Inference Latency
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  100%
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Deterministic Tools
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Multi-Turn
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  State Retention
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Neural Core & Ambient Canvas */}
          <div
            className="lg:col-span-5 relative flex flex-col items-center justify-center transition-transform duration-300"
            style={heroTransformStyle}
          >
            {/* Glowing Backdrop Frame for 3D Scene */}
            <div className="relative w-full rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-indigo-500/20 via-zinc-800/40 to-zinc-950/80 border border-zinc-800/90 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
              {/* Top status bar on 3D frame */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/70 mb-1 text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  NeuralCore Active
                </span>
                <span className="text-zinc-400">FPS: 60 · WebGL 2.0</span>
              </div>

              {/* 3D Canvas with Neural Core and Particle Field */}
              <HeroSceneCanvas
                className="bg-zinc-950/60 rounded-2xl"
                particleCount={420}
              />

              {/* Interaction Hint */}
              <div className="mt-2.5 mb-1 px-3 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Drag 360° to rotate
                </span>
                <span className="text-zinc-400 hidden sm:inline">
                  Pointer position drives depth parallax
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Transition Indicator */}
        <div className="mt-12 lg:mt-16 flex flex-col items-center justify-center">
          <button
            onClick={scrollToCapabilities}
            className="group flex flex-col items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-2"
            aria-label="Scroll down to platform capabilities"
          >
            <span className="tracking-wider uppercase text-[10px] text-zinc-400 group-hover:text-zinc-300">
              Explore Capabilities
            </span>
            <div className="w-5 h-8 rounded-full border border-zinc-700/80 flex items-start justify-center p-1 group-hover:border-zinc-500 transition-colors">
              <span className="w-1 h-2 rounded-full bg-indigo-400 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
