import { useState, useEffect, useRef } from "react";

interface Testimonial {
  name: string;
  handle: string;
  quote: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anna Podolskaya",
    handle: "@annapodolskaya",
    quote: "Credit Now made funding painless. We applied in minutes and had an offer the same day.",
    avatarColor: "bg-yellow-400",
  },
  {
    name: "Connie Flinn",
    handle: "@connieflinn",
    quote: "Best support I've had from a lender. Credit Now answered every question and kept terms simple.",
    avatarColor: "bg-blue-400",
  },
  {
    name: "Brian Distelberger",
    handle: "@briandistel",
    quote: "Shoutout to @creditnow for being responsive and transparent. Rates were fair and fast.",
    avatarColor: "bg-green-400",
  },
  {
    name: "Dan Fleischmann",
    handle: "@danfleich",
    quote: "We compared multiple lenders—Credit Now surfaced the best offer and handled the process end-to-end.",
    avatarColor: "bg-purple-400",
  },
  {
    name: "Burke Reimann",
    handle: "@burkereimann",
    quote: "Credit Now delivered exactly what our SME needed—flexible terms and clear repayments.",
    avatarColor: "bg-pink-400",
  },
  {
    name: "Andrew Young",
    handle: "@andruyeung",
    quote: "When we launched in 2024, Credit Now was the only team that took time to understand our cash cycle.",
    avatarColor: "bg-yellow-400",
  },
  {
    name: "Andy Cloyd",
    handle: "@andycloyd",
    quote: "Credit Now's portal is clean and the personal touch is unmatched—no back-and-forth or hidden fees.",
    avatarColor: "bg-indigo-400",
  },
  {
    name: "Ankit Agarwal",
    handle: "@ankitagarwal",
    quote: "We chose Credit Now for the service. Lending is about relationships and they get that.",
    avatarColor: "bg-teal-400",
  },
  {
    name: "David DellaPelle",
    handle: "@daviddellapelle",
    quote: "Credit Now let us consolidate financing across locations and keep working capital predictable.",
    avatarColor: "bg-orange-400",
  },
  {
    name: "C.C. Gong",
    handle: "@ccgong",
    quote: "Application to approval in under 48 hours. Credit Now kept us informed every step of the way.",
    avatarColor: "bg-cyan-400",
  },
];

export default function TestimonialsMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const [topDirection, setTopDirection] = useState<"left" | "right">("left");
  const [bottomDirection, setBottomDirection] = useState<"left" | "right">("right");
  const topPositionRef = useRef(0);
  const bottomPositionRef = useRef(-50); // Start at -50% so right 5 cards are visible
  const animationFrameRef = useRef<number>();

  // Duplicate testimonials to create seamless loop (10 original + 10 duplicate = 20 total)
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const animate = () => {
      if (isHovered) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Top row: moves left initially (starts at 0, moves negative)
      if (topRowRef.current) {
        if (topDirection === "left") {
          topPositionRef.current -= 0.01;
          // When we've scrolled 50% (all 10 cards), reverse direction
          if (topPositionRef.current <= -50) {
            setTopDirection("right");
          }
        } else {
          topPositionRef.current += 0.01;
          // When back to start, reverse again
          if (topPositionRef.current >= 0) {
            setTopDirection("left");
          }
        }
        topRowRef.current.style.transform = `translateX(${topPositionRef.current}%)`;
      }

      // Bottom row: moves right initially (starts at -50%, moves positive)
      if (bottomRowRef.current) {
        if (bottomDirection === "right") {
          bottomPositionRef.current += 0.01;
          // When we've scrolled back to 0 (all cards seen), reverse direction
          if (bottomPositionRef.current >= 0) {
            setBottomDirection("left");
          }
        } else {
          bottomPositionRef.current -= 0.01;
          // When back to -50%, reverse again
          if (bottomPositionRef.current <= -50) {
            setBottomDirection("right");
          }
        }
        bottomRowRef.current.style.transform = `translateX(${bottomPositionRef.current}%)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, topDirection, bottomDirection]);

  return (
    <div
      className="py-16 overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Row - moves left initially */}
      <div className="mb-6 overflow-hidden">
        <div
          ref={topRowRef}
          className="flex gap-4"
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`top-${index}`}
              className="flex-shrink-0 w-[380px] bg-neutral-50 border border-neutral-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${testimonial.avatarColor} flex items-center justify-center flex-shrink-0 ring-2 ring-white/60 shadow-sm`}>
                  <span className="text-[10px] font-semibold text-white">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-neutral-900">
                    {testimonial.name}
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    {testimonial.handle}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-900">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - moves right initially */}
      <div className="overflow-hidden">
        <div
          ref={bottomRowRef}
          className="flex gap-4"
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`bottom-${index}`}
              className="flex-shrink-0 w-[380px] bg-neutral-50 border border-neutral-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${testimonial.avatarColor} flex items-center justify-center flex-shrink-0 ring-2 ring-white/60 shadow-sm`}>
                  <span className="text-[10px] font-semibold text-white">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-neutral-900">
                    {testimonial.name}
                  </p>
                  <p className="text-[9px] text-neutral-500">
                    {testimonial.handle}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-900">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

