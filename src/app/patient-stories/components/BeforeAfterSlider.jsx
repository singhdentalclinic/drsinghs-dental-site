'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function BeforeAfterSlider({ beforeImage, afterImage, patientName, treatment }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect?.left;
    const percentage = (x / rect?.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e?.currentTarget?.getBoundingClientRect();
    handleMove(e?.clientX, rect);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const rect = e?.currentTarget?.getBoundingClientRect();
    handleMove(e?.touches?.[0]?.clientX, rect);
  };

  return (
    <div className="w-full bg-card rounded-xl overflow-hidden shadow-elevation-md">
      <div
        className="relative w-full aspect-[4/3] cursor-ew-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        <div className="absolute inset-0">
          <AppImage
            src={afterImage?.url}
            alt={afterImage?.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <AppImage
            src={beforeImage?.url}
            alt={beforeImage?.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-elevation-md flex items-center justify-center">
            <Icon
              name="ChevronLeftIcon"
              size={16}
              variant="solid"
              className="text-primary absolute left-1"
            />
            <Icon
              name="ChevronRightIcon"
              size={16}
              variant="solid"
              className="text-primary absolute right-1"
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md font-body text-sm font-medium">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md font-body text-sm font-medium">
          After
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary mb-2 line-clamp-2">
          {patientName}
        </h3>
        <p className="font-body text-sm md:text-base text-text-secondary line-clamp-1">
          {treatment}
        </p>
      </div>
    </div>
  );
}

BeforeAfterSlider.propTypes = {
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
};
