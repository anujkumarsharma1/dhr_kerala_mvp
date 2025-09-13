import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'registration',
      title: 'New Patient Registered',
      description: 'Rajesh Kumar (ID: RK240913) registered at Kochi Construction Site',
      user: 'Dr. Priya Nair',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'screening',
      title: 'TB Screening Completed',
      description: 'Screening completed for Mohammed Ali (ID: MA240912) - No symptoms detected',
      user: 'Nurse Lakshmi',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'Stethoscope',
      color: 'primary'
    },
    {
      id: 3,
      type: 'referral',
      title: 'Urgent Referral Created',
      description: 'Suspected TB case - Amit Singh (ID: AS240911) referred to District Hospital',
      user: 'Dr. Suresh Kumar',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 4,
      type: 'referral_update',
      title: 'Referral Status Updated',
      description: 'Referral for Deepak Sharma (ID: DS240910) marked as completed',
      user: 'System Update',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 5,
      type: 'screening',
      title: 'TB Screening Completed',
      description: 'Screening completed for Ravi Patel (ID: RP240909) - Follow-up required',
      user: 'Dr. Maya Thomas',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Stethoscope',
      color: 'accent'
    },
    {
      id: 6,
      type: 'registration',
      title: 'New Patient Registered',
      description: 'Sunil Yadav (ID: SY240908) registered at Trivandrum Factory',
      user: 'Nurse Reshma',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 7,
      type: 'message',
      title: 'Reminder Sent',
      description: 'Follow-up reminder sent to Vikram Singh (ID: VS240907)',
      user: 'System Automated',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'MessageSquare',
      color: 'secondary'
    },
    {
      id: 8,
      type: 'screening',
      title: 'TB Screening Completed',
      description: 'Screening completed for Arjun Mehta (ID: AM240906) - No symptoms detected',
      user: 'Dr. Anita Raj',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Stethoscope',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      accent: 'bg-accent/10 text-accent border-accent/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'registration', label: 'Registrations', icon: 'UserPlus' },
    { value: 'screening', label: 'Screenings', icon: 'Stethoscope' },
    { value: 'referral', label: 'Referrals', icon: 'ArrowRightLeft' },
    { value: 'message', label: 'Messages', icon: 'MessageSquare' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest updates from the field</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <select 
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical"
            >
              {filterOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activities found for the selected filter</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity, index) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-medical">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getColorClasses(activity?.color)}`}>
                    <Icon name={activity?.icon} size={18} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {activity?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {activity?.description}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity?.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <Button variant="outline" fullWidth iconName="Eye" iconPosition="left">
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;