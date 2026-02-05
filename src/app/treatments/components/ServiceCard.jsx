import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ServiceCard({ service }) {
  return (
    <div className="w-full h-full">
      {/* Mobile View - Simplified Card */}
      <Link
        href={`/treatments/services/${service?.slug}`}
        className="block md:hidden w-full h-full bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden active:scale-[0.98] transition-all flex flex-col"
      >
        <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
          <AppImage
            src={service?.image}
            alt={service?.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 text-center flex-1 flex items-center justify-center">
          <h3 className="text-sm font-semibold text-text-primary line-clamp-2">
            {service?.title}
          </h3>
        </div>
      </Link>

      {/* Desktop/Tablet View - Detailed Card */}
      <div className="hidden md:block w-full h-full min-w-0 bg-white relative z-10 rounded-lg border border-border/60 shadow-elevation-sm hover:shadow-elevation-lg transition-all duration-normal group flex flex-col">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg flex-shrink-0">
          <AppImage
            src={service?.image}
            alt={service?.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
          />
        </div>
        <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Icon name={service?.icon} size={20} variant="solid" className="text-primary" />
                </div>
                <span className="text-xs md:text-sm font-medium text-accent">{service?.category}</span>
              </div>
              {service?.isEmergency && (
                <span className="px-2 py-1 bg-error/10 text-error text-xs font-semibold rounded">
                  24/7 Available
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-semibold text-text-primary mb-2 md:mb-3 line-clamp-2">
              {service?.title}
            </h3>

            <p className="text-sm md:text-base text-text-secondary mb-4 md:mb-6 line-clamp-3">
              {service?.description}
            </p>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex items-start space-x-2">
                <Icon
                  name="CheckCircleIcon"
                  size={18}
                  variant="solid"
                  className="text-success mt-0.5 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-text-secondary">
                  {service?.painlessFeature}
                </span>
              </div>

              <div className="flex items-start space-x-2">
                <Icon
                  name="ClockIcon"
                  size={18}
                  variant="solid"
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-text-secondary">
                  Duration: {service?.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end mt-auto">
            <Link
              href={`/treatments/services/${service?.slug}`}
              className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-conversion hover:bg-conversion/90 text-conversion-foreground text-sm md:text-base font-cta font-semibold rounded-md transition-all duration-fast hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <Icon name="ArrowRightIcon" size={16} variant="outline" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  service: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    title: PropTypes?.string?.isRequired,
    slug: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    icon: PropTypes?.string?.isRequired,
    painlessFeature: PropTypes?.string?.isRequired,
    duration: PropTypes?.string?.isRequired,
    isEmergency: PropTypes?.bool,
  })?.isRequired,
};
