import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const KidsDentistry = () => {
  const benefits = [
    {
      title: 'Child-Friendly Environment',
      description:
        'Our clinic is designed to make children feel safe, comfortable, and happy during their visit.',
      icon: 'FaceSmileIcon',
    },
    {
      title: 'Preventive Focus',
      description:
        'We prioritize preventing cavities and issues before they start with sealants and fluoride.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Gentle Care',
      description:
        'Our team is trained to handle young patients with patience, kindness, and gentle techniques.',
      icon: 'HeartIcon',
    },
    {
      title: 'Education',
      description:
        'We teach proper brushing and flossing techniques to help your child build healthy habits.',
      icon: 'AcademicCapIcon',
    },
  ];

  const details = [
    {
      title: 'Why Pediatric Dentistry?',
      content:
        'Children have unique dental needs that differ from adults. Early dental care is crucial for monitoring growth, preventing cavities, and establishing a positive attitude towards oral health that lasts a lifetime.',
    },
    {
      title: 'Our Pediatric Services',
      content: `We offer a comprehensive range of treatments for children:
Ã¢‚¬¢ Routine Check-ups & Cleanings: gentle examinations to monitor development.
Ã¢‚¬¢ Fluoride Treatments: to strengthen enamel and resist decay.
Ã¢‚¬¢ Dental Sealants: protective coatings for molars to prevent cavities.
Ã¢‚¬¢ Cavity Treatment: painless fillings and restorative care.`,
    },
    {
      title: 'First Visit Experience',
      content:
        'We recommend the first dental visit by age one. Our goal is to make this milestone a fun and positive experience, introducing your child to the dental chair and tools in a non-threatening way.',
    },
  ];

  return (
    <ServiceDetail
      title="Kids Dentistry"
      category="Pediatric"
      description="Specialized, gentle dental care for infants, children, and teens. We create positive experiences to build a foundation for a lifetime of healthy smiles."
      image="/assets/images/treatments/kids_dentistry.png"
      painlessFeature="Behavior management & gentle techniques"
      duration="30-45 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default KidsDentistry;
