import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

export default function LoanSlider() {
  const [amount, setAmount] = useState(100000);

  const handleApply = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("loanAmount", amount.toString());
      window.location.href = `/apply?amount=${amount}`;
    }
  };

  return (
    <div className="rounded-lg bg-transparent h-full flex flex-col">
      <div className="space-y-6 flex-1">
        <div className="space-y-1">
          <h3 className="text-4xl md:text-4xl font-heading font-medium text-black leading-tight">
            Desired loan amount
          </h3>
          <p className="text-base text-black font-heading">
            Apply now with no obligation
          </p>
        </div>

        <div className="flex-1 flex flex-col flex-center justify-between py-6 gap-6">
          <div className="text-center">
            <p className="text-5xl md:text-[56px] font-bold text-foreground">
              {formatCurrency(amount)}
            </p>
          </div>

          <div className="space-y-3">
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={5000}
              max={500000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm font-medium text-foreground/90">
              <span>€5,000</span>
              <span>€500,000</span>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-3 pt-7">
        <button
          onClick={handleApply}
          className="w-full h-12 rounded-md bg-black text-white font-semibold hover:bg-black/90 transition-colors relative shadow-lg"
        >
          Secure funding today
        </button>
        <p className="text-sm text-center text-foreground/90 leading-relaxed">
          Checking eligibility has no impact on your credit score.
        </p>
      </div>
    </div>
  );
}

