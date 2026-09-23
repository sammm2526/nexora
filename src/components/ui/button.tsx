import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-450 hover:to-violet-550 active:scale-[0.98] border border-indigo-400/30",
    secondary:
      "bg-zinc-900/80 hover:bg-zinc-850 text-zinc-100 border border-zinc-750/80 hover:border-zinc-650 backdrop-blur-sm shadow-sm active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-zinc-900/60 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 active:scale-[0.98]",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
