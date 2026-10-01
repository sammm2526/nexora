"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ChatbotConfig,
  KnowledgeSource,
  KnowledgeStats,
  ChatMessage,
  StudioStep,
  KnowledgeSourceType,
} from "@/types/studio";

const INITIAL_SOURCES: KnowledgeSource[] = [
  {
    id: "ks-1",
    name: "Acme Return & Refund Policy 2026.pdf",
    type: "file",
    size: "2.4 MB",
    fileType: "pdf",
    status: "indexed",
    sectionsCount: 18,
    uploadedAt: "Yesterday",
    snippet: "All purchases are protected under our 30-day no-questions-asked refund guarantee.",
  },
  {
    id: "ks-2",
    name: "Support SLA & Operating Hours.docx",
    type: "file",
    size: "840 KB",
    fileType: "docx",
    status: "indexed",
    sectionsCount: 12,
    uploadedAt: "Yesterday",
    snippet: "Global support coverage is active 8:00 AM to 8:00 PM EST on weekdays.",
  },
  {
    id: "ks-3",
    name: "Billing & Enterprise Pricing FAQ.txt",
    type: "file",
    size: "120 KB",
    fileType: "txt",
    status: "indexed",
    sectionsCount: 14,
    uploadedAt: "2 days ago",
    snippet: "Annual subscriptions receive a 20% discount and dedicated account manager.",
  },
  {
    id: "ks-4",
    name: "Product Catalog & Feature Specs.csv",
    type: "file",
    size: "450 KB",
    fileType: "csv",
    status: "indexed",
    sectionsCount: 20,
    uploadedAt: "3 days ago",
    snippet: "SKU definitions, API quotas, and feature tier entitlement matrix.",
  },
  {
    id: "ks-5",
    name: "https://acme.inc/help-center",
    type: "url",
    fileType: "web",
    status: "indexed",
    sectionsCount: 28,
    uploadedAt: "3 days ago",
    url: "https://acme.inc/help-center",
    snippet: "Knowledge base documentation crawled to depth 2.",
  },
];

const INITIAL_CONFIG: ChatbotConfig = {
  name: "Acme Support AI",
  welcomeMessage: "Hi! I'm Acme's AI assistant. How can I help you today?",
  tone: "friendly",
  brandColor: "#6366f1", // Indigo
  avatarStyle: "neural-orb",
  suggestedQuestions: [
    "What is our return policy?",
    "What are your support hours?",
    "How can customers contact us?",
  ],
  position: "bottom-right",
};

export function useStudioState() {
  const [activeStep, setActiveStep] = useState<StudioStep>("teach");
  const [config, setConfig] = useState<ChatbotConfig>(INITIAL_CONFIG);
  const [sources, setSources] = useState<KnowledgeSource[]>(INITIAL_SOURCES);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "bot",
      content: INITIAL_CONFIG.welcomeMessage,
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Synchronize initial message when welcomeMessage changes
  const updateConfig = useCallback((newConfig: Partial<ChatbotConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      // If welcome message changed, update the initial message in chat
      if (newConfig.welcomeMessage !== undefined && newConfig.welcomeMessage !== prev.welcomeMessage) {
        setChatMessages((messages) => {
          if (messages.length > 0 && messages[0].id === "msg-init") {
            return [
              {
                ...messages[0],
                content: newConfig.welcomeMessage || "",
              },
              ...messages.slice(1),
            ];
          }
          return messages;
        });
      }
      return updated;
    });
  }, []);

  // Simulate file upload with Processing -> Indexed transition
  const addFiles = useCallback((files: File[]) => {
    const newItems: KnowledgeSource[] = files.map((file, idx) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      let fileType: "pdf" | "docx" | "txt" | "csv" = "txt";
      if (extension === "pdf") fileType = "pdf";
      else if (extension === "docx") fileType = "docx";
      else if (extension === "csv") fileType = "csv";

      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;

      return {
        id: `source-upload-${Date.now()}-${idx}`,
        name: file.name,
        type: "file",
        size: sizeStr,
        fileType,
        status: "processing",
        sectionsCount: Math.floor(Math.random() * 15) + 5,
        uploadedAt: "Just now",
        snippet: "Document queued for text extraction and semantic chunking.",
      };
    });

    setSources((prev) => [...newItems, ...prev]);
    setIsProcessing(true);

    // Simulate background chunking and embedding pipeline
    setTimeout(() => {
      setSources((prev) =>
        prev.map((item) => {
          const match = newItems.find((n) => n.id === item.id);
          if (match) {
            return {
              ...item,
              status: "indexed",
              snippet: `Indexed ${item.sectionsCount} vector embeddings successfully.`,
            };
          }
          return item;
        })
      );
      setIsProcessing(false);
    }, 1600);
  }, []);

  // Add source from URL, Text, or FAQ
  const addCustomSource = useCallback(
    (source: {
      type: KnowledgeSourceType;
      name: string;
      contentSnippet?: string;
      url?: string;
      question?: string;
      answer?: string;
    }) => {
      const newSource: KnowledgeSource = {
        id: `source-custom-${Date.now()}`,
        name: source.name,
        type: source.type,
        size: source.type === "url" ? undefined : `${(source.contentSnippet?.length || 50) * 2} B`,
        fileType:
          source.type === "url"
            ? "web"
            : source.type === "text"
            ? "note"
            : "qa",
        status: "processing",
        sectionsCount: source.type === "faq" ? 1 : 6,
        uploadedAt: "Just now",
        snippet: source.contentSnippet || source.answer || "Processing knowledge source...",
        url: source.url,
        question: source.question,
        answer: source.answer,
      };

      setSources((prev) => [newSource, ...prev]);
      setIsProcessing(true);

      setTimeout(() => {
        setSources((prev) =>
          prev.map((item) =>
            item.id === newSource.id
              ? {
                  ...item,
                  status: "indexed",
                  snippet:
                    item.type === "faq"
                      ? "Direct Q&A pair indexed for zero-shot retrieval."
                      : "Semantic passages extracted and vectorized.",
                }
              : item
          )
        );
        setIsProcessing(false);
      }, 1400);
    },
    []
  );

  const removeSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Dynamic knowledge metrics
  const knowledgeStats: KnowledgeStats = useMemo(() => {
    const totalSources = sources.length;
    const totalDocuments = sources.filter((s) => s.type === "file").length;
    const totalSections = sources.reduce((acc, curr) => acc + curr.sectionsCount, 0);
    const indexedCount = sources.filter((s) => s.status === "indexed").length;
    const indexedPercentage = totalSources > 0 ? Math.round((indexedCount / totalSources) * 100) : 100;
    const isAnyProcessing = sources.some((s) => s.status === "processing");

    return {
      totalSources,
      totalDocuments,
      totalSections,
      indexedPercentage,
      potentialDuplicates: 0,
      warnings: 1, // Example: 1 minor warning (e.g. unindexed image in PDF)
      healthStatus: isAnyProcessing ? "Indexing knowledge..." : "Ready for testing",
    };
  }, [sources]);

  // Send message in the live chatbot preview
  const sendChatMessage = useCallback(
    (userText: string) => {
      if (!userText.trim()) return;

      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`,
        sender: "user",
        content: userText,
        timestamp: "Just now",
      };

      setChatMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Simulate Retrieval & LLM Generation latency
      setTimeout(() => {
        let botContent = "Based on Acme's business documentation, we offer dedicated solutions for our customers with guaranteed SLAs and verified support.";
        let citation = {
          sourceName: "Product Catalog & Feature Specs.csv",
          pageOrSection: "Specification Sheet",
          excerpt: "General feature matrix and SLA guarantees.",
        };

        const lower = userText.toLowerCase();
        if (lower.includes("return") || lower.includes("refund")) {
          botContent = "You can return eligible products within 30 days of delivery in their original packaging for a full refund. Exchanges are processed free of charge with prepaid shipping.";
          citation = {
            sourceName: "Acme Return & Refund Policy 2026.pdf",
            pageOrSection: "Page 2 · Clause 4.1",
            excerpt: "Returns are accepted within thirty calendar days of verified delivery.",
          };
        } else if (lower.includes("hours") || lower.includes("time") || lower.includes("support")) {
          botContent = "Our customer support team is available Monday through Friday from 8:00 AM to 8:00 PM EST. Enterprise accounts also have 24/7 on-call emergency response.";
          citation = {
            sourceName: "Support SLA & Operating Hours.docx",
            pageOrSection: "Section 3.1",
            excerpt: "Standard operating schedule: Monday to Friday 08:00 - 20:00 EST.",
          };
        } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone")) {
          botContent = "You can reach us anytime by sending an email to support@acme.inc or through our dedicated self-serve portal at help.acme.inc.";
          citation = {
            sourceName: "https://acme.inc/help-center",
            pageOrSection: "Help Portal · Contact Us",
            excerpt: "Direct inbound communications channel: support@acme.inc.",
          };
        } else if (lower.includes("pricing") || lower.includes("cost") || lower.includes("billing")) {
          botContent = "We offer flexible tiered billing with transparent monthly or annual pricing. Annual plans include a 20% discount and automated invoicing.";
          citation = {
            sourceName: "Billing & Enterprise Pricing FAQ.txt",
            pageOrSection: "Section 2 · Terms",
            excerpt: "Annual contracts receive an automatic twenty percent discount.",
          };
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          content: botContent,
          timestamp: "Just now",
          citation,
        };

        setChatMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 550);
    },
    []
  );

  const resetChat = useCallback(() => {
    setChatMessages([
      {
        id: "msg-init",
        sender: "bot",
        content: config.welcomeMessage,
        timestamp: "Just now",
      },
    ]);
  }, [config.welcomeMessage]);

  return {
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
  };
}
