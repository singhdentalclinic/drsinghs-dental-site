import Header from '@/components/common/Header';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import TeamSection from './components/TeamSection';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import CertificationsSection from './components/CertificationsSection';
import CTASection from './components/CTASection';

export const metadata = {
  title: 'Our Team - Singh Dental Clinic',
  description:
    'Meet our dedicated team of dental professionals at Singh Dental Clinic. Our expert team combines clinical excellence with compassionate care to provide the best dental treatments in Uttarakhand.',
};

export default function AboutPage() {
  const teamData = [
    {
      name: 'Dr. Pradeep Singh',
      role: 'Founder & Chief Dental Surgeon',
      image: '/assets/images/clinic/Pradeep-Singh.jpg',
      imageAlt:
        'Professional portrait of Dr. Pradeep Singh, middle-aged Indian male dentist with warm smile in white dental coat',
      bio: 'With over 20 years of dedicated practice, Dr. Singh has transformed thousands of smiles across Uttarakhand. His patient-first approach combines clinical excellence with genuine compassion, making even the most anxious patients feel at ease.',
      education: 'BDS, MDS (Prosthodontics), Advanced Implantology Certification',
      experience: '20+ Years in Clinical Practice',
      rating: '4.9',
      specializations: [
        'Dental Implants',
        'Root Canal Therapy',
        'Cosmetic Dentistry',
        'Full Mouth Rehabilitation',
        'Prosthodontics',
      ],

      philosophy:
        'Every patient deserves painless treatment and a beautiful smile. My goal is not just to treat dental problems, but to build lasting relationships based on trust and exceptional care.',
    },
    {
      name: 'Dr. Neha Sharma',
      role: 'Associate Dentist & Cosmetic Specialist',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1826d86b3-1763294736715.png',
      imageAlt:
        'Professional portrait of Dr. Neha Sharma, young Indian female dentist with confident smile in white dental coat',
      bio: 'Dr. Neha brings fresh perspectives and advanced techniques to our practice. Her expertise in cosmetic dentistry and gentle approach makes her especially popular among patients seeking smile makeovers and aesthetic treatments.',
      education: 'BDS, Certificate in Aesthetic Dentistry, Invisalign Certified',
      experience: '8+ Years in Clinical Practice',
      rating: '4.8',
      specializations: [
        'Cosmetic Dentistry',
        'Teeth Whitening',
        'Invisalign Treatment',
        'Pediatric Dentistry',
        'Preventive Care',
      ],

      philosophy:
        'A beautiful smile can change your life. I combine artistry with science to create natural-looking results that boost confidence and improve oral health.',
    },
  ];

  const certificationsData = [
    {
      title: 'Indian Dental Association Membership',
      issuer: 'Indian Dental Association',
      year: '2003 - Present',
      icon: 'ShieldCheckIcon',
      verified: true,
      description: 'Active member maintaining highest standards of dental practice and ethics.',
    },
    {
      title: 'Uttarakhand State Dental Council Registration',
      issuer: 'Uttarakhand Medical Council',
      year: '2003 - Present',
      icon: 'DocumentCheckIcon',
      verified: true,
      description: 'Licensed to practice dentistry in Uttarakhand with full legal compliance.',
    },
    {
      title: 'Advanced Implantology Certification',
      issuer: 'International Congress of Oral Implantologists',
      year: '2010',
      icon: 'AcademicCapIcon',
      verified: true,
      description: 'Specialized training in dental implant placement and restoration techniques.',
    },
    {
      title: 'Best Dental Clinic Award',
      issuer: 'Uttarakhand Healthcare Excellence',
      year: '2023',
      icon: 'TrophyIcon',
      verified: true,
      description: 'Recognized for outstanding patient care and clinical excellence in the region.',
    },
    {
      title: 'Infection Control Certification',
      issuer: 'Centers for Disease Control Standards',
      year: '2022',
      icon: 'BeakerIcon',
      verified: true,
      description: 'Certified in advanced sterilization and infection prevention protocols.',
    },
    {
      title: 'Digital Dentistry Excellence',
      issuer: 'Academy of Digital Dentistry',
      year: '2021',
      icon: 'ComputerDesktopIcon',
      verified: true,
      description: 'Expertise in CAD/CAM technology and digital smile design systems.',
    },
  ];

  const ctaData = {
    title: 'Ready to Transform Your Smile?',
    description:
      'Join thousands of satisfied patients who trust Singh Dental Clinic for their oral health. Book your consultation today and experience the difference of advanced care with a human touch.',
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <div className="absolute top-16 md:top-20 left-0 w-full px-6 xl:px-12 z-40 pointer-events-none">
        <div className="pointer-events-auto w-fit">
          <Breadcrumbs />
        </div>
      </div>
      <ScrollAnimation>
        <TeamSection team={teamData} />
      </ScrollAnimation>
      <ScrollAnimation>
        <CertificationsSection certifications={certificationsData} />
      </ScrollAnimation>
      <ScrollAnimation>
        <CTASection cta={ctaData} />
      </ScrollAnimation>
    </div>
  );
}
