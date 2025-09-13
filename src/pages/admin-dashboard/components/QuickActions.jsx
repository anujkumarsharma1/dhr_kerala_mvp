import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Register New Patient',
      description: 'Add a new migrant worker to the system',
      icon: 'UserPlus',
      color: 'success',
      path: '/patient-registration',
      stats: '247 this month'
    },
    {
      title: 'TB Screening Form',
      description: 'Conduct tuberculosis screening assessment',
      icon: 'Stethoscope',
      color: 'primary',
      path: '/tb-screening-form',
      stats: '89 today'
    },
    {
      title: 'Search Patients',
      description: 'Find patient records by name or phone',
      icon: 'Search',
      color: 'secondary',
      path: '/patient-search',
      stats: '1,247 total'
    },
    {
      title: 'Manage Referrals',
      description: 'Track and update referral status',
      icon: 'ArrowRightLeft',
      color: 'warning',
      path: '/referral-management',
      stats: '12 pending'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20',
      success: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common administrative tasks</p>
        </div>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action?.path)}
            className={`p-4 rounded-lg border-2 text-left transition-medical hover:scale-105 focus-medical ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-current/20`}>
                <Icon name={action?.icon} size={20} className="text-current" />
              </div>
              <span className="text-xs font-medium opacity-75">{action?.stats}</span>
            </div>
            
            <h4 className="font-semibold text-current mb-1">{action?.title}</h4>
            <p className="text-sm opacity-75 line-clamp-2">{action?.description}</p>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-medium opacity-75">Click to access</span>
              <Icon name="ArrowRight" size={16} className="text-current opacity-75" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            iconName="FileText" 
            iconPosition="left"
            onClick={() => navigate('/reports')}
          >
            Generate Reports
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            iconName="Users" 
            iconPosition="left"
            onClick={() => navigate('/field-workers')}
          >
            Manage Field Workers
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            iconName="Settings" 
            iconPosition="left"
            onClick={() => navigate('/settings')}
          >
            System Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;