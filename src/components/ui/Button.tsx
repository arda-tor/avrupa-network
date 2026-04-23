import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "connect";
}

export default function Button({ variant: _variant = "primary", ...props }: ButtonProps) {
  // TODO: HTML'deki .btn-primary / .btn-secondary / .btn-ghost / .card-connect stillerini variant'a göre uygula
  return <button {...props} />;
}
