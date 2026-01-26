import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function TreatmentProcess({ steps }) {
  return (
    <div className="w-full bg-card rounded-lg p-6 md:p-8 lg:p-10 shadow-elevation-sm">
      <div className="flex items-center space-x-3 mb-6 md:mb-8">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon
            name="ClipboardDocumentListIcon"
            size={24}
            variant="solid"
            className="text-primary"
          />
        </div>
        <h3 className="text-2xl md:text-3xl font-headline font-semibold text-text-primary">
          Treatment Process
        </h3>
      </div>
      <div className="space-y-4 md:space-y-6">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-start space-x-4 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-lg md:text-xl font-bold text-white">{index + 1}</span>
              </div>
            </div>

            <div className="flex-1 pt-1">
              <h4 className="text-base md:text-lg font-semibold text-text-primary mb-2">
                {step?.title}
              </h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                {step?.description}
              </p>
              {step?.duration && (
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="ClockIcon" size={16} variant="outline" className="text-primary" />
                  <span className="text-xs md:text-sm text-primary font-medium">
                    {step?.duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TreatmentProcess.propTypes = {
  steps: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      duration: PropTypes?.string,
    })
  )?.isRequired,
};
