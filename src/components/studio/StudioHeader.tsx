"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { StudioStep } from "@/types/studio";

export interface StudioHeaderProps {
  activeStep: StudioStep;
  onStepChange: (step: StudioStep) => void;
  botName: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  activeStep,
  onStepChange,
  botName,
}) => {
  const steps: { id: StudioStep; number: string; title: string; locked?: boolean }[] = [
    { id: "teach", number: "01", title: "Teach" },
    { id: "configure", number: "02", title: "Configure" },
    { id: "preview", number: "03", title: "Preview" },
    { id: "deploy", number: "04", title: "Deploy", locked: true },
  ];

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Breadcrumb, Bot Name & Main Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors shrink-0"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="text-zinc-300 font-medium">{botName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Create your AI chatbot</span>
              </h1>
            </div>
          </div>

          {/* Stepper Navigation */}
          <nav
            aria-label="Studio Progress"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none"
          >
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              const isPassed =
                (activeStep === "configure" && s.id === "teach") ||
                (activeStep === "preview" && (s.id === "teach" || s.id === "configure"));

              if (s.locked) {
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/40 border border-zinc-800/40 text-zinc-600 text-xs font-medium cursor-not-allowed select-none shrink-0"
                    title="Milestone 4 Deploy stage is locked"
                  >
                    <span className="font-mono text-[10px] text-zinc-700">{s.number}</span>
                    <span>{s.title}</span>
                    <Lock className="w-3 h-3 text-zinc-700" />
                  </div>
                );
              }

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStepChange(s.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                      : isPassed
                      ? "bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent"
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span
                      className={`font-mono text-[10px] ${
                        isActive ? "text-indigo-200" : "text-zinc-500"
                      }`}
                    >
                      {s.number}
                    </span>
                  )}
                  <span>{s.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
