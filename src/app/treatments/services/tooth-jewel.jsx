import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const ToothJewel = () => {
  const benefits = [
    {
      title: 'Stylish Aesthetics',
      description: 'Add a sparkle to your smile with a safe, high-quality crystal or jewel.',
      icon: 'SparklesIcon',
    },
    {
      title: 'No Drilling',
      description:
        'The procedure is completely non-invasive and requires no drilling or damage to the tooth structure.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Painless Procedure',
      description: 'Quick and pain-free bonding process that takes only 10-15 minutes.',
      icon: 'FaceSmileIcon',
    },
    {
      title: 'Reversible',
      description:
        'Can be easily removed or replaced by a dentist at any time without leaving a mark.',
      icon: 'ArrowPathIcon',
    },
  ];

  const details = [
    {
      title: 'What is Tooth Jewellery?',
      content:
        'Tooth jewellery involves bonding a small crystal, diamond, or gold charm to the surface of your tooth. It is a cosmetic dental procedure that adds a unique sparkle to your smile. The jewels are available in various colors and sizes to suit your style.',
    },
    {
      title: 'The Procedure',
      content: `The application is simple and safe:
1. Cleaning: The tooth surface is professionally cleaned.
2. Preparation: A mild conditioning gel is applied to prepare the enamel (no drilling!).
3. Bonding: The jewel is placed using a light-cured dental adhesive.
4. Finishing: The bond is set, ensuring the jewel is secure and comfortable.`,
    },
    {
      title: 'Durability',
      content:
        'With proper care, a tooth jewel can last anywhere from 6 months to a few years. It usually stays on until you decide to have it removed, which can be done easily by your dentist.',
    },
  ];

  return (
    <ServiceDetail
      title="Tooth Jewel"
      category="Cosmetic"
      description="Add a touch of glamour to your smile with our safe and stylish tooth jewellery. A non-invasive, painless way to make your smile shine brighter."
      image="/assets/images/treatments/tooth_jewel.png"
      painlessFeature="Non-invasive bonding, no drilling required"
      duration="15-20 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default ToothJewel;
