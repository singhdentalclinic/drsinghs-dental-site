import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const PreventiveCare = () => {
  const benefits = [
    {
      title: 'Early Detection',
      description: 'Catch cavities and gum issues before they become painful or expensive.',
      icon: 'MagnifyingGlassIcon',
    },
    {
      title: 'Better Oral Health',
      description: 'Regular cleanings keep your breath fresh and your gums healthy.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Overall Wellbeing',
      description: 'Good oral health is linked to a lower risk of heart disease and diabetes.',
      icon: 'HeartIcon',
    },
    {
      title: 'Cost Effective',
      description: 'Prevention is much cheaper than restorative treatments like implants or RCT.',
      icon: 'CurrencyDollarIcon',
    },
  ];

  const details = [
    {
      title: 'The Foundation of Dental Health',
      content:
        'Preventive dentistry is the practice of looking after your teeth to keep them healthy. This helps to avoid cavities, gum disease, enamel wear, and more. At Singh Dental Clinic, we emphasize prevention as the most important part of our patient care.',
    },
    {
      title: 'Our Preventive Services',
      content: `A comprehensive preventive plan includes:
• Regular Dental Check-ups: Every 6 months to monitor your oral health.
• Professional Cleaning (Scaling): To remove plaque and tartar that brushing can't reach.
• Fluoride Treatments: To strengthen enamel and prevent decay.
• Dental Sealants: Thin coatings that protect the chewing surfaces of back teeth.`,
    },
    {
      title: 'Prevention for All Ages',
      content:
        'Everyone benefits from preventive dentistry. It helps children develop strong, healthy primary and permanent teeth. For adults, it helps maintain their natural teeth for a lifetime and prevents the need for complex restorative procedures.',
    },
    {
      title: 'Daily Habits Matter',
      content:
        'While we play a crucial role in your oral health, daily care at home is just as important. We provide personalized education on the best brushing and flossing techniques, as well as nutritional advice to keep your smile healthy between visits.',
    },
  ];

  return (
    <ServiceDetail
      title="Preventive Dental Care"
      category="Preventive"
      description="Protect your smile for the future. Our comprehensive check-ups and cleanings are the best way to maintain lifelong oral health and avoid complex dental problems."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_13f9bd358-1764669220083.png"
      painlessFeature="Gentle Ultrasonic Cleaning"
      duration="45-60 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default PreventiveCare;
