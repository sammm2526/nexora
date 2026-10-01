"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useStudioState,
  StudioHeader,
  KnowledgeCanvas,
  FileDropZone,
  KnowledgeFileList,
  KnowledgeHealth,
  AskKnowledge,
  KnowledgeSourceModal,
  ChatbotConfigurator,
  ChatPreview,
  WebsiteSimulator,
} from "@/components/studio";
import { KnowledgeSourceType } from "@/types/studio";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  Sliders,
  BookOpen,
  Lock,
} from "lucide-react";

export default function StudioPage() {
  const {
    activeStep,
    setActiveStep,
    config,
    updateConfig,
    sources,
    addFiles,
    addCustomSource,
    removeSource,
    isProcessing,
    knowledgeStats,
    chatMessages,
    sendChatMessage,
    resetChat,
    isTyping,
  } = useStudioState();

  const [modalType, setModalType] = useState<KnowledgeSourceType | null>(null);
  const [previewMode, setPreviewMode] = useState<"widget" | "website">("widget");

  return (
    <div className="min-h-screen flex flex-col bg-[#080809] text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Gradients */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-indigo-600/10 to-transparent blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />

      {/* Studio Header & Stepper */}
      <StudioHeader
        activeStep={activeStep}
        onStepChange={setActiveStep}
        botName={config.name}
      />

      {/* Main Studio Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT / MAIN WORKSPACE AREA */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            {/* Step 1: TEACH NEXORA */}
            {activeStep === "teach" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1">
                    <BookOpen className="w-3 h-3 text-indigo-400" />
                    <span>Stage 01 &middot; Knowledge Ingestion</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Teach Nexora about your business
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Add the information your AI should know before talking to your customers. Upload files, link docs, or build FAQs.
                  </p>
                </div>

                {/* 1. Knowledge Canvas */}
                <KnowledgeCanvas sources={sources} isProcessing={isProcessing} />

                {/* 2. Interactive File Dropzone */}
                <FileDropZone
                  onFilesDropped={addFiles}
                  onOpenSourceModal={(type) => setModalType(type)}
                />

                {/* 3. Knowledge Files List with Processing Statuses */}
                <KnowledgeFileList
                  sources={sources}
                  onRemoveSource={removeSource}
                />

                {/* 4. Concrete Knowledge Health Overview */}
                <KnowledgeHealth stats={knowledgeStats} />

                {/* 5. Ask Your Knowledge (Mock RAG Retrieval) */}
                <AskKnowledge />

                {/* Bottom Step Advancement Button */}
                <div className="pt-4 flex items-center justify-between border-t border-zinc-900">
                  <Link
                    href="/dashboard"
                    className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    &larr; Exit to Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActiveStep("configure")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 border border-indigo-400/30 transition-all cursor-pointer"
                  >
                    <span>Proceed to Configure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: CONFIGURE CHATBOT */}
            {activeStep === "configure" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-1">
                    <Sliders className="w-3 h-3 text-sky-400" />
                    <span>Stage 02 &middot; Chatbot Configuration</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Customize Personality & Branding
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Tune the conversational tone, brand styling, welcome message, and suggested questions. The live preview updates in real time.
                  </p>
                </div>

                {/* Configuration Panel */}
                <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 backdrop-blur-md">
                  <ChatbotConfigurator
                    config={config}
                    onChange={updateConfig}
                  />
                </div>

                {/* Bottom Step Navigation */}
                <div className="pt-4 flex items-center justify-between border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => setActiveStep("teach")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Knowledge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStep("preview")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 border border-indigo-400/30 transition-all cursor-pointer"
                  >
                    <span>Proceed to Full Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: PREVIEW & SIMULATOR (Full width on main area when tab is active) */}
            {activeStep === "preview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span>Stage 03 &middot; Live Testing & Simulator</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Preview your AI assistant
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Test conversations and see how the widget integrates onto a customer-facing business website before real deployment.
                  </p>
                </div>

                {/* Website Simulator */}
                <WebsiteSimulator
                  config={config}
                  messages={chatMessages}
                  onSendMessage={sendChatMessage}
                  onResetChat={resetChat}
                  isTyping={isTyping}
                />

                {/* Bottom Step Navigation */}
                <div className="pt-4 flex items-center justify-between border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => setActiveStep("configure")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Configure</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Stage 04 Deploy unlocks in Milestone 4</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT / LIVE PREVIEW DOCKED PANE (Visible alongside Teach and Configure steps on desktop) */}
          <div
            className={`lg:col-span-5 xl:col-span-5 space-y-4 ${
              activeStep === "preview" ? "hidden lg:block opacity-60 pointer-events-none" : ""
            }`}
          >
            {/* Live Preview Card Container */}
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 backdrop-blur-xl sticky top-24 shadow-2xl shadow-black/40">
              {/* Preview Mode Switcher */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Chatbot Preview
                  </span>
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("widget")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      previewMode === "widget"
                        ? "bg-zinc-800 text-white font-medium shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Widget
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("website")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      previewMode === "website"
                        ? "bg-zinc-800 text-white font-medium shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Website
                  </button>
                </div>
              </div>

              {/* Preview Body */}
              {previewMode === "widget" ? (
                <div>
                  <ChatPreview
                    config={config}
                    messages={chatMessages}
                    onSendMessage={sendChatMessage}
                    onResetChat={resetChat}
                    isTyping={isTyping}
                  />
                  <p className="text-[11px] text-zinc-500 text-center mt-3">
                    Type a message or click suggested questions to test real-time simulated responses.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <WebsiteSimulator
                    config={config}
                    messages={chatMessages}
                    onSendMessage={sendChatMessage}
                    onResetChat={resetChat}
                    isTyping={isTyping}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal for adding URL, Text, or FAQ */}
      {modalType && (
        <KnowledgeSourceModal
          isOpen={!!modalType}
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={addCustomSource}
        />
      )}
    </div>
  );
}
