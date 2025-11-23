export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-700/30 relative z-10" style={{ borderTopWidth: '1px' }} data-footer="true">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <img src="/features/logo-white.svg" alt="Credit Now" className="h-12 w-auto mb-4" />
          </div>

          {/* Business Loans */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/90 mb-4">Business Loans</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="/loans/working-capital" className="hover:text-white transition-colors">
                  Working Capital Finance
                </a>
              </li>
              <li>
                <a href="/loans/asset-finance" className="hover:text-white transition-colors">
                  Asset Finance
                </a>
              </li>
              <li>
                <a href="/loans/invoice-finance" className="hover:text-white transition-colors">
                  Invoice Financing
                </a>
              </li>
              <li>
                <a href="/loans/invoice-discounting" className="hover:text-white transition-colors">
                  Invoice Discounting
                </a>
              </li>
              <li>
                <a href="/loans/invoice-factoring" className="hover:text-white transition-colors">
                  Invoice Factoring
                </a>
              </li>
              <li>
                <a href="/loans/merchant-cash-advance" className="hover:text-white transition-colors">
                  Merchant Cash Advance
                </a>
              </li>
              <li>
                <a href="/loans/revolving-credit" className="hover:text-white transition-colors">
                  Revolving Credit Lines
                </a>
              </li>
              <li>
                <a href="/loans/small-business-loans" className="hover:text-white transition-colors">
                  Small Business Loans
                </a>
              </li>
              <li>
                <a href="/loans/growth-acquisition" className="hover:text-white transition-colors">
                  Growth & Acquisition Loans
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/90 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/90 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/guides" className="hover:text-white transition-colors">
                  How to guides
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/legal" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/90 mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a href="tel:+17185551234" className="hover:text-white transition-colors">
                  (718) 555-1234
                </a>
              </li>
              <li>
                <a href="mailto:hello@creditnow.com" className="hover:text-white transition-colors">
                  hello@creditnow.com
                </a>
              </li>
              <li className="pt-2 text-white/60 text-xs leading-relaxed">
                1 Dock 72 Wy<br />
                Brooklyn, NY 11249<br />
                United States
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 pb-2">
            <span>© {currentYear} Credit Now. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


