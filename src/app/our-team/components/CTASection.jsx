import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection({ cta }) {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full mb-6">
            <Icon name="CalendarDaysIcon" size={32} variant="solid" className="text-white" />
          </div>

          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
            {cta?.title}
          </h2>

          <p className="font-body text-base md:text-lg text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            {cta?.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-8 py-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground font-cta text-base font-semibold rounded-md shadow-elevation-md hover:shadow-elevation-lg transition-all duration-fast hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-body text-base font-medium rounded-md border-2 border-white/30 transition-all duration-fast"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Icon name="PhoneIcon" size={20} variant="solid" />
              <span className="font-body text-sm md:text-base">+91 84498 30107</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Icon name="ClockIcon" size={20} variant="solid" />
              <span className="font-body text-sm md:text-base">Mon-Sun: 9 AM - 8 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

CTASection.propTypes = {
  cta: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
  })?.isRequired,
};
