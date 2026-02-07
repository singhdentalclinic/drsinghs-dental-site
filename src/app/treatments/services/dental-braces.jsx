import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const DentalBraces = () => {
  const benefits = [
    {
      title: 'Straight Teeth',
      description:
        'Efficiently correct crooked, crowded, or misaligned teeth for a beautiful smile.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Correct Bite',
      description:
        'Fix overbites, underbites, and crossbites to improve jaw function and oral health.',
      icon: 'CogIcon',
    },
    {
      title: 'Long-Term Health',
      description:
        'Straighter teeth are easier to clean, reducing the risk of cavities and gum disease.',
      icon: 'HeartIcon',
    },
    {
      title: 'Versatile Options',
      description:
        'Choose from traditional metal or less visible ceramic braces to suit your lifestyle.',
      icon: 'AdjustmentsHorizontalIcon',
    },
  ];

  const details = [
    {
      title: 'Orthodontic Treatment',
      content:
        "Dental braces are devices used in orthodontics that align and straighten teeth and help position them with regard to a person's bite, while also aiming to improve dental health. They are often used to correct underbites, as well as malocclusions, overbites, open bites, deep bites, cross bites, crooked teeth, and various other flaws of the teeth and jaw.",
    },
    {
      title: 'Types of Braces',
      content: `We offer:
• Metal Braces: Traditional, durable, and most cost-effective.
• Ceramic Braces: Tooth-colored brackets that blend in with your teeth for a more subtle look.
• Self-Ligating Braces: Advanced brackets that use a slide mechanism instead of elastics, often reducing treatment time.`,
    },
    {
      title: 'Treatment Duration',
      content:
        'The length of treatment varies depending on the complexity of the case, but typically ranges from 12 to 24 months. Regular adjustments are scheduled every 4 to 8 weeks to ensure steady progress.',
    },
  ];

  return (
    <ServiceDetail
      title="Dental Braces"
      category="Orthodontics"
      description="Traditional and modern orthodontic solutions for children and adults. Achieve a perfectly aligned smile and optimal bite function with our expert care."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1fe94a121-1765863790353.png"
      painlessFeature="Modern low-friction brackets"
      duration="12-24 months"
      benefits={benefits}
      details={details}
    />
  );
};

export default DentalBraces;
