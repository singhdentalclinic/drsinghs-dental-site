import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PhilosophySection({ philosophy }) {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full mb-6">
              <Icon name="HeartIcon" size={32} variant="solid" className="text-primary" />
            </div>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-4">
              {philosophy?.title}
            </h2>
            <p className="font-body text-base md:text-lg text-text-secondary">
              {philosophy?.subtitle}
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 md:p-10 lg:p-12 mb-12">
            <blockquote className="relative">
              <Icon
                name="ChatBubbleLeftIcon"
                size={40}
                variant="solid"
                className="text-primary/20 absolute -top-4 -left-2"
              />
              <p className="font-body text-base md:text-lg lg:text-xl text-text-primary leading-relaxed italic pl-8">
                {philosophy?.quote}
              </p>
              <footer className="mt-6 flex items-center space-x-3 pl-8">
                <div className="w-1 h-12 bg-primary rounded-full"></div>
                <div>
                  <p className="font-headline text-base md:text-lg font-semibold text-text-primary">
                    {philosophy?.author}
                  </p>
                  <p className="font-body text-xs md:text-sm text-text-secondary">
                    {philosophy?.authorTitle}
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {philosophy?.values?.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 md:p-8 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-normal"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={value?.icon} size={20} variant="solid" className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline text-base md:text-lg font-semibold text-text-primary mb-2">
                      {value?.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-text-secondary">
                      {value?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

PhilosophySection.propTypes = {
  philosophy: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    subtitle: PropTypes?.string?.isRequired,
    quote: PropTypes?.string?.isRequired,
    author: PropTypes?.string?.isRequired,
    authorTitle: PropTypes?.string?.isRequired,
    values: PropTypes?.arrayOf(
      PropTypes?.shape({
        icon: PropTypes?.string?.isRequired,
        title: PropTypes?.string?.isRequired,
        description: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
};
