import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const Orthodontics = () => {
  const benefits = [
    {
      title: 'Straightened Smile',
      description: 'Correct overcrowding, gaps, and misaligned teeth for a perfect look.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Healthier Mouth',
      description:
        'Straight teeth are easier to clean, reducing the risk of decay and gum disease.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Corrected Bite',
      description: 'Solve issues like overbite or underbite for better chewing and jaw health.',
      icon: 'AdjustmentsHorizontalIcon',
    },
    {
      title: 'Lifelong Confidence',
      description: 'A beautiful smile boosts self-esteem and makes a great first impression.',
      icon: 'HeartIcon',
    },
  ];

  const details = [
    {
      title: 'Modern Orthodontic Solutions',
      content:
        "Orthodontics is more than just straightening teeth; it's about ensuring the correct alignment of your bite and jaw. Today, there are more options than ever, making treatment more comfortable and less noticeable than in the past.",
    },
    {
      title: 'Benefits Beyond Looks',
      content: `While a straight smile is the most obvious benefit, orthodontic treatment also:
• Improves speech and chewing efficiency
• Prevents uneven tooth wear
• Alleviates jaw joint issues (TMJ)
• Makes oral hygiene significantly easier to maintain`,
    },
    {
      title: 'Treatment Options',
      content: `We offer a full range of orthodontic appliances:
• Traditional Metal Braces: The most proven and cost-effective method.
• Ceramic Braces: Less visible than metal, blending with your natural tooth color.
• Self-Ligating Braces: Faster treatment with fewer adjustment visits.
• Clear Aligners: Virtually invisible, removable trays (like Invisalign).`,
    },
    {
      title: 'When to Start?',
      content:
        "While orthodontic treatment can be successful at any age, early evaluation (around age 7) is recommended to identify potential issues before they become more complex. However, we treat many adults who want to achieve the smile they've always wanted.",
    },
  ];

  return (
    <ServiceDetail
      title="Orthodontic Treatment"
      category="Cosmetic"
      description="Unlock your perfect smile. From traditional braces to invisible aligners, we offer customized orthodontic plans for children and adults to improve health and aesthetics."
      image="https://img.rocket.new/generatedImages/rocket_gen_img_1fe94a121-1765863790353.png"
      painlessFeature="Advanced Comfort-Fit Brackets"
      duration="12-24 months"
      benefits={benefits}
      details={details}
    />
  );
};

export default Orthodontics;
