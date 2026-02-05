import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const DentalCrowns = () => {
  const benefits = [
    {
      title: 'Strength & Protection',
      description:
        'Crowns strengthen damaged teeth and protect them from further decay or fracture.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Aesthetic Restoration',
      description: 'Porcelain crowns are colormatched to your natural teeth for a seamless look.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Long-Lasting',
      description: 'With proper care, dental crowns can last 10-15 years or even longer.',
      icon: 'ClockIcon',
    },
    {
      title: 'Improved Function',
      description:
        'Restore your ability to bite and chew comfortably without fear of tooth breakage.',
      icon: 'CogIcon',
    },
  ];

  const details = [
    {
      title: 'What is a Dental Crown?',
      content:
        'A dental crown is a tooth-shaped "cap" that is placed over a tooth to cover the tooth to restore its shape and size, strength, and improve its appearance. The crowns, when cemented into place, fully encase the entire visible portion of a tooth that lies at and above the gum line.',
    },
    {
      title: 'When do you need a Crown?',
      content: `Crowns are recommended for several reasons:
• To protect a weak tooth from breaking.
• To restore an already broken tooth or a tooth that has been severely worn down.
• To cover and support a tooth with a large filling when there isn't a lot of tooth left.
• To hold a dental bridge in place.
• To cover misshapen or severely discolored teeth.`,
    },
    {
      title: 'Our Technology',
      content:
        'We use advanced materials like Zirconia and E-max porcelain for superior strength and aesthetics. Digital scanning often eliminates the need for messy impression goo, ensuring a precise fit.',
    },
  ];

  return (
    <ServiceDetail
      title="Dental Crowns"
      category="Restorative"
      description="Restore the strength, shape, and appearance of damaged teeth with our high-quality custom crowns. Durable solutions that look and feel just like your natural teeth."
      image="/assets/images/treatments/dental_crown.jpeg"
      painlessFeature="Minimal preparation with local anesthesia"
      duration="2 visits over 1 week"
      benefits={benefits}
      details={details}
    />
  );
};

export default DentalCrowns;
