import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const TeethBleaching = () => {
  const benefits = [
    {
      title: 'Dramatic Whitening',
      description: 'Lighten your teeth beyond their natural shade for a stunningly bright smile.',
      icon: 'SparklesIcon',
    },
    {
      title: 'Deep Stain Removal',
      description:
        'Break down intrinsic stains from aging, medication, or trauma that standard whitening cannot reach.',
      icon: 'BeakerIcon',
    },
    {
      title: 'Professional Supervision',
      description:
        'Performed under expert care using clinical-grade agents for maximum safety and efficacy.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Long-Lasting Results',
      description:
        'Deep-penetrating bleaching agents provide results that stay vibrant for much longer.',
      icon: 'ClockIcon',
    },
  ];

  const details = [
    {
      title: 'What is Teeth Bleaching?',
      content:
        'While whitening restores teeth to their natural white, teeth bleaching aims to go beyond that. It utilizes higher concentrations of professional-grade hydrogen peroxide or carbamide peroxide to penetrate the enamel and dentin, targeting deeper stains and achieving a much brighter result than over-the-counter or basic whitening methods.',
    },
    {
      title: 'The Procedure',
      content:
        'Our in-office bleaching treatment involves the application of a high-potency bleaching gel, which is often light-activated to speed up the oxidative process. We carefully protect your gums and soft tissues with a specialized barrier before applying the gel, ensuring a comfortable experience even with clinical-grade concentrations.',
    },
    {
      title: 'Intrinsic vs. Extrinsic Stains',
      content:
        'Surface (extrinsic) stains from coffee or tea are easily handled by whitening. However, intrinsic stains—those within the tooth structure itself—require bleaching. This is ideal for patients with discoloration due to fluorosis, certain medications, or the natural yellowing that occurs with age.',
    },
    {
      title: 'Customized Care & Safety',
      content:
        'At Singh Dental Clinic, we monitor every step of the process. We evaluate your tooth sensitivity levels and adjust the treatment time and concentration accordingly. We also provide post-bleaching treatments to rehydrate the enamel and minimize any temporary sensitivity.',
    },
  ];

  return (
    <ServiceDetail
      title="Teeth Bleaching"
      category="Cosmetic"
      description="Achieve a transformational smile with our professional bleaching treatments. We use dental-grade agents to reach deeper stains and deliver brilliance that goes beyond natural whitening."
      image="/assets/images/treatments/teeth_bleaching.png"
      painlessFeature="Precision Gums Protection & Desensitizing Gel"
      duration="60-90 minutes"
      benefits={benefits}
      details={details}
    />
  );
};

export default TeethBleaching;
