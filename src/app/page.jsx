import Header from '@/components/common/Header';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import HeroSection from './homepage/components/HeroSection';
import VideoTestimonials from './homepage/components/testimonials';
import TreatmentSpecialties from './homepage/components/TreatmentSpecialties';
import DoctorExpertise from './homepage/components/DoctorExpertise';
import PatientReviews from './homepage/components/PatientReviews';
import WhyChooseUs from './homepage/components/WhyChooseUs';
import AppointmentCTA from './homepage/components/AppointmentCTA';
import ImagesCarousel from './homepage/components/imagescarousel';
import FAQ from './homepage/components/faq';
import Footer from '@/components/common/Footer';
import { BackgroundProvider } from '@/contexts/BackgroundContext';
import { BackgroundDisplay, BackgroundTrigger } from '@/components/common/ImmersiveBackground';

export const metadata = {
  title: 'Singh Dental Clinic - Advanced Care, Human Touch | Ramnagar, Uttarakhand',
  description:
    "Experience painless dental treatments with Dr. Pradeep Singh's 20+ years of expertise. 4.8-star rated dental clinic in Ramnagar offering root canal, implants, cosmetic dentistry & emergency care.",
};

export default function Home() {
  const pageData = {
    stats: {
      experience: 20,
      patients: 5000,
      implants: 5000,
      crowns: 8000,
      rating: 4.8,
      reviews: 384,
    },
    heroData: {
      testimonials: [
        {
          image:
            'https://img.rocket.new/generatedImages/rocket_gen_img_1d1a6cf71-1763301532880.png',
          alt: 'Smiling Indian woman in her 30s with long black hair wearing white traditional kurta in bright dental clinic',
          text: 'Dr. Singh transformed my smile completely! The root canal was absolutely painless, and the entire team made me feel so comfortable. I was terrified of dentists before, but now I actually look forward to my checkups. Highly recommend to anyone with dental anxiety!',
          name: 'Priya Sharma',
          treatment: 'Root Canal Treatment',
          tabletImage:
            'https://img.rocket.new/generatedImages/rocket_gen_img_1d1a6cf71-1763301532880.png',
        },
        {
          image:
            'https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png',
          alt: 'Professional Indian man in his 40s with short black hair wearing blue formal shirt smiling confidently',
          text: "After years of hiding my smile, Dr. Singh's cosmetic dentistry gave me the confidence I always wanted. The dental implants look and feel completely natural. The clinic's modern equipment and hygienic environment exceeded all my expectations. Worth every rupee!",
          name: 'Rajesh Kumar',
          treatment: 'Dental Implants',
          tabletImage:
            'https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png',
        },
        {
          image:
            'https://img.rocket.new/generatedImages/rocket_gen_img_1bf8f2d50-1763295612500.png',
          alt: 'Young Indian man in his 20s with beard wearing casual grey t-shirt showing bright smile',
          text: 'Best dental experience ever! Dr. Singh explained everything clearly and the teeth whitening results are amazing. The staff is incredibly friendly and professional. They even followed up after my treatment to ensure everything was perfect. Five stars all the way!',
          name: 'Amit Verma',
          treatment: 'Cosmetic Dentistry',
          tabletImage:
            'https://img.rocket.new/generatedImages/rocket_gen_img_1bf8f2d50-1763295612500.png',
        },
      ],
    },
    treatments: [
      {
        id: 1,
        name: 'Root Canal Treatment',
        description:
          'Advanced painless root canal therapy using modern rotary endodontics. Save your natural teeth with our gentle, precise treatment approach.',
        icon: 'BeakerIcon',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17415946d-1764726098639.png',
        alt: 'Close-up of modern dental equipment and tools for root canal treatment in sterile clinical setting',
        features: [
          'Single-sitting procedures available',
          'Digital X-ray guided precision',
          '99% success rate with follow-up care',
        ],
      },
      {
        id: 2,
        name: 'Dental Implants',
        description:
          'Permanent tooth replacement solutions using premium titanium implants. Restore your smile with natural-looking, long-lasting results.',
        icon: 'CubeIcon',
        image: 'https://images.unsplash.com/photo-1609918438269-9a4c5f8fe3a4',
        alt: 'Dental implant model showing titanium post and crown on white background with dental instruments',
        features: [
          'Lifetime warranty on implants',
          '3D imaging for perfect placement',
          'Same-day temporary crowns',
        ],
      },
      {
        id: 3,
        name: 'Cosmetic Dentistry',
        description:
          "Transform your smile with teeth whitening, veneers, and smile makeovers. Achieve the confident smile you've always dreamed of.",
        icon: 'SparklesIcon',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_159ccca2f-1764654468820.png',
        alt: 'Before and after comparison of teeth whitening treatment showing dramatic improvement in smile brightness',
        features: [
          'Professional teeth whitening',
          'Custom porcelain veneers',
          'Complete smile design consultations',
        ],
      },
      {
        id: 4,
        name: 'Preventive Care',
        description:
          'Comprehensive dental checkups, cleanings, and oral health education. Prevent problems before they start with regular care.',
        icon: 'ShieldCheckIcon',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13f9bd358-1764669220083.png',
        alt: 'Dental hygienist performing professional teeth cleaning on patient in modern clinic with protective equipment',
        features: [
          'Deep cleaning & scaling',
          'Fluoride treatments for all ages',
          'Personalized oral hygiene plans',
        ],
      },
      {
        id: 5,
        name: 'Pediatric Dentistry',
        description:
          'Gentle, child-friendly dental care in a comfortable environment. Building healthy smiles and positive dental experiences for kids.',
        icon: 'HeartIcon',
        image: 'https://images.unsplash.com/photo-1674775372046-ff6cd6cb8b68',
        alt: 'Smiling child patient sitting in dental chair with friendly dentist showing dental model in colorful pediatric clinic',
        features: [
          'Fear-free treatment approach',
          'Cavity prevention programs',
          'Parent education & guidance',
        ],
      },
      {
        id: 6,
        name: 'Emergency Dental Care',
        description:
          '24/7 emergency services for dental pain, trauma, and urgent situations. Immediate relief when you need it most.',
        icon: 'BoltIcon',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d7afda72-1765054215254.png',
        alt: 'Emergency dental treatment setup with urgent care equipment and pain relief medications in sterile environment',
        features: [
          'Same-day appointments available',
          'Pain management specialists',
          'After-hours emergency contact',
        ],
      },
    ],

    doctor: {
      name: 'Dr. Pradeep Singh',
      qualification: 'BDS, MDS (Endodontics)',
      experience: 20,
      bio: "With over two decades of dedicated service to dental health, Dr. Pradeep Singh has established himself as Uttarakhand's most trusted dental expert. His philosophy centers on 'Advanced Care, Human Touch' - combining cutting-edge technology with genuine compassion for every patient. Dr. Singh specializes in painless treatments and has successfully transformed thousands of smiles across the region. His commitment to continuing education ensures patients receive the most modern, evidence-based care available.",
      image: '/assets/images/clinic/Pradeep-Singh.jpg',
      alt: 'Dr. Pradeep Singh, experienced Indian dentist in his 50s wearing white medical coat and stethoscope, smiling warmly in modern dental clinic',
      highlights: [
        '20+ years clinical excellence',
        '5000+ successful implants',
        'Specialized in painless procedures',
        'Advanced endodontic expertise',
      ],

      certifications: [
        'Indian Dental Association',
        'Uttarakhand Dental Council',
        'Advanced Implantology',
        'Laser Dentistry Certified',
      ],
    },
    reviews: [
      {
        id: 1,
        name: 'Meera Patel',
        text: "I was absolutely terrified of dental procedures, but Dr. Singh and his team changed everything for me. The root canal was completely painless - I couldn't believe it! The clinic is spotlessly clean, and everyone treats you like family. They even called me the next day to check how I was feeling. This is what healthcare should be like!",
        treatment: 'Root Canal Treatment',
        date: 'December 2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d425f382-1764654468610.png',
        alt: 'Happy Indian woman in her 40s with shoulder-length black hair wearing yellow traditional dress smiling brightly',
      },
      {
        id: 2,
        name: 'Vikram Singh',
        text: "After losing my front tooth in an accident, I thought my confidence was gone forever. Dr. Singh's dental implant looks so natural that even I forget it's not my original tooth! The entire process was explained clearly, and the results exceeded my expectations. The investment in my smile was absolutely worth it.",
        treatment: 'Dental Implant',
        date: 'November 2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11f1b3ee2-1763295843469.png',
        alt: 'Confident Indian man in his 30s with short black hair and beard wearing navy blue shirt showing perfect smile',
      },
      {
        id: 3,
        name: 'Anjali Reddy',
        text: "Dr. Singh is a miracle worker! My teeth were severely stained from years of tea drinking, and I was too embarrassed to smile in photos. The teeth whitening treatment gave me results I never thought possible. Now I can't stop smiling! The staff is professional, caring, and the clinic uses the latest technology. Highly recommended!",
        treatment: 'Teeth Whitening',
        date: 'October 2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_101904fc7-1763294024485.png',
        alt: 'Young Indian woman in her 20s with long black hair wearing pink traditional outfit displaying bright confident smile',
      },
      {
        id: 4,
        name: 'Suresh Gupta',
        text: "As someone who neglected dental care for years, I was expecting the worst. Dr. Singh's team was incredibly understanding and never judgmental. They created a comprehensive treatment plan that fit my budget and schedule. The preventive care program has completely changed my oral health. I actually enjoy my dental visits now!",
        treatment: 'Comprehensive Dental Care',
        date: 'September 2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c45de680-1763295122064.png',
        alt: 'Middle-aged Indian man in his 50s with grey hair wearing white shirt smiling warmly showing healthy teeth',
      },
      {
        id: 5,
        name: 'Kavita Sharma',
        text: 'My 7-year-old daughter was terrified of dentists until we visited Singh Dental Clinic. Dr. Singh and his team were so patient and gentle with her. They explained everything in a way she could understand and made it fun! Now she actually looks forward to her checkups. Thank you for making dental care a positive experience for children!',
        treatment: 'Pediatric Dental Care',
        date: 'August 2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d8cd6cb1-1763300485347.png',
        alt: "Caring Indian mother in her 30s with long black hair wearing blue kurta smiling while holding daughter's hand",
      },
    ],

    overallRating: {
      rating: 4.8,
      totalReviews: 384,
    },
    features: [
      {
        id: 1,
        title: 'Painless Treatments',
        description:
          'Advanced anesthesia techniques and gentle procedures ensure your comfort throughout treatment. We use the latest pain management protocols to make your dental experience stress-free and comfortable.',
        icon: 'HandThumbUpIcon',
        badge: 'Patient Comfort First',
      },
      {
        id: 2,
        title: 'Modern Technology',
        description:
          'State-of-the-art equipment including digital X-rays, laser dentistry, and 3D imaging for precise diagnosis and treatment. Our investment in technology means better outcomes for you.',
        icon: 'ComputerDesktopIcon',
        badge: 'Latest Equipment',
      },
      {
        id: 3,
        title: 'Hygienic Environment',
        description:
          'Hospital-grade sterilization protocols and infection control measures. Every instrument is sterilized, and we maintain the highest standards of cleanliness for your safety.',
        icon: 'ShieldCheckIcon',
        badge: '100% Sterilized',
      },
      {
        id: 4,
        title: 'Experienced Team',
        description:
          '20+ years of combined expertise with continuous training in latest dental techniques. Our team stays updated with global best practices to provide you world-class care.',
        icon: 'UserGroupIcon',
        badge: 'Expert Professionals',
      },
      {
        id: 5,
        title: 'Affordable Care',
        description:
          "Transparent pricing with flexible payment options and insurance support. Quality dental care shouldn't break the bank - we offer competitive rates without compromising on excellence.",
        icon: 'CurrencyRupeeIcon',
        badge: 'Flexible Payment Plans',
      },
      {
        id: 6,
        title: 'Emergency Services',
        description:
          "24/7 emergency contact for urgent dental needs. Dental emergencies don't wait for business hours - neither do we. Immediate relief when you need it most.",
        icon: 'PhoneIcon',
        badge: 'Always Available',
      },
    ],

    ctaData: {
      title: 'Ready to Transform Your Smile?',
      subtitle:
        'Book your appointment today and experience the difference of compassionate, expert dental care.',
      buttonText: 'Schedule Consultation',
      buttonLink: '/contact',
      phone: '+91 84498 30107',
    },
  };

  return (
    <BackgroundProvider>
      <BackgroundDisplay />
      <Header transparent={true} />

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <HeroSection stats={pageData?.stats} heroData={pageData?.heroData} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <VideoTestimonials />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-background">
        <ScrollAnimation>
          <TreatmentSpecialties treatments={pageData?.treatments} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <DoctorExpertise doctor={pageData?.doctor} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <PatientReviews reviews={pageData?.reviews} overallRating={pageData?.overallRating} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <WhyChooseUs features={pageData?.features} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-background">
        <ScrollAnimation>
          <ImagesCarousel />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <AppointmentCTA ctaData={pageData?.ctaData} />
        </ScrollAnimation>
      </BackgroundTrigger>

      <BackgroundTrigger bgClass="bg-white">
        <ScrollAnimation>
          <FAQ
            faqData={{
              title: 'Frequently Asked Questions',
              description:
                'Everything you need to know before your visit. No confusion, just clarity.',
              questions: [
                {
                  question: 'How do I book an appointment?',
                  answer:
                    'Booking is simple! You can use the "Book Appointment" button above, call us directly at +91 84498 30107, or use the "Quick Appointment" form to select your preferred service and date.',
                },
                {
                  question: 'Do you accept walk-ins?',
                  answer:
                    'Yes, we welcome walk-ins for emergencies. However, for routine checkups and specific treatments, we highly recommend booking an appointment to avoid waiting times.',
                },
                {
                  question: 'Is the treatment painful?',
                  answer:
                    'Not at all. We specialize in painless dentistry using advanced anesthesia and gentle techniques. Our "Patient Comfort First" approach ensures a stress-free experience.',
                },
                {
                  question: 'What are your clinic timings?',
                  answer:
                    'We are open Monday to Sunday from 10:00 AM to 07:00 PM. On Fridays, we are open for emergency appointments only from 10:00 AM to 12:00 PM.',
                },
                {
                  question: 'Do you accept insurance?',
                  answer:
                    'Yes, we accept major insurance plans. Please contact our front desk with your policy details, and we will help you understand your coverage and benefits.',
                },
                {
                  question: 'What if I need to cancel or reschedule?',
                  answer:
                    'We understand plans change. Please give us at least 24 hours notice for cancellations or rescheduling so we can offer the slot to another patient in need.',
                },
              ],
            }}
          />
        </ScrollAnimation>
      </BackgroundTrigger>

      <Footer />
    </BackgroundProvider>
  );
}
