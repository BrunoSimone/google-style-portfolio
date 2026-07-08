import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True for links that navigate outside the portfolio (http/https). */
export function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href)
}
