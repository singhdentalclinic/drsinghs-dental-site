'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function StoryFilters({ categories, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (categoryId) => {
    setActiveFilter(categoryId);
    onFilterChange(categoryId);
  };

  return (
    <div className="w-full bg-card rounded-lg p-4 md:p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline text-lg md:text-xl font-semibold text-text-primary">
          Filter by Treatment
        </h3>
        <Icon name="FunnelIcon" size={20} variant="outline" className="text-text-secondary" />
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button
          onClick={() => handleFilterClick('all')}
          className={`px-4 py-2 rounded-md font-body text-sm md:text-base font-medium transition-all duration-fast ${
            activeFilter === 'all'
              ? 'bg-primary text-primary-foreground shadow-elevation-sm'
              : 'bg-muted text-text-secondary hover:bg-muted/80'
          }`}
        >
          All Stories
        </button>
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => handleFilterClick(category?.id)}
            className={`px-4 py-2 rounded-md font-body text-sm md:text-base font-medium transition-all duration-fast ${
              activeFilter === category?.id
                ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                : 'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            {category?.name}
          </button>
        ))}
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
