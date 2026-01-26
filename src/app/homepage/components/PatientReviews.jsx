'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// Helper to split array into N balanced chunks
const splitArray = (array, numParts) => {
  const result = Array.from({ length: numParts }, () => []);
  array.forEach((item, i) => {
    result[i % numParts].push(item);
  });
  return result;
};

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-3xl p-8 mb-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] transition-shadow duration-300 relative z-10 isolate">
    <div className="flex items-start space-x-4">
      <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-50 border border-gray-100">
        <AppImage
          src={review.image}
          alt={review.alt || review.name}
          className="w-full h-full object-cover"
        />
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

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

const ReviewColumn = ({ reviews, duration = '30s', className = '' }) => {
  // Triple duplication ensures we never run out of scroll content before the loop resets
  // even on very tall screens.
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
      {/* 
        CSS Animation is closer to the metal and usually smoother for simple marquees 
      */}
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
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          {/* Top Label */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Icon name="SparklesIcon" size={20} variant="solid" />
            <span className="font-body text-sm md:text-base font-medium">Patient Reviews</span>
          </div>

          <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-8">
            What Our Patients Say
          </h2>

          {/* Rating Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
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
          </div>

          <p className="font-body text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Trusted by thousands of patients across Country
          </p>
        </div>

        {/* 
          Mobile Layout (1 Column) 
        */}
        <div className="block md:hidden">
          <ReviewColumn reviews={reviews1Col[0]} duration="50s" />
        </div>

        {/* 
          Tablet Layout (2 Columns) 
        */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:hidden">
          <ReviewColumn reviews={reviews2Col[0]} duration="22s" />
          <ReviewColumn reviews={reviews2Col[1]} duration="20s" className="pt-20" />
        </div>

        {/* 
          Desktop Layout (3 Columns)
        */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          <ReviewColumn reviews={reviews3Col[0]} duration="15s" />
          <ReviewColumn reviews={reviews3Col[1]} duration="12s" className="pt-32" />
          <ReviewColumn reviews={reviews3Col[2]} duration="8s" className="pt-10" />
        </div>
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
