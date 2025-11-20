
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortBy<T>(array: T[], key: keyof T, ascending = true): T[] {
  return [...array].sort((a, b) => {
    const valA = a[key] as unknown as number;
    const valB = b[key] as unknown as number;
    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0;
  });
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
