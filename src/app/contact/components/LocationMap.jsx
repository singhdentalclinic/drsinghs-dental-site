import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SocialConnect({ socialLinks }) {
  const iconMap = {
    facebook: 'ShareIcon',
    instagram: 'CameraIcon',
    twitter: 'ChatBubbleLeftIcon',
    youtube: 'VideoCameraIcon',
    whatsapp: 'ChatBubbleOvalLeftEllipsisIcon',
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3 md:mb-4">
          Connect With Us
        </h2>
        <p className="font-body text-sm md:text-base lg:text-lg text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto">
          Follow us on social media for dental health tips, patient success stories, and clinic
          updates
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white hover:bg-primary rounded-full shadow-elevation-sm hover:shadow-elevation-md transition-all duration-normal group"
              aria-label={social?.platform}
            >
              <Icon
                name={iconMap?.[social?.platform]}
                size={28}
                variant="outline"
                className="text-primary group-hover:text-white transition-colors duration-normal"
              />
            </a>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border">
          <p className="font-body text-sm md:text-base text-text-secondary mb-4">
            For immediate assistance, reach us via WhatsApp
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-success hover:bg-success/90 text-white font-cta text-sm md:text-base font-semibold rounded-md shadow-elevation-sm hover:shadow-elevation-md transition-all duration-fast"
          >
            <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={20} variant="solid" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

SocialConnect.propTypes = {
  socialLinks: PropTypes?.arrayOf(
    PropTypes?.shape({
      platform: PropTypes?.oneOf(['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp'])
        ?.isRequired,
      url: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};
