'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function TeamSection({ team }) {
  const [expandedMember, setExpandedMember] = useState(null);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-4">
            Meet Our Expert Team
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            Dedicated professionals committed to your oral health and comfort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
          {team?.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-elevation-md hover:shadow-elevation-lg transition-all duration-normal"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <AppImage
                  src={member?.image}
                  alt={member?.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-slow"
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl font-semibold text-text-primary mb-1">
                      {member?.name}
                    </h3>
                    <p className="font-body text-sm md:text-base text-primary font-medium">
                      {member?.role}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-accent/10 px-3 py-1 rounded-full">
                    <Icon name="StarIcon" size={16} variant="solid" className="text-accent" />
                    <span className="font-body text-sm font-semibold text-accent">
                      {member?.rating}
                    </span>
                  </div>
                </div>

                <p className="font-body text-sm md:text-base text-text-secondary mb-4 line-clamp-3">
                  {member?.bio}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="AcademicCapIcon"
                      size={18}
                      variant="outline"
                      className="text-primary"
                    />
                    <span className="font-body text-xs md:text-sm text-text-secondary">
                      {member?.education}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="ClockIcon" size={18} variant="outline" className="text-primary" />
                    <span className="font-body text-xs md:text-sm text-text-secondary">
                      {member?.experience}
                    </span>
                  </div>
                </div>

                {expandedMember === index && (
                  <div className="space-y-4 pt-4 border-t border-border animate-slide-in-right">
                    <div>
                      <h4 className="font-body text-sm font-semibold text-text-primary mb-2">
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member?.specializations?.map((spec, specIndex) => (
                          <span
                            key={specIndex}
                            className="px-3 py-1 bg-primary/10 text-primary font-body text-xs rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-body text-sm font-semibold text-text-primary mb-2">
                        Philosophy
                      </h4>
                      <p className="font-body text-xs md:text-sm text-text-secondary italic">
                        &ldquo;{member?.philosophy}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                  className="w-full mt-4 px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-body text-sm font-medium rounded-md transition-colors duration-fast flex items-center justify-center space-x-2"
                >
                  <span>{expandedMember === index ? 'Show Less' : 'Learn More'}</span>
                  <Icon
                    name="ChevronDownIcon"
                    size={16}
                    variant="outline"
                    className={`transform transition-transform duration-fast ${
                      expandedMember === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TeamSection.propTypes = {
  team: PropTypes?.arrayOf(
    PropTypes?.shape({
      name: PropTypes?.string?.isRequired,
      role: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      bio: PropTypes?.string?.isRequired,
      education: PropTypes?.string?.isRequired,
      experience: PropTypes?.string?.isRequired,
      rating: PropTypes?.string?.isRequired,
      specializations: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
      philosophy: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};
