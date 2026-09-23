"use client";

import React from "react";
import { Badge, Card } from "@/components/ui";

const capabilities = [
  {
    eyebrow: "Cognitive Dialogue",
    title: "Conversational AI",
    badge: "Multi-Turn",
    description:
      "Contextually adaptive dialogue models engineered for multi-turn SaaS customer workflows, automated onboarding, and complex issue resolution.",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    highlights: ["Intent Classification", "Tone Calibration", "Real-time Streaming"],
  },
  {
    eyebrow: "State Persistence",
    title: "Memory & Context",
    badge: "Episodic Graph",
    description:
      "Semantic and episodic memory graphs that retain user preferences, prior conversations, and workspace context across sessions with zero drift.",
    icon: (
      <svg
        className="w-5 h-5 text-sky-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    highlights: ["Cross-Session Recall", "Entity Relationship Graphs", "Dynamic Pruning"],
  },
  {
    eyebrow: "Deterministic Execution",
    title: "Tool & API Actions",
    badge: "Schema Validated",
    description:
      "Autonomous tool-calling framework that interacts with your SaaS APIs, OpenAPI schemas, and backend webhooks with cryptographic validation.",
    icon: (
      <svg
        className="w-5 h-5 text-violet-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    highlights: ["OpenAPI & GraphQL", "Safe Action Confirmation", "Automated Retry Logic"],
  },
  {
    eyebrow: "Enterprise Grounding",
    title: "Knowledge Retrieval",
    badge: "Hybrid RAG",
    description:
      "Sub-second vector and keyword retrieval indexing product documentation, ticketing archives, and internal databases for fact-grounded responses.",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    highlights: ["Dense & Sparse Search", "Granular Source Attribution", "Live Document Sync"],
  },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section
      id="capabilities"
      className="relative py-20 sm:py-28 border-t border-zinc-800/80 bg-zinc-950/90"
      aria-label="Capabilities Section"
    >
      {/* Subtle background ambient lighting */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/5 blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex">
            <Badge variant="default" className="bg-zinc-900 border-zinc-800 text-zinc-300">
              Platform Architecture
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Engineered for Cognitive SaaS Operations
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Four foundational intelligence pillars connected to the 3D Neural Core, empowering next-generation conversational autonomy.
          </p>
        </div>

        {/* 4 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <Card
              key={cap.title}
              eyebrow={cap.eyebrow}
              title={cap.title}
              description={cap.description}
              className="group relative rounded-2xl p-6 bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/90 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between -order-1 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                  {cap.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                  {cap.badge}
                </span>
              </div>

              {/* Highlights Pill List */}
              <div className="pt-4 mt-6 border-t border-zinc-800/70 space-y-1.5">
                {cap.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-zinc-400 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
