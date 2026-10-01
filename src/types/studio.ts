/**
 * Nexora Domain Types & Conceptual Models
 * Defines data structures ready for future backend & API integration.
 */

export type ChatbotTone = "professional" | "friendly" | "concise" | "helpful";

export type ChatbotAvatarStyle = "neural-orb" | "spark-bot" | "minimal-cube" | "abstract-gem";

export type WidgetPosition = "bottom-right" | "bottom-left";

export type KnowledgeSourceType = "file" | "url" | "text" | "faq";

export type KnowledgeProcessingStatus = "ready" | "processing" | "indexed";

export type StudioStep = "teach" | "configure" | "preview" | "deploy";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: "starter" | "growth" | "enterprise";
  createdAt: string;
}

export interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  tone: ChatbotTone;
  brandColor: string;
  avatarStyle: ChatbotAvatarStyle;
  suggestedQuestions: string[];
  position: WidgetPosition;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: KnowledgeSourceType;
  size?: string;
  fileType?: "pdf" | "docx" | "txt" | "csv" | "web" | "note" | "qa";
  status: KnowledgeProcessingStatus;
  sectionsCount: number;
  uploadedAt: string;
  snippet?: string;
  url?: string;
  question?: string;
  answer?: string;
}

export interface KnowledgeStats {
  totalSources: number;
  totalDocuments: number;
  totalSections: number;
  indexedPercentage: number;
  potentialDuplicates: number;
  warnings: number;
  healthStatus: "Ready for testing" | "Indexing knowledge..." | "Action required";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: string;
  citation?: {
    sourceName: string;
    pageOrSection?: string;
    excerpt?: string;
  };
}

export interface Chatbot {
  id: string;
  organizationId: string;
  name: string;
  status: "Draft" | "Active" | "Archived";
  config: ChatbotConfig;
  sources: KnowledgeSource[];
  conversationsCount: number | string;
  lastUpdated: string;
}
