import { useEffect, useRef, useState } from 'react';

interface Step {
  number: string;
  title: string;
  subheading: string;
  cardBg: string;
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Apply in minutes',
    subheading: "Tell us about your business and how much you're looking to borrow.",
    cardBg: '#E4DACD',
  },
  {
    number: '2',
    title: 'Review your offers',
    subheading: 'Compare multiple offers side-by-side and pick the one that fits your cash flow.',
    cardBg: '#BED2CC',
  },
  {
    number: '3',
    title: 'Receive funds',
    subheading: 'Sign your agreement securely and get funds deposited as soon as the next business day.',
    cardBg: '#CBCADB',
  },
];

export default function FundYourDreamSteps() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 scroll progress inside wrapper
  const [isSubheadingVisible, setIsSubheadingVisible] = useState(false);
  const [shouldShowDarkTheme, setShouldShowDarkTheme] = useState(false);
  const [isCapitalNowVisible, setIsCapitalNowVisible] = useState(false);

  // Observer to detect when subheading is visible
  useEffect(() => {
    const subheading = subheadingRef.current;
    if (!subheading) return;

    const handleVisibilityChange = (isVisible: boolean) => {
      // Update React state
      setIsSubheadingVisible(isVisible);
      // Update data attribute on document for synchronous access
      document.documentElement.setAttribute('data-subheading-visible', isVisible.toString());
      // Dispatch custom event for index.astro to listen to (synchronous)
      window.dispatchEvent(new CustomEvent('subheading-visible', { detail: isVisible }));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          handleVisibilityChange(entry.isIntersecting);
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of subheading is visible
        rootMargin: '0px',
      }
    );

    observer.observe(subheading);

    // Also listen to the event to ensure React updates immediately
    const eventHandler = ((event: CustomEvent) => {
      setIsSubheadingVisible(event.detail);
    }) as EventListener;
    
    window.addEventListener('subheading-visible', eventHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener('subheading-visible', eventHandler);
    };
  }, []);

  // Listen for capital-now-visible event
  useEffect(() => {
    const eventHandler = ((event: CustomEvent) => {
      setIsCapitalNowVisible(event.detail);
    }) as EventListener;
    
    window.addEventListener('capital-now-visible', eventHandler);

    return () => {
      window.removeEventListener('capital-now-visible', eventHandler);
    };
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrameId: number | null = null;

    const smoothUpdate = () => {
      // Smooth interpolation towards target progress
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        // Use ease-out interpolation for smooth deceleration
        currentProgress += diff * 0.2; // Adjust this value (0.1-0.3) for more/less smoothing
        setProgress(currentProgress);
        animationFrameId = requestAnimationFrame(smoothUpdate);
      } else {
        currentProgress = targetProgress;
        setProgress(currentProgress);
        animationFrameId = null;
      }
    };

    const updateProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        ticking = false;
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      
      // Calculate available scroll space
      const totalScrollableHeight = rect.height - viewportHeight;
      if (totalScrollableHeight <= 0) {
        targetProgress = 0;
        ticking = false;
        return;
      }

      // Add a delay before horizontal scroll starts (stick the first card for a bit)
      // This is 30% of viewport height - user needs to scroll this much before animation begins
      const scrollStartOffset = viewportHeight * 0.3;
      
      // Dark theme appears after 10% of viewport height has been scrolled
      const darkThemeOffset = viewportHeight * 0.1;

      // Complete the animation at 75% of scrollable height
      // This ensures animation finishes near the end of the wrapper, minimizing dead scroll space
      const maxScroll = totalScrollableHeight * 0.75;

      // Start calculating when wrapper top reaches viewport top
      const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
      
      // Show dark theme after some scrolling
      setShouldShowDarkTheme(scrolled >= darkThemeOffset);
      
      // Only start progress after scrollStartOffset has been scrolled
      const adjustedScroll = Math.max(0, scrolled - scrollStartOffset);
      const adjustedMaxScroll = maxScroll - scrollStartOffset;
      targetProgress = adjustedMaxScroll > 0 ? Math.min(adjustedScroll / adjustedMaxScroll, 1) : 0; // clamp 0–1

      // Start smooth animation if not already running
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(smoothUpdate);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    handleScroll(); // initialize
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const maxTranslate = (steps.length - 1) * 100; // we move from 0 to -200%
  const translateX = -progress * maxTranslate;
  const isScrolling = isSubheadingVisible;
  const hasScrollStarted = progress > 0;

  // Override dark theme when capital-now section is visible
  const effectiveDarkTheme = shouldShowDarkTheme && !isCapitalNowVisible;

  return (
    <section 
      ref={sectionRef}
      className="w-full relative transition-colors duration-500"
      style={{
        backgroundColor: effectiveDarkTheme ? '#000000' : undefined
      }}
    >
      {/* Background Image - same as hero */}
      {!effectiveDarkTheme && (
        <>
          <div className="absolute inset-0">
            <img src="/features/Latestsky.png" alt="" className="w-full h-full object-cover" />
          </div>
          {/* Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.03) 80%, rgba(0,0,0,0) 100%), repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.1) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.1) 80px)",
              backgroundSize: '100% 100%, 80px 80px, 80px 80px'
            }}
          ></div>
        </>
      )}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-16">
        <div className="w-full">
          {/* Scroll area that drives the horizontal movement */}
          <div
            ref={wrapperRef}
            className="relative h-[200vh]" // reduced height so animation completes with minimal dead scroll space
          >
            {/* Sticky container that holds both heading and scroll area */}
             <div className="sticky top-12 md:top-16 py-16 md:py-24">
              {/* Heading Section - always visible */}
                <div className="text-center mb-8 md:mb-12 space-y-4">
                <p className={`text-[11px] md:text-xs font-semibold tracking-[0.4em] uppercase transition-colors duration-500 ${shouldShowDarkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  HOW IT WORKS
                </p>
                <h2 className={`text-4xl md:text-5xl lg:text-[48px] font-opensauce font-semibold leading-tight transition-colors duration-500 ${shouldShowDarkTheme ? 'text-white' : 'text-neutral-900'}`}>
                  From application to funds
                </h2>
                <p
                  ref={subheadingRef}
                  className={`text-4xl md:text-5xl lg:text-[48px] font-opensauce font-semibold leading-tight transition-colors duration-500 ${shouldShowDarkTheme ? 'text-neutral-300' : 'text-neutral-500'}`}
                >
                  in just a few clicks
                </p>
              </div>

              {/* Sticky scroll viewport */}
              <div className="h-[360px] md:h-[420px] flex items-center">
              <div className="w-full overflow-visible">
                <div
                  className="flex will-change-transform"
                  style={{ transform: `translate3d(${translateX}%, 0, 0)` }}
                >
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
                    >
                      {/* Card Column */}
                      <div className="w-full lg:w-[42%]">
                        <div
                          className={`relative rounded-2xl overflow-hidden h-[300px] md:h-[360px] ${index === 0 && !shouldShowDarkTheme ? 'border border-[#DAE0EB]' : ''}`}
                        >
                          {index === 0 && (
                            <div className="relative h-full w-full">
                              {/* Full-size image */}
                              <img
                                src="/features/About5.jpg"
                                alt="Business application"
                                className="w-full h-full object-cover object-[center_10%] rounded-2xl"
                              />
                              
                              {/* Application preview tag - appears after some scrolling */}
                              <div className={`absolute top-6 left-6 z-10 transition-all duration-500 ease-out ${shouldShowDarkTheme ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                <div className="rounded-xl bg-neutral-900/60 border border-neutral-800/40 shadow-2xl p-4 max-w-[280px] will-change-transform">
                                  <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800/50 flex items-center justify-center border border-neutral-700/30">
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-white">Application preview</p>
                                  </div>
                                  <p className="text-xs text-neutral-300 leading-relaxed">
                                    Business loan application form
                                  </p>
                                </div>
                              </div>

                              {/* Glass morphism application form card - appears after some scrolling */}
                              <div className={`absolute bottom-6 left-6 z-10 max-w-[400px] transition-all duration-500 ease-out ${shouldShowDarkTheme ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                <div className="rounded-xl bg-neutral-900/60 border border-neutral-800/40 shadow-2xl p-3 will-change-transform">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-[10px] text-neutral-400 mb-0.5">Business name</p>
                                      <p className="text-sm font-semibold text-white">Riverstone Coffee Co.</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-neutral-400 mb-0.5">Amount requested</p>
                                      <p className="text-sm font-bold text-white">$50,000</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-neutral-400 mb-0.5">Years in business</p>
                                      <p className="text-sm font-bold text-white">4 years</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-neutral-400 mb-0.5">Monthly revenue</p>
                                      <p className="text-sm font-bold text-white">$82,000</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {index === 2 && (
                            <div className="relative h-full w-full">
                              {/* Full-size image */}
                              <img
                                src="/features/sign.jpg"
                                alt="Contract signature"
                                className="w-full h-full object-cover"
                              />
                              {/* Dark overlay filter */}
                              <div className="absolute inset-0 bg-black/20"></div>

                              {/* Fake electronic signature notification overlay */}
                              <div className="absolute top-6 left-6 z-10">
                                <div className="rounded-xl bg-neutral-900/60 border border-neutral-800/40 shadow-2xl p-4 max-w-[280px]">
                                  <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-neutral-800/50 flex items-center justify-center border border-neutral-700/30">
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-white">Signature requested</p>
                                  </div>
                                  <p className="text-xs text-neutral-300 leading-relaxed">
                                    Please sign the agreement to receive your funds
                                  </p>
                                </div>
                              </div>

                              {/* Glass morphism details card */}
                              <div className="absolute bottom-6 left-4 right-4 z-10">
                                <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/40 shadow-2xl p-5 sm:p-6">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-xs text-neutral-400 mb-1.5 uppercase tracking-wide">Approved amount</p>
                                      <p className="text-3xl font-bold text-white">$50,000</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full border border-white/30">
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="text-xs font-semibold">
                                        Funds deposited
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {index === 1 && (
                            <div
                              className="relative rounded-2xl p-4 sm:p-5 lg:p-6 h-full"
                              style={{ backgroundColor: step.cardBg }}
                            >
                              <div className="rounded-xl bg-white/95 overflow-hidden h-full flex flex-col">
                                <div className="p-4 sm:p-5 h-full flex flex-col">
                                  <h3 className="text-base sm:text-lg font-semibold font-opensauce text-neutral-900 mb-2">
                                    Compare offers
                                  </h3>
                                  <div className="space-y-2">
                                    <div className={`p-2.5 rounded-xl border bg-neutral-50 ${index === 1 ? 'offer-card' : 'border-neutral-200'}`}>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xl font-bold text-neutral-900">$45,000</span>
                                        <span className="text-xs sm:text-sm font-medium text-neutral-600">
                                          12.5% APR
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500">Lower payments</p>
                                    </div>
                                    <div className={`p-2.5 rounded-xl border bg-neutral-50 relative ${index === 1 ? 'offer-card-highlight' : 'border-neutral-200'}`}>
                                      <span className={`absolute -top-2 left-4 text-[11px] font-semibold px-2 py-0.5 rounded ${index === 1 ? 'offer-tag' : 'bg-neutral-900 text-white'}`}>
                                        Recommended
                                      </span>
                                      <div className="flex items-center justify-between mb-1 mt-2">
                                        <span className="text-xl font-bold text-neutral-900">$50,000</span>
                                        <span className="text-xs sm:text-sm font-medium text-neutral-600">
                                          13.9% APR
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500">Balanced option</p>
                                    </div>
                                    <div className={`p-2.5 rounded-xl border bg-neutral-50 ${index === 1 ? 'offer-card' : 'border-neutral-200'}`}>
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xl font-bold text-neutral-900">$60,000</span>
                                        <span className="text-xs sm:text-sm font-medium text-neutral-600">
                                          15.2% APR
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-neutral-500">More capital</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text Column */}
                      <div className="w-full lg:w-[58%] lg:flex lg:flex-col lg:justify-center lg:pr-10">
                        <div className="space-y-3 md:space-y-4">
                          <p className={`text-[11px] md:text-xs font-semibold tracking-[0.35em] uppercase transition-colors duration-500 ${shouldShowDarkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            Step {step.number}
                          </p>
                          <h3 className={`text-[28px] md:text-[34px] font-opensauce font-medium leading-snug transition-colors duration-500 ${shouldShowDarkTheme ? 'text-white' : 'text-neutral-900'}`}>
                            {step.title}
                          </h3>
                          <p className={`text-base md:text-lg font-opensauce leading-relaxed max-w-md transition-colors duration-500 ${shouldShowDarkTheme ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {step.subheading}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
