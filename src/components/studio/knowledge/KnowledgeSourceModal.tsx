"use client";

import React, { useState } from "react";
import { X, Globe, FileText, HelpCircle, Sparkles } from "lucide-react";
import { KnowledgeSourceType } from "@/types/studio";

export interface KnowledgeSourceModalProps {
  isOpen: boolean;
  type: KnowledgeSourceType;
  onClose: () => void;
  onSubmit: (source: {
    type: KnowledgeSourceType;
    name: string;
    contentSnippet?: string;
    url?: string;
    question?: string;
    answer?: string;
  }) => void;
}

export const KnowledgeSourceModal: React.FC<KnowledgeSourceModalProps> = ({
  isOpen,
  type,
  onClose,
  onSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "url" && url.trim()) {
      onSubmit({
        type: "url",
        name: url.trim(),
        url: url.trim(),
        contentSnippet: `Live website crawl for ${url.trim()}`,
      });
      setUrl("");
    } else if (type === "text" && text.trim()) {
      onSubmit({
        type: "text",
        name: title.trim() || "Internal Knowledge Note",
        contentSnippet: text.trim().slice(0, 120),
      });
      setTitle("");
      setText("");
    } else if (type === "faq" && question.trim() && answer.trim()) {
      onSubmit({
        type: "faq",
        name: `FAQ: ${question.trim()}`,
        question: question.trim(),
        answer: answer.trim(),
        contentSnippet: answer.trim().slice(0, 120),
      });
      setQuestion("");
      setAnswer("");
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-850 p-6 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            {type === "url" && <Globe className="w-5 h-5 text-sky-400" />}
            {type === "text" && <FileText className="w-5 h-5 text-amber-400" />}
            {type === "faq" && <HelpCircle className="w-5 h-5 text-emerald-400" />}
            <h3 className="text-base font-bold text-white">
              {type === "url" && "Index Website or Help Center"}
              {type === "text" && "Paste Business Documentation"}
              {type === "faq" && "Build FAQ Knowledge Pair"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {type === "url" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Target Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://acme.inc/help-center"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <p className="text-xs text-zinc-500">
                Nexora will simulate crawling and indexing public articles and documentation pages.
              </p>
            </div>
          )}

          {type === "text" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Document Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Warranty & Replacement Guide"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Internal Documentation Text
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste policies, internal guides, or unstructured business guidelines..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {type === "faq" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Customer Question
                </label>
                <input
                  type="text"
                  placeholder="e.g. How do I upgrade my Acme subscription?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Verified Business Answer
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. You can upgrade anytime via Settings > Billing > Upgrade Tier with immediate prorated access."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-450 hover:to-violet-550 border border-indigo-400/30 shadow-md shadow-indigo-500/25 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Indexing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
