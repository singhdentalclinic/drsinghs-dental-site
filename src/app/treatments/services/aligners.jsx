import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const Aligners = () => {
  const benefits = [
    {
      title: 'Virtually Invisible',
      description:
        'Clear plastic aligners are barely noticeable, allowing you to straighten teeth discreetly.',
      icon: 'EyeSlashIcon',
    },
    {
      title: 'Removable',
      description:
        'Take them out for eating, brushing, and special occasions for maximum convenience.',
      icon: 'HandThumbUpIcon',
    },
    {
      title: 'Comfortable',
      description:
        'Smooth plastic design eliminates irritation often caused by metal wires and brackets.',
      icon: 'FaceSmileIcon',
    },
    {
      title: 'Predictable Results',
      description:
        'Digital treatment planning allows you to see your projected smile before starting.',
      icon: 'ComputerDesktopIcon',
    },
  ];

  const details = [
    {
      title: 'What are Clear Aligners?',
      content:
        'Clear aligners are a modern alternative to braces. They are custom-made, transparent trays that fit snugly over your teeth and gradually shift them into their desired position. They are popular among adults and teens who want a less noticeable orthodontic treatment.',
    },
    {
      title: 'How it Works',
      content: `The process involves:
1. Digital Scanning: We create a 3D model of your teeth.
2. Custom Trays: A series of aligners are fabricated specifically for you.
3. Gradual Movement: You wear each set for about 2 weeks before switching to the next, slowly moving your teeth.
4. Retention: Once aligned, retainers ensure your smile stays perfect.`,
    },
    {
      title: 'Lifestyle Benefits',
      content:
        'With no dietary restrictions and easy maintenance, aligners fit seamlessly into your life. Simply remove them to eat whatever you want and to brush and floss normally.',
    },
  ];

  return (
    <ServiceDetail
      title="Clear Aligners"
      category="Orthodontics"
      description="The clear alternative to metal braces. Straighten your teeth discreetly and comfortably with our advanced custom-made aligner systems."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1da2cf36a-1764669224538.png"
      painlessFeature="Smooth, comfortable plastic fit"
      duration="6-18 months"
      benefits={benefits}
      details={details}
    />
  );
};

export default Aligners;
