"use client";

import React, { useState } from "react";
import { Search, Sparkles, BookOpen, CornerDownLeft, Loader2 } from "lucide-react";

interface MockQueryResult {
  answer: string;
  sourceCitation: string;
  relevanceScore: string;
}

export const AskKnowledge: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MockQueryResult | null>({
    answer: "You can return eligible products within 30 days of delivery in their original packaging for a full refund. Exchanges are processed free of charge.",
    sourceCitation: "Acme Return & Refund Policy 2026.pdf · Page 2 · Clause 4.1",
    relevanceScore: "98.4% Match",
  });

  const suggestedQuestions = [
    "What is our return policy?",
    "What are your support hours?",
    "How can customers contact us?",
  ];

  /**
   * Mock Retrieval Pipeline:
   * In future checkpoints, this function will be replaced by:
   * 1. Generating a query vector embedding
   * 2. Querying PostgreSQL pgvector / vector database
   * 3. Reranking top-k chunks
   * 4. Synthesizing context-grounded response via LLM
   */
  const handleAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    setLoading(true);
    setQuery(questionText);

    setTimeout(() => {
      const q = questionText.toLowerCase();
      let answer = "Acme provides dedicated solutions for SaaS businesses with automated workflow integrations, custom webhooks, and 99.9% uptime.";
      let citation = "Product Catalog & Feature Specs.csv · Sheet 1";
      let score = "94.2% Match";

      if (q.includes("return") || q.includes("refund")) {
        answer = "You can return eligible products within 30 days of delivery in their original packaging for a full refund. Exchanges are processed free of charge.";
        citation = "Acme Return & Refund Policy 2026.pdf · Page 2";
        score = "99.1% Match";
      } else if (q.includes("hours") || q.includes("time") || q.includes("support")) {
        answer = "Our customer support team is available Monday through Friday from 8:00 AM to 8:00 PM EST. Enterprise accounts also include 24/7 emergency incident paging.";
        citation = "Support SLA & Operating Hours.docx · Section 3.1";
        score = "98.7% Match";
      } else if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
        answer = "Customers can contact our support team at support@acme.inc or through the online customer portal at help.acme.inc.";
        citation = "https://acme.inc/help-center · Contact Page";
        score = "97.5% Match";
      }

      setResult({
        answer,
        sourceCitation: citation,
        relevanceScore: score,
      });
      setLoading(false);
    }, 450);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 backdrop-blur-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">
              Ask your knowledge
            </h4>
            <p className="text-xs text-zinc-500">
              Simulate semantic retrieval & context extraction from your uploaded knowledge.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
          RAG Simulation
        </span>
      </div>

      {/* Suggested Question Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500">Try asking:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAsk(q)}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors"
          >
            &ldquo;{q}&rdquo;
          </button>
        ))}
      </div>

      {/* Question Search Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="relative"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Ask something about your business..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Ask</span>
              <CornerDownLeft className="w-3 h-3" />
            </>
          )}
        </button>
      </form>

      {/* Mock Answer with Exact Citation */}
      {result && (
        <div className="rounded-xl bg-zinc-950/80 border border-zinc-850 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              {result.answer}
            </p>
          </div>

          {/* Citation & Source Layer */}
          <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-zinc-400">Source:</span>
              <span className="text-zinc-300 font-mono">{result.sourceCitation}</span>
            </div>

            <span className="font-mono text-emerald-400">{result.relevanceScore}</span>
          </div>
        </div>
      )}
    </div>
  );
};
