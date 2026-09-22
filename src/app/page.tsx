import { HeroSceneCanvas } from "@/components/three";
import { Badge, Card } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Nexora
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" pulse>
              Checkpoint 2 · 3D Foundation
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-16">
        <div className="max-w-4xl w-full text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex">
            <Badge variant="accent">
              Conversational AI Platform for SaaS
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Welcome to <span className="text-indigo-600 dark:text-indigo-400">Nexora</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
              An intelligent conversational assistant ecosystem engineered for modern SaaS businesses, featuring context-aware memory, tool integration, and specialized agents.
            </p>
          </div>

          {/* Interactive 3D Hero Experience */}
          <div className="relative pt-2 pb-2">
            <HeroSceneCanvas className="shadow-2xl shadow-indigo-500/10 border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/60 to-white/20 dark:from-zinc-900/50 dark:to-zinc-950/20 backdrop-blur-md" />
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span>Procedural AI Neural Core &middot; Move pointer or drag to interact</span>
            </div>
          </div>

          {/* Foundation Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <Card
              eyebrow="Frontend Core"
              title="Next.js & React 19"
              description="App Router architecture with strict TypeScript and server/client boundary separation."
            />

            <Card
              eyebrow="3D & WebGL Engine"
              title="Three.js & Fiber"
              description="Procedural 3D geometry with dynamic camera tracking and lightweight GPU footprint."
            />

            <Card
              eyebrow="Future XR Ready"
              title="XR-Compatible"
              description="Clean decoupled architecture reserved for progressive WebXR, AR, and VR capabilities."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Nexora AI &copy; {new Date().getFullYear()} &mdash; Milestone 2: 3D Foundation Extension
      </footer>
    </div>
  );
}
