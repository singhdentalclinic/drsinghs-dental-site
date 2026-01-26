import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import NextPageButton from '@/components/ui/nextpagebutton';

export default function TreatmentSpecialties({ treatments }) {
  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
            <Icon name="SparklesIcon" size={20} variant="solid" />
            <span className="font-body text-sm md:text-base font-medium">Our Specialties</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
            Comprehensive Dental Solutions
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
            From routine checkups to advanced procedures, we offer complete dental care with
            painless treatments and modern technology
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 -mx-4 px-4 pt-6 pb-6 snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:mx-0 sm:px-0 sm:pt-0 sm:overflow-visible sm:snap-none sm:pb-0">
          {treatments?.map((treatment) => (
            <div
              key={treatment?.id}
              className="flex-none w-[85vw] snap-center sm:w-auto group bg-white rounded-xl border border-gray-100 shadow-elevation-sm hover:shadow-elevation-lg transform transition-all duration-normal ease-in-out hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <AppImage
                  src={treatment?.image}
                  alt={treatment?.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
                />
              </div>

              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center space-x-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={treatment?.icon}
                      size={24}
                      variant="outline"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="font-headline text-lg md:text-xl lg:text-2xl font-semibold text-text-primary line-clamp-2">
                    {treatment?.name}
                  </h3>
                </div>

                <p className="font-body text-sm md:text-base text-text-secondary mb-4 md:mb-6 line-clamp-3">
                  {treatment?.description}
                </p>

                <div className="space-y-2 mb-4 md:mb-6">
                  {treatment?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon
                        name="CheckCircleIcon"
                        size={18}
                        variant="solid"
                        className="text-success mt-0.5 flex-shrink-0"
                      />
                      <span className="font-body text-xs md:text-sm text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-body text-sm md:text-base font-semibold transition-colors duration-fast"
                >
                  <span>Learn More</span>
                  <Icon name="ArrowRightIcon" size={16} variant="outline" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <NextPageButton href="/services">View All Services</NextPageButton>
        </div>
      </div>
    </section>
  );
}

TreatmentSpecialties.propTypes = {
  treatments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
