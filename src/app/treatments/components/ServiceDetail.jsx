import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import ScrollAnimation from '@/components/common/ScrollAnimation';

const ServiceDetail = ({
  title,
  description,
  image,
  benefits,
  details,
  painlessFeature,
  duration,
  category,
}) => {
  return (
    <div className="bg-background min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/treatments"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={20} className="mr-2" />
          <span>Back to Treatments</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
          <ScrollAnimation>
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-text-primary mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                  <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success" />
                  <span className="text-sm font-medium">{painlessFeature}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl">
                  <Icon name="ClockIcon" size={24} variant="solid" className="text-primary" />
                  <span className="text-sm font-medium">Duration: {duration}</span>
                </div>
              </div>

              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center px-8 py-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground text-lg font-bold rounded-lg shadow-elevation-md transition-all hover:-translate-y-0.5"
              >
                <span>Book Free Consultation</span>
                <Icon name="CalendarIcon" size={20} className="ml-2" />
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevation-xl">
              <AppImage
                src={image}
                alt={title}
                fill
                className="w-full h-full bg-white"
                objectFit="contain"
                priority
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Benefits Section */}
        <section className="mb-16 md:mb-24">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-text-primary mb-12 text-center">
              Key Benefits of {title}
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits?.map((benefit, index) => (
              <ScrollAnimation key={index}>
                <div className="p-8 bg-card border border-border/60 rounded-2xl hover:shadow-elevation-md transition-all border-b-4 border-b-primary/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                    <Icon name={benefit.icon || 'SparklesIcon'} size={24} variant="solid" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{benefit.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{benefit.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Details Section */}
        {details && (
          <section className="mb-16 md:mb-24 py-16 md:py-24 bg-muted/30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-[2rem]">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl md:text-4xl font-headline font-semibold text-text-primary mb-12 text-center text-primary">
                  More About {title}
                </h2>
              </ScrollAnimation>
              <div className="space-y-8">
                {details.map((section, index) => (
                  <ScrollAnimation key={index}>
                    <div className="prose prose-lg max-w-none text-text-secondary">
                      {section.title && (
                        <h3 className="text-2xl font-bold text-text-primary mb-4">
                          {section.title}
                        </h3>
                      )}
                      <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <ScrollAnimation>
          <section className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-16 text-center text-white shadow-elevation-xl">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">
              Ready to restore your dental health?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Dr. Singh and our team of experts are ready to provide you with the most advanced and
              painless dental care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto px-10 py-5 bg-white text-primary hover:bg-white/90 text-lg font-bold rounded-xl shadow-elevation-lg transition-transform hover:-translate-y-1"
              >
                Schedule Appointment
              </Link>
              <Link
                href="tel:+918449830107"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg font-bold rounded-xl transition-colors"
              >
                Call: +91 8449830107
              </Link>
            </div>
          </section>
        </ScrollAnimation>
      </div>
    </div>
  );
};

ServiceDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ).isRequired,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string.isRequired,
    })
  ),
  painlessFeature: PropTypes.string,
  duration: PropTypes.string,
  category: PropTypes.string,
};

export default ServiceDetail;
