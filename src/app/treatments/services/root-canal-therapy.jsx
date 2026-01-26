import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const RootCanal = () => {
  const benefits = [
    {
      title: 'Painless Procedure',
      description:
        'Advanced local anesthesia and rotary endodontics ensure a comfortable, pain-free experience.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Save Natural Tooth',
      description:
        'The best tooth is your own. RCT allows us to save a severely damaged tooth from extraction.',
      icon: 'HeartIcon',
    },
    {
      title: 'Prevents Bone Loss',
      description: 'By treating the infection early, we prevent it from spreading to the jawbone.',
      icon: 'CubeIcon',
    },
    {
      title: 'Efficient Function',
      description:
        'Restores the ability to chew properly and enjoy your favorite foods without discomfort.',
      icon: 'SparklesIcon',
    },
  ];

  const details = [
    {
      title: 'What is Root Canal Treatment?',
      content:
        'A root canal treatment (RCT) is a dental procedure designed to save a tooth that is severely decayed or becomes infected. When the pulp (the soft tissue inside the tooth) becomes inflamed or infected due to deep decay, repeated dental procedures, or a crack in the tooth, it can cause severe pain or lead to an abscess if left untreated.',
    },
    {
      title: 'Why Do You Need RCT?',
      content: `The primary goal of RCT is to remove the infected pulp, clean and disinfect the root canals, and Ã˜³Ã™¾Ã˜³ seal the space to prevent further infection. Leaving an infected tooth untreated can lead to severe consequences, including:
Ã¢‚¬¢ Intense, radiating pain
Ã¢‚¬¢ Bone loss around the tip of the root
Ã¢‚¬¢ Swelling that may spread to the face or neck
Ã¢‚¬¢ Drainage issues from the root`,
    },
    {
      title: 'Symptoms to Watch For',
      content: `You may need a root canal if you experience:
Ã¢‚¬¢ Severe toothache when chewing or applying pressure
Ã¢‚¬¢ Prolonged sensitivity to hot or cold temperatures
Ã¢‚¬¢ Discoloration(darkening) of the tooth
Ã¢‚¬¢ Swelling and tenderness in nearby gums
Ã¢‚¬¢ A persistent or recurring pimple on the gums`,
    },
    {
      title: 'Our Advanced Approach',
      content:
        'At Singh Dental Clinic, we use the latest endodontic technology, including rotary instruments and digital apex locators, to ensure the highest precision and a faster, more comfortable treatment for our patients.',
    },
  ];

  return (
    <ServiceDetail
      title="Root Canal Therapy"
      category="Restorative"
      description="Save your natural smile with our advanced, painless root canal treatments. We eliminate infection and restore your tooth's health using state-of-the-art endodontic technology."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_17415946d-1764726098639.png"
      painlessFeature="Precision Rotary Endodontics"
      duration="1-2 sittings"
      benefits={benefits}
      details={details}
    />
  );
};

export default RootCanal;
