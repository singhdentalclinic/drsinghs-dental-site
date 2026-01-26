'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function AppointmentCTA({ ctaData }) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-full">
                <Icon name="CalendarDaysIcon" size={20} variant="solid" />
                <span className="font-body text-sm md:text-base font-medium">Book Your Visit</span>
              </div>

              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                {ctaData?.title}
              </h2>

              <p className="font-body text-base md:text-lg text-white/90 leading-relaxed">
                {ctaData?.description}
              </p>

              <div className="space-y-4">
                {ctaData?.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircleIcon"
                      size={24}
                      variant="solid"
                      className="text-accent flex-shrink-0"
                    />
                    <span className="font-body text-sm md:text-base text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="tel:+918449830107"
                  className="inline-flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-white/90 text-primary font-cta text-base md:text-lg font-semibold rounded-lg shadow-elevation-md transition-all duration-fast"
                >
                  <Icon name="PhoneIcon" size={20} variant="solid" />
                  <span>Call Now</span>
                </Link>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Singh+Dental+Clinic+and+Implant+center+-+Dental+Clinic+in+Ramnagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-transparent hover:bg-white/10 text-white font-body text-base md:text-lg font-semibold rounded-lg border-2 border-white transition-all duration-fast"
                >
                  <Icon name="MapPinIcon" size={20} variant="outline" />
                  <span>Get Directions</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-elevation-lg p-6 md:p-8">
              <h3 className="font-headline text-2xl md:text-3xl font-semibold text-text-primary mb-6">
                Quick Appointment
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Select Service
                  </label>
                  <div className="relative">
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e?.target?.value)}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-body text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">Choose a service...</option>
                      {ctaData?.services?.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <Icon
                      name="ChevronDownIcon"
                      size={20}
                      variant="outline"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e?.target?.value)}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-body text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Link
                  href="/book-appointment"
                  className="block w-full px-6 py-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground text-center font-cta text-base md:text-lg font-semibold rounded-lg shadow-elevation-sm hover:shadow-elevation-md transition-all duration-fast"
                >
                  Continue Booking
                </Link>

                <p className="font-body text-xs md:text-sm text-text-secondary text-center">
                  Or call us at{' '}
                  <a
                    href="tel:+918449830107"
                    className="text-primary font-semibold hover:underline"
                  >
                    +91 84498 30107
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

AppointmentCTA.propTypes = {
  ctaData: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    benefits: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    services: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
};
