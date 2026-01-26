import Header from '@/components/common/Header';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import PhilosophySection from '../about/components/PhilosophySection';
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';
import JourneyTimeline from './components/JourneyTimeline';

export const metadata = {
  title: 'About Us - Singh Dental Clinic',
  description:
    'Meet Dr. Pradeep Singh and our expert team. 20+ years of trusted dental excellence in Uttarakhand with advanced care and human touch.',
};

export default function AboutPage() {
  const heroData = {
    badge: '20+ Years of Excellence',
    title: 'Transforming Smiles, Transforming Lives',
    description:
      'At Singh Dental Clinic, we believe that exceptional dental care goes beyond technical expertise. It is about creating a warm, welcoming environment where every patient feels valued, heard, and cared for. Our journey began over two decades ago with a simple mission: to provide world-class dental treatments with a personal touch.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b49538f8-1765735418312.png',
    imageAlt:
      'Dr. Pradeep Singh in white dental coat smiling warmly in modern clinic with dental equipment in background',
    stats: [
      { value: '20+', label: 'Years Experience' },
      { value: '15,000+', label: 'Happy Patients' },
      { value: '4.8/5', label: 'Patient Rating' },
    ],
  };

  const milestonesData = [
    {
      year: '2003',
      title: 'Foundation of Excellence',
      description:
        'Dr. Pradeep Singh established Singh Dental Clinic in Ramnagar with a vision to bring advanced dental care to Uttarakhand.',
      icon: 'HomeIcon',
    },
    {
      year: '2008',
      title: 'Advanced Technology Integration',
      description:
        'Introduced digital X-ray systems and CAD/CAM technology, becoming the first clinic in the region with such advanced equipment.',
      icon: 'CpuChipIcon',
    },
    {
      year: '2012',
      title: 'Expansion & Team Growth',
      description:
        'Expanded clinic facilities and welcomed Dr. Neha as Associate Dentist, strengthening our commitment to comprehensive care.',
      icon: 'UserGroupIcon',
    },
    {
      year: '2016',
      title: 'Specialized Treatment Center',
      description:
        'Launched dedicated centers for implantology and cosmetic dentistry with state-of-the-art equipment and techniques.',
      icon: 'SparklesIcon',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description:
        'Implemented online appointment systems and tele-dentistry services, ensuring uninterrupted care during challenging times.',
      icon: 'ComputerDesktopIcon',
    },
    {
      year: '2023',
      title: 'Regional Recognition',
      description:
        'Awarded "Best Dental Clinic in Uttarakhand" with 4.8-star rating and 384+ verified patient reviews.',
      icon: 'TrophyIcon',
    },
  ];
  const ctaData = {
    title: 'Ready to Transform Your Smile?',
    description:
      'Join thousands of satisfied patients who trust Singh Dental Clinic for their oral health. Book your consultation today and experience the difference of advanced care with a human touch.',
  };
  const philosophyData = {
    title: 'Our Patient-First Philosophy',
    subtitle: 'Where Advanced Care Meets Human Touch',
    quote:
      'We believe that exceptional dental care is not just about treating teethÃ¢‚¬€it is about understanding people. Every patient who walks through our doors brings unique concerns, fears, and dreams. Our mission is to address all of them with equal dedication, combining cutting-edge technology with genuine compassion to deliver experiences that transform not just smiles, but lives.',
    author: 'Dr. Pradeep Singh',
    authorTitle: 'Founder, Singh Dental Clinic',
    values: [
      {
        icon: 'HeartIcon',
        title: 'Compassionate Care',
        description:
          'We treat every patient like family, understanding that dental anxiety is real and addressing it with patience and empathy.',
      },
      {
        icon: 'SparklesIcon',
        title: 'Clinical Excellence',
        description:
          'Our commitment to continuous learning ensures you receive treatments based on the latest research and best practices.',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Transparent Communication',
        description:
          'We believe in honest conversations about treatment options, costs, and expected outcomesÃ¢‚¬€no surprises, ever.',
      },
      {
        icon: 'ClockIcon',
        title: 'Respect for Your Time',
        description:
          'We value your schedule as much as ours, ensuring minimal wait times and efficient appointment management.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header transparent={true} />
      <ScrollAnimation>
        <HeroSection hero={heroData} />
      </ScrollAnimation>
      <JourneyTimeline milestones={milestonesData} />
      <ScrollAnimation>
        <PhilosophySection philosophy={philosophyData} />
      </ScrollAnimation>
      <ScrollAnimation>
        <CTASection cta={ctaData} />
      </ScrollAnimation>
    </div>
  );
}
