import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateMonthlyPayment(
  amount: number,
  termMonths: number,
  aprPercent: number
): { monthly: number; total: number } {
  const monthlyRate = aprPercent / 100 / 12;
  
  if (monthlyRate === 0) {
    const monthly = amount / termMonths;
    return { monthly, total: amount };
  }
  
  const monthly =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  const total = monthly * termMonths;
  
  return { monthly, total };
}

