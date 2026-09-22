import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({
  eyebrow,
  title,
  description,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`p-5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 ${className}`}
      {...props}
    >
      {eyebrow && (
        <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
          {eyebrow}
        </div>
      )}
      <div className="text-base font-semibold text-zinc-900 dark:text-white">
        {title}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
        {description}
      </p>
      {children}
    </div>
  );
};
