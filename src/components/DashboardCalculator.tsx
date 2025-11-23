import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, calculateMonthlyPayment } from "@/lib/utils";

export default function DashboardCalculator() {
  const [amount, setAmount] = useState(50000);
  const [term, setTerm] = useState(36);
  const [apr, setApr] = useState(8);

  const { monthly, total } = calculateMonthlyPayment(amount, term, apr);
  const interest = total - amount;

  return (
    <div className="font-opensauce bg-white rounded-[28px] border border-[#DDE2FF] shadow-[0_25px_60px_rgba(15,23,42,0.08)] p-6 md:p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-neutral-900">Loan amount</label>
          <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">$</span>
            <input value={amount.toLocaleString()} readOnly className="w-full pl-8 pr-2 bg-transparent text-2xl font-semibold text-neutral-900 focus:outline-none" />
          </div>
          <Slider value={[amount]} onValueChange={(value) => setAmount(value[0])} min={5000} max={500000} step={1000} className="mt-1" />
          <div className="flex justify-between text-xs text-neutral-500">
            <span>$5,000</span>
            <span>$500,000</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-neutral-900">Loan term</label>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <input value={`${term} months`} readOnly className="w-full bg-transparent text-2xl font-semibold text-neutral-900 focus:outline-none" />
          </div>
          <Slider value={[term]} onValueChange={(value) => setTerm(value[0])} min={6} max={84} step={6} className="mt-1" />
          <div className="flex justify-between text-xs text-neutral-500">
            <span>6 months</span>
            <span>84 months</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-neutral-900">APR</label>
        <Slider value={[apr]} onValueChange={(value) => setApr(value[0])} min={3} max={24} step={0.1} className="mt-1" />
        <div className="flex justify-between text-xs text-neutral-500">
          <span>3.00%</span>
          <span>24.00%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">APR rate</p>
          <p className="text-2xl font-semibold text-neutral-900">{apr.toFixed(2)}%</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Monthly payment</p>
          <p className="text-2xl font-semibold text-neutral-900">{formatCurrency(monthly)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Total repayable</p>
          <p className="text-2xl font-semibold text-neutral-900">{formatCurrency(total)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-neutral-100 bg-white p-4">
          <p className="text-sm font-semibold text-neutral-900">Principal amount</p>
          <p className="text-xs text-neutral-500 mb-1">Loan amount</p>
          <p className="text-lg font-semibold text-neutral-900">{formatCurrency(amount)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-4">
          <p className="text-sm font-semibold text-neutral-900">Interest over term</p>
          <p className="text-xs text-neutral-500 mb-1">Total interest</p>
          <p className="text-lg font-semibold text-neutral-900">{formatCurrency(interest)}</p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-4">
          <p className="text-sm font-semibold text-neutral-900">Total amount</p>
          <p className="text-xs text-neutral-500 mb-1">Total repayable</p>
          <p className="text-lg font-semibold text-neutral-900">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}
