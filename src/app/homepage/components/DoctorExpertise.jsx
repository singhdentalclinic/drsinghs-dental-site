'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import NextPageButton from '@/components/ui/nextpagebutton';
import { staggerContainer, fadeInUp } from '@/utils/AnimationVariants';

export default function DoctorExpertise({ doctor }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageUrlExpanded, setIsImageUrlExpanded] = useState(false);
  const longPressTimer = useRef(null);

  const handlePointerDown = () => {
    longPressTimer.current = setTimeout(() => {
      setIsImageUrlExpanded(true);
    }, 500); // 500ms for long press
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="flex justify-center mb-10"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-[#E6F4FE] text-[#009EE2] rounded-full border border-blue-50">
            <Icon name="UserIcon" size={20} variant="solid" className="text-[#009EE2]" />
            <span className="font-body text-sm md:text-base font-semibold">Meet Your Dentist</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative z-10">
          <motion.div
            className="space-y-4 md:space-y-6"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Mobile Header: Side-by-side profile on mobile, hidden on desktop */}
            <div className="flex items-center gap-4 mb-2 md:hidden">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/10 shadow-elevation-md touch-none active:scale-95 transition-transform cursor-zoom-in">
                  <AppImage
                    src={doctor?.image}
                    alt={doctor?.alt}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                  />
                </div>
                {/* Mobile Experience Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-lg shadow-elevation-sm border border-slate-100 px-2 py-0.5 flex items-center gap-1.5 z-10">
                  <span className="text-primary font-bold text-lg leading-none">{doctor?.experience}+</span>
                  <span className="text-[8px] text-text-secondary leading-[1.1] font-bold uppercase tracking-tighter">Yrs<br />Exp</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <h2 className="font-headline text-2xl font-bold text-text-primary leading-tight">
                  {doctor?.name}
                </h2>
                <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                  {doctor?.qualification}
                </div>
              </div>
            </div>

            {/* Desktop Only Image Container */}
            <div className="relative w-fit mx-0 hidden md:block">
              <div className="w-32 h-40 md:w-full md:h-auto md:aspect-[3/4] overflow-hidden rounded-2xl shadow-elevation-lg border-2 border-slate-100 cursor-zoom-in touch-none active:scale-95 transition-transform">
                <AppImage
                  src={doctor?.image}
                  alt={doctor?.alt}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                />
              </div>

              <motion.div
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-muted rounded-xl shadow-elevation-lg border border-slate-200 p-3 md:p-6 z-20"
                style={{ willChange: 'transform, opacity, filter' }}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="AcademicCapIcon" size={20} variant="solid" className="text-orange-500 md:hidden" />
                    <Icon name="AcademicCapIcon" size={32} variant="solid" className="text-orange-500 hidden md:block" />
                  </div>
                  <div>
                    <div className="font-headline text-xl md:text-3xl font-semibold text-primary whitespace-nowrap">
                      {doctor?.experience}+
                    </div>
                    <div className="font-body text-[10px] md:text-sm text-text-secondary">
                      Years Experience
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8"
            variants={staggerContainer(0.15)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div
                variants={fadeInUp}
                className="border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 bg-white shadow-card"
              >
                <div className="hidden md:block">
                  <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-2">
                    {doctor?.name}
                  </h2>
                  <p className="font-body text-base md:text-lg text-blue-500 font-medium">
                    {doctor?.qualification}
                  </p>
                </div>

                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="cursor-pointer space-y-2 group"
                >
                  <p className={`font-body text-base md:text-lg text-text-secondary leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
                    {doctor?.bio}
                  </p>
                  <button className="text-blue-500 text-sm font-semibold md:hidden flex items-center gap-1 group-hover:underline">
                    {isExpanded ? 'Show Less' : 'Read Full Bio'}
                    <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} />
                  </button>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={staggerContainer(0.1)}
                >
                  {doctor?.highlights?.map((highlight, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-3 p-4 bg-primary/10 rounded-xl"
                    >
                      <Icon
                        name="CheckBadgeIcon"
                        size={24}
                        variant="solid"
                        className="text-success flex-shrink-0 text-green-800"
                      />
                      <span className="font-body text-sm md:text-base text-text-primary">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 bg-white shadow-card"
              >
                <h3 className="font-headline text-xl md:text-2xl font-semibold text-text-primary">
                  Certifications & Memberships
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer(0.05)}
                >
                  {doctor?.certifications?.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="px-3 md:px-4 py-2 bg-primary/10 text-primary rounded-full font-body text-xs md:text-sm font-medium"
                    >
                      {cert}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <NextPageButton href="/about">Read Full Story</NextPageButton>
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-muted text-primary font-body text-base md:text-lg font-semibold rounded-lg border-2 border-primary transition-all duration-fast"
              >
                <Icon name="CalendarIcon" size={20} variant="solid" />
                <span>Book Appointment</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isImageUrlExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageUrlExpanded(false)}
              className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[320px] aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl relative cursor-default"
              >
                <AppImage
                  src={doctor?.image}
                  alt={doctor?.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-semibold text-lg">{doctor?.name}</p>
                  <p className="text-white/80 text-sm">{doctor?.qualification}</p>
                </div>
                <button
                  onClick={() => setIsImageUrlExpanded(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white md:hidden"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

DoctorExpertise.propTypes = {
  doctor: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    qualification: PropTypes?.string?.isRequired,
    experience: PropTypes?.number?.isRequired,
    bio: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    highlights: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    certifications: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
};
