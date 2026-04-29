import Header from '@/components/common/Header';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import BookingInteractive from './components/BookingInteractive';

export const metadata = {
  title: 'Book Appointment - Singh Dental Clinic',
  description:
    'Schedule your dental appointment online with Dr. Pradeep Singh. Streamlined booking system with treatment consultation options, insurance verification, and secure patient forms.',
};

export default function BookAppointmentPage() {
  const pageData = {
    pageTitle: 'Book Your Appointment',
    pageDescription:
      'Schedule your visit with Dr. Pradeep Singh and experience advanced dental care with a human touch. Fill out the form below and our team will confirm your appointment within 2-4 hours.',
  };

  return (
    <main className="min-h-screen bg-background relative">
      <Header transparent={true} />
      <div className="absolute top-16 md:top-20 left-0 w-full px-6 xl:px-12 z-40 pointer-events-none">
        <div className="pointer-events-auto w-fit">
          <Breadcrumbs />
        </div>
      </div>
      <ScrollAnimation>
        <BookingInteractive initialData={pageData} />
      </ScrollAnimation>
    </main>
  );
}
