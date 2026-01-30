import Header from '@/components/common/Header';
import InstagramConnect from './components/Connectcard';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import PatientStoriesInteractive from './components/PatientStoriesInteractive';
import Link from 'next/link';

export const metadata = {
  title: 'Patient Stories - Singh Dental Clinic',
  description:
    'Read authentic patient testimonials, view before/after transformations, and explore detailed case studies from Singh Dental Clinic. 4.8-star rating with 384+ verified reviews from patients across Uttarakhand.',
};

export default function PatientStoriesPage() {
  const categories = [
    { id: 'root-canal', name: 'Root Canal' },
    { id: 'dental-implants', name: 'Dental Implants' },
    { id: 'cosmetic', name: 'Cosmetic Dentistry' },
    { id: 'orthodontics', name: 'Orthodontics' },
    { id: 'preventive', name: 'Preventive Care' },
  ];
  const beforeAfterGallery = [
    {
      id: 'ba1',
      categoryId: 'cosmetic',
      beforeImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11a3be1a6-1764678818175.png',
        alt: 'Before dental treatment showing discolored and misaligned teeth in close-up view',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1de9b56cb-1764669219624.png',
        alt: 'After dental treatment showing bright white perfectly aligned teeth with confident smile',
      },
      patientName: 'Priya Sharma',
      treatment: 'Complete Smile Makeover',
    },
    {
      id: 'ba2',
      categoryId: 'dental-implants',
      beforeImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_125774f93-1764669230614.png',
        alt: 'Before dental implant showing missing front tooth gap in patient smile',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_125774f93-1764669230614.png',
        alt: 'After dental implant showing natural-looking replacement tooth perfectly integrated',
      },
      patientName: 'Rajesh Kumar',
      treatment: 'Single Tooth Implant',
    },
    {
      id: 'ba3',
      categoryId: 'orthodontics',
      beforeImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1206ccff1-1764669220241.png',
        alt: 'Before orthodontic treatment showing severely crowded and overlapping teeth',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1510829e0-1764669218923.png',
        alt: 'After orthodontic treatment showing perfectly straight aligned teeth with beautiful smile',
      },
      patientName: 'Anita Verma',
      treatment: 'Invisalign Clear Aligners',
    },
    {
      id: 'ba4',
      categoryId: 'cosmetic',
      beforeImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fb90b36d-1764678819451.png',
        alt: 'Before teeth whitening showing yellowed and stained teeth from coffee consumption',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1de9b56cb-1764669219624.png',
        alt: 'After teeth whitening showing brilliant white teeth with radiant confident smile',
      },
      patientName: 'Vikram Singh',
      treatment: 'Professional Teeth Whitening',
    },
    {
      id: 'ba5',
      categoryId: 'root-canal',
      beforeImage: {
        url: 'https://images.unsplash.com/photo-1664530838743-494727bc7faa',
        alt: 'Before root canal showing damaged decayed tooth with visible cavity',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bc327abe-1764654468116.png',
        alt: 'After root canal showing restored tooth with natural-looking crown perfectly matched',
      },
      patientName: 'Meera Patel',
      treatment: 'Root Canal with Crown',
    },
    {
      id: 'ba6',
      categoryId: 'dental-implants',
      beforeImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1af0bc523-1764726099095.png',
        alt: 'Before full arch implants showing multiple missing teeth and compromised smile',
      },
      afterImage: {
        url: 'https://img.rocket.new/generatedImages/rocket_gen_img_174857320-1764654468594.png',
        alt: 'After full arch implants showing complete set of natural-looking teeth with confident smile',
      },
      patientName: 'Suresh Reddy',
      treatment: 'Full Arch Dental Implants',
    },
  ];

  const videoTestimonials = [
    {
      id: 'vt1',
      categoryId: 'root-canal',
      patientName: 'Flur',
      treatment: 'Root Canal Treatment',
      videoUrl: 'https://youtube.com/shorts/ZpaHcfp1rMA', // Example Shorts URL format
      location: 'Ramnagar, Uttarakhand',
    },
    {
      id: 'vt2',
      categoryId: 'dental-implants',
      patientName: 'Amit Gupta',
      treatment: 'Complete Dental Implant Journey',
      videoUrl: '/assets/videos/Clinic.mp4',
      location: 'Haldwani, Uttarakhand',
    },
    {
      id: 'vt3',
      categoryId: 'cosmetic',
      patientName: 'Kavita Nair',
      treatment: 'Smile Transformation Experience',
      videoUrl: '/assets/videos/Dental_education.mp4',
      location: 'Nainital, Uttarakhand',
    },
    {
      id: 'vt4',
      categoryId: 'orthodontics',
      patientName: 'Priya Singh',
      treatment: 'Invisalign Journey',
      videoUrl: 'https://www.youtube.com/shorts/Pd99lqg',
      location: 'Rudrapur, Uttarakhand',
    },
    {
      id: 'vt5',
      categoryId: 'preventive',
      patientName: 'Rajesh Malhotra',
      treatment: 'Senior Dental Care',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      location: 'Ramnagar, Uttarakhand',
    },
    {
      id: 'vt6',
      categoryId: 'dental-implants',
      patientName: 'Meera Patel',
      treatment: 'Full Mouth Implants',
      videoUrl: 'https://www.youtube.com/shorts/Pd99lqg',
      location: 'Kashipur, Uttarakhand',
    },
  ];

  const testimonials = [
    {
      id: 't1',
      categoryId: 'root-canal',
      patient: {
        name: 'Ramesh Chandra',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1927cf9a3-1763293370228.png',
        alt: 'Indian man with grey beard and glasses smiling warmly at camera',
      },
      rating: 5,
      testimonial:
        'Dr. Singh made my root canal experience completely painless. I was terrified initially, but his gentle approach and modern equipment made all the difference. The entire procedure was smooth, and I felt no discomfort during or after. Highly recommend Singh Dental Center!',
      treatment: 'Root Canal Therapy',
      date: 'Dec 2024',
      location: 'Ramnagar, Uttarakhand',
    },
    {
      id: 't2',
      categoryId: 'dental-implants',
      patient: {
        name: 'Lakshmi Iyer',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12fa653f0-1763300100712.png',
        alt: 'Indian woman with short black hair in professional attire smiling confidently',
      },
      rating: 5,
      testimonial:
        'After losing my front tooth in an accident, I was devastated. Dr. Singh and his team gave me my confidence back with a perfect dental implant. The result looks so natural that nobody can tell it is not my original tooth. Forever grateful!',
      treatment: 'Dental Implant',
      date: 'Nov 2024',
      location: 'Haldwani, Uttarakhand',
    },
    {
      id: 't3',
      categoryId: 'cosmetic',
      patient: {
        name: 'Arjun Malhotra',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fd6aee6d-1763293852577.png',
        alt: 'Young Indian man in casual blue shirt with bright smile showing white teeth',
      },
      rating: 5,
      testimonial:
        'The teeth whitening treatment exceeded my expectations! My teeth are now several shades whiter, and the results have lasted for months. Dr. Singh explained the entire process clearly, and the treatment was quick and comfortable. Best decision ever!',
      treatment: 'Professional Teeth Whitening',
      date: 'Dec 2024',
      location: 'Nainital, Uttarakhand',
    },
    {
      id: 't4',
      categoryId: 'orthodontics',
      patient: {
        name: 'Neha Kapoor',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11ca0f56f-1763296594616.png',
        alt: 'Young Indian woman with long dark hair smiling brightly at camera',
      },
      rating: 5,
      testimonial:
        'I always felt self-conscious about my crooked teeth. Dr. Singh recommended Invisalign, and the transformation has been incredible! The aligners were comfortable, and I could see progress every month. My smile is now perfectly straight, and my confidence has soared!',
      treatment: 'Invisalign Treatment',
      date: 'Oct 2024',
      location: 'Rudrapur, Uttarakhand',
    },
    {
      id: 't5',
      categoryId: 'preventive',
      patient: {
        name: 'Sanjay Bisht',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1927cf9a3-1763293370228.png',
        alt: 'Middle-aged Indian man with short black hair in formal shirt smiling warmly',
      },
      rating: 5,
      testimonial:
        'Regular dental check-ups at Singh Dental Center have kept my teeth healthy for years. Dr. Singh caught a cavity early during a routine cleaning, preventing what could have been a major problem. The hygiene standards here are exceptional!',
      treatment: 'Preventive Dental Care',
      date: 'Dec 2024',
      location: 'Ramnagar, Uttarakhand',
    },
    {
      id: 't6',
      categoryId: 'cosmetic',
      patient: {
        name: 'Pooja Saxena',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11b9eb5f9-1765127965894.png',
        alt: 'Young Indian woman with wavy hair smiling confidently showing perfect teeth',
      },
      rating: 5,
      testimonial:
        'My complete smile makeover at Singh Dental Center changed my life! Dr. Singh combined veneers and whitening to give me the perfect smile I always dreamed of. The attention to detail and personalized care made the entire experience wonderful. Thank you!',
      treatment: 'Complete Smile Makeover',
      date: 'Nov 2024',
      location: 'Kashipur, Uttarakhand',
    },
  ];

  const caseStudies = [
    {
      id: 'cs1',
      categoryId: 'dental-implants',
      title: 'Full Mouth Reconstruction with Dental Implants',
      treatment: 'Implants',
      duration: '6 months',
      complexity: 'Complex',
      description:
        'Patient presented with multiple missing teeth and severe bone loss. Treatment involved bone grafting followed by strategic placement of 8 dental implants to support a full arch restoration. Advanced 3D imaging and computer-guided surgery ensured precise implant positioning.',
      images: [
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_125774f93-1764669230614.png',
          alt: 'Close-up of dental implant procedure showing titanium post placement in jawbone',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_174857320-1764654468594.png',
          alt: 'Final result showing complete set of natural-looking teeth on dental implants',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a25dcfb3-1764843086511.png',
          alt: 'X-ray image showing properly integrated dental implants in upper and lower jaw',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_15d88ee5a-1764669229585.png',
          alt: 'Patient smiling confidently after full mouth dental implant restoration',
        },
      ],

      results: [
        'Complete restoration of chewing function',
        'Natural-looking aesthetic result',
        'Improved facial structure and support',
        'Enhanced quality of life and confidence',
      ],
    },
    {
      id: 'cs2',
      categoryId: 'root-canal',
      title: 'Complex Root Canal with Apicoectomy',
      treatment: 'Endodontics',
      duration: '3 weeks',
      complexity: 'Advanced',
      description:
        'Patient had persistent infection in a previously treated tooth. Treatment required surgical root canal (apicoectomy) to remove infected tissue at the root tip. Using microscopic techniques and advanced materials, the tooth was successfully saved and restored with a custom crown.',
      images: [
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_17415946d-1764726098639.png',
          alt: 'Microscopic view of root canal treatment showing cleaned and shaped canal system',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bc327abe-1764654468116.png',
          alt: 'Final restoration showing natural-looking crown on treated tooth',
        },
        {
          url: 'https://images.unsplash.com/photo-1726306529401-d6ac8b1e48fb',
          alt: 'X-ray showing successful root canal treatment with proper filling',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_161c5991e-1766295206829.png',
          alt: 'Healed surgical site after apicoectomy procedure',
        },
      ],

      results: [
        'Tooth successfully saved from extraction',
        'Complete elimination of infection',
        'Pain-free chewing restored',
        'Natural appearance maintained',
      ],
    },
    {
      id: 'cs3',
      categoryId: 'orthodontics',
      title: 'Severe Malocclusion Correction with Invisalign',
      treatment: 'Orthodontics',
      duration: '18 months',
      complexity: 'Complex',
      description:
        'Patient presented with severe crowding, crossbite, and jaw misalignment. Treatment plan included strategic tooth extractions followed by comprehensive Invisalign therapy with precision attachments. Regular monitoring ensured optimal tooth movement and bite correction.',
      images: [
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ee9bbfe2-1764654467412.png',
          alt: 'Initial condition showing severely crowded and misaligned teeth',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a7f6e54-1764903199942.png',
          alt: 'Final result showing perfectly aligned teeth with ideal bite relationship',
        },
        {
          url: 'https://images.unsplash.com/photo-1589615452253-b1db690dcc12',
          alt: 'Patient wearing clear Invisalign aligners during treatment',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1206ccff1-1764669220241.png',
          alt: 'Side profile showing improved facial aesthetics after orthodontic treatment',
        },
      ],

      results: [
        'Perfect tooth alignment achieved',
        'Corrected bite relationship',
        'Improved facial profile',
        'Enhanced self-confidence',
      ],
    },
    {
      id: 'cs4',
      categoryId: 'cosmetic',
      title: 'Complete Smile Transformation with Veneers',
      treatment: 'Cosmetic',
      duration: '4 weeks',
      complexity: 'Moderate',
      description:
        'Patient desired a complete smile makeover to address discolored, chipped, and misshapen teeth. Treatment involved minimal-prep porcelain veneers on 10 upper teeth. Digital smile design technology was used to preview and perfect the final result before treatment.',
      images: [
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11a3be1a6-1764678818175.png',
          alt: 'Before treatment showing discolored and irregularly shaped front teeth',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1de9b56cb-1764669219624.png',
          alt: 'After treatment showing brilliant white perfectly shaped veneers',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_174857320-1764654468594.png',
          alt: 'Patient smiling confidently showing natural-looking veneer results',
        },
        {
          url: 'https://img.rocket.new/generatedImages/rocket_gen_img_16d237d37-1764981470995.png',
          alt: 'Close-up of final veneers showing natural translucency and color',
        },
      ],

      results: [
        'Dramatic aesthetic improvement',
        'Natural-looking smile design',
        'Minimal tooth preparation',
        'Long-lasting beautiful results',
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-background scroll-smooth"
      style={{ scrollSnapType: 'y proximity' }}
    >
      <Header transparent={true} />
      <main>
        <ScrollAnimation>
          <section className="py-0" style={{ scrollSnapAlign: 'start' }}>
            <InstagramConnect />
          </section>
        </ScrollAnimation>

        <ScrollAnimation>
          <section className="py-12 md:py-16 lg:py-20" style={{ scrollSnapAlign: 'start' }}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
              <PatientStoriesInteractive
                categories={categories}
                beforeAfterGallery={beforeAfterGallery}
                videoTestimonials={videoTestimonials}
                testimonials={testimonials}
                caseStudies={caseStudies}
              />
            </div>
          </section>
        </ScrollAnimation>

        <ScrollAnimation>
          <section
            className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
              <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Ready to Start Your Transformation?
              </h2>
              <p className="font-body text-base md:text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied patients who have transformed their smiles at Singh
                Dental Center. Book your appointment today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book-appointment"
                  className="w-full sm:w-auto px-8 py-4 bg-conversion hover:bg-conversion/90 text-conversion-foreground font-cta text-base md:text-lg font-semibold rounded-lg shadow-elevation-md hover:shadow-elevation-lg transition-all duration-fast hover:-translate-y-0.5"
                >
                  Book Your Appointment
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-muted text-primary border-2 border-primary font-cta text-base md:text-lg font-semibold rounded-lg transition-all duration-fast"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </main>
    </div>
  );
}
