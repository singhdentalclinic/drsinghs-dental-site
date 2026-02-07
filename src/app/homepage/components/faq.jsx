'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/utils/AnimationVariants';

const DesktopLayout = ({ faqData, activeIndex, setActiveIndex }) => (
  <motion.div
    className="hidden lg:grid grid-cols-12 gap-12 items-start"
    variants={staggerContainer(0.05)}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.1 }}
  >
    {/* Left Column: Questions List */}
    <div className="col-span-12 lg:col-span-5 space-y-2">
      {faqData?.questions?.map((item, index) => (
        <motion.div key={index} className="group/item" variants={fadeInUp}>
          <button
            onClick={() => setActiveIndex(index)}
            className={`w-full text-left py-4 px-5 rounded-lg transition-all duration-300 flex items-center justify-between group ${
              activeIndex === index
                ? 'bg-white shadow-elevation-sm border-l-4 border-primary'
                : 'hover:bg-white/50 border-l-4 border-transparent'
            }`}
          >
            <span
              className={`font-body font-medium text-base transition-colors ${
                activeIndex === index
                  ? 'text-primary'
                  : 'text-text-primary group-hover:text-primary'
              }`}
            >
              {item.question}
            </span>
            {activeIndex === index && (
              <motion.div layoutId="activeIndicator" className="text-primary">
                <Icon name="ArrowRightIcon" size={20} variant="outline" />
              </motion.div>
            )}
          </button>
          <AnimatePresence>
            {index < faqData.questions.length - 1 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: activeIndex === index ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/40 to-transparent mt-2 overflow-hidden"
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>

    {/* Right Column: Answer Display */}
    <motion.div className="col-span-12 lg:col-span-7" variants={fadeInUp}>
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-blue-50/80 border border-blue-100/50 rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Icon name="ChatBubbleLeftRightIcon" size={24} variant="outline" />
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-semibold text-primary pt-1">
                {faqData?.questions[activeIndex]?.question}
              </h3>
            </div>
            <p className="font-body text-lg text-text-secondary leading-relaxed pl-[3.25rem]">
              {faqData?.questions[activeIndex]?.answer}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  </motion.div>
);

const MobileLayout = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      className="lg:hidden space-y-4"
      variants={staggerContainer(0.05)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      {faqData?.questions?.map((item, index) => (
        <motion.div key={index} className="relative" variants={fadeInUp}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full flex items-center justify-between py-4 text-left transition-all duration-200 group"
          >
            <span
              className={`font-body font-medium text-sm md:text-base pr-4 group-hover:text-primary transition-colors ${
                openIndex === index ? 'text-primary' : 'text-text-primary'
              }`}
            >
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 transition-transform duration-200 ${
                openIndex === index
                  ? 'rotate-180 text-primary'
                  : 'text-text-secondary group-hover:text-primary'
              }`}
            >
              <Icon name="ChevronDownIcon" size={20} variant="outline" />
            </span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 mb-4 font-body text-sm text-text-secondary leading-relaxed bg-blue-50/80 rounded-lg">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {index < faqData.questions.length - 1 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: openIndex === index ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function FAQ({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          variants={staggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-4"
          >
            {faqData?.title || 'Frequently Asked Questions'}
          </motion.h2>
          <motion.p variants={fadeInUp} className="font-body text-base text-text-secondary">
            {faqData?.description ||
              'Find answers to common questions about our dental services and appointments.'}
          </motion.p>
        </motion.div>

        <DesktopLayout
          faqData={faqData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <MobileLayout faqData={faqData} />
      </div>
    </section>
  );
}

FAQ.propTypes = {
  faqData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
