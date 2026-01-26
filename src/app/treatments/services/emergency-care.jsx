import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const EmergencyCare = () => {
  const benefits = [
    {
      title: 'Immediate Relief',
      description: 'Same-day appointments to alleviate acute pain and discomfort.',
      icon: 'BoltIcon',
    },
    {
      title: 'Save Damaged Teeth',
      description: 'Prompt action can often save a tooth that has been knocked out or fractured.',
      icon: 'HeartIcon',
    },
    {
      title: 'Prevent Infection',
      description: 'Early treatment of abscesses prevents the spread of dangerous infections.',
      icon: 'ShieldExclamationIcon',
    },
    {
      title: 'Expert Urgent Care',
      description:
        'Trained specialists ready to handle complex surgical and restorative emergencies.',
      icon: 'AcademicCapIcon',
    },
  ];

  const details = [
    {
      title: 'When is it a Dental Emergency?',
      content: `Dental emergencies can be frightening and painful. Knowing when you need immediate care is crucial. Common emergencies include:
Ã¢‚¬¢ Severe toothache or facial swelling
Ã¢‚¬¢ A knocked - out or loose permanent tooth
Ã¢‚¬¢ A cracked, fractured, or broken tooth
Ã¢‚¬¢ A lost filling or crown causing pain
Ã¢‚¬¢ Bleeding from the mouth that doesn't stop`,
    },
    {
      title: 'The Importance of Speed',
      content:
        'In many situations, like a knocked-out tooth, getting to the dentist within 30-60 minutes can mean the difference between saving and losing the tooth. We prioritize emergency cases to ensure you get the fastest possible relief and stabilization.',
    },
    {
      title: 'What to Do in an Emergency',
      content: `Ã¢‚¬¢ Knocked-out Tooth: Handle it by the crown, not the root. Rinse it gently and try to place it back in the socket or keep it in a small container of milk.
Ã¢‚¬¢ Severe Pain: Rinse with warm water and use a cold compress on the outside of your cheek.Call us immediately.
Ã¢‚¬¢ Broken Tooth: Save any pieces and rinse your mouth with warm water.`,
    },
    {
      title: 'Our Emergency Commitment',
      content:
        "At Singh Dental Clinic, we understand that emergencies don't happen on a schedule. We offer 24/7 support and dedicated emergency slots to ensure our patients are never left in pain.",
    },
  ];

  return (
    <ServiceDetail
      title="Emergency Dental Care"
      category="Emergency"
      description="Don't suffer in silence. We provide rapid, expert care for dental trauma, infections, and acute pain when you need it most. Our team is standing by to help."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1d7afda72-1765054215254.png"
      painlessFeature="Immediate Pain Stabilization"
      duration="Urgent Response"
      benefits={benefits}
      details={details}
    />
  );
};

export default EmergencyCare;
