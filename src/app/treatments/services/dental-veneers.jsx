import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const DentalVeneers = () => {
  const benefits = [
    {
      title: 'Flawless Aesthetic',
      description: 'Correct chips, gaps, and permanent stains for a picture-perfect smile.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Stain Resistance',
      description: 'Porcelain veneers are highly resistant to coffee, tea, and smoke stains.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Minimally Invasive',
      description: 'Requires very little tooth preparation compared to dental crowns.',
      icon: 'BeakerIcon',
    },
    {
      title: 'Durable & Strong',
      description: 'With proper care, veneers can provide a beautiful smile for 10-15 years.',
      icon: 'ClockIcon',
    },
  ];

  const details = [
    {
      title: 'What are Dental Veneers?',
      content:
        "Dental veneers are wafer-thin, custom-made shells of tooth-colored materials designed to cover the front surface of teeth. They are an ideal solution for those looking to transform their smile's appearance by changing its color, shape, size, or length.",
    },
    {
      title: 'Perfecting Your Smile',
      content: `Veneers are commonly used to fix:
• Teeth that are discolored from root canal treatment or medications
• Teeth that are worn down
• Chipped or broken teeth
• Misaligned, uneven, or irregularly shaped teeth
• Gaps between teeth (diastemas)`,
    },
    {
      title: 'Veneer Materials',
      content: `We offer two main types of veneers:
• Porcelain Veneers: The most popular choice due to their lifelike light reflection and superior stain resistance.
• Composite Resin Veneers: A more affordable, faster option that can often be completed in a single visit.`,
    },
    {
      title: 'A New Smile in Two Visits',
      content:
        'The process involves a minimal removal of enamel, taking a precise digital impression, and then bonding the custom-crafted veneers to your teeth. The result is a natural-looking, beautiful smile that can last for years with good oral hygiene.',
    },
  ];

  return (
    <ServiceDetail
      title="Dental Veneers"
      category="Cosmetic"
      description="Achieve the Hollywood smile you've always dreamed of. Our handcrafted porcelain veneers are designed to blend perfectly with your natural features for a total smile transformation."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1fee9188d-1764669218931.png"
      painlessFeature="Minimal Prep & No-Prep Options"
      duration="2-3 sittings"
      benefits={benefits}
      details={details}
    />
  );
};

export default DentalVeneers;
