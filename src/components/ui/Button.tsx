"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "dark" | "light";
  className?: string;
}

export default function Button({ children, href, onClick, variant = "dark", className = "" }: ButtonProps) {
  const cls = `btn-cut ${variant === "light" ? "btn-cut-light" : ""} ${className}`.trim();
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
