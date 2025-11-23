export type LoanLink = {
  href: string;
  label: string;
  subtitle: string;
  icon: 'building2' | 'wrench' | 'file-text' | 'receipt' | 'file-bar-chart' | 'trending-up' | 'credit-card' | 'rotate-cw' | 'briefcase';
};

export const loanLinks: LoanLink[] = [
  {
    href: '/loans/working-capital',
    label: 'Working Capital Finance',
    subtitle: 'Cover everyday costs and cash flow gaps',
    icon: 'building2',
  },
  {
    href: '/loans/asset-finance',
    label: 'Asset Finance',
    subtitle: 'Fund vehicles, machinery and equipment',
    icon: 'wrench',
  },
  {
    href: '/loans/invoice-finance',
    label: 'Invoice Financing',
    subtitle: 'Release money tied up in unpaid invoices',
    icon: 'file-text',
  },
  {
    href: '/loans/invoice-discounting',
    label: 'Invoice Discounting',
    subtitle: 'Unlock cash from invoices while keeping customer control',
    icon: 'receipt',
  },
  {
    href: '/loans/invoice-factoring',
    label: 'Invoice Factoring',
    subtitle: 'Release funds from invoices with lender managing collections',
    icon: 'file-bar-chart',
  },
  {
    href: '/loans/growth-acquisition',
    label: 'Growth & Acquisition Loans',
    subtitle: 'Finance expansion and business acquisitions',
    icon: 'trending-up',
  },
  {
    href: '/loans/merchant-cash-advance',
    label: 'Merchant Cash Advance',
    subtitle: 'Flexible funding based on card sales',
    icon: 'credit-card',
  },
  {
    href: '/loans/revolving-credit',
    label: 'Revolving Credit Lines',
    subtitle: 'Draw down funds when needed, repay and re-borrow',
    icon: 'rotate-cw',
  },
  {
    href: '/loans/small-business-loans',
    label: 'Small Business Loans',
    subtitle: 'Flexible funding for SMEs to grow and manage cash flow',
    icon: 'briefcase',
  },
];
