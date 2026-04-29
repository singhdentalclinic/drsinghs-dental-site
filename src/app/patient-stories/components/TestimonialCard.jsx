import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function TestimonialCard({
  patient,
  rating,
  testimonial,
  treatment,
  date,
  location,
}) {
  const colors = [
    'bg-emerald-100 text-emerald-600',
    'bg-muted text-primary',
    'bg-tertiary text-secondary',
    'bg-violet-100 text-violet-600',
    'bg-tertiary text-secondary',
    'bg-tertiary text-secondary',
    'bg-muted text-primary',
    'bg-muted text-primary',
    'bg-tertiary text-secondary',
    'bg-muted text-primary',
  ];

  // Simple hash to consistently pick a color for a name
  const nameHash = patient?.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
  const colorClass = colors[nameHash % colors.length];

  return (
    <div className="w-full min-w-0 bg-white rounded-xl p-4 md:p-6 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-normal">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full flex items-center justify-center ${colorClass}`}
        >
          <Icon name="UserIcon" size={32} variant="solid" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-base md:text-lg font-semibold text-text-primary mb-1 line-clamp-1">
            {patient?.name}
          </h3>
          <p className="font-body text-xs md:text-sm text-text-secondary mb-2 line-clamp-1">
            {location}
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <Icon
                key={star}
                name="StarIcon"
                size={16}
                variant="solid"
                className={star <= rating ? 'text-accent' : 'text-muted'}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="font-body text-sm md:text-base text-text-primary mb-4 line-clamp-4">
        {testimonial}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-success" />
          <span className="font-body text-xs md:text-sm text-text-secondary line-clamp-1">
            {treatment}
          </span>
        </div>
        <span className="font-body text-xs md:text-sm text-text-secondary whitespace-nowrap">
          {date}
        </span>
      </div>
    </div>
  );
}

TestimonialCard.propTypes = {
  patient: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
  })?.isRequired,
  rating: PropTypes?.number?.isRequired,
  testimonial: PropTypes?.string?.isRequired,
  treatment: PropTypes?.string?.isRequired,
  date: PropTypes?.string?.isRequired,
  location: PropTypes?.string?.isRequired,
};
