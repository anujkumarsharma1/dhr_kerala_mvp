import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientHeader = ({ patient }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 medical-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{patient?.name}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Icon name="Hash" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">QR ID: {patient?.qrId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{patient?.age} years</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{patient?.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
            <Icon name="MapPin" size={14} className="mr-1" />
            {patient?.district}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{patient?.worksite}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;