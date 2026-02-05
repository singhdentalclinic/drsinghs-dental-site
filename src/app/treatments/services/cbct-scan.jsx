import React from 'react';
import ServiceDetail from '../components/ServiceDetail';

const CBCTScan = () => {
    const benefits = [
        {
            title: 'High-Precision 3D Imaging',
            description:
                'Provides detailed 3D views of teeth, soft tissues, nerve pathways, and bone in a single scan.',
            icon: 'MagnifyingGlassIcon',
        },
        {
            title: 'Minimal Radiation',
            description:
                'Utilizes advanced cone-beam technology to offer higher precision with significantly less radiation than medical CT scans.',
            icon: 'ShieldCheckIcon',
        },
        {
            title: 'Accurate Planning',
            description:
                'Essential for precise dental implant placement, orthodontic planning, and complex surgical procedures.',
            icon: 'ChartBarIcon',
        },
        {
            title: 'Comprehensive Diagnosis',
            description:
                'Detects serious diseases, lesions, and infections that may be hidden in traditional 2D X-rays.',
            icon: 'IdentificationIcon',
        },
    ];

    const details = [
        {
            title: 'What is a CBCT Scan?',
            content:
                'A dental Cone Beam Computed Tomography (CBCT) scan is a specialized type of X-ray equipment used when regular dental or facial X-rays are not sufficient. It uses a special type of technology to generate three-dimensional (3D) images of dental structures, soft tissues, nerve paths, and bone in the craniofacial region of the body in a single scan.',
        },
        {
            title: 'Why Do You Need It?',
            content:
                'CBCT scans are commonly used for more complex cases, such as: planning for dental implants, surgical planning for impacted teeth, diagnosing TMJ disorder, evaluating the jaw, sinuses, and nerve canals, and detecting tumors or other pathologies.',
        },
        {
            title: 'Benefits of 3D Imaging',
            content:
                'The primary advantage is the ability to see anatomical structures from all angles with incredible clarity. This precision leads to more accurate diagnoses, safer procedures, and better treatment outcomes for patients.',
        },
        {
            title: 'The Procedure',
            content:
                'The scan is quick, painless, and non-invasive. You will sit or stand while a rotating arm circles your head, capturing hundreds of images in less than a minute. Our team will guide you through the process to ensure optimal results.',
        },
    ];

    return (
        <ServiceDetail
            title="CBCT Scan"
            category="Advanced Tech"
            description="Experience the next generation of dental diagnostics with our high-definition 3D CBCT imaging. We provide precise, low-dose scans for accurate treatment planning and better patient care."
            image="/assets/images/treatments/cbct.png"
            painlessFeature="Quick, Non-Invasive 3D Scan"
            duration="5-10 minutes"
            benefits={benefits}
            details={details}
        />
    );
};

export default CBCTScan;
