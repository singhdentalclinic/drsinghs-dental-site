import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const GumTreatment = () => {
  const benefits = [
    {
      title: 'Stop Gum Bleeding',
      description: 'Resolve inflammation and restore your gums to a healthy, pink state.',
      icon: 'PlusCircleIcon',
    },
    {
      title: 'Prevent Tooth Loss',
      description: 'Healthy gums provide the essential foundation for your natural teeth.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Save Jawbone',
      description: 'Advanced therapy prevents bone resorption caused by periodontitis.',
      icon: 'CubeIcon',
    },
    {
      title: 'Fresher Breath',
      description: 'Removing bacteria from deep gum pockets eliminates chronic bad breath.',
      icon: 'SparklesIcon',
    },
  ];

  const details = [
    {
      title: 'Understanding Gum Disease',
      content:
        'Gum disease (periodontal disease) is an infection of the tissues that hold your teeth in place. It starts as gingivitis (red, swollen gums) and can progress to periodontitis, which can damage the bone and lead to tooth loss.',
    },
    {
      title: 'Types of Treatment',
      content: `Depending on the severity of the disease, we offer:
Ã¢‚¬¢ Scaling and Root Planing: A deep cleaning that removes tartar from below the gum line and smooths the root surfaces.
Ã¢‚¬¢ Periodontal Maintenance: Regular check - ups and cleanings to manage gum health.
Ã¢‚¬¢ Laser Gum Therapy: Using advanced lasers to remove diseased tissue and promote healing with minimal discomfort.`,
    },
    {
      title: 'The Systemic Connection',
      content:
        'Gum health is closely linked to your overall health. Untreated periodontal disease has been associated with an increased risk of heart disease, diabetes, and respiratory issues. Treating your gums is an investment in your entire body.',
    },
    {
      title: 'Prevention and Maintenance',
      content:
        "The best way to prevent gum disease is through good oral hygiene (brushing and flossing) and regular professional cleanings. If you notice persistent bad breath, bleeding while brushing, or receding gums, it's time for a professional evaluation.",
    },
  ];

  return (
    <ServiceDetail
      title="Gum Disease Treatment"
      category="Restorative"
      description="Healthy gums are the foundation of a healthy smile. Our advanced periodontal therapies stop infection, prevent bone loss, and restore your oral health using gentle laser technology."
      image="/assets/images/treatments/gum_disease_treatment.jpeg"
      painlessFeature="Minimally Invasive Laser Therapy"
      duration="2-4 sessions"
      benefits={benefits}
      details={details}
    />
  );
};

export default GumTreatment;
