import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const WisdomToothExtraction = () => {
  const benefits = [
    {
      title: 'Pain Relief',
      description: 'Eliminate the constant ache and swelling caused by impacted third molars.',
      icon: 'BoltIcon',
    },
    {
      title: 'Protect Nearby Teeth',
      description: 'Prevent damage to adjacent molars caused by pressure and bacterial buildup.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Avoid Crowding',
      description:
        'Removal prevents wisdom teeth from pushing against and misaligning other teeth.',
      icon: 'Squares2X2Icon',
    },
    {
      title: 'Prevent Infections',
      description: 'Stop the development of painful cysts and gum infections (pericoronitis).',
      icon: 'ShieldExclamationIcon',
    },
  ];

  const details = [
    {
      title: 'What are Wisdom Teeth?',
      content:
        'Wisdom teeth, or third molars, are the last set of teeth to emerge, usually in the late teens or early twenties. Because most mouths don\'t have enough room for them, they often become "impacted" (stuck) or emerge at an angle, causing various dental problems.',
    },
    {
      title: 'Why Removal is Often Necessary',
      content: `An impacted or poorly positioned wisdom tooth can cause:
Ã¢‚¬¢ Infection(pericoronitis) in the surrounding gum tissue
Ã¢‚¬¢ Decay of the wisdom tooth or the adjacent molar
Ã¢‚¬¢ Formation of cysts or tumors in the jawbone
Ã¢‚¬¢ Severe pain and inflammation`,
    },
    {
      title: 'A Careful, Expert Approach',
      content:
        'At Singh Dental Clinic, we use panoramic X-rays to precisely map the position of your wisdom teeth and their proximity to nerves. Our oral surgeons use atraumatic extraction techniques to minimize discomfort and ensure the fastest possible healing.',
    },
    {
      title: 'Fast Recovery',
      content:
        'The procedure is typically performed under local anesthesia. We provide detailed post-operative instructions and a follow-up plan to ensure your recovery is smooth and you can return to your normal routine quickly.',
    },
  ];

  return (
    <ServiceDetail
      title="Wisdom Tooth Extraction"
      category="Restorative"
      description="Say goodbye to wisdom tooth pain. Our expert team provides safe, gentle, and precise extractions for impacted or problematic third molars to protect your oral health."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1244f7db5-1765753041878.png"
      painlessFeature="Atraumatic Surgical Techniques"
      duration="30-60 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default WisdomToothExtraction;
