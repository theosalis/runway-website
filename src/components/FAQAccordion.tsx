import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are the eligibility requirements?",
    answer:
      "Your business must have been trading for at least 6 months, have a minimum annual turnover of $50,000, and be registered in an eligible country. We work with sole traders, partnerships, and limited companies across most industries.",
  },
  {
    question: "Will checking my eligibility affect my credit score?",
    answer:
      "No. Our initial eligibility check is a soft credit search that has no impact on your credit score. Only when you proceed to a full application will a hard credit check be performed, with your consent.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Typically, you'll need: business bank statements (last 6 months), proof of identity, business registration documents, and recent financial statements or tax returns. The exact requirements depend on the loan amount and your business structure.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees. We're transparent about all costs upfront. You'll see the total amount repayable, APR, and any applicable arrangement fees before you accept the loan. What you see is what you pay.",
  },
  {
    question: "How quickly can I receive the funds?",
    answer:
      "Most applications are reviewed within hours. Once approved, funds are typically transferred to your business account within 24 hours, sometimes on the same day depending on your bank.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with most industries including retail, hospitality, professional services, manufacturing, construction, technology, and more. Some restricted industries include gambling, adult entertainment, and cryptocurrency trading.",
  },
  {
    question: "How is my data protected?",
    answer:
      "We take security seriously. All data is encrypted in transit and at rest using bank-grade encryption. We're fully compliant with data protection regulations and never share your information with third parties without your explicit consent.",
  },
  {
    question: "What happens after I'm approved?",
    answer:
      "After approval, you'll receive a digital loan agreement to review and sign electronically. Once signed, funds are transferred to your nominated bank account, typically within 24 hours. Your dedicated support contact will guide you through every step.",
  },
  {
    question: "Is Credit Now a direct lender? Is Credit Now a bank?",
    answer:
      "No. Credit Now is the nation's leading small business financing platform. We work with more than 75 lenders and funders to provide small businesses with more options to borrow. However, Credit Now does not make loans directly.",
  },
  {
    question: "Is Credit Now legit?",
    answer:
      "Yes, Credit Now is a legitimate small business financing solutions platform. While Credit Now is not a bank or loan-granting institution, Credit Now partners with more than 75 lenders and funders—all thoroughly vetted—to provide small businesses with more choices all from a single online financing application.",
  },
  {
    question: "Does Credit Now offer grants?",
    answer:
      "Currently, Credit Now does not offer grants. A great place to look for small business grants is the Small Business Administration (SBA). You can learn more about SBA grants or contact the SBA directly.",
  },
  {
    question: "Who is Credit Now?",
    answer:
      "Credit Now is transforming small business lending by connecting small businesses, lenders, and small business service providers through a single integrated technology platform. The Credit Now Marketplace matches business owners with funding from over 75 lenders and financial partners, all through one simple online application. Credit Now's Embedded Marketplace brings this experience seamlessly to small business service providers' ecosystems, allowing them to embed a full loan application and funding solution within their platform. For banks and lenders, Credit Now's purpose-built software integrates within their tech stack to automate small business loan decisioning, underwrite applicants, and connect financial institutions with curated applicants from Credit Now's direct and embedded marketplaces. With a single technology platform, Credit Now is fueling the dreams of small business owners wherever they seek capital.",
  },
];

export default function FAQAccordion() {
  const midpoint = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)];

  return (
    <div className="bg-black p-4 sm:p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {columns.map((column, columnIndex) => (
          <Accordion
            key={columnIndex}
            type="single"
            collapsible
            className="w-full divide-y divide-white/10"
          >
            {column.map((faq, index) => (
              <AccordionItem
                key={`${columnIndex}-${index}`}
                value={`item-${columnIndex}-${index}`}
                className="border-none"
              >
                <AccordionTrigger className="font-opensauce font-light text-base md:text-lg text-white px-0 py-6 text-left no-underline hover:no-underline [&>svg]:text-sky-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-6 text-base text-white/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}

