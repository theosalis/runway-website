import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Building2, RotateCw, FileText, TrendingUp, Wrench, CreditCard, Briefcase, Receipt, FileBarChart } from "lucide-react";

const loanLinks = [
  { 
    href: "/loans/working-capital", 
    label: "Working Capital Finance",
    subtitle: "Cover everyday costs and cash flow gaps",
    icon: Building2
  },
  { 
    href: "/loans/asset-finance", 
    label: "Asset Finance",
    subtitle: "Fund vehicles, machinery and equipment",
    icon: Wrench
  },
  { 
    href: "/loans/invoice-finance", 
    label: "Invoice Financing",
    subtitle: "Release money tied up in unpaid invoices",
    icon: FileText
  },
  { 
    href: "/loans/invoice-discounting", 
    label: "Invoice Discounting",
    subtitle: "Unlock cash from invoices while keeping customer control",
    icon: Receipt
  },
  { 
    href: "/loans/invoice-factoring", 
    label: "Invoice Factoring",
    subtitle: "Release funds from invoices with lender managing collections",
    icon: FileBarChart
  },
  { 
    href: "/loans/growth-acquisition", 
    label: "Growth & Acquisition Loans",
    subtitle: "Finance expansion and business acquisitions",
    icon: TrendingUp
  },
  { 
    href: "/loans/merchant-cash-advance", 
    label: "Merchant Cash Advance",
    subtitle: "Flexible funding based on card sales",
    icon: CreditCard
  },
  { 
    href: "/loans/revolving-credit", 
    label: "Revolving Credit Lines",
    subtitle: "Draw down funds when needed, repay and re-borrow",
    icon: RotateCw
  },
  { 
    href: "/loans/small-business-loans", 
    label: "Small Business Loans",
    subtitle: "Flexible funding for SMEs to grow and manage cash flow",
    icon: Briefcase
  },
];

const resourceLinks = [
  {
    href: "/resources/personal-guarantee",
    label: "Personal guarantees",
  },
  {
    href: "/resources/secured-vs-unsecured",
    label: "Secured vs. unsecured loans",
  },
  {
    href: "/resources/compare-business-loans",
    label: "Compare business loans",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }

      if (current <= 20) {
        setIsHidden(false);
      } else if (current < lastScrollY.current) {
        setIsHidden(false);
        hideTimeout.current = setTimeout(() => {
          if (window.scrollY > 20 && !open) {
            setIsHidden(true);
          }
        }, 200);
      } else if (current > lastScrollY.current) {
        setIsHidden(true);
      }

      lastScrollY.current = current;
      setIsScrolled(current > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setIsHidden(false);
    }
  }, [open]);

  const headerClasses = isScrolled
    ? "bg-white/40 border-b border-neutral-200/20"
    : "bg-transparent";
  const primaryText = isScrolled ? "text-neutral-900" : "text-white";
  const secondaryText = isScrolled ? "text-neutral-700" : "text-white/80";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full ${headerClasses} transition-transform duration-500 ease-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-20 md:h-[80px] items-center justify-between px-4 lg:px-10">
        <a
          href="/"
          className="flex items-center"
        >
          <img src="/features/logo-black.svg" alt="Credit Now" className="h-8 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <div className="relative group flex items-center gap-1">
            <a
              href="/business-loans"
              className={`transition-colors ${primaryText} hover:text-neutral-900`}
            >
              Business loans
            </a>
            <ChevronDown className={`h-3.5 w-3.5 transition-colors ${secondaryText}`} />
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full mt-3 w-[420px] rounded-2xl bg-white shadow-xl border border-black/5 p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Loan programs</h3>
              <ul className="grid gap-3">
                {loanLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <a href={link.href} className="flex gap-3 rounded-xl px-3 py-2 hover:bg-neutral-50 transition-colors">
                        <Icon className="mt-1 h-4 w-4 text-neutral-500" />
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">{link.label}</p>
                          <p className="text-xs text-neutral-600">{link.subtitle}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative group flex items-center gap-1">
            <a
              href="/resources"
              className={`transition-colors ${primaryText} hover:text-neutral-900`}
            >
              Resources
            </a>
            <ChevronDown className={`h-3.5 w-3.5 transition-colors ${secondaryText}`} />
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 top-full mt-3 w-72 rounded-2xl bg-white shadow-xl border border-black/5 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Insights</h3>
              <ul className="space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="/page-b"
            className={`transition-colors ${primaryText} hover:text-neutral-900`}
          >
            Page B
          </a>

        </nav>

        <a
          href="/apply"
          className="hidden md:inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-2 font-semibold hover:bg-black/90 transition whitespace-nowrap"
        >
          Apply now
        </a>

        <button
          className={`md:hidden rounded-full p-2 transition-colors ${
            isScrolled
              ? "border border-neutral-300 bg-white text-neutral-900"
              : "border border-white/30 bg-white/10 text-white"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="px-4 py-4 space-y-3 text-sm font-medium text-neutral-900">
            <details className="group">
              <summary className="list-none flex items-center justify-between py-2 cursor-pointer">
                Business loans
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mt-2 border-l border-neutral-200 pl-4 space-y-3 text-neutral-700">
                {loanLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-start gap-3 py-1.5 hover:text-black"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold">{link.label}</p>
                          <p className="text-xs text-neutral-500">{link.subtitle}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>

            <details className="group">
              <summary className="list-none flex items-center justify-between py-2 cursor-pointer">
                Resources
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="mt-2 border-l border-neutral-200 pl-4 space-y-3 text-neutral-700">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block py-1.5 hover:text-black"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <a
              href="/page-b"
              className="block py-2 hover:text-black"
              onClick={() => setOpen(false)}
            >
              Page B
            </a>

            <a
              href="/apply"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black px-8 py-2 text-white font-semibold hover:bg-black/90 transition"
              onClick={() => setOpen(false)}
            >
              Apply now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

