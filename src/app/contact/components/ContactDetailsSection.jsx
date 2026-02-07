import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';

export default function ContactDetailsSection({ scheduleData, contactData }) {
  // Find today's day name to highlight
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Map & Location Card (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-elevation-sm overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Map Area */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative border-8 border-white rounded-3xl overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d869.047812782366!2d79.1268153!3d29.3939608!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a13779f87115f%3A0x231c606bd46e79d9!2sSingh%20Dental%20Clinic%20and%20Implant%20center%20-%20Dental%20Clinic%20in%20Ramnagar!5e0!3m2!1sen!2sin!4v1767253615160!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Location Info Area */}
            <div className="w-full md:w-1/2 p-5 md:p-6 flex flex-col">
              {/* Clinic Image Placeholder - Replacing with a generic dental clinic interior or using a placeholder if no asset exists */}
              {/* Ideally this would be a real image from the project assets */}
              <div className="w-full flex-1 bg-gray-50 rounded-lg mb-4 overflow-hidden relative border border-gray-100">
                <Image
                  src="/assets/images/clinic/clinic_building.png"
                  alt="Singh Dental Clinic Building"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="mt-auto">
                <h3 className="font-headline text-xl font-bold text-text-primary mb-2">Location</h3>
                <p className="font-body text-text-secondary text-sm md:text-base mb-2">
                  {contactData?.contactDetails?.find((c) => c.type === 'location')?.value}
                </p>
                <a
                  href={contactData?.contactDetails?.find((c) => c.type === 'location')?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cta text-primary font-semibold text-sm md:text-base inline-flex items-center gap-1 hover:underline"
                >
                  Get Direction
                  <Icon name="ArrowTopRightOnSquareIcon" size={16} variant="outline" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Opening Hours */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-elevation-sm p-6 md:p-8 h-[500px] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-blue-50">
                <Icon name="ClockIcon" size={24} variant="outline" className="text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-text-primary">Opening Hours</h3>
            </div>

            <div className="space-y-3">
              {scheduleData?.schedule?.map((item, index) => {
                const isToday = item.day === today;
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 ${isToday ? 'bg-blue-50 -mx-4 px-4 rounded-md' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      {isToday && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                      <span
                        className={`font-body text-sm md:text-base ${isToday ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}
                      >
                        {item?.day}
                      </span>
                    </div>

                    <span
                      className={`font-body text-sm md:text-base font-semibold ${
                        item?.closed ? 'text-red-500' : 'text-text-primary'
                      }`}
                    >
                      {item?.closed ? 'CLOSED' : item?.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ContactDetailsSection.propTypes = {
  scheduleData: PropTypes.object.isRequired,
  contactData: PropTypes.object.isRequired,
};
