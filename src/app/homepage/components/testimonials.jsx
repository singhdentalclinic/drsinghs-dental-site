'use client';

import { useState, useRef } from 'react';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import NextPageButton from '@/components/ui/nextpagebutton';
import Icon from '@/components/ui/AppIcon';
import VideoModal from '@/components/ui/VideoModal';
import { staggerContainer, fadeInUp } from '@/utils/AnimationVariants';

const testimonials = [
  {
    id: 1,
    name: 'Flur',
    treatment: 'Tooth Filling',
    videoUrl: 'https://youtube.com/shorts/ZpaHcfp1rMA',
  },
  {
    id: 2,
    name: 'Harvind Nahal',
    treatment: 'Tooth Implant',
    videoUrl: 'https://www.youtube.com/shorts/J-ZST6G8hhg',
  },
  {
    id: 3,
    name: 'Abha Jain',
    treatment: 'Tooth Implant',
    videoUrl: 'https://www.youtube.com/shorts/5p9P_x_CIsU',
  },
  {
    id: 4,
    name: 'Meera Patel',
    treatment: 'Teeth Implant',
    videoUrl: 'https://www.youtube.com/shorts/pY2V6IB3xJE',
  },
];

export default function VideoTestimonials() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.3,
    margin: '-100px 0px -100px 0px',
  });

  const openVideo = (url) => {
    setSelectedVideoUrl(url);
    setIsModalOpen(true);
  };

  return (
    <section ref={sectionRef} className="pt-1 pb-10 relative overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={staggerContainer(0.08)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4"
          >
            <Icon name="StarIcon" size={20} variant="solid" />
            <span className="font-body text-sm md:text-base font-medium">Testimonials</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
          >
            Hear from Our Patients
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-body text-base md:text-lg text-text-secondary max-w-3xl mx-auto mt-4"
          >
            Smiles transformed, fears eased, and confidence restored. Hear directly from our
            patients about their experience with our expert dental care.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-6 pb-4 md:grid md:grid-cols-4 md:gap-6 md:pb-12 max-w-5xl mx-auto scrollbar-hide px-4"
          variants={staggerContainer(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3, margin: '-50px' }}
        >
          {testimonials.map((testimonial) => {
            const videoId = testimonial.videoUrl.includes('shorts/')
              ? testimonial.videoUrl.split('shorts/')[1]?.split('?')[0]
              : testimonial.videoUrl.split('v=')[1]?.split('&')[0];

            return (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-[70vw] sm:w-[50vw] md:w-auto snap-center"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                <div
                  className="group relative bg-black rounded-[2rem] shadow-xl overflow-hidden cursor-pointer aspect-[3/4]"
                  onClick={() => openVideo(testimonial.videoUrl)}
                >
                  {/* Background Video (Muted Autoplay) */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden scale-105 group-hover:scale-110 transition-transform duration-700">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                      className="absolute top-1/2 left-1/2 w-full h-[133.33%] -translate-x-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      allow="autoplay"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />

                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 border border-white/30">
                      <PlayIcon className="w-8 h-8 text-white ml-1 opacity-80" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-left px-2">
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm font-semibold text-primary">{testimonial.treatment}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 mt-4 md:mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0 min-h-[80px]">
          {/* Google Review Card Cluster - Extreme Left */}
          <div className="flex justify-start">
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 10, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="z-50"
                >
                  <a
                    href="https://g.page/r/Cdl5btRrYBwjEBM/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-center space-x-3 w-[210px] hover:bg-gray-50 transition-colors cursor-pointer"
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
                      <h5 className="text-sm font-bold text-gray-900 truncate">
                        Singh Dental Clinic
                      </h5>
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
          </div>

          {/* View More Button - Center on Screen */}
          <div className="flex justify-center">
            <NextPageButton href="/patient-stories">View More</NextPageButton>
          </div>

          {/* Right Spacer */}
          <div className="hidden md:block" />
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={selectedVideoUrl}
      />
    </section>
  );
}
