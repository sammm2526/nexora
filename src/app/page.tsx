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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Checkpoint 1 · Initialized
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
            Conversational AI Platform for SaaS
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

          {/* Foundation Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                Frontend Core
              </div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white">
                Next.js & React
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                App Router architecture with TypeScript
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                Design System
              </div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white">
                Tailwind CSS
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Production-grade utility styling & theme
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                Code Quality
              </div>
              <div className="text-base font-semibold text-zinc-900 dark:text-white">
                ESLint & Types
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Strict type safety and standardized linting
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Nexora AI &copy; {new Date().getFullYear()} &mdash; Milestone 1: Project Foundation
      </footer>
    </div>
  );
}
