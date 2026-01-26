'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function TreatmentFinder({ symptoms }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms((prev) => {
      if (prev?.includes(symptomId)) {
        return prev?.filter((id) => id !== symptomId);
      }
      return [...prev, symptomId];
    });
  };

  const findTreatments = () => {
    const matchedTreatments = new Set();

    selectedSymptoms?.forEach((symptomId) => {
      const symptom = symptoms?.find((s) => s?.id === symptomId);
      if (symptom) {
        symptom?.relatedTreatments?.forEach((treatment) => {
          matchedTreatments?.add(treatment);
        });
      }
    });

    setRecommendations(Array.from(matchedTreatments));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 md:p-8 lg:p-10 shadow-elevation-sm">
      <div className="flex items-center space-x-3 mb-6 md:mb-8">
        <div className="p-3 bg-secondary/10 rounded-lg">
          <Icon name="MagnifyingGlassIcon" size={24} variant="solid" className="text-secondary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-headline font-semibold text-text-primary">
          Treatment Finder
        </h3>
      </div>
      <p className="text-sm md:text-base text-text-secondary mb-6 leading-relaxed">
        Select your symptoms below to find the most suitable treatment options for your dental
        concerns.
      </p>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h4 className="text-base md:text-lg font-semibold text-text-primary mb-4">
            What symptoms are you experiencing?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {symptoms?.map((symptom) => (
              <button
                key={symptom?.id}
                onClick={() => toggleSymptom(symptom?.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-fast text-left ${
                  selectedSymptoms?.includes(symptom?.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedSymptoms?.includes(symptom?.id)
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {selectedSymptoms?.includes(symptom?.id) && (
                    <Icon name="CheckIcon" size={14} variant="solid" className="text-white" />
                  )}
                </div>
                <span className="text-sm md:text-base text-text-primary">{symptom?.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={findTreatments}
          disabled={selectedSymptoms?.length === 0}
          className={`w-full px-6 py-4 rounded-lg text-base md:text-lg font-cta font-semibold transition-all duration-fast ${
            selectedSymptoms?.length === 0
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-conversion hover:bg-conversion/90 text-conversion-foreground shadow-elevation-sm hover:shadow-elevation-md hover:-translate-y-0.5'
          }`}
        >
          Find Recommended Treatments
        </button>

        {recommendations?.length > 0 && (
          <div className="p-6 bg-success/5 border-2 border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success" />
              <h4 className="text-lg md:text-xl font-semibold text-text-primary">
                Recommended Treatments
              </h4>
            </div>
            <ul className="space-y-3">
              {recommendations?.map((treatment, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon
                    name="ArrowRightIcon"
                    size={18}
                    variant="outline"
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base text-text-primary">{treatment}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs md:text-sm text-text-secondary">
              Please book a consultation with Dr. Singh for accurate diagnosis and personalized
              treatment plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

TreatmentFinder.propTypes = {
  symptoms: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      relatedTreatments: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    })
  )?.isRequired,
};
