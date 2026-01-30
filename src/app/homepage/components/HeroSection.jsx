'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { staggerContainer, fadeInUp } from '@/utils/AnimationVariants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

import ArrowButton from '@/components/ui/arrowbutton';

const GoogleIcon = () => (
  <span
    className="tracking-tight"
    style={{ fontFamily: "'Product Sans', sans-serif", fontWeight: 'normal' }}
  >
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

// Slide Data
const HERO_SLIDES = [
  {
    id: 1,
    desktopImage: '/assets/images/banner/desktop_banner-1.png',
    tabletImage: '/assets/images/banner/tablet_banner-1.png',
    mobileImage: '/assets/images/banner/mobile_banner-1.png',
    alt: 'Dr. Pradeep Singh treating a patient with care',
  },
  {
    id: 2,
    desktopImage: '/assets/images/banner/desktop_banner-2.png',
    tabletImage: '/assets/images/banner/tablet_banner-2.png',
    mobileImage: '/assets/images/banner/mobile_banner-2.png',
    alt: 'Before and after cosmetic dentistry results',
  },
  {
    id: 3,
    desktopImage: '/assets/images/banner/desktop_banner-1.png',
    tabletImage: '/assets/images/banner/tablet_banner-1.png',
    mobileImage: '/assets/images/banner/mobile_banner-1.png',
    alt: 'Emergency dental care setup',
  },
];

const ReviewCard = () => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'top 10%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Softened animation for a more subtle look
      tl.to([cardRef.current, glowRef.current], {
        boxShadow: (index) =>
          index === 0
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -15px rgba(0, 0, 0, 0.1)'
            : 'none',
        backgroundColor: (index) => (index === 0 ? '#ffffff' : 'transparent'),
        opacity: (index) => (index === 1 ? 0.3 : 1),
        scale: (index) => (index === 0 ? 1.01 : 1),
        duration: 0.25,
      })
        .to([cardRef.current, glowRef.current], {
          duration: 0.5, // Sustained state
        })
        .to([cardRef.current, glowRef.current], {
          boxShadow: (index) => (index === 0 ? '0 0px 0px 0 rgba(0, 0, 0, 0)' : 'none'),
          backgroundColor: (index) => (index === 0 ? '#ffffff' : 'transparent'),
          opacity: (index) => (index === 1 ? 0 : 1),
          scale: (index) => (index === 0 ? 1 : 1),
          duration: 0.25,
        });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="relative"
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Dynamic Glow Background */}
      <div
        ref={glowRef}
        className="absolute inset-x-8 inset-y-4 bg-slate-400/20 blur-[80px] rounded-full opacity-0 -z-10 pointer-events-none"
      />

      <div
        ref={cardRef}
        className="bg-white rounded-xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border border-slate-100 mb-8 mx-auto relative z-[10000] isolate"
      >
        {/* Left side: Rating */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] md:text-[12px] text-slate-600">Rated 4.8/5</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="StarIcon"
                  size={16}
                  variant="solid"
                  className="text-amber-400"
                />
              ))}
            </div>
          </div>
          <div className="text-[18px] md:text-[20px] text-slate-600 flex items-center gap-1.5 font-semibold whitespace-nowrap">
            <GoogleIcon /> Verified
          </div>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-px h-8 bg-slate-200/60" />
        <div className="block md:hidden w-16 h-px bg-slate-200/60" />

        {/* Right side: Tagline */}
        <div className="text-center md:text-right">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] font-serif italic tracking-wide whitespace-nowrap">
            &quot;Spreading smile for more than 20 years&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSection({ stats }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSwipe, setIsSwipe] = useState(false);

  const slides = HERO_SLIDES;

  // Auto-rotate slides
  const AUTO_SLIDE_DELAY = 6000;
  const slideTimeoutRef = useRef(null);
  const resetAutoSlide = useCallback(() => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
    }
    slideTimeoutRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_DELAY);
  }, [slides.length]);
  useEffect(() => {
    resetAutoSlide();
    if (isSwipe) {
      const timer = setTimeout(() => setIsSwipe(false), 1000); // Reset after 1 second
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, isSwipe, resetAutoSlide]);

  const currentSlide = slides[currentSlideIndex];
  return (
    <section className="relative group">
      <div className="relative w-full overflow-hidden z-10 isolate">
        {/* Navigation Buttons - Positioned absolute on the image */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block rotate-180">
          <ArrowButton
            onClick={() => {
              resetAutoSlide();
              setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            }}
            ariaLabel="Previous Slide"
          />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <ArrowButton
            onClick={() => {
              resetAutoSlide();
              setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            }}
            ariaLabel="Next Slide"
          />
        </div>

        {/* SLIDING IMAGE CONTAINER */}
        <div className="relative w-full bg-white">
          <AnimatePresence mode="wait" custom={isSwipe}>
            <motion.div
              key={currentSlide.id}
              custom={isSwipe}
              variants={{
                initial: { opacity: 0 },
                animate: (isSwipe) => ({
                  opacity: 1,
                  transition: { duration: isSwipe ? 0 : 0.5 },
                }),
                exit: (isSwipe) => ({
                  opacity: 0,
                  transition: { duration: isSwipe ? 0 : 0.5 },
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeConfidenceThreshold = 10000;
                const swipePower = Math.abs(offset.x) * velocity.x;

                if (swipePower < -swipeConfidenceThreshold) {
                  // Swipe Left -> Next Slide
                  setIsSwipe(true);
                  resetAutoSlide();
                  setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                } else if (swipePower > swipeConfidenceThreshold) {
                  // Swipe Right -> Previous Slide
                  setIsSwipe(true);
                  resetAutoSlide();
                  setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
                }
              }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Link href="/book-appointment" className="block w-full h-full cursor-pointer">
                {/* Mobile Image (Taller) */}
                <div className="block md:hidden w-full aspect-[1080/1710] relative">
                  <AppImage
                    src={currentSlide.mobileImage}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tablet Image (Slightly Taller) */}
                <div className="hidden md:block lg:hidden w-full aspect-[768/768] relative">
                  <AppImage
                    src={currentSlide.tabletImage}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Desktop Image (Ultra-wide) */}
                <div className="hidden lg:block w-full aspect-[2560/1050] relative">
                  <AppImage
                    src={currentSlide.desktopImage}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timer Dots */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2 z-30 pointer-events-auto bg-black/20 backdrop-blur-[2px] p-2 rounded-full shadow-lg ${isSwipe ? 'flex' : 'hidden'} md:flex`}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.preventDefault(); // Prevent link click if needed
                e.stopPropagation();
                resetAutoSlide();
                setCurrentSlideIndex(idx);
              }}
              className={`relative h-1.5 md:h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-sm ${idx === currentSlideIndex
                ? 'w-8 md:w-12 bg-white/70'
                : 'w-1.5 md:w-2 bg-white/30 hover:bg-white'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === currentSlideIndex && (
                <motion.div
                  className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  layoutId="activeSlideTimer"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-blue-50 border-t border-slate-100 py-2 relative z-10 overflow-hidden isolate">
        <div className="w-full lg:max-w-none mx-auto px-4 md:px-6 lg:px-12">
          {/* Mobile Infinite Horizontal Marquee (< lg) */}
          <div className="lg:hidden relative flex items-center overflow-hidden h-12 mask-linear">
            <motion.div
              className="flex items-center gap-8 whitespace-nowrap pr-8"
              animate={{ x: '-50%' }}
              transition={{
                duration: 20,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              {[...Array(2)].flatMap((_, i) =>
                [
                  {
                    icon: 'UserIcon',
                    value: `${stats?.patients}+`,
                    label: 'Patients',
                    sub: 'Care',
                  },
                  {
                    icon: 'AcademicCapIcon',
                    value: `${stats?.experience}+`,
                    label: 'Years',
                    sub: 'Experience',
                  },
                  {
                    icon: 'CalendarIcon',
                    value: '7 Days',
                    label: 'Open',
                    sub: 'Mon-Sun',
                  },
                  {
                    logo: '/assets/images/implant-logo.png',
                    value: `${stats?.implants}+`,
                    label: 'Implants',
                    sub: 'Successful',
                  },
                  {
                    logo: '/assets/images/crown-logo.png',
                    value: `${stats?.crowns}+`,
                    label: 'Crowns',
                    sub: 'Precision',
                  },
                  {
                    icon: 'ChatBubbleBottomCenterTextIcon',
                    value: `${stats?.reviews}+`,
                    label: 'Stars',
                    sub: 'Reviews',
                  },
                ].map((item, index) => (
                  <div key={`${i}-${index}`} className="flex items-center gap-2 rounded-md">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {item.logo ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.logo}
                            alt={item.label}
                            fill
                            className="object-contain"
                            sizes="32px"
                          />
                        </div>
                      ) : (
                        <Icon
                          name={item.icon}
                          size={20}
                          variant="solid"
                          className="text-blue-600"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1 leading-tight">
                        <span className="text-sm font-bold text-blue-700">{item.value}</span>
                        <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 font-medium leading-tight">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </div>

          {/* Desktop Horizontal Layout (>= lg) */}
          <motion.div
            className="hidden lg:flex items-center justify-between gap-4"
            variants={staggerContainer(0.1, 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: 'UserIcon',
                value: `${stats?.patients}+`,
                label: 'Patients',
                sub: 'Care',
              },
              {
                icon: 'AcademicCapIcon',
                value: `${stats?.experience}+`,
                label: 'Years',
                sub: 'Experience',
              },
              {
                icon: 'CalendarIcon',
                value: '7 Days',
                label: 'Open',
                sub: 'Mon-Sun',
              },
              {
                logo: '/assets/images/implant-logo.png',
                value: `${stats?.implants}+`,
                label: 'Implants',
                sub: 'Successful',
              },
              {
                logo: '/assets/images/crown-logo.png',
                value: `${stats?.crowns}+`,
                label: 'Crowns',
                sub: 'Precision',
              },
              {
                icon: 'ChatBubbleBottomCenterTextIcon',
                value: `${stats?.reviews}+`,
                label: 'Reviews',
                sub: 'Patients',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-2 group"
              >
                <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  {item.logo ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.logo}
                        alt={item.label}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <Icon
                      name={item.icon}
                      size={24}
                      variant="solid"
                      className="text-blue-600 transition-colors duration-300 px-0.5"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-baseline gap-1 leading-tight">
                    <span className="text-base font-bold text-blue-700">{item.value}</span>
                    <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                  </div>
                  <p className="text-[13px] text-slate-500 font-medium leading-tight">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-full bg-transparent pt-1 pb-4 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <ReviewCard />
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  stats: PropTypes.shape({
    experience: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    patients: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    reviews: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    implants: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    crowns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};
