'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '@/components/ui/AppIcon';

export default function CertificationsSection({ certifications }) {
  const [hoveredCert, setHoveredCert] = useState(null);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-4">
            Awards & Certifications
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            Recognized excellence in dental care and patient satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications?.map((cert, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCert(index)}
              onMouseLeave={() => setHoveredCert(null)}
              className="bg-white rounded-lg p-6 md:p-8 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-normal cursor-pointer"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={cert?.icon} size={24} variant="solid" className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-base md:text-lg font-semibold text-text-primary mb-1 line-clamp-2">
                    {cert?.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-text-secondary">{cert?.issuer}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-xs md:text-sm text-primary font-medium">
                  {cert?.year}
                </span>
                {cert?.verified && (
                  <div className="flex items-center space-x-1 bg-trust/10 px-2 py-1 rounded-full">
                    <Icon name="CheckBadgeIcon" size={14} variant="solid" className="text-trust" />
                    <span className="font-body text-xs text-trust font-medium">Verified</span>
                  </div>
                )}
              </div>

              {hoveredCert === index && (
                <div className="pt-4 border-t border-border animate-slide-in-right">
                  <p className="font-body text-xs md:text-sm text-text-secondary">
                    {cert?.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-elevation-md">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="TrophyIcon" size={40} variant="solid" className="text-accent" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-headline text-xl md:text-2xl font-semibold text-text-primary mb-2">
                Continuing Education Commitment
              </h3>
              <p className="font-body text-sm md:text-base text-text-secondary">
                Our team participates in over 100 hours of advanced training annually to bring you
                the latest in dental care innovations and techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

CertificationsSection.propTypes = {
  certifications: PropTypes?.arrayOf(
    PropTypes?.shape({
      title: PropTypes?.string?.isRequired,
      issuer: PropTypes?.string?.isRequired,
      year: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired,
      verified: PropTypes?.bool?.isRequired,
      description: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};
