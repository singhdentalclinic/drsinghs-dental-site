import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function EmergencyContact({ className = '' }) {
  return (
    <div className={`bg-error/10 border border-error rounded-lg p-4 md:p-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <Icon
          name="ExclamationTriangleIcon"
          size={28}
          variant="solid"
          className="text-error flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-2">
            Dental Emergency?
          </h3>
          <p className="text-sm md:text-base text-text-secondary mb-4">
            If you are experiencing severe pain, bleeding, or a dental emergency, please call us
            immediately for urgent care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+911234567890"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-error text-error-foreground font-semibold rounded-md hover:bg-error/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300"
            >
              <Icon name="PhoneIcon" size={20} variant="solid" />
              <span>Call Emergency: +91 123 456 7890</span>
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-success text-success-foreground font-semibold rounded-md hover:bg-success/90 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
              <span>WhatsApp</span>
            </a>
          </div>
          <p className="text-xs text-text-secondary mt-3">Available 24/7 for dental emergencies</p>
        </div>
      </div>
    </div>
  );
}

EmergencyContact.propTypes = {
  className: PropTypes?.string,
};
