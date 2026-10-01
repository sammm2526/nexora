"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileUp, Globe, FileText, HelpCircle } from "lucide-react";
import { KnowledgeSourceType } from "@/types/studio";

export interface FileDropZoneProps {
  onFilesDropped: (files: File[]) => void;
  onOpenSourceModal: (type: KnowledgeSourceType) => void;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesDropped,
  onOpenSourceModal,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const allowedExtensions = ["pdf", "docx", "txt", "csv"];
      const files: File[] = [];

      Array.from(e.dataTransfer.files).forEach((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext && allowedExtensions.includes(ext)) {
          files.push(file);
        }
      });

      if (files.length > 0) {
        onFilesDropped(files);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesDropped(Array.from(e.target.files));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Interactive Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRef.current?.click();
          }
        }}
        aria-label="Upload files: Drag and drop or browse files"
        className={`relative group rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 select-none ${
          isDragOver
            ? "border-indigo-400 bg-indigo-950/30 scale-[1.01] shadow-2xl shadow-indigo-500/20"
            : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-900/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.csv"
          onChange={handleFileInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragOver
                ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/50"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30"
            }`}
          >
            <UploadCloud className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Drop your knowledge here
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Drag files into the space or choose a source below.
            </p>
          </div>

          {/* Formats Badge & Explanation */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              PDF
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              DOCX
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              TXT
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">
              CSV
            </span>
          </div>

          <p className="text-xs text-zinc-500 pt-1">
            Files will be processed and indexed into your chatbot&apos;s knowledge base.
          </p>
        </div>
      </div>

      {/* Alternative Knowledge Source Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer group"
        >
          <FileUp className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Upload files</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenSourceModal("url")}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer group"
        >
          <Globe className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
          <span>Website URL</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenSourceModal("text")}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer group"
        >
          <FileText className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Paste text</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenSourceModal("faq")}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer group"
        >
          <HelpCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>Build FAQ</span>
        </button>
      </div>
    </div>
  );
};
