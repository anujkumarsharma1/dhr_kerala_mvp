import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SymptomSection = ({ symptoms, onSymptomChange, isExpanded, onToggle }) => {
  const durationOptions = [
    { value: 'less_than_2_weeks', label: 'Less than 2 weeks' },
    { value: '2_to_3_weeks', label: '2-3 weeks' },
    { value: 'more_than_3_weeks', label: 'More than 3 weeks' }
  ];

  const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-medical"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Thermometer" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Symptoms Assessment</h3>
            <p className="text-sm text-muted-foreground">Clinical symptoms and duration</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Cough */}
          <div className="space-y-3">
            <Checkbox
              label="Persistent cough"
              description="Cough lasting more than 2 weeks"
              checked={symptoms?.cough?.present}
              onChange={(e) => onSymptomChange('cough', 'present', e?.target?.checked)}
            />
            {symptoms?.cough?.present && (
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Duration"
                  options={durationOptions}
                  value={symptoms?.cough?.duration}
                  onChange={(value) => onSymptomChange('cough', 'duration', value)}
                  placeholder="Select duration"
                />
                <div className="space-y-2">
                  <Checkbox
                    label="Blood in sputum"
                    checked={symptoms?.cough?.bloodInSputum}
                    onChange={(e) => onSymptomChange('cough', 'bloodInSputum', e?.target?.checked)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Fever */}
          <div className="space-y-3">
            <Checkbox
              label="Fever"
              description="Elevated body temperature"
              checked={symptoms?.fever?.present}
              onChange={(e) => onSymptomChange('fever', 'present', e?.target?.checked)}
            />
            {symptoms?.fever?.present && (
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Duration"
                  options={durationOptions}
                  value={symptoms?.fever?.duration}
                  onChange={(value) => onSymptomChange('fever', 'duration', value)}
                  placeholder="Select duration"
                />
                <Select
                  label="Severity"
                  options={severityOptions}
                  value={symptoms?.fever?.severity}
                  onChange={(value) => onSymptomChange('fever', 'severity', value)}
                  placeholder="Select severity"
                />
              </div>
            )}
          </div>

          {/* Weight Loss */}
          <div className="space-y-3">
            <Checkbox
              label="Unexplained weight loss"
              description="Significant weight loss without known cause"
              checked={symptoms?.weightLoss?.present}
              onChange={(e) => onSymptomChange('weightLoss', 'present', e?.target?.checked)}
            />
            {symptoms?.weightLoss?.present && (
              <div className="ml-6">
                <Select
                  label="Duration"
                  options={durationOptions}
                  value={symptoms?.weightLoss?.duration}
                  onChange={(value) => onSymptomChange('weightLoss', 'duration', value)}
                  placeholder="Select duration"
                />
              </div>
            )}
          </div>

          {/* Night Sweats */}
          <div className="space-y-3">
            <Checkbox
              label="Night sweats"
              description="Excessive sweating during sleep"
              checked={symptoms?.nightSweats?.present}
              onChange={(e) => onSymptomChange('nightSweats', 'present', e?.target?.checked)}
            />
            {symptoms?.nightSweats?.present && (
              <div className="ml-6">
                <Select
                  label="Severity"
                  options={severityOptions}
                  value={symptoms?.nightSweats?.severity}
                  onChange={(value) => onSymptomChange('nightSweats', 'severity', value)}
                  placeholder="Select severity"
                />
              </div>
            )}
          </div>

          {/* Chest Pain */}
          <div className="space-y-3">
            <Checkbox
              label="Chest pain"
              description="Pain or discomfort in chest area"
              checked={symptoms?.chestPain?.present}
              onChange={(e) => onSymptomChange('chestPain', 'present', e?.target?.checked)}
            />
            {symptoms?.chestPain?.present && (
              <div className="ml-6">
                <Select
                  label="Severity"
                  options={severityOptions}
                  value={symptoms?.chestPain?.severity}
                  onChange={(value) => onSymptomChange('chestPain', 'severity', value)}
                  placeholder="Select severity"
                />
              </div>
            )}
          </div>

          {/* Fatigue */}
          <div className="space-y-3">
            <Checkbox
              label="Persistent fatigue"
              description="Unusual tiredness or weakness"
              checked={symptoms?.fatigue?.present}
              onChange={(e) => onSymptomChange('fatigue', 'present', e?.target?.checked)}
            />
            {symptoms?.fatigue?.present && (
              <div className="ml-6">
                <Select
                  label="Severity"
                  options={severityOptions}
                  value={symptoms?.fatigue?.severity}
                  onChange={(value) => onSymptomChange('fatigue', 'severity', value)}
                  placeholder="Select severity"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomSection;