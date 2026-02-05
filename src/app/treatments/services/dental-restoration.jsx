import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const DentalRestoration = () => {
    const benefits = [
        {
            title: 'Restores Chewing Function',
            description:
                'Enables proper biting and chewing, essential for a balanced diet and overall oral health.',
            icon: 'ArrowPathIcon',
        },
        {
            title: 'Prevents Further Damage',
            description:
                'Halts the progression of decay and protects vulnerable teeth from infection or breakage.',
            icon: 'ShieldCheckIcon',
        },
        {
            title: 'Enhances Smile Aesthetics',
            description:
                'Improves the appearance of discolored, chipped, or missing teeth, boosting self-confidence.',
            icon: 'SparklesIcon',
        },
        {
            title: 'Preserves Natural Teeth',
            description:
                'Our priority is always to save your natural teeth through advanced restorative treatments.',
            icon: 'HeartIcon',
        },
    ];

    const details = [
        {
            title: 'What is Dental Restoration?',
            content:
                'Dental restorations are treatments designed to repair and rebuild tooth structure, improving both the appearance and function of damaged teeth. Whether dealing with cavities, cracks, or missing teeth, restoration is crucial for maintaining oral well-being.',
        },
        {
            title: 'Common Types of Restoration',
            content:
                'We offer a full range of restorative solutions, including: composite fillings for cavities, crowns for weak or damaged teeth, bridges and implants for missing teeth, and bonding for minor repairs.',
        },
        {
            title: 'Why Choose Restoration?',
            content:
                'Addressing dental issues early prevents more severe problems and costly, invasive procedures later. Restorations don’t just fix teeth; they restore your bite, your speech, and your confidence.',
        },
        {
            title: 'Signs You Need Restoration',
            content:
                'Persistent tooth pain or sensitivity, visible chips or cracks, difficulty chewing, or dark spots on your teeth are all indicators that you may need restorative care. We recommend a consultation for an accurate diagnosis.',
        },
    ];

    return (
        <ServiceDetail
            title="Dental Restoration"
            category="Restorative"
            description="Restore the strength and beauty of your smile with our comprehensive dental restoration services. From simple fillings to advanced implants, we provide durable solutions for every concern."
            image="/assets/images/treatments/dental_restoration.jpeg"
            painlessFeature="Gentle, Minimally Invasive Care"
            duration="Varies by procedure"
            benefits={benefits}
            details={details}
        />
    );
};

export default DentalRestoration;
