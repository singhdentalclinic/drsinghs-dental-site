import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ hero }) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="font-body text-xs md:text-sm font-medium text-accent">
                {hero?.badge}
              </span>
            </div>

            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight">
              {hero?.title}
            </h1>

            <p className="font-body text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed">
              {hero?.description}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              {hero?.stats?.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-primary whitespace-nowrap">
                    {stat?.value}
                  </span>
                  <span className="font-body text-xs md:text-sm text-text-secondary mt-1">
                    {stat?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-elevation-lg">
              <AppImage
                src={hero?.image}
                alt={hero?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  hero: PropTypes?.shape({
    badge: PropTypes?.string?.isRequired,
    title: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    imageAlt: PropTypes?.string?.isRequired,
    stats: PropTypes?.arrayOf(
      PropTypes?.shape({
        value: PropTypes?.string?.isRequired,
        label: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
};
