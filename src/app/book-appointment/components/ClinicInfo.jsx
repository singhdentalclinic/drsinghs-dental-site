import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ClinicInfo({ className = '' }) {
  const clinicHours = [
    { day: 'Monday - Friday', hours: '09:00 AM - 08:00 PM' },
    { day: 'Saturday', hours: '09:00 AM - 06:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 04:00 PM' },
  ];

  const contactInfo = [
    {
      icon: 'PhoneIcon',
      label: 'Phone',
      value: '+91 8449830107',
      link: 'tel:+918449830107',
    },
    {
      icon: 'EnvelopeIcon',
      label: 'Email',
      value: 'info@singhdentalclinic.com',
      link: 'mailto:info@singhdentalclinic.com',
    },
    {
      icon: 'MapPinIcon',
      label: 'Address',
      value: 'Singh Dental Clinic, Main Road, Ramnagar, Uttarakhand 244715',
      link: 'https://maps.google.com/?q=29.3919,79.1289',
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-card rounded-lg p-6 shadow-elevation-sm">
        <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="ClockIcon" size={24} variant="outline" className="mr-2 text-primary" />
          Clinic Hours
        </h3>
        <div className="space-y-3">
          {clinicHours?.map((schedule, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-border last:border-0"
            >
              <span className="text-sm md:text-base font-medium text-text-primary">
                {schedule?.day}
              </span>
              <span className="text-sm md:text-base text-text-secondary">{schedule?.hours}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg p-6 shadow-elevation-sm">
        <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
          <Icon
            name="InformationCircleIcon"
            size={24}
            variant="outline"
            className="mr-2 text-primary"
          />
          Contact Information
        </h3>
        <div className="space-y-4">
          {contactInfo?.map((info, index) => (
            <a
              key={index}
              href={info?.link}
              target={info?.icon === 'MapPinIcon' ? '_blank' : undefined}
              rel={info?.icon === 'MapPinIcon' ? 'noopener noreferrer' : undefined}
              className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-all duration-300 group"
            >
              <Icon
                name={info?.icon}
                size={20}
                variant="solid"
                className="text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary mb-1">{info?.label}</p>
                <p className="text-sm md:text-base text-text-primary font-medium break-words">
                  {info?.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="bg-primary/10 border border-primary rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon
            name="ShieldCheckIcon"
            size={24}
            variant="solid"
            className="text-primary flex-shrink-0 mt-1"
          />
          <div className="flex-1">
            <h4 className="text-base font-semibold text-text-primary mb-2">Your Privacy Matters</h4>
            <p className="text-sm text-text-secondary">
              All information provided is encrypted and stored securely. We comply with HIPAA
              regulations and never share your personal health information without your consent.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-accent/10 border border-accent rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon
            name="StarIcon"
            size={24}
            variant="solid"
            className="text-accent flex-shrink-0 mt-1"
          />
          <div className="flex-1">
            <h4 className="text-base font-semibold text-text-primary mb-2">
              Trusted by 384+ Patients
            </h4>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="StarIcon"
                    size={16}
                    variant="solid"
                    className={star <= 4 ? 'text-accent' : 'text-accent/50'}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-text-primary">4.8/5</span>
            </div>
            <p className="text-sm text-text-secondary">
              Join hundreds of satisfied patients who trust Dr. Pradeep Singh for their dental care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ClinicInfo.propTypes = {
  className: PropTypes?.string,
};
