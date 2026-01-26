import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ParkingInfo({ parkingDetails }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-elevation-md p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary rounded-lg">
              <Icon name="TruckIcon" size={28} variant="outline" className="text-white" />
            </div>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
              Parking & Accessibility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary mb-4">
                Parking Facilities
              </h3>
              {parkingDetails?.facilities?.map((facility, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    variant="solid"
                    className="text-success flex-shrink-0 mt-1"
                  />
                  <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                    {facility}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary mb-4">
                Public Transportation
              </h3>
              {parkingDetails?.publicTransport?.map((transport, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon
                    name="MapPinIcon"
                    size={20}
                    variant="solid"
                    className="text-secondary flex-shrink-0 mt-1"
                  />
                  <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                    {transport}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
            <div className="bg-accent/10 rounded-lg p-4 md:p-6 flex items-start gap-3">
              <Icon
                name="InformationCircleIcon"
                size={24}
                variant="solid"
                className="text-accent flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-cta text-base md:text-lg font-semibold text-text-primary mb-2">
                  Accessibility Note
                </h4>
                <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                  {parkingDetails?.accessibilityNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ParkingInfo.propTypes = {
  parkingDetails: PropTypes?.shape({
    facilities: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    publicTransport: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    accessibilityNote: PropTypes?.string?.isRequired,
  })?.isRequired,
};
