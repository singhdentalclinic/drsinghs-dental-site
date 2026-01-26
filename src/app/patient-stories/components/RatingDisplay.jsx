import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RatingDisplay({ rating, reviewCount }) {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 md:p-8 lg:p-10 shadow-elevation-lg text-center">
      <div className="flex items-center justify-center mb-4">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="StarIcon"
            size={32}
            variant="solid"
            className={`${star <= Math.floor(rating) ? 'text-accent' : 'text-white/30'} mx-1`}
          />
        ))}
      </div>
      <div className="mb-2">
        <span className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-white whitespace-nowrap">
          {rating}
        </span>
        <span className="font-body text-xl md:text-2xl text-white/80 ml-2">/ 5.0</span>
      </div>
      <p className="font-body text-base md:text-lg text-white/90">
        Based on <span className="font-semibold">{reviewCount}+</span> verified patient reviews
      </p>
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="font-body text-sm md:text-base text-white/80">
          Trusted by patients across Uttarakhand
        </p>
      </div>
    </div>
  );
}

RatingDisplay.propTypes = {
  rating: PropTypes?.number?.isRequired,
  reviewCount: PropTypes?.number?.isRequired,
};
