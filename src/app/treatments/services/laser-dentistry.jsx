import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const LaserDentistry = () => {
  const benefits = [
    {
      title: 'Minimally Invasive',
      description:
        'Laser procedures often require no incisions or sutures, resulting in less trauma to tissue.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Reduced Pain',
      description:
        'Many laser treatments are virtually painless and may not even require local anesthesia.',
      icon: 'FaceSmileIcon',
    },
    {
      title: 'Faster Healing',
      description:
        'Lasers cauterize as they cut, minimizing bleeding and stimulating faster tissue regeneration.',
      icon: 'BoltIcon',
    },
    {
      title: 'Sterile Procedure',
      description:
        'High-energy light kills bacteria, reducing the risk of post-operative infections.',
      icon: 'ShieldCheckIcon',
    },
  ];

  const details = [
    {
      title: 'Advanced Laser Care',
      content:
        'Laser dentistry utilizes intense beams of light to remove or reshape tissue. It allows for high precision and is used for a variety of soft and hard tissue procedures, transforming the dental experience to be more comfortable and efficient.',
    },
    {
      title: 'Common Applications',
      content: `We use laser technology for:
• Gum Contouring: Reshaping gum lines for a more balanced smile (Gummy Smile correction).
• Periodontal Treatment: Removing diseased tissue and bacteria from gum pockets.
• Biopsies: Precise removal of tissue for examination.
• Teeth Whitening: Activating whitening agents for faster results.`,
    },
    {
      title: 'The Patient Experience',
      content:
        'Patients typically report significantly less anxiety and discomfort with laser procedures. The lack of drilling noise and vibration, combined with reduced recovery time, makes it an excellent choice for modern dental care.',
    },
  ];

  return (
    <ServiceDetail
      title="Laser Dentistry"
      category="Advanced Tech"
      description="State-of-the-art laser treatments for precise, painless, and bloodless dental procedures. Experience faster healing and superior results with light-based dentistry."
      image="/assets/images/treatments/laser_dentistry.jpeg"
      painlessFeature="No-drill, often needle-free treatment"
      duration="Varies by procedure"
      benefits={benefits}
      details={details}
    />
  );
};

export default LaserDentistry;
