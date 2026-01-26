import SocialButtons from '@/app/patient-stories/components/socialmediaicons';

export default function SocialConnect() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-3 md:mb-4">
          Connect With Us
        </h2>
        <p className="font-body text-sm md:text-base lg:text-lg text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto">
          Follow us on social media for regular dental health tips, patient success stories, and
          clinic updates
        </p>

        <SocialButtons />
        <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border">
          <p className="font-body text-sm md:text-base text-text-secondary mb-4">
            For immediate assistance, reach us via WhatsApp*
          </p>
        </div>
      </div>
    </section>
  );
}
