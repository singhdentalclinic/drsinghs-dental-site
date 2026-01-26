'use client';

import { useState, useEffect, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import TreatmentProcess from './TreatmentProcess';
import EmergencyContact from './EmergencyContact';
import TreatmentFinder from './TreatmentFinder';
import CostCalculator from './CostCalculator';
import Icon from '@/components/ui/AppIcon';

export default function ServicesInteractive({ services, treatmentSteps, emergencyInfo, symptoms }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['services', 'process', 'finder', 'calculator', 'emergency'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const categories = [
    { id: 'all', name: 'All Services', icon: 'Squares2X2Icon' },
    { id: 'cosmetic', name: 'Cosmetic', icon: 'SparklesIcon' },
    { id: 'restorative', name: 'Restorative', icon: 'WrenchScrewdriverIcon' },
    { id: 'preventive', name: 'Preventive', icon: 'ShieldCheckIcon' },
    { id: 'emergency', name: 'Emergency', icon: 'ExclamationTriangleIcon' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services?.filter((service) => service?.category?.toLowerCase() === selectedCategory);

  const tabs = [
    { id: 'services', name: 'Our Services', icon: 'RectangleStackIcon' },
    {
      id: 'process',
      name: 'Treatment Process',
      icon: 'ClipboardDocumentListIcon',
    },
    { id: 'calculator', name: 'Cost Calculator', icon: 'CurrencyRupeeIcon' },
    { id: 'finder', name: 'Treatment Finder', icon: 'MagnifyingGlassIcon' },
    {
      id: 'emergency',
      name: 'Emergency Care',
      icon: 'ExclamationTriangleIcon',
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center w-full pb-2">
          {tabs?.map((tab, index) => (
            <Fragment key={tab?.id}>
              <button
                onClick={() => handleTabChange(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 md:px-6 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-fast ${
                  activeTab === tab?.id
                    ? 'bg-primary text-white shadow-elevation-md'
                    : 'bg-card text-text-primary hover:bg-muted'
                }`}
              >
                <Icon
                  name={tab?.icon}
                  size={20}
                  variant={activeTab === tab?.id ? 'solid' : 'outline'}
                />
                <span className="whitespace-nowrap">{tab?.name}</span>
              </button>
              {index < tabs.length - 1 && (
                <div
                  className={`w-px h-6 bg-black/50 mx-1 transition-opacity duration-300 ${
                    activeTab === tab.id || activeTab === tabs[index + 1].id
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/30 to-transparent my-4 md:my-6" />

      {activeTab === 'services' && (
        <div>
          <div className="mb-8 md:mb-12">
            <div className="flex flex-wrap gap-3">
              {categories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-fast ${
                    selectedCategory === category?.id
                      ? 'bg-secondary text-white shadow-elevation-sm'
                      : 'bg-card text-text-primary hover:bg-muted border border-border'
                  }`}
                >
                  <Icon
                    name={category?.icon}
                    size={18}
                    variant={selectedCategory === category?.id ? 'solid' : 'outline'}
                  />
                  <span>{category?.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredServices?.map((service) => (
              <ServiceCard key={service?.id} service={service} />
            ))}
          </div>
        </div>
      )}
      {activeTab === 'process' && <TreatmentProcess steps={treatmentSteps} />}

      {activeTab === 'calculator' && <CostCalculator treatments={services} />}

      {activeTab === 'finder' && <TreatmentFinder symptoms={symptoms} />}
      {activeTab === 'emergency' && <EmergencyContact contactInfo={emergencyInfo} />}
    </div>
  );
}

ServicesInteractive.propTypes = {
  services: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      slug: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired,
      painlessFeature: PropTypes?.string?.isRequired,
      duration: PropTypes?.string?.isRequired,
      startingPrice: PropTypes?.number?.isRequired,
      isEmergency: PropTypes?.bool,
    })
  )?.isRequired,
  treatmentSteps: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      duration: PropTypes?.string,
    })
  )?.isRequired,
  emergencyInfo: PropTypes?.shape({
    emergencyPhone: PropTypes?.string?.isRequired,
    emergencyEmail: PropTypes?.string?.isRequired,
    responseTime: PropTypes?.string?.isRequired,
    emergencyTypes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
  symptoms: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      relatedTreatments: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    })
  )?.isRequired,
};
