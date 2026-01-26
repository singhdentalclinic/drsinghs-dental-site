import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import NextPageButton from '@/components/ui/nextpagebutton';

export default function DoctorExpertise({ doctor }) {
  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-[#E6F4FE] text-[#009EE2] rounded-full border border-blue-50">
            <Icon name="UserIcon" size={20} variant="solid" className="text-[#009EE2]" />
            <span className="font-body text-sm md:text-base font-semibold">Meet Your Dentist</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative z-10">
          <div className="space-y-4 md:space-y-6">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-elevation-lg">
                <AppImage
                  src={doctor?.image}
                  alt={doctor?.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-muted rounded-xl shadow-elevation-lg border border-slate-200 p-4 md:p-6 transition-all duration-normal hover:shadow-elevation-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon
                      name="AcademicCapIcon"
                      size={32}
                      variant="solid"
                      className="text-orange-500"
                    />
                  </div>
                  <div>
                    <div className="font-headline text-2xl md:text-3xl font-semibold text-primary whitespace-nowrap">
                      {doctor?.experience}+
                    </div>
                    <div className="font-body text-xs md:text-sm text-text-secondary">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 bg-white shadow-card">
                <div>
                  <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-2">
                    {doctor?.name}
                  </h2>
                  <p className="font-body text-base md:text-lg text-blue-500 font-medium">
                    {doctor?.qualification}
                  </p>
                </div>

                <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed">
                  {doctor?.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctor?.highlights?.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-primary/10 rounded-xl"
                    >
                      <Icon
                        name="CheckBadgeIcon"
                        size={24}
                        variant="solid"
                        className="text-success flex-shrink-0 text-green-800"
                      />
                      <span className="font-body text-sm md:text-base text-text-primary">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4 bg-white shadow-card">
                <h3 className="font-headline text-xl md:text-2xl font-semibold text-text-primary">
                  Certifications & Memberships
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor?.certifications?.map((cert, index) => (
                    <div
                      key={index}
                      className="px-3 md:px-4 py-2 bg-primary/10 text-primary rounded-full font-body text-xs md:text-sm font-medium"
                    >
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <NextPageButton href="/about">Read Full Story</NextPageButton>
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-muted text-primary font-body text-base md:text-lg font-semibold rounded-lg border-2 border-primary transition-all duration-fast"
              >
                <Icon name="CalendarIcon" size={20} variant="solid" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

DoctorExpertise.propTypes = {
  doctor: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    qualification: PropTypes?.string?.isRequired,
    experience: PropTypes?.number?.isRequired,
    bio: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    highlights: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    certifications: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
};
