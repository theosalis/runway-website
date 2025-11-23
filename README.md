# Runway — SME Lending Platform

A modern, production-ready SME lending website built with Astro, Tailwind CSS, and shadcn/ui.

## Features

✨ **Minimal Design** — Clean, spacious aesthetic inspired by Mercury, N26, Qred, and Younited  
⚡ **Fast & Modern** — Built with Astro for optimal performance  
🎨 **shadcn/ui Components** — Accessible React components with minimal styling  
📱 **Fully Responsive** — Mobile-first design that works on all devices  
♿ **Accessible** — WCAG compliant with keyboard navigation  
🔒 **GDPR Compliant** — Privacy-first with transparent data handling  

## Tech Stack

- **[Astro](https://astro.build)** — Modern static site generator
- **[React](https://react.dev)** — For interactive islands
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** — Re-usable component library
- **TypeScript** — Type-safe development

## Pages

- `/` — Home page with hero, loan slider, services preview, repayment estimator, FAQ
- `/about` — Company mission, values, timeline, and team
- `/services` — Detailed breakdown of all financing options
- `/apply` — Multi-step application form with validation
- `/faq` — Comprehensive frequently asked questions
- `/contact` — Contact form and company information
- `/privacy` — GDPR-compliant privacy policy
- `/legal` — Terms and conditions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoanSlider.tsx
│   │   ├── RepaymentEstimator.tsx
│   │   ├── FAQAccordion.tsx
│   │   └── ApplyForm.tsx
│   ├── layouts/        # Astro layouts
│   │   └── BaseLayout.astro
│   ├── lib/            # Utilities
│   │   └── utils.ts
│   ├── pages/          # Astro pages (routes)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── apply.astro
│   │   ├── faq.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── legal.astro
│   └── styles/
│       └── globals.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Key Components

### LoanSlider
Interactive loan amount selector with localStorage persistence and redirect to apply page.

### RepaymentEstimator
Live repayment calculator using annuity formula with adjustable amount, term, and APR.

### ApplyForm
Multi-step form with:
- Company information
- Financial details
- Contact information
- Review and submit
- Success modal

### FAQAccordion
Accessible accordion component with 10 common questions.

## Design System

### Colors
- **Foreground**: Black (#171717) - primary text and buttons
- **Background**: White (#FFFFFF)
- **Muted**: Light Grey (#F5F5F5) - subtle backgrounds
- **Accent**: Very Light Grey (#F9FAFB) - section backgrounds
- **Success**: Green (#10B981) - success states

### Typography
- **Headings**: Space Grotesk, semibold, tight tracking
- **Body**: Inter with antialiasing

### Design Principles
- **Maximum whitespace** - generous padding and spacing
- **Minimal borders** - clean cards without visible borders
- **Subtle shadows** - no heavy drop shadows
- **Large typography** - bold, impactful headlines
- **Greyscale-first** - minimal use of color
- **Breathing room** - fewer elements per section

### Components
All interactive components use shadcn/ui for consistency and accessibility, styled with minimal aesthetic.

## Customization

### Update Brand Colors
Edit `tailwind.config.mjs` and `src/styles/globals.css` to adjust the color scheme.

### Modify Content
All page content is in `src/pages/` — edit the Astro files to update text, sections, or layout.

### Add New Components
Add React components to `src/components/` and import them with `client:load` directive for interactivity.

## Performance

- ✅ Static generation for optimal load times
- ✅ Minimal JavaScript — only where needed
- ✅ Optimized images and assets
- ✅ Tree-shaking and code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For questions or support, contact:
- Email: hello@runway.finance
- Website: runway.finance

---

Built with ❤️ by Theo, Luis, and Bernardo

