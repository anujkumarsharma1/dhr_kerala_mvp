import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 text-center">
      {/* Government Certification */}
      <div className="mb-6 p-4 bg-card border border-border rounded-lg medical-shadow">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Award" size={16} color="white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Certified Healthcare Platform</p>
            <p className="text-xs text-muted-foreground">Kerala Health Department Approved</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>10,000+ Workers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>14 Districts</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Building" size={12} />
            <span>500+ Sites</span>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="mb-6 space-y-2">
        <p className="text-xs text-muted-foreground">
          Need help? Contact technical support
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs">
          <a 
            href="tel:+91-471-2518000" 
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-medical"
          >
            <Icon name="Phone" size={12} />
            <span>+91-471-2518000</span>
          </a>
          <a 
            href="mailto:support@dhrkerala.gov.in" 
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-medical"
          >
            <Icon name="Mail" size={12} />
            <span>support@dhrkerala.gov.in</span>
          </a>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-2">
          © {currentYear} Government of Kerala. All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs">
          <button className="text-muted-foreground hover:text-foreground transition-medical">
            Privacy Policy
          </button>
          <span className="text-border">|</span>
          <button className="text-muted-foreground hover:text-foreground transition-medical">
            Terms of Service
          </button>
          <span className="text-border">|</span>
          <button className="text-muted-foreground hover:text-foreground transition-medical">
            Data Protection
          </button>
        </div>
      </div>

      {/* Version Information */}
      <div className="mt-4 text-xs text-muted-foreground">
        <p>DHR Kerala MVP v1.0.0 | Build: 2025.01.13</p>
      </div>
    </div>
  );
};

export default LoginFooter;