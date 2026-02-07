'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';
import { staggerContainer, fadeInUp } from '@/utils/AnimationVariants';

// Helper to split array into N balanced chunks
const splitArray = (array, numParts) => {
  const result = Array.from({ length: numParts }, () => []);
  array.forEach((item, i) => {
    result[i % numParts].push(item);
  });
  return result;
};

const ReviewCard = ({ review }) => {
  const colors = [
    'bg-emerald-100 text-emerald-600',
    'bg-sky-100 text-sky-600',
    'bg-orange-100 text-orange-600',
    'bg-violet-100 text-violet-600',
    'bg-rose-100 text-rose-600',
    'bg-amber-100 text-amber-600',
    'bg-teal-100 text-teal-600',
    'bg-indigo-100 text-indigo-600',
    'bg-fuchsia-100 text-fuchsia-600',
    'bg-cyan-100 text-cyan-600',
  ];

  // Simple hash to consistently pick a color for a name
  const nameHash = review.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
  const colorClass = colors[nameHash % colors.length];

  return (
    <div className="bg-white rounded-3xl p-8 mb-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] transition-shadow duration-300 relative z-10 isolate">
      <div className="flex items-start space-x-4">
        <div
          className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${colorClass}`}
        >
          <Icon name="UserIcon" size={24} variant="solid" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-bold text-gray-900 leading-tight mb-1">
            {review.name}
          </h3>
          {/* Render stars for visually premium feel */}
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="StarIcon" size={14} variant="solid" className="text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 font-body text-gray-600 leading-relaxed text-[15px]">{review.text}</p>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

const ReviewColumn = ({ reviews, duration = '30s', className = '' }) => {
  // Triple duplication ensures we never run out of scroll content before the loop resets
  const columnContent = [...reviews, ...reviews, ...reviews];

  return (
    <div
      className={`relative h-[600px] md:h-[800px] overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div
        className="w-full will-change-transform"
        style={{
          animation: `marquee ${duration} linear infinite`,
        }}
      >
        {columnContent.map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
};

ReviewColumn.propTypes = {
  reviews: PropTypes.array.isRequired,
  duration: PropTypes.string,
  className: PropTypes.string,
};

export default function PatientReviews({ reviews }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.3,
    margin: '-100px 0px -100px 0px',
  });

  const reviews1Col = splitArray(reviews, 1);
  const reviews2Col = splitArray(reviews, 2);
  const reviews3Col = splitArray(reviews, 3);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 relative">
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
          variants={staggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4"
          >
            <Icon name="SparklesIcon" size={20} variant="solid" />
            <span className="font-body text-sm md:text-base font-medium">Patient Reviews</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-8"
          >
            What Our Patients Say
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="StarIcon"
                  size={28}
                  variant="solid"
                  className="text-amber-400"
                />
              ))}
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-gray-900">4.8/5</span>
              <span className="text-lg text-gray-500 font-medium">(from all reviews)</span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="font-body text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Trusted by thousands of patients across Country
          </motion.p>
        </motion.div>

        {/* 
          Main Grid Wrapper Triggered sequentially
        */}
        <motion.div
          variants={staggerContainer(0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="block md:hidden">
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews1Col[0]} duration="50s" />
            </motion.div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6 lg:hidden">
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews2Col[0]} duration="22s" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews2Col[1]} duration="20s" className="pt-20" />
            </motion.div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews3Col[0]} duration="15s" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews3Col[1]} duration="12s" className="pt-32" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ReviewColumn reviews={reviews3Col[2]} duration="8s" className="pt-10" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <a
              href="https://g.page/r/Cdl5btRrYBwjEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-center space-x-3 max-w-[240px] hover:bg-gray-50 transition-colors cursor-pointer block relative z-10 isolate text-black no-underline"
            >
              <div className="bg-white p-1 rounded-full shrink-0 relative w-8 h-8">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  fill
                  className="object-contain p-1"
                  sizes="32px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-gray-900 truncate">Singh Dental Clinic</h5>
                <div className="flex items-center space-x-1 mt-0.5">
                  <span className="font-bold text-gray-900 leading-none text-sm">4.8</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-3 h-3 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5 truncate">
                  Based on all reviews
                </p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

PatientReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
};
