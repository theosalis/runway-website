import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, calculateMonthlyPayment } from "@/lib/utils";

export default function RepaymentEstimator() {
  const [amount, setAmount] = useState(50000);
  const [term, setTerm] = useState(36);
  const [apr, setApr] = useState(8);

  const { monthly, total } = calculateMonthlyPayment(amount, term, apr);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Preview your monthly repayments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Loan Amount */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Loan amount</Label>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(amount)}
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={5000}
            max={500000}
            step={1000}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€5,000</span>
            <span>€500,000</span>
          </div>
        </div>

        {/* Term */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Loan term</Label>
            <span className="text-lg font-bold text-primary">
              {term} months
            </span>
          </div>
          <Slider
            value={[term]}
            onValueChange={(value) => setTerm(value[0])}
            min={6}
            max={84}
            step={6}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6 months</span>
            <span>84 months</span>
          </div>
        </div>

        {/* APR */}
        <div className="space-y-2">
          <Label htmlFor="apr">Annual Percentage Rate (APR)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="apr"
              type="number"
              min="3"
              max="24"
              step="0.1"
              value={apr}
              onChange={(e) => setApr(parseFloat(e.target.value) || 0)}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>

        {/* Results */}
        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Monthly payment</span>
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(monthly)}
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Total repayable</span>
            <span className="text-xl font-semibold">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

