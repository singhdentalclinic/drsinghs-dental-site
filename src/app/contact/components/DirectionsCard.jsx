import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function DirectionsCard({ directions }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3 md:mb-4">
            Directions from Major Cities
          </h2>
          <p className="font-body text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Find the fastest route to our clinic without any hassle. Tap on any location pin below
            around Ramnagar to open directions in Google Maps and reach us with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {directions?.map((direction, index) => {
            const CardContent = (
              <>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg">
                    <Icon name="MapIcon" size={24} variant="outline" className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary">
                      {direction?.city}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-text-secondary">
                      {direction?.distance}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="ClockIcon"
                      size={16}
                      variant="outline"
                      className="text-accent flex-shrink-0"
                    />
                    <span className="font-body text-sm md:text-base text-text-secondary">
                      {direction?.duration}
                    </span>
                  </div>
                  <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed pl-6">
                    {direction?.route}
                  </p>
                </div>
              </>
            );

            return direction.mapsLink ? (
              <a
                key={index}
                href={direction.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300 p-6 md:p-8 block cursor-pointer hover:ring-2 hover:ring-primary/20 hover:scale-105 h-full flex flex-col min-h-[250px]"
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={index}
                className="bg-white rounded-lg shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300 p-6 md:p-8 hover:scale-105 h-full flex flex-col"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

DirectionsCard.propTypes = {
  directions: PropTypes?.arrayOf(
    PropTypes?.shape({
      city: PropTypes?.string?.isRequired,
      distance: PropTypes?.string?.isRequired,
      duration: PropTypes?.string?.isRequired,
      route: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};
