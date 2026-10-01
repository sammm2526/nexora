"use client";

import React, { useState } from "react";
import {
  ChatbotConfig,
  ChatbotTone,
  ChatbotAvatarStyle,
} from "@/types/studio";
import {
  Bot,
  Sparkles,
  Sliders,
  Palette,
  MessageSquare,
  Layout,
  Plus,
  X,
  Smile,
  Shield,
  Zap,
  Check,
} from "lucide-react";

export interface ChatbotConfiguratorProps {
  config: ChatbotConfig;
  onChange: (updated: Partial<ChatbotConfig>) => void;
}

export const ChatbotConfigurator: React.FC<ChatbotConfiguratorProps> = ({
  config,
  onChange,
}) => {
  const [newQuestion, setNewQuestion] = useState("");

  const tones: { id: ChatbotTone; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: "professional",
      label: "Professional",
      desc: "Formal, respectful, enterprise-focused",
      icon: <Shield className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: "friendly",
      label: "Friendly",
      desc: "Warm, conversational, approachable",
      icon: <Smile className="w-4 h-4 text-sky-400" />,
    },
    {
      id: "concise",
      label: "Concise",
      desc: "Direct, bullet-points, high-efficiency",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: "helpful",
      label: "Helpful",
      desc: "Proactive guidance, explanatory, step-by-step",
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
    },
  ];

  const avatarStyles: { id: ChatbotAvatarStyle; name: string }[] = [
    { id: "neural-orb", name: "Neural Orb" },
    { id: "spark-bot", name: "Spark Bot" },
    { id: "minimal-cube", name: "Minimal Cube" },
    { id: "abstract-gem", name: "Abstract Gem" },
  ];

  const presetColors = [
    { label: "Indigo", value: "#6366f1" },
    { label: "Sky", value: "#0ea5e9" },
    { label: "Violet", value: "#8b5cf6" },
    { label: "Emerald", value: "#10b981" },
    { label: "Rose", value: "#f43f5e" },
    { label: "Amber", value: "#f59e0b" },
  ];

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() && !config.suggestedQuestions.includes(newQuestion.trim())) {
      onChange({
        suggestedQuestions: [...config.suggestedQuestions, newQuestion.trim()],
      });
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    onChange({
      suggestedQuestions: config.suggestedQuestions.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Identity & Naming */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Bot className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Identity & Persona
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Chatbot Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Acme Support AI"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Appears in the chat header and browser notification tab.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Avatar Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {avatarStyles.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => onChange({ avatarStyle: avatar.id })}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    config.avatarStyle === avatar.id
                      ? "bg-indigo-600/15 border-indigo-500 text-indigo-200"
                      : "bg-zinc-950/60 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-750"
                  }`}
                >
                  <span>{avatar.name}</span>
                  {config.avatarStyle === avatar.id && (
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Initial Welcome Message
          </label>
          <textarea
            rows={2}
            value={config.welcomeMessage}
            onChange={(e) => onChange({ welcomeMessage: e.target.value })}
            placeholder="Hi! I'm Acme's AI assistant. How can I help?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          />
          <p className="text-[11px] text-zinc-500 mt-1">
            The first proactive greeting shown when a visitor opens the widget.
          </p>
        </div>
      </section>

      {/* 2. Tone & Behavior */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Conversational Tone
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tones.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ tone: t.id })}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                config.tone === t.id
                  ? "bg-indigo-600/15 border-indigo-500 shadow-md shadow-indigo-500/10"
                  : "bg-zinc-950/60 border-zinc-850 hover:border-zinc-750"
              }`}
            >
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                {t.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>{t.label}</span>
                  {config.tone === t.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  {t.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Branding & Styling */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Palette className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Brand Styling & Theme
          </h3>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-300">
            Primary Accent Color
          </label>

          <div className="flex flex-wrap items-center gap-3">
            {presetColors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => onChange({ brandColor: color.value })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  config.brandColor.toLowerCase() === color.value.toLowerCase()
                    ? "border-white/80 bg-zinc-850 text-white shadow-sm"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner"
                  style={{ backgroundColor: color.value }}
                />
                <span>{color.label}</span>
              </button>
            ))}

            {/* Custom Hex Picker */}
            <div className="flex items-center gap-2 pl-2">
              <input
                type="color"
                value={config.brandColor}
                onChange={(e) => onChange({ brandColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                title="Choose custom brand color"
              />
              <span className="font-mono text-xs text-zinc-400">
                {config.brandColor}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Suggested Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Suggested Prompts & Actions
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {config.suggestedQuestions.map((q, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 group"
              >
                <span>{q}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="text-zinc-500 hover:text-rose-400 transition-colors ml-1"
                  aria-label={`Remove prompt: ${q}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddQuestion} className="flex gap-2">
            <input
              type="text"
              placeholder="Add another suggested question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!newQuestion.trim()}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-xs font-semibold text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>
      </section>

      {/* 5. Placement & Widget Position */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Layout className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Website Widget Placement
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChange({ position: "bottom-right" })}
            className={`p-4 rounded-xl border text-left transition-all ${
              config.position === "bottom-right"
                ? "bg-indigo-600/15 border-indigo-500 shadow-md shadow-indigo-500/10 text-white"
                : "bg-zinc-950/60 border-zinc-850 text-zinc-400 hover:border-zinc-750"
            }`}
          >
            <div className="text-xs font-semibold">Bottom Right (Standard)</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              Default location for 94% of SaaS chat widgets.
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ position: "bottom-left" })}
            className={`p-4 rounded-xl border text-left transition-all ${
              config.position === "bottom-left"
                ? "bg-indigo-600/15 border-indigo-500 shadow-md shadow-indigo-500/10 text-white"
                : "bg-zinc-950/60 border-zinc-850 text-zinc-400 hover:border-zinc-750"
            }`}
          >
            <div className="text-xs font-semibold">Bottom Left</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              Best if other sticky buttons occupy the bottom right.
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
