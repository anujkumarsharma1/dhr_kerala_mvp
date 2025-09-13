import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ClinicalSection = ({ clinicalData, onClinicalChange, isExpanded, onToggle }) => {
  const breathingSoundOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'wheezing', label: 'Wheezing' },
    { value: 'crackles', label: 'Crackles' },
    { value: 'diminished', label: 'Diminished' }
  ];

  const lymphNodeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'enlarged_neck', label: 'Enlarged - Neck' },
    { value: 'enlarged_armpit', label: 'Enlarged - Armpit' },
    { value: 'enlarged_multiple', label: 'Enlarged - Multiple sites' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-medical"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Stethoscope" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Clinical Assessment</h3>
            <p className="text-sm text-muted-foreground">Physical examination findings</p>
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
          {/* Vital Signs */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="Activity" size={18} className="text-secondary" />
              <span>Vital Signs</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Temperature (°C)"
                type="number"
                placeholder="36.5"
                value={clinicalData?.vitalSigns?.temperature}
                onChange={(e) => onClinicalChange('vitalSigns', 'temperature', e?.target?.value)}
                step="0.1"
                min="35"
                max="42"
              />
              <Input
                label="Blood Pressure (mmHg)"
                type="text"
                placeholder="120/80"
                value={clinicalData?.vitalSigns?.bloodPressure}
                onChange={(e) => onClinicalChange('vitalSigns', 'bloodPressure', e?.target?.value)}
              />
              <Input
                label="Heart Rate (bpm)"
                type="number"
                placeholder="72"
                value={clinicalData?.vitalSigns?.heartRate}
                onChange={(e) => onClinicalChange('vitalSigns', 'heartRate', e?.target?.value)}
                min="40"
                max="200"
              />
            </div>
          </div>

          {/* Physical Examination */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="Search" size={18} className="text-secondary" />
              <span>Physical Examination</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Breathing Sounds"
                options={breathingSoundOptions}
                value={clinicalData?.physicalExam?.breathingSounds}
                onChange={(value) => onClinicalChange('physicalExam', 'breathingSounds', value)}
                placeholder="Select breathing sounds"
              />
              <Select
                label="Lymph Nodes"
                options={lymphNodeOptions}
                value={clinicalData?.physicalExam?.lymphNodes}
                onChange={(value) => onClinicalChange('physicalExam', 'lymphNodes', value)}
                placeholder="Select lymph node status"
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Chest deformity or asymmetry"
                checked={clinicalData?.physicalExam?.chestDeformity}
                onChange={(e) => onClinicalChange('physicalExam', 'chestDeformity', e?.target?.checked)}
              />
              <Checkbox
                label="Visible weight loss or malnutrition"
                checked={clinicalData?.physicalExam?.visibleWeightLoss}
                onChange={(e) => onClinicalChange('physicalExam', 'visibleWeightLoss', e?.target?.checked)}
              />
              <Checkbox
                label="Pallor or anemia signs"
                checked={clinicalData?.physicalExam?.pallor}
                onChange={(e) => onClinicalChange('physicalExam', 'pallor', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Clinical Notes</label>
            <textarea
              className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical resize-none"
              rows={4}
              placeholder="Additional clinical observations, examination findings, or relevant notes..."
              value={clinicalData?.notes}
              onChange={(e) => onClinicalChange('notes', '', e?.target?.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalSection;