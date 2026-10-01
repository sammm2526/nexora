"use client";

import React, { useState } from "react";
import {
  ChatbotConfig,
  ChatMessage,
} from "@/types/studio";
import {
  Monitor,
  Smartphone,
  Bot,
  ChevronRight,
} from "lucide-react";
import { ChatPreview } from "./ChatPreview";

export interface WebsiteSimulatorProps {
  config: ChatbotConfig;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onResetChat: () => void;
  isTyping?: boolean;
}

export const WebsiteSimulator: React.FC<WebsiteSimulatorProps> = ({
  config,
  messages,
  onSendMessage,
  onResetChat,
  isTyping = false,
}) => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);

  return (
    <div className="space-y-4">
      {/* Device & Mode Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Preview &mdash; your website
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
            Deployment Simulator
          </span>
        </div>

        {/* Desktop vs Mobile Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              device === "desktop"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              device === "mobile"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Simulated Browser Window Frame */}
      <div
        className={`mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden transition-all duration-300 ${
          device === "desktop" ? "w-full" : "max-w-[390px]"
        }`}
      >
        {/* Browser Titlebar */}
        <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="px-3 py-0.5 rounded-md bg-zinc-950 border border-zinc-850 font-mono text-[10px] text-zinc-500 truncate max-w-[220px]">
            https://acme.inc/store
          </div>

          <div className="w-10" />
        </div>

        {/* Fake Business Webpage (ACME) */}
        <div className="relative min-h-[580px] bg-slate-900 text-slate-100 flex flex-col justify-between overflow-hidden select-none">
          {/* Fake ACME Header */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-extrabold tracking-wider text-base text-white font-mono">
                ACME
              </span>
              <nav className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400">
                <span className="text-white hover:text-white cursor-pointer">Home</span>
                <span className="hover:text-white cursor-pointer">Products</span>
                <span className="hover:text-white cursor-pointer">About</span>
                <span className="hover:text-white cursor-pointer">Contact</span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                Customer Portal
              </span>
            </div>
          </div>

          {/* Fake ACME Hero Body */}
          <div className="p-6 sm:p-10 space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <span>Next-Gen Commerce Infrastructure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise software solutions for modern growth teams.
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Acme empowers organizations with reliable workflows, automated scaling, and unified data architecture.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Fake Website Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-[10px] text-slate-500 flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} Acme Corporation.</span>
            <span>Privacy &middot; Terms &middot; Security</span>
          </div>

          {/* Floating Chatbot Widget positioned at Bottom-Right or Bottom-Left */}
          <div
            className={`absolute bottom-4 ${
              config.position === "bottom-left" ? "left-4" : "right-4"
            } z-30 flex flex-col ${
              config.position === "bottom-left" ? "items-start" : "items-end"
            }`}
          >
            {isWidgetOpen ? (
              <div className="relative animate-in slide-in-from-bottom-4 duration-200">
                {/* Close toggle tab */}
                <button
                  type="button"
                  onClick={() => setIsWidgetOpen(false)}
                  className="absolute -top-3 right-2 z-40 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300 hover:text-white shadow-md cursor-pointer"
                >
                  Close &times;
                </button>
                <ChatPreview
                  config={config}
                  messages={messages}
                  onSendMessage={onSendMessage}
                  onResetChat={onResetChat}
                  isTyping={isTyping}
                />
              </div>
            ) : (
              /* Collapsed Chat Launcher Bubble */
              <button
                type="button"
                onClick={() => setIsWidgetOpen(true)}
                style={{ backgroundColor: config.brandColor }}
                className="w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 border-2 border-white/20"
                aria-label={`Open ${config.name}`}
              >
                <Bot className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
