'use client';

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const filterContent = (items) => {
    if (activeFilter === 'all') return items;
    return items?.filter((item) => item?.categoryId === activeFilter);
  };

  const filteredBeforeAfter = filterContent(beforeAfterGallery);
  const filteredVideos = filterContent(videoTestimonials);
  const filteredTestimonials = filterContent(testimonials);
  const filteredCaseStudies = filterContent(caseStudies);

  // Sync active dot with IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || filteredVideos.length === 0) return;

    const options = {
      root: container,
      threshold: 0.6, // Trigger when 60% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveDotIndex(index);
        }
      });
    }, options);

    const cards = container.querySelectorAll('[data-video-card]');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [filteredVideos.length, activeFilter]); // Re-run when filter or videos change

  const scrollToItem = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('[data-video-card]');
      const targetCard = cards[index];

      if (targetCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = targetCard.offsetWidth;
        const cardOffset = targetCard.offsetLeft;

        // Scroll target to center of container
        const targetScroll = cardOffset - containerWidth / 2 + cardWidth / 2;

        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-orange-50 border border-orange-100">
          <Icon name="SparklesIcon" size={16} className="text-orange-500" variant="solid" />
          <span className="font-body text-sm font-medium text-orange-700">Patient Stories</span>
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
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
          Before & After Transformations
        </h2>
      </div>
      <StoryFilters categories={categories} onFilterChange={handleFilterChange} />
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

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-2 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 gap-4 scrollbar-hide snap-x"
          >
            {filteredVideos?.map((video, index) => (
              <div
                key={video?.id}
                data-video-card
                data-index={index}
                className="flex-none snap-center py-4"
              >
                <VideoTestimonial
                  thumbnail={video?.thumbnail}
                  patientName={video?.patientName}
                  treatment={video?.treatment}
                  videoUrl={video?.videoUrl}
                  location={video?.location}
                  onPlay={(url) => setSelectedVideo(url)}
                  isActive={activeDotIndex === index}
                />
              </div>
            ))}
          </div>

          {/* New Pagination UI */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => scrollToItem(activeDotIndex - 1)}
              disabled={activeDotIndex === 0}
              className={`p-2 rounded-full bg-white shadow-md border border-gray-100 transition-all duration-200 ${
                activeDotIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 active:scale-95'
              }`}
              aria-label="Previous"
            >
              <Icon name="ChevronLeftIcon" size={20} className="text-gray-700" />
            </button>

            <div className="flex gap-2">
              {filteredVideos?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToItem(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeDotIndex === index
                      ? 'bg-gray-900 w-3 h-3'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToItem(activeDotIndex + 1)}
              disabled={activeDotIndex === filteredVideos.length - 1}
              className={`p-2 rounded-full bg-white shadow-md border border-gray-100 transition-all duration-200 ${
                activeDotIndex === filteredVideos.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 active:scale-95'
              }`}
              aria-label="Next"
            >
              <Icon name="ChevronRightIcon" size={20} className="text-gray-700" />
            </button>
          </div>
        </section>
      )}

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
      />
      {filteredTestimonials?.length > 0 && (
        <section>
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-6 md:mb-8">
            Patient Testimonials
          </h2>
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
        </section>
      )}
      {filteredCaseStudies?.length > 0 && (
        <section>
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-6 md:mb-8">
            Detailed Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {filteredCaseStudies?.map((caseStudy) => (
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
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  beforeAfterGallery: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      categoryId: PropTypes?.string?.isRequired,
      beforeImage: PropTypes?.shape({
        url: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })?.isRequired,
      afterImage: PropTypes?.shape({
        url: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })?.isRequired,
      patientName: PropTypes?.string?.isRequired,
      treatment: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  videoTestimonials: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      categoryId: PropTypes?.string?.isRequired,
      thumbnail: PropTypes?.shape({
        url: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })?.isRequired,
      patientName: PropTypes?.string?.isRequired,
      treatment: PropTypes?.string?.isRequired,
      videoUrl: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  testimonials: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      categoryId: PropTypes?.string?.isRequired,
      patient: PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        image: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })?.isRequired,
      rating: PropTypes?.number?.isRequired,
      testimonial: PropTypes?.string?.isRequired,
      treatment: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      location: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  caseStudies: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      categoryId: PropTypes?.string?.isRequired,
      title: PropTypes?.string?.isRequired,
      treatment: PropTypes?.string?.isRequired,
      duration: PropTypes?.string?.isRequired,
      complexity: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      images: PropTypes?.arrayOf(
        PropTypes?.shape({
          url: PropTypes?.string?.isRequired,
          alt: PropTypes?.string?.isRequired,
        })
      )?.isRequired,
      results: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    })
  )?.isRequired,
};
