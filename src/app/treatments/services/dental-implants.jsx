import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const DentalImplants = () => {
  const benefits = [
    {
      title: 'Natural Look & Feel',
      description: 'Implants look, feel, and function exactly like your natural teeth.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Lifetime Solution',
      description:
        'With proper care, dental implants can last a lifetime, unlike bridges or dentures.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Bone Preservation',
      description:
        'Implants stimulate bone growth and prevent the jawbone shrinkage that follows tooth loss.',
      icon: 'CubeIcon',
    },
    {
      title: 'Adjacent Tooth Safety',
      description: "Unlike bridges, implants don't require grinding down adjacent healthy teeth.",
      icon: 'ShieldCheckIcon',
    },
  ];

  const details = [
    {
      title: 'What are Dental Implants?',
      content:
        'Dental implants are artificial tooth roots made of titanium that provide a strong foundation for fixed or removable replacement teeth. They are widely considered the gold standard for replacing missing teeth because they integrate directly with your jawbone.',
    },
    {
      title: 'The Advantage of Implants',
      content: `Missing teeth can lead to several oral health issues, including shifted teeth, difficulty chewing, and facial sagging due to bone loss. Implants solve these problems by:
• Restoring full chewing power
• Preventing bone resorption
• Keeping adjacent teeth stable
• Boosting self-confidence with a perfect smile`,
    },
    {
      title: 'Types of Implant Solutions',
      content: `We offer various implant options tailored to your needs:
• Single Tooth Replacement: A single implant and a crown.
• Multiple Teeth Replacement: Implant-supported bridges.
• All-on-4 / 6: Total smile restoration for completely edentulous patients using just a few implants to support a full arch.`,
    },
    {
      title: 'High Success Rate',
      content:
        'With a success rate of over 95%, dental implants are a highly predictable and reliable solution. At Singh Dental Clinic, we use computer-guided surgery to ensure the most precise placement and fastest recovery.',
    },
  ];

  return (
    <ServiceDetail
      title="Dental Implants"
      category="Restorative"
      description="The permanent, most natural solution for missing teeth. Our expert implantologists use 3D planning to restore your smile's strength and beauty for a lifetime."
      image="https://images.unsplash.com/photo-1609918438269-9a4c5f8fe3a4"
      painlessFeature="Computer-Guided Placement"
      duration="3-6 months (healing inclusive)"
      benefits={benefits}
      details={details}
    />
  );
};

export default DentalImplants;
