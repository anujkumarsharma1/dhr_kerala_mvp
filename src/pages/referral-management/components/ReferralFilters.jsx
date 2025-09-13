import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReferralFilters = ({ 
  filters, 
  onFiltersChange, 
  totalCount = 0, 
  filteredCount = 0,
  onCreateReferral,
  onExportData 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const facilityOptions = [
    { value: '', label: 'All Facilities' },
    { value: 'general-hospital-kochi', label: 'General Hospital Kochi' },
    { value: 'medical-college-trivandrum', label: 'Medical College Trivandrum' },
    { value: 'district-hospital-kozhikode', label: 'District Hospital Kozhikode' },
    { value: 'tb-clinic-ernakulam', label: 'TB Clinic Ernakulam' },
    { value: 'community-health-center-thrissur', label: 'Community Health Center Thrissur' },
    { value: 'primary-health-center-palakkad', label: 'Primary Health Center Palakkad' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'DONE', label: 'Completed' }
  ];

  const districtOptions = [
    { value: '', label: 'All Districts' },
    { value: 'ernakulam', label: 'Ernakulam' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'palakkad', label: 'Palakkad' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'kottayam', label: 'Kottayam' },
    { value: 'alappuzha', label: 'Alappuzha' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      facility: '',
      status: '',
      district: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      {/* Header Section */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title and Count */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Referral Management</h2>
              <p className="text-sm text-muted-foreground">
                Showing {filteredCount} of {totalCount} referrals
                {hasActiveFilters && (
                  <span className="ml-2 text-primary">
                    (filtered)
                  </span>
                )}
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name="Filter" size={16} />
              Filters
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onCreateReferral}
              iconName="Plus"
              iconPosition="left"
            >
              New Referral
            </Button>
          </div>
        </div>
      </div>
      {/* Filters Section */}
      <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search by patient name or facility..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Facility"
              options={facilityOptions}
              value={filters?.facility}
              onChange={(value) => handleFilterChange('facility', value)}
              placeholder="Select facility"
            />

            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            <Select
              label="District"
              options={districtOptions}
              value={filters?.district}
              onChange={(value) => handleFilterChange('district', value)}
              placeholder="Select district"
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                size="default"
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
                iconName="X"
                iconPosition="left"
                fullWidth
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="From Date"
              type="date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />

            <Input
              label="To Date"
              type="date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {Object.entries(filters)?.map(([key, value]) => {
                if (!value) return null;
                
                let displayValue = value;
                if (key === 'facility') {
                  const facility = facilityOptions?.find(f => f?.value === value);
                  displayValue = facility?.label || value;
                } else if (key === 'status') {
                  const status = statusOptions?.find(s => s?.value === value);
                  displayValue = status?.label || value;
                } else if (key === 'district') {
                  const district = districtOptions?.find(d => d?.value === value);
                  displayValue = district?.label || value;
                }

                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {displayValue}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralFilters;