import Header from '@/components/common/Header';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ServicesInteractive from './components/ServiceInteractive';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import React from 'react';

export const metadata = {
  title: 'Treatment Services - Singh Dental and Implant Center',
  description:
    'Comprehensive dental services including root canal therapy, dental implants, cosmetic dentistry, preventive care, and 24/7 emergency services. Advanced care with painless procedures and modern techniques.',
};

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Root Canal Therapy',
      slug: 'root-canal-therapy',
      category: 'Restorative',
      description:
        'Advanced painless root canal treatment using rotary endodontics and digital imaging. Save your natural tooth with our gentle, precise approach that eliminates infection while preserving tooth structure.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17415946d-1764726098639.png',
      alt: 'Close-up of dental professional performing root canal procedure with modern equipment in sterile clinical environment',
      icon: 'HeartIcon',
      painlessFeature: 'Laser-assisted treatment with minimal discomfort',
      duration: '60-90 minutes',
      isEmergency: false,
    },
    {
      id: 2,
      title: 'Dental Implants',
      slug: 'dental-implants',
      category: 'Restorative',
      description:
        'Permanent tooth replacement solution using titanium implants and custom ceramic crowns. Restore your smile with implants that look, feel, and function like natural teeth with 98% success rate.',
      image: 'https://images.unsplash.com/photo-1609918438269-9a4c5f8fe3a4',
      alt: 'Dental implant model showing titanium post and ceramic crown on white background with professional lighting',
      icon: 'CubeIcon',
      painlessFeature: 'Computer-guided implant placement for precision',
      duration: '2-3 appointments over 3-6 months',
      isEmergency: false,
    },
    {
      id: 3,
      title: 'Teeth Whitening',
      slug: 'teeth-whitening',
      category: 'Cosmetic',
      description:
        'Professional in-office whitening that brightens teeth up to 8 shades in just one hour. Safe, effective treatment using advanced LED technology and pharmaceutical-grade whitening agents.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1da2cf36a-1764669224538.png',
      alt: 'Smiling woman with bright white teeth after professional whitening treatment in modern dental office',
      icon: 'SparklesIcon',
      painlessFeature: 'Sensitivity-free formula with enamel protection',
      duration: '60 minutes',
      isEmergency: false,
    },
    {
      id: 4,
      title: 'Dental Veneers',
      slug: 'dental-veneers',
      category: 'Cosmetic',
      description:
        'Ultra-thin porcelain shells that transform your smile by correcting chips, gaps, stains, and misalignment. Custom-crafted veneers for a natural, Hollywood-quality smile that lasts 10-15 years.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fee9188d-1764669218931.png',
      alt: 'Before and after comparison of dental veneers showing transformation from discolored to perfect white smile',
      icon: 'RectangleStackIcon',
      painlessFeature: 'Minimal tooth preparation with digital smile design',
      duration: '2-3 visits over 2-3 weeks',
      isEmergency: false,
    },
    {
      id: 5,
      title: 'Preventive Dental Care',
      slug: 'preventive-care',
      category: 'Preventive',
      description:
        'Comprehensive oral health maintenance including professional cleaning, fluoride treatment, and oral cancer screening. Prevent cavities and gum disease with regular check-ups every 6 months.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13f9bd358-1764669220083.png',
      alt: 'Dental hygienist performing professional teeth cleaning on patient in bright modern clinic',
      icon: 'ShieldCheckIcon',
      painlessFeature: 'Gentle ultrasonic cleaning technology',
      duration: '45-60 minutes',
      isEmergency: false,
    },
    {
      id: 6,
      title: 'Orthodontic Treatment',
      slug: 'orthodontics',
      category: 'Cosmetic',
      description:
        'Straighten teeth with traditional braces or clear aligners. Correct bite issues, gaps, and crowding for improved oral health and a confident smile with personalized treatment plans.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fe94a121-1765863790353.png',
      alt: 'Young adult smiling showing clear dental aligners on teeth in bright dental office setting',
      icon: 'AdjustmentsHorizontalIcon',
      painlessFeature: 'Comfortable brackets with minimal adjustment visits',
      duration: '12-24 months',
      isEmergency: false,
    },
    {
      id: 7,
      title: 'Gum Disease Treatment',
      slug: 'gum-treatment',
      category: 'Restorative',
      description:
        'Advanced periodontal therapy to treat gingivitis and periodontitis. Deep cleaning, scaling, and root planing to restore gum health and prevent tooth loss with laser-assisted procedures.',
      image: '/assets/images/treatments/gum_disease_treatment.jpeg',
      alt: 'Dental professional examining patient gums with periodontal probe in modern clinical setting',
      icon: 'BeakerIcon',
      painlessFeature: 'Laser gum therapy for faster healing',
      duration: '2-4 sessions',
      isEmergency: false,
    },
    {
      id: 8,
      title: 'Wisdom Tooth Extraction',
      slug: 'wisdom-tooth-extraction',
      category: 'Restorative',
      description:
        'Safe removal of impacted or problematic wisdom teeth using advanced surgical techniques. Prevent crowding, pain, and infection with minimally invasive extraction procedures.',
      image: '/assets/images/treatments/wisdom_tooth.jpg',
      alt: 'Dental surgeon performing wisdom tooth extraction with surgical instruments in sterile environment',
      icon: 'ScissorsIcon',
      painlessFeature: 'Sedation dentistry available for anxiety-free experience',
      duration: '30-60 minutes per tooth',
      isEmergency: false,
    },
    {
      id: 9,
      title: 'Kids Dentistry',
      slug: 'kids-dentistry',
      category: 'Pediatric',
      description:
        'Specialized, gentle dental care for infants, children, and teens. We create positive experiences to build a foundation for a lifetime of healthy smiles.',
      image: '/assets/images/treatments/kids_dentistry.png',
      alt: 'Pediatric dentist interacting gently with a smiling child in a colorful, kid-friendly dental room',
      icon: 'FaceSmileIcon',
      painlessFeature: 'Behavior management & gentle techniques',
      duration: '30-45 minutes',
      isEmergency: false,
    },
    {
      id: 10,
      title: 'Dentures',
      slug: 'dentures',
      category: 'Restorative',
      description:
        'Custom-crafted removable replacements for missing teeth. Restore your smile, chewing ability, and confidence with our comfortable and natural-looking dentures.',
      image: '/assets/images/treatments/dentures.png',
      alt: 'Full set of custom dentures displayed on a clean surface showing natural gum color and tooth shape',
      icon: 'PuzzlePieceIcon',
      painlessFeature: 'Custom-molded for irritation-free fit',
      duration: '3-4 visits over 2-4 weeks',
      isEmergency: false,
    },
    {
      id: 11,
      title: 'Dental Crowns',
      slug: 'dental-crowns',
      category: 'Restorative',
      description:
        'Restore the strength, shape, and appearance of damaged teeth with our high-quality custom crowns. Durable solutions that look and feel just like your natural teeth.',
      image: '/assets/images/treatments/dental_crown.jpeg',
      alt: 'Dental professional holding a custom-made ceramic crown next to a color matching guide',
      icon: 'ShieldCheckIcon',
      painlessFeature: 'Minimal preparation with local anesthesia',
      duration: '2 visits over 1 week',
      isEmergency: false,
    },
    {
      id: 12,
      title: 'Dental Braces',
      slug: 'dental-braces',
      category: 'Orthodontics',
      description:
        'Traditional and modern orthodontic solutions for children and adults. Achieve a perfectly aligned smile and optimal bite function with our expert care.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fe94a121-1765863790353.png',
      alt: 'Close-up of teeth with metal braces showing the brackets and archwire in proper alignment',
      icon: 'AdjustmentsHorizontalIcon',
      painlessFeature: 'Modern low-friction brackets',
      duration: '12-24 months',
      isEmergency: false,
    },
    {
      id: 13,
      title: 'Clear Aligners',
      slug: 'aligners',
      category: 'Orthodontics',
      description:
        'The clear alternative to metal braces. Straighten your teeth discreetly and comfortably with our advanced custom-made aligner systems.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1da2cf36a-1764669224538.png',
      alt: 'Pair of clear orthodontic aligners resting on a case, showing their transparency',
      icon: 'EyeSlashIcon',
      painlessFeature: 'Smooth, comfortable plastic fit',
      duration: '6-18 months',
      isEmergency: false,
    },
    {
      id: 14,
      title: 'Laser Dentistry',
      slug: 'laser-dentistry',
      category: 'Advanced Tech',
      description:
        'State-of-the-art laser treatments for precise, painless, and bloodless dental procedures. Experience faster healing and superior results with light-based dentistry.',
      image: '/assets/images/treatments/laser_dentistry.jpeg',
      alt: 'Dentist using a dental laser handpiece for a soft tissue procedure',
      icon: 'BoltIcon',
      painlessFeature: 'No-drill, often needle-free treatment',
      duration: 'Varies by procedure',
      isEmergency: false,
    },
    {
      id: 15,
      title: 'Tooth Jewel',
      slug: 'tooth-jewel',
      category: 'Cosmetic',
      description:
        'Add a touch of glamour to your smile with our safe and stylish tooth jewellery. A non-invasive, painless way to make your smile shine brighter.',
      image: '/assets/images/treatments/tooth_jewel.png',
      alt: 'Close-up of a smile featuring a small, sparkling crystal jewel bonded to a tooth',
      icon: 'SparklesIcon',
      painlessFeature: 'Non-invasive bonding, no drilling required',
      duration: '15-20 minutes',
      isEmergency: false,
    },
    {
      id: 17,
      title: 'Teeth Bleaching',
      slug: 'teeth-bleaching',
      category: 'Cosmetic',
      description:
        'Professional dental-grade bleaching to remove deep intrinsic stains and lighten teeth beyond their natural shade. Safe, effective, and monitored for exceptional brilliance.',
      image: '/assets/images/treatments/teeth_bleaching.png',
      alt: 'Professional teeth bleaching procedure with protective gum barrier and specialized LED light',
      icon: 'SparklesIcon',
      painlessFeature: 'Precision gum protection & desensitizing agents',
      duration: '60-90 minutes',
      isEmergency: false,
    },
    {
      id: 18,
      title: 'CBCT Scan',
      slug: 'cbct-scan',
      category: 'Advanced Tech',
      description:
        'High-definition 3D dental imaging for precise diagnostics and treatment planning. Get comprehensive views of teeth, bone, and nerves with minimal radiation.',
      image: '/assets/images/treatments/cbct.png',
      alt: 'Professional dental CBCT machine capturing a 3D scan of a patient skull and jaw',
      icon: 'MagnifyingGlassIcon',
      painlessFeature: 'Quick, non-invasive 3D imaging',
      duration: '5-10 minutes',
      isEmergency: false,
    },
    {
      id: 19,
      title: 'Dental Restoration',
      slug: 'dental-restoration',
      category: 'Restorative',
      description:
        'Comprehensive solutions to repair and rebuild damaged teeth. From fillings to bridges, we restore your smile’s function and natural appearance.',
      image: '/assets/images/treatments/dental_restoration.jpeg',
      alt: 'Close-up of a dental restoration procedure showing a perfectly repaired tooth blending with natural teeth',
      icon: 'ArrowPathIcon',
      painlessFeature: 'Gentle, minimally invasive techniques',
      duration: 'Varies by procedure',
      isEmergency: false,
    },
  ];

  const treatmentSteps = [
    {
      id: 1,
      title: 'Initial Consultation & Examination',
      description:
        'Comprehensive oral examination with digital X-rays and intraoral photography. Dr. Singh discusses your concerns, medical history, and creates a personalized treatment plan tailored to your needs.',
      duration: '30-45 minutes',
    },
    {
      id: 2,
      title: 'Treatment Planning & Cost Discussion',
      description:
        'Detailed explanation of recommended procedures, timeline, and transparent cost breakdown. We help you understand insurance coverage and flexible payment options available.',
      duration: '15-20 minutes',
    },
    {
      id: 3,
      title: 'Treatment Execution',
      description:
        'Painless procedure performed using modern equipment and techniques. Our team ensures your comfort throughout with local anesthesia, sedation options, and gentle care approach.',
      duration: 'Varies by treatment',
    },
    {
      id: 4,
      title: 'Post-Treatment Care & Follow-up',
      description:
        'Detailed aftercare instructions and scheduled follow-up appointments. We monitor your healing progress and address any concerns to ensure optimal treatment outcomes.',
      duration: '15-30 minutes',
    },
  ];

  const emergencyInfo = {
    emergencyPhone: '+918449830107',
    emergencyEmail: 'emergency@singhdentalcenter.com',
    responseTime: 'Quick reply for urgent cases',
    emergencyTypes: [
      'Severe toothache or dental pain',
      'Knocked-out or broken tooth',
      'Dental abscess or swelling',
      'Uncontrolled bleeding from mouth',
      'Jaw injury or dislocation',
      'Lost filling or crown causing pain',
    ],
  };

  const symptoms = [
    {
      id: 'pain',
      name: 'Tooth Pain or Sensitivity',
      relatedTreatments: ['Root Canal Therapy', 'Dental Filling', 'Gum Disease Treatment'],
    },
    {
      id: 'missing',
      name: 'Missing Teeth',
      relatedTreatments: ['Dental Implants', 'Dental Bridge', 'Dentures'],
    },
    {
      id: 'discolored',
      name: 'Discolored or Stained Teeth',
      relatedTreatments: ['Teeth Whitening', 'Teeth Bleaching', 'Dental Veneers'],
    },
    {
      id: 'crooked',
      name: 'Crooked or Misaligned Teeth',
      relatedTreatments: ['Orthodontic Treatment', 'Clear Aligners', 'Dental Veneers'],
    },
    {
      id: 'bleeding',
      name: 'Bleeding or Swollen Gums',
      relatedTreatments: ['Gum Disease Treatment', 'Deep Cleaning', 'Periodontal Therapy'],
    },
    {
      id: 'broken',
      name: 'Broken or Chipped Tooth',
      relatedTreatments: ['Dental Veneers', 'Dental Crown', 'Bonding'],
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <Header transparent={true} />
      <div className="absolute top-16 md:top-20 left-0 w-full px-6 xl:px-12 z-40 pointer-events-none">
        <div className="pointer-events-auto w-fit">
          <Breadcrumbs />
        </div>
      </div>

      <main className="">
        <ScrollAnimation>
          <section className="pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
            {/* Background with Gradient Mask for Dissolve Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                  <Icon name="SparklesIcon" size={20} variant="solid" className="text-secondary" />
                  <span className="text-sm md:text-base font-medium text-secondary">
                    Comprehensive Dental Solutions
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold text-text-primary mb-4 md:mb-6">
                  Advanced Dental Services with <span className="text-primary">Painless Care</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-text-secondary leading-relaxed mb-8 md:mb-10">
                  Experience modern dentistry that prioritizes your comfort. From routine check-ups
                  to complex procedures, we combine cutting-edge technology with Dr. Singh&apos;s
                  20+ years of expertise to deliver exceptional results.
                </p>

                <div className="flex flex-row items-center justify-center gap-3 md:gap-4">
                  <Link
                    href="/book-appointment"
                    className="flex-1 sm:w-auto px-4 md:px-8 py-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground text-sm md:text-lg font-cta font-semibold rounded-lg shadow-elevation-md hover:shadow-elevation-lg transition-all duration-fast hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                  >
                    <Icon name="CalendarIcon" size={20} variant="solid" />
                    <span className="whitespace-nowrap">Book Appointment</span>
                  </Link>

                  <Link
                    href="tel:+918449830107"
                    className="flex-1 sm:w-auto px-4 md:px-8 py-4 bg-white hover:bg-muted text-primary border-2 border-primary text-sm md:text-lg font-semibold rounded-lg transition-all duration-fast flex items-center justify-center space-x-2"
                  >
                    <Icon name="PhoneIcon" size={20} variant="solid" />
                    <span className="whitespace-nowrap">Call Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        <ScrollAnimation>
          <section className="py-12 md:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <React.Suspense
                fallback={
                  <div className="h-96 flex items-center justify-center">Loading treatments...</div>
                }
              >
                <ServicesInteractive
                  services={services}
                  treatmentSteps={treatmentSteps}
                  emergencyInfo={emergencyInfo}
                  symptoms={symptoms}
                />
              </React.Suspense>
            </div>
          </section>
        </ScrollAnimation>

        <ScrollAnimation>
          <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold text-white mb-4 md:mb-6">
                  Ready to Transform Your Smile?
                </h2>
                <p className="text-base md:text-lg text-white/90 mb-8 md:mb-10 leading-relaxed">
                  Join our clan of satisfied patients who trust Dr. Singh&apos;s Dental Clinic and
                  Implant Center. Book your consultation today and experience the difference of
                  advanced, painless dental care.
                </p>
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-white/90 text-primary text-base md:text-lg font-cta font-semibold rounded-lg shadow-elevation-lg hover:shadow-elevation-md transition-all duration-fast hover:-translate-y-0.5"
                >
                  <span>Book Appointment</span>
                  <Icon name="ArrowRightIcon" size={20} variant="outline" />
                </Link>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </main>
    </div>
  );
}
