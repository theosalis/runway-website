import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Locale = {
  code: string;
  label: string;
  flag: string; // emoji for now
};

const locales: Locale[] = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "IT", label: "Italia", flag: "🇮🇹" },
  { code: "DE", label: "Deutschland", flag: "🇩🇪" },
  { code: "ES", label: "España", flag: "🇪🇸" },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>(locales[0]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function onSelect(locale: Locale) {
    setCurrent({ code: locale.code, label: locale.label, flag: locale.flag });
    setOpen(false);
    // TODO: wire locale routing if needed
  }

  return (
    <div 
      ref={ref} 
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-neutral-800 hover:text-black focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-base">{current.flag}</span>
        <span className="font-medium">EN</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 mt-1 w-[320px] rounded-lg bg-white p-3 shadow-md"
        >
          <h3 className="mb-1 text-lg font-heading font-semibold text-black">
            Select your country
          </h3>
          <p className="mb-3 text-xs text-neutral-700">
            We currently support United States, Italy, Germany, and Spain.
          </p>

          <ul className="space-y-1.5">
            {locales.map((loc) => (
              <li key={loc.code}>
                <button
                  onClick={() => onSelect(loc)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-neutral-900 hover:bg-neutral-50"
                >
                  <span className="text-base">{loc.flag}</span>
                  <span>{loc.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


