import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuspectedCaseAlert = ({ isSuspected, riskLevel, recommendations, onCreateReferral }) => {
  if (!isSuspected) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircle" size={20} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-success mb-2">Low TB Risk</h3>
            <p className="text-sm text-foreground mb-4">
              Based on the screening assessment, this patient shows low risk for tuberculosis. 
              Continue routine health monitoring and maintain good health practices.
            </p>
            <div className="bg-card rounded-md p-4">
              <h4 className="font-medium text-foreground mb-2">Recommendations:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Continue regular health check-ups</li>
                <li>• Maintain good nutrition and hygiene</li>
                <li>• Seek medical attention if symptoms develop</li>
                <li>• Follow workplace safety guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-destructive';
      case 'moderate': return 'text-warning';
      default: return 'text-accent';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'high': return 'bg-destructive/10 border-destructive/20';
      case 'moderate': return 'bg-warning/10 border-warning/20';
      default: return 'bg-accent/10 border-accent/20';
    }
  };

  const getRiskIconBg = (level) => {
    switch (level) {
      case 'high': return 'bg-destructive';
      case 'moderate': return 'bg-warning';
      default: return 'bg-accent';
    }
  };

  return (
    <div className={`border rounded-lg p-6 ${getRiskBgColor(riskLevel)}`}>
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getRiskIconBg(riskLevel)}`}>
          <Icon name="AlertTriangle" size={20} color="white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${getRiskColor(riskLevel)}`}>
              Suspected TB Case - {riskLevel?.charAt(0)?.toUpperCase() + riskLevel?.slice(1)} Risk
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getRiskIconBg(riskLevel)}`}></div>
              <span className={`text-sm font-medium ${getRiskColor(riskLevel)}`}>
                {riskLevel?.toUpperCase()} PRIORITY
              </span>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-4">
            This patient meets the criteria for suspected tuberculosis based on clinical symptoms and risk factors. 
            Immediate referral for further evaluation and diagnostic testing is recommended.
          </p>

          <div className="bg-card rounded-md p-4 mb-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Clinical Recommendations:</span>
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              {recommendations?.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="destructive"
              onClick={onCreateReferral}
              iconName="ArrowRightLeft"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Create Urgent Referral
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Download Report
            </Button>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>
                Screening completed on {new Date()?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })} at {new Date()?.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspectedCaseAlert;