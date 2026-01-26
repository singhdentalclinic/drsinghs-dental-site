import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ContactInfo({ contactDetails }) {
  const iconMap = {
    phone: 'PhoneIcon',
    email: 'EnvelopeIcon',
    location: 'MapPinIcon',
    emergency: 'ExclamationTriangleIcon',
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3 md:mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Multiple ways to reach us for appointments, inquiries, or emergency dental care
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactDetails?.map((detail, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-elevation-sm hover:shadow-elevation-md transition-all duration-normal p-6 md:p-8 text-center group"
            >
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full mx-auto mb-4 md:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-normal">
                <Icon
                  name={iconMap?.[detail?.type]}
                  size={32}
                  variant="outline"
                  className="text-primary group-hover:text-white transition-colors duration-normal"
                />
              </div>
              <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary mb-2 md:mb-3">
                {detail?.title}
              </h3>
              {detail?.link ? (
                <a
                  href={detail?.link}
                  className="font-body text-sm md:text-base text-primary hover:text-secondary transition-colors duration-fast font-medium break-words"
                >
                  {detail?.value}
                </a>
              ) : (
                <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                  {detail?.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ContactInfo.propTypes = {
  contactDetails: PropTypes?.arrayOf(
    PropTypes?.shape({
      type: PropTypes?.oneOf(['phone', 'email', 'location', 'emergency'])?.isRequired,
      title: PropTypes?.string?.isRequired,
      value: PropTypes?.string?.isRequired,
      link: PropTypes?.string,
    })
  )?.isRequired,
};
