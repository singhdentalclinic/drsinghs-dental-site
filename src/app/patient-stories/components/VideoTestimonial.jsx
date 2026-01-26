'use client';

import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function VideoTestimonial({
  thumbnail,
  patientName,
  treatment,
  videoUrl,
  location,
  onPlay,
  isActive = false,
}) {
  return (
    <div
      className={`flex flex-col group w-[280px] md:w-[290px] mx-auto cursor-pointer transition-all duration-500 ease-in-out ${
        isActive ? 'scale-100' : 'scale-[0.85]'
      }`}
      onClick={() => onPlay(videoUrl)}
    >
      {/* Video Content Card */}
      <div className="relative w-full h-[420px] md:h-[435px] rounded-xl overflow-hidden bg-muted shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
        <div className="absolute inset-0">
          <AppImage
            src={thumbnail?.url}
            alt={thumbnail?.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark Shade Overlay */}
          <div className="absolute inset-0 bg-black/30 z-10" />
          {/* Bottom Gradient for Name Readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-20" />
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-30 p-0 border-0 bg-transparent">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 backdrop-blur-md shadow-2xl border border-white/20"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Icon
                name="PlayIcon"
                size={24}
                variant="solid"
                className="text-primary translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER: Split Layout (Name vs Treatment) */}
      <div className="mt-3 grid grid-cols-2 gap-2 w-full px-1">
        <div className="flex flex-col">
          <h4 className="text-[15px] font-[600] text-[#333333] leading-tight">{patientName}</h4>
          <span className="text-[13px] text-gray-500 font-normal">{location}</span>
        </div>

        <p className="text-[13px] font-[600] text-[#f47920] uppercase tracking-normal text-right leading-tight underline decoration-1 underline-offset-2">
          {treatment}
        </p>
      </div>
    </div>
  );
}

VideoTestimonial.propTypes = {
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  patientName: PropTypes.string.isRequired,
  treatment: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};
