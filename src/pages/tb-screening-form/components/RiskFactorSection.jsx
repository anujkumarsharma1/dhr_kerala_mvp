import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RiskFactorSection = ({ riskFactors, onRiskFactorChange, isExpanded, onToggle }) => {
  const exposureOptions = [
    { value: 'none', label: 'No known exposure' },
    { value: 'household', label: 'Household contact' },
    { value: 'workplace', label: 'Workplace contact' },
    { value: 'community', label: 'Community contact' }
  ];

  const livingConditionsOptions = [
    { value: 'good', label: 'Good ventilation, adequate space' },
    { value: 'moderate', label: 'Moderate conditions' },
    { value: 'poor', label: 'Overcrowded, poor ventilation' },
    { value: 'very_poor', label: 'Very poor conditions' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-medical"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Risk Factors</h3>
            <p className="text-sm text-muted-foreground">TB exposure and risk assessment</p>
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
          {/* TB Exposure History */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="Users" size={18} className="text-secondary" />
              <span>TB Exposure History</span>
            </h4>
            
            <Select
              label="Known TB exposure"
              description="Contact with confirmed TB cases"
              options={exposureOptions}
              value={riskFactors?.tbExposure?.type}
              onChange={(value) => onRiskFactorChange('tbExposure', 'type', value)}
              placeholder="Select exposure type"
            />

            {riskFactors?.tbExposure?.type !== 'none' && (
              <Input
                label="Details of exposure"
                type="text"
                placeholder="Describe the nature and duration of TB contact"
                value={riskFactors?.tbExposure?.details}
                onChange={(e) => onRiskFactorChange('tbExposure', 'details', e?.target?.value)}
              />
            )}
          </div>

          {/* Medical History */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="FileText" size={18} className="text-secondary" />
              <span>Medical History</span>
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Previous TB treatment"
                description="History of tuberculosis treatment"
                checked={riskFactors?.medicalHistory?.previousTB}
                onChange={(e) => onRiskFactorChange('medicalHistory', 'previousTB', e?.target?.checked)}
              />
              
              <Checkbox
                label="HIV positive"
                description="Known HIV infection"
                checked={riskFactors?.medicalHistory?.hivPositive}
                onChange={(e) => onRiskFactorChange('medicalHistory', 'hivPositive', e?.target?.checked)}
              />
              
              <Checkbox
                label="Diabetes"
                description="Diagnosed diabetes mellitus"
                checked={riskFactors?.medicalHistory?.diabetes}
                onChange={(e) => onRiskFactorChange('medicalHistory', 'diabetes', e?.target?.checked)}
              />
              
              <Checkbox
                label="Immunosuppressive medication"
                description="Currently taking immunosuppressive drugs"
                checked={riskFactors?.medicalHistory?.immunosuppressed}
                onChange={(e) => onRiskFactorChange('medicalHistory', 'immunosuppressed', e?.target?.checked)}
              />
              
              <Checkbox
                label="Chronic lung disease"
                description="COPD, asthma, or other chronic respiratory conditions"
                checked={riskFactors?.medicalHistory?.chronicLungDisease}
                onChange={(e) => onRiskFactorChange('medicalHistory', 'chronicLungDisease', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
              <Icon name="Home" size={18} className="text-secondary" />
              <span>Lifestyle & Environmental Factors</span>
            </h4>
            
            <Select
              label="Living conditions"
              description="Housing and ventilation quality"
              options={livingConditionsOptions}
              value={riskFactors?.lifestyle?.livingConditions}
              onChange={(value) => onRiskFactorChange('lifestyle', 'livingConditions', value)}
              placeholder="Select living conditions"
            />

            <div className="space-y-3">
              <Checkbox
                label="Tobacco use"
                description="Current or recent tobacco smoking"
                checked={riskFactors?.lifestyle?.tobaccoUse}
                onChange={(e) => onRiskFactorChange('lifestyle', 'tobaccoUse', e?.target?.checked)}
              />
              
              <Checkbox
                label="Alcohol use disorder"
                description="Excessive alcohol consumption"
                checked={riskFactors?.lifestyle?.alcoholUse}
                onChange={(e) => onRiskFactorChange('lifestyle', 'alcoholUse', e?.target?.checked)}
              />
              
              <Checkbox
                label="Malnutrition"
                description="Poor nutritional status"
                checked={riskFactors?.lifestyle?.malnutrition}
                onChange={(e) => onRiskFactorChange('lifestyle', 'malnutrition', e?.target?.checked)}
              />
              
              <Checkbox
                label="Occupational exposure"
                description="Work in high-risk environment (mining, healthcare, etc.)"
                checked={riskFactors?.lifestyle?.occupationalExposure}
                onChange={(e) => onRiskFactorChange('lifestyle', 'occupationalExposure', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Additional Risk Information */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Additional Risk Information</label>
            <textarea
              className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical resize-none"
              rows={3}
              placeholder="Any other relevant risk factors or additional information..."
              value={riskFactors?.additionalInfo}
              onChange={(e) => onRiskFactorChange('additionalInfo', '', e?.target?.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskFactorSection;