import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const Dentures = () => {
  const benefits = [
    {
      title: 'Restored Function',
      description:
        'Eat and speak comfortably again with custom-fitted dentures that function like natural teeth.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Natural Appearance',
      description:
        'Modern dentures are designed to look natural and enhance your facial features and smile.',
      icon: 'FaceSmileIcon',
    },
    {
      title: 'Affordable Solution',
      description:
        'A cost-effective way to replace multiple missing teeth or a full arch compared to implants.',
      icon: 'BanknotesIcon',
    },
    {
      title: 'Custom Fit',
      description:
        'Precisely crafted to fit your unique gum contours for maximum comfort and stability.',
      icon: 'PuzzlePieceIcon',
    },
  ];

  const details = [
    {
      title: 'About Dentures',
      content:
        "Dentures are removable appliances that can replace missing teeth and help restore your smile. If you've lost all of your natural teeth, whether from gum disease, tooth decay or injury, replacing missing teeth will benefit your appearance and your health.",
    },
    {
      title: 'Types of Dentures',
      content: `We provide different types of dentures to suit your specific needs:
• Complete Dentures: For patients who have lost all their teeth in an arch.
• Partial Dentures: For patients who still have some natural teeth remaining.
• Implant-Supported Dentures: Attached to dental implants for superior stability and retention.`,
    },
    {
      title: 'The Process',
      content:
        'Creating your dentures takes a few weeks and several appointments. We take precise impressions of your jaw and create a wax model for you to try. Once the fit, shape, and color are perfect, the final denture is cast and adjusted for optimal comfort.',
    },
  ];

  return (
    <ServiceDetail
      title="Dentures"
      category="Restorative"
      description="Custom-crafted removable replacements for missing teeth. Restore your smile, chewing ability, and confidence with our comfortable and natural-looking dentures."
      image="/assets/images/treatments/dentures.png"
      painlessFeature="Custom-molded for irritation-free fit"
      duration="3-4 visits over 2-4 weeks"
      benefits={benefits}
      details={details}
    />
  );
};

export default Dentures;
