import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFiltersChange }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedWorksite, setSelectedWorksite] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [isExpanded, setIsExpanded] = useState(false);

  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kochi', label: 'Kochi' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'kottayam', label: 'Kottayam' },
    { value: 'palakkad', label: 'Palakkad' },
    { value: 'malappuram', label: 'Malappuram' }
  ];

  const worksites = [
    { value: 'all', label: 'All Worksites' },
    { value: 'construction', label: 'Construction Sites' },
    { value: 'factory', label: 'Factories' },
    { value: 'port', label: 'Port Areas' },
    { value: 'plantation', label: 'Plantations' },
    { value: 'textile', label: 'Textile Mills' },
    { value: 'fishing', label: 'Fishing Industry' },
    { value: 'hospitality', label: 'Hotels & Restaurants' },
    { value: 'domestic', label: 'Domestic Work' }
  ];

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (type, value) => {
    let newFilters = {
      district: selectedDistrict,
      worksite: selectedWorksite,
      timeRange: selectedTimeRange
    };

    switch (type) {
      case 'district':
        setSelectedDistrict(value);
        newFilters.district = value;
        break;
      case 'worksite':
        setSelectedWorksite(value);
        newFilters.worksite = value;
        break;
      case 'timeRange':
        setSelectedTimeRange(value);
        newFilters.timeRange = value;
        break;
    }

    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const resetFilters = () => {
    setSelectedDistrict('all');
    setSelectedWorksite('all');
    setSelectedTimeRange('today');
    
    if (onFiltersChange) {
      onFiltersChange({
        district: 'all',
        worksite: 'all',
        timeRange: 'today'
      });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedDistrict !== 'all') count++;
    if (selectedWorksite !== 'all') count++;
    if (selectedTimeRange !== 'today') count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Data Filters</h3>
              <p className="text-xs text-muted-foreground">
                {getActiveFiltersCount() > 0 
                  ? `${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} active`
                  : 'No filters applied'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                iconName="X"
                iconSize={14}
              >
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </div>
        </div>

        {/* Quick Filters - Always Visible */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleFilterChange('district', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical"
            >
              {districts?.map(district => (
                <option key={district?.value} value={district?.value}>
                  {district?.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Time Range
            </label>
            <select
              value={selectedTimeRange}
              onChange={(e) => handleFilterChange('timeRange', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical"
            >
              {timeRanges?.map(range => (
                <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Worksite Type
                </label>
                <select
                  value={selectedWorksite}
                  onChange={(e) => handleFilterChange('worksite', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical"
                >
                  {worksites?.map(worksite => (
                    <option key={worksite?.value} value={worksite?.value}>
                      {worksite?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Status Filter
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical">
                  <option value="all">All Statuses</option>
                  <option value="active">Active Cases</option>
                  <option value="pending">Pending Review</option>
                  <option value="completed">Completed</option>
                  <option value="referred">Referred</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Risk Level
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical">
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                  <option value="no-risk">No Risk</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export Data
              </Button>
              <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
                Refresh
              </Button>
              <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                Custom Date Range
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;