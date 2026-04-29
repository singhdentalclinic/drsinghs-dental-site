import Header from '@/components/common/Header';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import ContactHero from './components/ContactHero';
import ContactDetailsSection from './components/ContactDetailsSection';
import DirectionsCard from './components/DirectionsCard';
import ContactForm from './components/ContactForm';
import ParkingInfo from './components/ParkingInfo';
import SocialConnect from './components/SocialConnect';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'Contact Us - Singh Dental Clinic',
  description:
    'Get in touch with Singh Dental Clinic in Ramnagar. Find our location, clinic hours, emergency contact, and directions from major Uttarakhand cities. 24/7 emergency dental care available.',
};

export default function ContactPage() {
  const heroData = {
    title: 'Get in Touch',
    description:
      'Need a dental consultation, emergency care, or appointment booking?\nCall, WhatsApp, or visit our clinic we are here to help.',
    emergencyPhone: '+91 84498 30107',
  };

  const mapData = {
    latitude: 29.3919,
    longitude: 79.1289,
    clinicName: 'Singh Dental Clinic, Ramnagar',
  };

  const scheduleData = {
    schedule: [
      { day: 'Monday', hours: '09:00 AM - 07:00 PM', closed: false },
      { day: 'Tuesday', hours: '09:00 AM - 08:00 PM', closed: false },
      { day: 'Wednesday', hours: '09:00 AM - 08:00 PM', closed: false },
      { day: 'Thursday', hours: '09:00 AM - 08:00 PM', closed: false },
      { day: 'Friday', hours: '10:00 AM - 02:00 PM', closed: false },
      { day: 'Saturday', hours: '09:00 AM - 08:00 PM', closed: false },
      { day: 'Sunday', hours: '09:00 AM - 08:00 PM', closed: false },
    ],
    specialNotes: [
      'Emergency dental services available - call our contact number',
      'Extended evening hours on weekdays for working professionals',
      'Friday appointments available for urgent cases and consultations',
      'Closed on major national holidays - check our social media for updates',
      'Walk-in patients welcome, do consider calling before visiting for shorter wait time',
    ],
  };

  const contactData = {
    contactDetails: [
      {
        type: 'phone',
        title: 'Phone Number',
        value: '+91 84498 30107',
        link: 'tel:+918449830107',
      },
      {
        type: 'email',
        title: 'Email Address',
        value: 'info@singhdental.com',
        link: 'mailto:info@singhdental.com',
      },
      {
        type: 'location',
        title: 'Clinic Address',
        value: 'Main Market, Near State Bank, Ramnagar, Uttarakhand 244715',
        link: 'https://maps.app.goo.gl/V1mdYmp89LHGjQ377',
      },
      {
        type: 'whatsapp',
        title: 'WhatsApp',
        value: '+91 84498 30107',
        link: 'https://wa.me/918449830107',
      },
    ],
  };

  const directionsData = {
    directions: [
      {
        city: 'Corbett National Park',
        distance: '2 km',
        duration: '7 min',
        route: 'Head towards Ramnagar town center. Clinic is in Main Market.',
      },
      {
        city: 'Moradabad',
        distance: '90 km',
        duration: '2 hrs',
        route: 'Take NH9 to Kashipur, then NH121 to Ramnagar Main Market.',
      },
      {
        city: 'Nainital',
        distance: '63 km',
        duration: '1 hr 30 min',
        route:
          'Take NH109 towards Ramnagar. The clinic is located in Main Market, near State Bank.',
      },
      {
        city: 'Haldwani',
        distance: '52 km',
        duration: '1 hr 15 min',
        route: 'Follow NH109 through Kaladhungi. Continue straight to Ramnagar Main Market.',
      },
      {
        city: 'Rudrapur',
        distance: '75 km',
        duration: '1 hr 25 min',
        route: 'Take NH109 directly to Ramnagar. The clinic is in the central market area.',
      },
      {
        city: 'Dehradun',
        distance: '219 km',
        duration: '4 hr 48 min',
        route: 'Take NH7 to Haridwar, then NH119 to Kotdwar, and finally NH121 to Ramnagar.',
      },
    ].map((dir) => ({
      ...dir,
      mapsLink: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(dir.city)}&destination=${encodeURIComponent('Singh Dental Clinic, Ramnagar')}`,
    })),
  };

  const formData = {
    inquiryTypes: [
      'General Inquiry',
      'Appointment Booking',
      'Treatment Information',
      'Emergency Dental Care',
      'Insurance & Payment',
      'Patient Feedback',
      'Other',
    ],
  };

  const parkingData = {
    parkingDetails: {
      facilities: [
        'Free parking available for 20+ vehicles in our dedicated parking area',
        'Covered parking spaces for protection from weather',
        'Wheelchair-accessible parking spots near the entrance',
        'Two-wheeler parking with secure stands',
        'Well-lit parking area with 24/7 security surveillance',
      ],
      publicTransport: [
        'Main bus stand is 200 meters away - 3 minutes walking distance',
        'Auto-rickshaw stand directly opposite the clinic',
        'Shared taxi services available from Haldwani and Nainital',
        'Local buses stop at Main Market every 15 minutes',
      ],
      accessibilityNote:
        'Our clinic is fully wheelchair accessible with ramps at all entrances. We have dedicated parking for patients with mobility challenges, and our ground floor location ensures easy access for everyone.',
    },
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header transparent={true} />
      <div className="absolute top-16 md:top-20 left-0 w-full px-6 xl:px-12 z-40 pointer-events-none">
        <div className="pointer-events-auto w-fit">
          <Breadcrumbs />
        </div>
      </div>
      <main className="">
        <ScrollAnimation>
          <ContactHero
            title={heroData?.title}
            description={heroData?.description}
            emergencyPhone={heroData?.emergencyPhone}
          />
        </ScrollAnimation>
        <ScrollAnimation>
          <ContactDetailsSection
            mapData={mapData}
            scheduleData={scheduleData}
            contactData={contactData}
          />
        </ScrollAnimation>

        <ScrollAnimation>
          <DirectionsCard directions={directionsData?.directions} />
        </ScrollAnimation>
        <ScrollAnimation>
          <ContactForm inquiryTypes={formData?.inquiryTypes} />
        </ScrollAnimation>
        <ScrollAnimation>
          <ParkingInfo parkingDetails={parkingData?.parkingDetails} />
        </ScrollAnimation>
        <ScrollAnimation>
          <SocialConnect />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  );
}
