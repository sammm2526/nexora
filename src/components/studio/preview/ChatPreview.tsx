"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChatbotConfig,
  ChatMessage,
} from "@/types/studio";
import {
  Send,
  Bot,
  Sparkles,
  RefreshCw,
  BookOpen,
  Box,
  Diamond,
} from "lucide-react";

export interface ChatPreviewProps {
  config: ChatbotConfig;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onResetChat: () => void;
  isTyping?: boolean;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({
  config,
  messages,
  onSendMessage,
  onResetChat,
  isTyping = false,
}) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const renderAvatarIcon = () => {
    switch (config.avatarStyle) {
      case "spark-bot":
        return <Sparkles className="w-4 h-4 text-white" />;
      case "minimal-cube":
        return <Box className="w-4 h-4 text-white" />;
      case "abstract-gem":
        return <Diamond className="w-4 h-4 text-white" />;
      case "neural-orb":
      default:
        return <Bot className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="flex flex-col h-[520px] w-full max-w-[390px] mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/80 overflow-hidden font-sans select-none">
      {/* Widget Header */}
      <div
        className="px-4 py-3.5 flex items-center justify-between text-white border-b border-white/10"
        style={{
          background: `linear-gradient(135deg, ${config.brandColor} 0%, #18181b 120%)`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl bg-black/30 border border-white/20 flex items-center justify-center shadow-inner">
            {renderAvatarIcon()}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-900" />
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-tight truncate max-w-[170px]">
              {config.name || "AI Assistant"}
            </h3>
            <p className="text-[10px] text-white/80 flex items-center gap-1 font-medium">
              <span>Online</span>
              <span>&middot;</span>
              <span className="capitalize">{config.tone}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetChat}
          title="Reset conversation"
          className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 text-white/80 hover:text-white flex items-center justify-center transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message History Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-950/90 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                  isUser
                    ? "text-white font-medium rounded-br-none"
                    : "bg-zinc-900 text-zinc-200 border border-zinc-800/80 rounded-bl-none"
                }`}
                style={isUser ? { backgroundColor: config.brandColor } : {}}
              >
                <p>{msg.content}</p>

                {/* Citation under bot answer */}
                {msg.citation && (
                  <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="font-semibold text-zinc-300">Source:</span>
                    <span className="truncate">{msg.citation.sourceName}</span>
                  </div>
                )}
              </div>

              <span className="text-[9px] text-zinc-600 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-bl-none bg-zinc-900 border border-zinc-800 w-16">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      {config.suggestedQuestions.length > 0 && (
        <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {config.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 whitespace-nowrap transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-2.5 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          style={{ backgroundColor: config.brandColor }}
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center disabled:opacity-40 shadow-sm transition-transform active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
