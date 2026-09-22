import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "accent";
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  pulse = false,
  className = "",
  ...props
}) => {
  const variantStyles = {
    default: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 border-zinc-200/60 dark:border-zinc-700/60",
    outline: "bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
    accent: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variantStyles} ${className}`}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
      {children}
    </span>
  );
};
