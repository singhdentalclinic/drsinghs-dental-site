import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CaseStudyCard({
  title,
  treatment,
  duration,
  complexity,
  description,
  images,
  results,
}) {
  return (
    <div className="w-full min-w-0 bg-card rounded-xl overflow-hidden shadow-elevation-md hover:shadow-elevation-lg transition-all duration-normal">
      <div className="grid grid-cols-2 gap-2 p-2">
        {images?.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg bg-muted">
            <AppImage src={image?.url} alt={image?.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <Icon
              name="ClockIcon"
              size={20}
              variant="outline"
              className="text-primary mx-auto mb-1"
            />
            <p className="font-body text-xs md:text-sm text-text-secondary line-clamp-1">
              {duration}
            </p>
          </div>
          <div className="text-center">
            <Icon
              name="BeakerIcon"
              size={20}
              variant="outline"
              className="text-primary mx-auto mb-1"
            />
            <p className="font-body text-xs md:text-sm text-text-secondary line-clamp-1">
              {treatment}
            </p>
          </div>
          <div className="text-center">
            <Icon
              name="ChartBarIcon"
              size={20}
              variant="outline"
              className="text-primary mx-auto mb-1"
            />
            <p className="font-body text-xs md:text-sm text-text-secondary line-clamp-1">
              {complexity}
            </p>
          </div>
        </div>

        <p className="font-body text-sm md:text-base text-text-primary mb-4 line-clamp-3">
          {description}
        </p>

        <div className="bg-success/10 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
            <span className="font-body text-sm md:text-base font-semibold text-success">
              Treatment Results
            </span>
          </div>
          <ul className="space-y-1">
            {results?.map((result, index) => (
              <li
                key={index}
                className="font-body text-xs md:text-sm text-text-primary flex items-start gap-2"
              >
                <Icon
                  name="CheckIcon"
                  size={14}
                  variant="solid"
                  className="text-success mt-0.5 flex-shrink-0"
                />
                <span className="line-clamp-2">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

CaseStudyCard.propTypes = {
  title: PropTypes?.string?.isRequired,
  treatment: PropTypes?.string?.isRequired,
  duration: PropTypes?.string?.isRequired,
  complexity: PropTypes?.string?.isRequired,
  description: PropTypes?.string?.isRequired,
  images: PropTypes?.arrayOf(
    PropTypes?.shape({
      url: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  results: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
};
