import { ChevronRight } from "lucide-react";

const lendingOptions = [
  {
    id: "working-capital",
    title: "Working Capital Finance",
    emoji: "⚡"
  },
  {
    id: "asset",
    title: "Asset Finance",
    emoji: "🔧"
  },
  {
    id: "invoice",
    title: "Invoice Financing",
    emoji: "📄"
  },
  {
    id: "growth",
    title: "Growth & Acquisition Loans",
    emoji: "📈"
  },
  {
    id: "credit-line",
    title: "Revolving Credit Lines",
    emoji: "🔄"
  },
];

export default function LendingSelector() {
  return (
    <div className="w-[90%] mx-auto">
      <div className="bg-[hsl(var(--pastel-mint))] rounded-3xl p-12 md:p-16">
        <h3 className="text-3xl font-semibold mb-12 text-foreground">
          Tell me about...
        </h3>

        <div className="divide-y divide-foreground/10">
          {lendingOptions.map((option, index) => (
            <a
              key={option.id}
              href="/services"
              className="group block py-6 transition-all duration-300 ease-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 transition-all duration-300 ease-out group-hover:translate-x-4">
                  <div className="text-xl md:text-2xl font-semibold text-[hsl(var(--pastel-lavender-dark))]">
                    {option.title}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                    {option.emoji}
                  </div>
                  <ChevronRight className="w-5 h-5 text-[hsl(var(--pastel-lavender-dark))] opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

