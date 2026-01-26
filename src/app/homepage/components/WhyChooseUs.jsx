import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function WhyChooseUs({ features }) {
  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Icon name="ShieldCheckIcon" size={20} variant="solid" />
            <span className="font-body text-sm md:text-base font-medium">Why Choose Us</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
            Your Comfort, Our Priority
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
            Experience the difference of patient-centered care with modern technology and
            compassionate expertise
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 -mx-4 px-4 pb-6 snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:mx-0 sm:px-0 sm:overflow-visible sm:snap-none sm:pb-0">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="flex-none w-[85vw] snap-center sm:w-auto bg-white rounded-xl shadow-elevation-sm hover:shadow-elevation-md transition-all duration-normal p-6 md:p-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Icon name={feature?.icon} size={32} variant="solid" className="text-white" />
              </div>

              <h3 className="font-headline text-xl md:text-2xl font-semibold text-text-primary mb-3 md:mb-4 line-clamp-2">
                {feature?.title}
              </h3>

              <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3">
                {feature?.description}
              </p>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="CheckCircleIcon" size={20} variant="solid" />
                  <span className="font-body text-sm md:text-base font-medium">
                    {feature?.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

WhyChooseUs.propTypes = {
  features: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired,
      badge: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};
