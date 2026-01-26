import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const TeethWhitening = () => {
  const benefits = [
    {
      title: 'Immediate Results',
      description: 'Brighten your smile by several shades in just one session.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Enamel Safe',
      description: 'Our professional-grade gels protect your enamel while removing deep stains.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Boosted Confidence',
      description: 'A brighter smile instantly improves your appearance and social interactions.',
      icon: 'UserIcon',
    },
    {
      title: 'Customized Shade',
      description: 'We tailor the whitening process to achieve your preferred level of brightness.',
      icon: 'AdjustmentsVerticalIcon',
    },
  ];

  const details = [
    {
      title: 'Professional Teeth Whitening',
      content:
        'Teeth whitening is one of the most popular cosmetic dental procedures. Over time, teeth can become stained or discolored due to aging, smoking, or consuming coffee, tea, and red wine. Professional whitening at our clinic is significantly more effective and safer than over-the-counter kits.',
    },
    {
      title: 'How It Works',
      content:
        'Our in-office treatment uses a high-concentration peroxide gel that is carefully applied to your teeth. We often use a specialized LED light to activate the gel, which penetrates the enamel to break up even the toughest stains. The result is a visibly brighter smile in less than an hour.',
    },
    {
      title: 'Treatment Options',
      content: `We provide two convenient ways to whiten your teeth:
Ã¢‚¬¢ In - Office Whitening: Fastest results, perfect for special occasions.
Ã¢‚¬¢ Professional Take - Home Kits: Custom - fitted trays with clinical - grade gel for gradual whitening at your own pace.`,
    },
    {
      title: 'Long-Lasting Brilliance',
      content:
        'To maintain your results, we provide post-treatment care instructions and maintenance tips. Regular professional cleanings and avoiding staining substances will keep your smile bright for a long time.',
    },
  ];

  return (
    <ServiceDetail
      title="Teeth Whitening"
      category="Cosmetic"
      description="Reveal a brighter, more confident version of yourself. Our professional whitening systems deliver dramatic results while ensuring your comfort and dental health."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1da2cf36a-1764669224538.png"
      painlessFeature="Advanced Blue-Light Technology"
      duration="45-60 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default TeethWhitening;
