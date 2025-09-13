import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const districtOptions = [
    { value: '', label: 'All Districts' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'pathanamthitta', label: 'Pathanamthitta' },
    { value: 'alappuzha', label: 'Alappuzha' },
    { value: 'kottayam', label: 'Kottayam' },
    { value: 'idukki', label: 'Idukki' },
    { value: 'ernakulam', label: 'Ernakulam' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'palakkad', label: 'Palakkad' },
    { value: 'malappuram', label: 'Malappuram' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'wayanad', label: 'Wayanad' },
    { value: 'kannur', label: 'Kannur' },
    { value: 'kasaragod', label: 'Kasaragod' }
  ];

  const worksiteOptions = [
    { value: '', label: 'All Worksites' },
    { value: 'construction', label: 'Construction Site' },
    { value: 'factory', label: 'Factory' },
    { value: 'plantation', label: 'Plantation' },
    { value: 'port', label: 'Port/Harbor' },
    { value: 'quarry', label: 'Quarry' },
    { value: 'textile', label: 'Textile Mill' },
    { value: 'other', label: 'Other' }
  ];

  const screeningStatusOptions = [
    { value: '', label: 'All Status' },
    { value: 'not_screened', label: 'Not Screened' },
    { value: 'normal', label: 'Normal' },
    { value: 'suspected', label: 'TB Suspected' },
    { value: 'referred', label: 'Referred' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value && value !== '' && value !== 'all'
  );

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Advanced Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
            />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* District Filter */}
            <Select
              label="District"
              options={districtOptions}
              value={filters?.district || ''}
              onChange={(value) => handleFilterChange('district', value)}
              placeholder="Select district"
            />

            {/* Worksite Filter */}
            <Select
              label="Worksite Type"
              options={worksiteOptions}
              value={filters?.worksite || ''}
              onChange={(value) => handleFilterChange('worksite', value)}
              placeholder="Select worksite"
            />

            {/* Screening Status Filter */}
            <Select
              label="Screening Status"
              options={screeningStatusOptions}
              value={filters?.screeningStatus || ''}
              onChange={(value) => handleFilterChange('screeningStatus', value)}
              placeholder="Select status"
            />

            {/* Age Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Age Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters?.minAge || ''}
                  onChange={(e) => handleFilterChange('minAge', e?.target?.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters?.maxAge || ''}
                  onChange={(e) => handleFilterChange('maxAge', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
            <Input
              label="Registration Date From"
              type="date"
              value={filters?.registrationFrom || ''}
              onChange={(e) => handleFilterChange('registrationFrom', e?.target?.value)}
            />
            <Input
              label="Registration Date To"
              type="date"
              value={filters?.registrationTo || ''}
              onChange={(e) => handleFilterChange('registrationTo', e?.target?.value)}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-foreground">Quick Filters:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('screeningStatus', 'suspected')}
              className={filters?.screeningStatus === 'suspected' ? 'bg-accent text-accent-foreground' : ''}
            >
              TB Suspected
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('screeningStatus', 'not_screened')}
              className={filters?.screeningStatus === 'not_screened' ? 'bg-accent text-accent-foreground' : ''}
            >
              Pending Screening
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                handleFilterChange('registrationFrom', sevenDaysAgo?.toISOString()?.split('T')?.[0]);
                handleFilterChange('registrationTo', today?.toISOString()?.split('T')?.[0]);
              }}
              className={filters?.registrationFrom && filters?.registrationTo ? 'bg-accent text-accent-foreground' : ''}
            >
              Last 7 Days
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;