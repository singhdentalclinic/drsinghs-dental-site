'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function CostCalculator({ treatments }) {
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('standard');
  const [hasInsurance, setHasInsurance] = useState(false);

  const calculateCost = () => {
    if (!selectedTreatment) return 0;

    const treatment = treatments?.find((t) => String(t?.id) === String(selectedTreatment));
    if (!treatment) return 0;

    let baseCost = treatment?.startingPrice;

    if (selectedComplexity === 'complex') {
      baseCost *= 1.5;
    } else if (selectedComplexity === 'simple') {
      baseCost *= 0.8;
    }

    if (hasInsurance) {
      baseCost *= 0.7;
    }

    return Math.round(baseCost);
  };

  const estimatedCost = calculateCost();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-6 md:p-8 lg:p-10 shadow-elevation-md">
      <div className="flex items-center space-x-3 mb-6 md:mb-8">
        <div className="p-3 bg-accent rounded-lg">
          <Icon name="CurrencyRupeeIcon" size={24} variant="solid" className="text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-headline font-semibold text-text-primary">
          Treatment Cost Calculator
        </h3>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block text-sm md:text-base font-medium text-text-primary mb-2">
            Select Treatment
          </label>
          <select
            value={selectedTreatment}
            onChange={(e) => setSelectedTreatment(e?.target?.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-md text-sm md:text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Choose a treatment...</option>
            {treatments?.map((treatment) => (
              <option key={treatment?.id} value={treatment?.id}>
                {treatment?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm md:text-base font-medium text-text-primary mb-2">
            Treatment Complexity
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['simple', 'standard', 'complex']?.map((complexity) => (
              <button
                key={complexity}
                onClick={() => setSelectedComplexity(complexity)}
                className={`px-4 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-fast ${
                  selectedComplexity === complexity
                    ? 'bg-primary text-white shadow-elevation-sm'
                    : 'bg-white text-text-primary border border-border hover:border-primary'
                }`}
              >
                {complexity?.charAt(0)?.toUpperCase() + complexity?.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-white rounded-md border border-border">
          <input
            type="checkbox"
            id="insurance"
            checked={hasInsurance}
            onChange={(e) => setHasInsurance(e?.target?.checked)}
            className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
          />
          <label
            htmlFor="insurance"
            className="text-sm md:text-base text-text-primary cursor-pointer"
          >
            I have dental insurance (30% coverage)
          </label>
        </div>

        {estimatedCost > 0 && (
          <div className="mt-6 md:mt-8 p-6 md:p-8 bg-white rounded-lg border-2 border-primary">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base md:text-lg text-text-secondary">Estimated Cost:</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary whitespace-nowrap">
                Ã¢€š¹{estimatedCost?.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-start space-x-2 text-xs md:text-sm text-text-secondary">
              <Icon
                name="InformationCircleIcon"
                size={18}
                variant="outline"
                className="flex-shrink-0 mt-0.5"
              />
              <p>
                This is an estimated cost. Final pricing will be determined after consultation with
                Dr. Singh based on your specific dental condition.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CostCalculator.propTypes = {
  treatments: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.oneOfType([PropTypes.string, PropTypes.number])?.isRequired,
      name: PropTypes?.string?.isRequired,
      startingPrice: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
};
