'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function StoryFilters({ categories, onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (categoryId) => {
    let nextFilters;
    if (categoryId === 'all') {
      nextFilters = ['all'];
    } else {
      // Remove 'all' if it's there
      const withoutAll = selectedFilters.filter((f) => f !== 'all');

      if (withoutAll.includes(categoryId)) {
        nextFilters = withoutAll.filter((f) => f !== categoryId);
        // If empty, default to 'all'
        if (nextFilters.length === 0) nextFilters = ['all'];
      } else {
        nextFilters = [...withoutAll, categoryId];
      }
    }

    setSelectedFilters(nextFilters);
    onFilterChange(nextFilters);
  };

  const activeCategoryCount = selectedFilters.includes('all') ? 'All' : selectedFilters.length;

  return (
    <div className="w-full relative z-30 mb-8 md:mb-12">
      <div className="bg-card rounded-lg shadow-elevation-sm border border-gray-100">
        {/* Header Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50/50 transition-colors rounded-lg"
        >
          <div className="flex flex-col items-start text-left">
            <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary">
              Filter by Treatment
            </h3>
            <span className="text-xs text-text-secondary mt-1">
              Select one or multiple options to filter stories
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                Status
              </span>
              <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                {activeCategoryCount} Selected
              </span>
            </div>
            <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
              <Icon
                name="FunnelIcon"
                size={20}
                variant={isOpen ? 'solid' : 'outline'}
              />
            </div>
          </div>
        </button>

        {/* Overlay Filter Options */}
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-elevation-lg border border-gray-100 p-4 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300 z-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <button
                  onClick={() => toggleFilter('all')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border-2 ${selectedFilters.includes('all')
                      ? 'bg-primary/5 border-primary text-primary'
                      : 'bg-gray-50 border-transparent hover:border-gray-200 text-text-secondary'
                    }`}
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center transition-all ${selectedFilters.includes('all') ? 'bg-primary' : 'bg-white border-2 border-gray-300'
                      }`}
                  >
                    {selectedFilters.includes('all') && (
                      <Icon name="CheckIcon" size={16} className="text-white" variant="solid" />
                    )}
                  </div>
                  <span className="font-body text-base font-medium">All Stories</span>
                </button>

                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => toggleFilter(category?.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border-2 ${selectedFilters.includes(category?.id)
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-gray-50 border-transparent hover:border-gray-200 text-text-secondary'
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center transition-all ${selectedFilters.includes(category?.id)
                          ? 'bg-primary'
                          : 'bg-white border-2 border-gray-300'
                        }`}
                    >
                      {selectedFilters.includes(category?.id) && (
                        <Icon name="CheckIcon" size={16} className="text-white" variant="solid" />
                      )}
                    </div>
                    <span className="font-body text-base font-medium">{category?.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-text-secondary italic">
                  Showing results for {selectedFilters.length} {selectedFilters.length === 1 ? 'category' : 'categories'}
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-2.5 bg-primary text-white rounded-lg font-semibold shadow-elevation-sm hover:brightness-110 active:scale-95 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

StoryFilters.propTypes = {
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  onFilterChange: PropTypes?.func?.isRequired,
};
