import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ClinicHours({ schedule, specialNotes }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary rounded-lg">
                <Icon name="ClockIcon" size={28} variant="outline" className="text-white" />
              </div>
              <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
                Clinic Hours
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-elevation-sm p-6 md:p-8 space-y-4">
              {schedule?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <span className="font-body text-sm md:text-base font-medium text-text-primary">
                    {item?.day}
                  </span>
                  <span
                    className={`font-body text-sm md:text-base font-semibold ${
                      item?.closed ? 'text-destructive' : 'text-success'
                    }`}
                  >
                    {item?.closed ? 'Closed' : item?.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-accent rounded-lg">
                <Icon
                  name="InformationCircleIcon"
                  size={28}
                  variant="outline"
                  className="text-white"
                />
              </div>
              <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
                Important Notes
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-elevation-sm p-6 md:p-8 space-y-4">
              {specialNotes?.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    variant="solid"
                    className="text-success flex-shrink-0 mt-1"
                  />
                  <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ClinicHours.propTypes = {
  schedule: PropTypes?.arrayOf(
    PropTypes?.shape({
      day: PropTypes?.string?.isRequired,
      hours: PropTypes?.string,
      closed: PropTypes?.bool,
    })
  )?.isRequired,
  specialNotes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
};
