'use client';

import { useState, useEffect, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import TreatmentProcess from './TreatmentProcess';
import EmergencyContact from './EmergencyContact';
import TreatmentFinder from './TreatmentFinder';
import Icon from '@/components/ui/AppIcon';

export default function ServicesInteractive({ services, treatmentSteps, emergencyInfo, symptoms }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['services', 'process', 'finder', 'emergency'].includes(tab)) {
      setActiveTab(tab);
    } else if (tab === 'calculator') {
      setActiveTab('services');
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

  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((id) => id !== 'all');
        if (withoutAll.includes(categoryId)) {
          const updated = withoutAll.filter((id) => id !== categoryId);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...withoutAll, categoryId];
        }
      });
    }
  };

  const filteredServices =
    selectedCategories.includes('all')
      ? services
      : services?.filter((service) =>
        selectedCategories.includes(service?.category?.toLowerCase())
      );

  const tabs = [
    { id: 'services', name: 'Our Services', icon: 'RectangleStackIcon' },
    {
      id: 'process',
      name: 'Treatment Process',
      icon: 'ClipboardDocumentListIcon',
    },
    { id: 'finder', name: 'Treatment Finder', icon: 'MagnifyingGlassIcon' },
    {
      id: 'emergency',
      name: 'Emergency Care',
      icon: 'ExclamationTriangleIcon',
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center w-full pb-2 overflow-x-auto flex-nowrap scrollbar-hide">
          {tabs?.map((tab, index) => (
            <Fragment key={tab?.id}>
              <button
                onClick={() => handleTabChange(tab?.id)}
                className={`flex-shrink-0 md:flex-1 flex items-center justify-center space-x-2 px-4 md:px-6 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-fast ${activeTab === tab?.id
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
                  className={`flex-shrink-0 w-px h-6 bg-black/50 mx-1 transition-opacity duration-300 ${activeTab === tab.id || activeTab === tabs[index + 1].id
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
        <div className="min-w-0">
          <div className="mb-8 md:mb-12 relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center text-sm text-text-secondary">
                Showing {filteredServices.length} results
              </div>

              <div className="flex items-center space-x-2">
                {!selectedCategories.includes('all') && (
                  <button
                    onClick={() => setSelectedCategories(['all'])}
                    className="text-xs md:text-sm text-secondary font-medium hover:underline whitespace-nowrap"
                  >
                    Clear all
                  </button>
                )}

                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg border transition-all relative ${isFilterOpen || (selectedCategories.length > 0 && !selectedCategories.includes('all'))
                    ? 'bg-secondary text-white border-secondary shadow-sm'
                    : 'bg-white text-text-primary border-border hover:bg-muted'
                    }`}
                  aria-label="Filter"
                >
                  <Icon name="FunnelIcon" size={20} variant={isFilterOpen ? 'solid' : 'outline'} />
                  {selectedCategories.length > 0 && !selectedCategories.includes('all') && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                      {selectedCategories.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-elevation-lg border border-border z-50 py-3 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="px-4 py-2 border-b border-border/50 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Categories</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            name={category.icon}
                            size={18}
                            className={selectedCategories.includes(category.id) ? 'text-secondary' : 'text-text-secondary'}
                          />
                          <span className={`${selectedCategories.includes(category.id) ? 'font-semibold text-secondary' : 'text-text-primary'}`}>
                            {category.name}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(category.id)
                          ? 'bg-secondary border-secondary'
                          : 'bg-white border-border'
                          }`}>
                          {selectedCategories.includes(category.id) && (
                            <Icon name="CheckIcon" size={14} className="text-white" variant="solid" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 pt-3 mt-2 border-t border-border/50">
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full py-2 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-secondary/90 shadow-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {filteredServices?.map((service) => (
              <ServiceCard key={service?.id} service={service} />
            ))}
          </div>
        </div>
      )}
      {activeTab === 'process' && <TreatmentProcess steps={treatmentSteps} />}
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
