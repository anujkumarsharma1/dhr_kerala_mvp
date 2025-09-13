import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo and Branding */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center medical-shadow">
            <Icon name="Heart" size={32} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">DHR Kerala</h1>
            <p className="text-sm text-muted-foreground">Digital Health Records</p>
            <p className="text-xs text-secondary font-medium">Government of Kerala</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Sign in to access the Digital Health Record system for migrant worker healthcare management
        </p>
      </div>

      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure Login</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={14} className="text-success" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;