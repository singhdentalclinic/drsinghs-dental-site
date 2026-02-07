'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import VideoModal from '@/components/ui/VideoModal';
import StoryFilters from './StoryFilters';
import BeforeAfterSlider from './BeforeAfterSlider';
import VideoTestimonial from './VideoTestimonial';
import TestimonialCard from './TestimonialCard';
import CaseStudyCard from './CaseStudyCard';

export default function PatientStoriesInteractive({
  categories,
  beforeAfterGallery,
  videoTestimonials,
  testimonials,
  caseStudies,
}) {
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleFilterChange = (filterIds) => {
    setSelectedFilters(filterIds);
    setActiveVideoIndex(0); // Reset index on filter change
  };

  const filterContent = useCallback(
    (items) => {
      if (!selectedFilters || selectedFilters.includes('all') || selectedFilters.length === 0) {
        return items;
      }
      return items?.filter((item) => selectedFilters.includes(item?.categoryId));
    },
    [selectedFilters]
  );

  const filteredBeforeAfter = useMemo(
    () => filterContent(beforeAfterGallery),
    [beforeAfterGallery, filterContent]
  );
  const filteredVideos = useMemo(
    () => filterContent(videoTestimonials),
    [videoTestimonials, filterContent]
  );
  const filteredTestimonials = useMemo(
    () => filterContent(testimonials),
    [testimonials, filterContent]
  );
  const filteredCaseStudies = useMemo(
    () => filterContent(caseStudies),
    [caseStudies, filterContent]
  );

  // Handle native drag for desktop
  const setupDrag = (slider) => {
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.dataset.moved = 'false';
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = (_e) => {
      isDown = false;
      slider.classList.remove('active');
      if (slider.dataset.moved === 'true') {
        const preventClick = (e) => {
          e.stopImmediatePropagation();
          slider.removeEventListener('click', preventClick, true);
        };
        slider.addEventListener('click', preventClick, true);
      }
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) {
        slider.dataset.moved = 'true';
      }
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  };

  useEffect(() => {
    const cleanupVideo = setupDrag(scrollContainerRef.current);
    return () => {
      cleanupVideo?.();
    };
  }, []);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Handle intersection observer for native scrolling on mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || filteredVideos.length === 0) return;

    const options = {
      root: container,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isProgrammaticScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveVideoIndex(index);
        }
      });
    }, options);

    const cards = container.querySelectorAll('[data-video-card]');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [filteredVideos.length, selectedFilters]);

  const scrollToItem = (index) => {
    if (index < 0 || index >= filteredVideos.length) return;

    // Cancel any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isProgrammaticScroll.current = true;
    setActiveVideoIndex(index);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('[data-video-card]');
      const targetCard = cards[index];

      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }

    // Reset the flag after the smooth scroll finishes (approx 600ms)
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      scrollTimeoutRef.current = null;
    }, 600);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
          <Icon name="SparklesIcon" size={16} className="text-sky-500" variant="solid" />
          <span className="font-body text-sm font-medium text-sky-700">Patient Stories</span>
        </div>
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Real Stories, Real Transformations
        </h2>
        <p className="font-body text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto">
          Discover how Dr. Pradeep Singh and his team have transformed smiles and lives across
          Uttarakhand. Read authentic patient experiences and see the remarkable results.
        </p>
      </div>

      <div className="flex flex-col items-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
          <Icon name="SparklesIcon" size={16} className="text-sky-500" variant="solid" />
          <span className="font-body text-sm font-medium text-sky-700">Transformations</span>
        </div>
        <h2 className="font-headline text-[clamp(1.2rem,5vw,2.25rem)] font-semibold text-text-primary whitespace-nowrap px-2">
          Before & After Transformations
        </h2>
      </div>

      <StoryFilters categories={categories} onFilterChange={handleFilterChange} />

      {/* Before/After Gallery */}
      {filteredBeforeAfter?.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredBeforeAfter?.map((item) => (
              <BeforeAfterSlider
                key={item?.id}
                beforeImage={item?.beforeImage}
                afterImage={item?.afterImage}
                patientName={item?.patientName}
                treatment={item?.treatment}
              />
            ))}
          </div>
        </section>
      )}

      {/* Video Testimonials Section */}
      {filteredVideos?.length > 0 && (
        <section className="relative">
          <div className="flex flex-col items-center justify-center mb-6 md:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
              <Icon name="VideoCameraIcon" size={16} className="text-sky-500" variant="solid" />
              <span className="font-body text-sm font-medium text-sky-700">Testimonials</span>
            </div>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
              Video Testimonials
            </h2>
            <p className="font-body text-sm md:text-base text-text-secondary mt-2 max-w-2xl px-4">
              We respect patient privacy and publish testimonials only after receiving approval
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-visible">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 gap-6 scrollbar-hide snap-x snap-mandatory scroll-px-4 md:scroll-px-6 lg:scroll-px-8 cursor-grab active:cursor-grabbing"
            >
              {filteredVideos?.map((video, index) => (
                <div
                  key={video?.id}
                  data-video-card
                  data-index={index}
                  className="flex-none snap-center py-4 cursor-pointer select-none"
                  onClick={() => {
                    if (activeVideoIndex === index) {
                      setSelectedVideo(video?.videoUrl);
                    } else {
                      scrollToItem(index);
                    }
                  }}
                >
                  <VideoTestimonial
                    thumbnail={video?.thumbnail}
                    patientName={video?.patientName}
                    treatment={video?.treatment}
                    videoUrl={video?.videoUrl}
                    location={video?.location}
                    onPlay={() => setSelectedVideo(video?.videoUrl)}
                    isActive={activeVideoIndex === index}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Fade Overlays */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none z-10" />
            <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/20 to-transparent pointer-events-none z-10" />
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => scrollToItem(activeVideoIndex - 1)}
              disabled={activeVideoIndex === 0}
              className={`p-2 rounded-full bg-white shadow-md border border-gray-100 transition-all duration-200 ${
                activeVideoIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 active:scale-95'
              }`}
            >
              <Icon name="ChevronLeftIcon" size={20} className="text-gray-700" />
            </button>

            <div className="flex gap-2">
              {filteredVideos?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToItem(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeVideoIndex === index
                      ? 'bg-gray-900 w-3 h-3'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToItem(activeVideoIndex + 1)}
              disabled={activeVideoIndex === filteredVideos.length - 1}
              className={`p-2 rounded-full bg-white shadow-md border border-gray-100 transition-all duration-200 ${
                activeVideoIndex === filteredVideos.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 active:scale-95'
              }`}
            >
              <Icon name="ChevronRightIcon" size={20} className="text-gray-700" />
            </button>
          </div>
        </section>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo}
        />
      )}

      {/* Patient Testimonials Section (Grid) */}
      {filteredTestimonials?.length > 0 && (
        <section>
          <div className="flex flex-col items-center justify-center mb-6 md:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
              <Icon name="BookOpenIcon" size={16} className="text-sky-500" variant="solid" />
              <span className="font-body text-sm font-medium text-sky-700">Patient Reviews</span>
            </div>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
              Patient Testimonials
            </h2>
            <p className="font-body text-sm md:text-base text-text-secondary mt-2 max-w-2xl px-4">
              Real stories from our patients about their journey to better dental health and
              confident smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredTestimonials?.map((testimonial) => (
              <TestimonialCard
                key={testimonial?.id}
                patient={testimonial?.patient}
                rating={testimonial?.rating}
                testimonial={testimonial?.testimonial}
                treatment={testimonial?.treatment}
                date={testimonial?.date}
                location={testimonial?.location}
              />
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center">
            <Link
              href="/patient-stories/reviews"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all duration-300 group shadow-elevation-sm hover:shadow-elevation-md"
            >
              View More Verified Reviews
              <Icon
                name="ArrowRightIcon"
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {filteredCaseStudies?.length > 0 && (
        <section>
          <div className="flex flex-col items-center justify-center mb-6 md:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-sky-50 border border-sky-100">
              <Icon name="DocumentTextIcon" size={16} className="text-sky-500" variant="solid" />
              <span className="font-body text-sm font-medium text-sky-700">Case Study</span>
            </div>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
              Detailed Case Studies
            </h2>
            <p className="font-body text-sm md:text-base text-text-secondary mt-2 max-w-2xl px-4">
              In-depth looks at complex treatments, showcasing our clinical expertise and
              transformative results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {filteredCaseStudies?.slice(0, 2).map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy?.id}
                title={caseStudy?.title}
                treatment={caseStudy?.treatment}
                duration={caseStudy?.duration}
                complexity={caseStudy?.complexity}
                description={caseStudy?.description}
                images={caseStudy?.images}
                results={caseStudy?.results}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

PatientStoriesInteractive.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  beforeAfterGallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
      beforeImage: PropTypes.object.isRequired,
      afterImage: PropTypes.object.isRequired,
      patientName: PropTypes.string.isRequired,
      treatment: PropTypes.string.isRequired,
    })
  ).isRequired,
  videoTestimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
      patientName: PropTypes.string.isRequired,
      treatment: PropTypes.string.isRequired,
      videoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
      patient: PropTypes.object.isRequired,
      rating: PropTypes.number.isRequired,
      testimonial: PropTypes.string.isRequired,
      treatment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  caseStudies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      treatment: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      complexity: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      results: PropTypes.array.isRequired,
    })
  ).isRequired,
};
