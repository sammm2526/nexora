import React from "react";
import { Database, Bot, MessageSquareText, Zap } from "lucide-react";

export interface StatItem {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  trend?: string;
}

export const DashboardStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      label: "Knowledge sources",
      value: "12",
      subtext: "8 documents, 4 FAQ collections",
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      trend: "+3 this week",
    },
    {
      label: "Active chatbots",
      value: "1",
      subtext: "1 draft in Studio",
      icon: <Bot className="w-5 h-5 text-sky-400" />,
    },
    {
      label: "Total conversations",
      value: "—",
      subtext: "Awaiting website deployment",
      icon: <MessageSquareText className="w-5 h-5 text-violet-400" />,
    },
    {
      label: "Inference latency",
      value: "<95ms",
      subtext: "Neural core SLA guarantee",
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      trend: "Optimal",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-400">
              {stat.label}
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
              {stat.value}
            </span>
            {stat.trend && (
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {stat.trend}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-500 mt-1">
            {stat.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
