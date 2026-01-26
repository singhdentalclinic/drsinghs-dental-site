'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero({ title, description, emergencyPhone }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background with Gradient Mask for Dissolve Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-primary/20 rounded-full mb-6 animate-fade-in-up">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary animate-pulse"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="font-body text-xs md:text-sm font-medium text-primary">
              Committed to Patient Care
            </span>
          </div>

          <h1
            className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 md:mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {title}
          </h1>

          <p
            className="font-body text-base md:text-lg text-text-secondary mb-8 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {description}
          </p>

          {emergencyPhone && (
            <a
              href={`tel:${emergencyPhone}`}
              className="inline-flex items-center space-x-3 bg-white p-2 pr-6 rounded-full shadow-elevation-sm border border-border animate-fade-in-up group hover:border-primary/50 transition-colors duration-300 cursor-pointer"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary transition-all duration-300 group-hover-wiggle">
                <Icon name="PhoneIcon" size={24} variant="solid" />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-body text-xs text-text-secondary uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">
                  Speak With Us
                </p>
                <div className="font-headline text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                  {emergencyPhone}
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

ContactHero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  emergencyPhone: PropTypes.string,
};
