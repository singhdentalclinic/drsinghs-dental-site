import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function EmergencyContact({ contactInfo }) {
  return (
    <div className="w-full bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-elevation-md border-2 border-error/20">
      <div className="flex items-center space-x-3 mb-4 md:mb-6">
        <div className="p-3 bg-error rounded-lg animate-pulse">
          <Icon name="ExclamationTriangleIcon" size={24} variant="solid" className="text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-headline font-semibold text-error">
          Emergency Dental Care
        </h3>
      </div>
      <p className="text-sm md:text-base text-text-secondary mb-6 md:mb-8 leading-relaxed">
        Experiencing severe tooth pain, trauma, or dental emergency? We provide 24/7 emergency
        dental services. Contact us immediately for urgent care.
      </p>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
          <div className="p-3 bg-error/10 rounded-lg">
            <Icon name="PhoneIcon" size={24} variant="solid" className="text-error" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Emergency Hotline (24/7)</p>
            <Link
              href={`tel:${contactInfo?.emergencyPhone}`}
              className="text-xl md:text-2xl font-bold text-error hover:text-error/80 transition-colors duration-fast whitespace-nowrap"
            >
              {contactInfo?.emergencyPhone}
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon name="EnvelopeIcon" size={24} variant="solid" className="text-primary" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary mb-1">Emergency Email</p>
            <Link
              href={`mailto:${contactInfo?.emergencyEmail}`}
              className="text-base md:text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-fast"
            >
              {contactInfo?.emergencyEmail}
            </Link>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h4 className="text-base md:text-lg font-semibold text-text-primary mb-3">
            Common Dental Emergencies We Handle:
          </h4>
          <ul className="space-y-2">
            {contactInfo?.emergencyTypes?.map((type, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon
                  name="CheckCircleIcon"
                  size={18}
                  variant="solid"
                  className="text-success mt-0.5 flex-shrink-0"
                />
                <span className="text-sm md:text-base text-text-secondary">{type}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start space-x-2 p-4 bg-accent/10 rounded-lg">
          <Icon
            name="ClockIcon"
            size={20}
            variant="solid"
            className="text-accent mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-sm md:text-base font-semibold text-text-primary mb-1">
              Average Response Time
            </p>
            <p className="text-xs md:text-sm text-text-secondary">{contactInfo?.responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

EmergencyContact.propTypes = {
  contactInfo: PropTypes?.shape({
    emergencyPhone: PropTypes?.string?.isRequired,
    emergencyEmail: PropTypes?.string?.isRequired,
    responseTime: PropTypes?.string?.isRequired,
    emergencyTypes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
};
