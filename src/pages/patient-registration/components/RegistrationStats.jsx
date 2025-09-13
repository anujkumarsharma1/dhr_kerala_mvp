import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Registered',
      value: stats?.totalRegistered,
      icon: 'Users',
      color: 'bg-primary',
      textColor: 'text-primary'
    },
    {
      title: 'Today\'s Registrations',
      value: stats?.todayRegistrations,
      icon: 'UserPlus',
      color: 'bg-success',
      textColor: 'text-success'
    },
    {
      title: 'Pending Screening',
      value: stats?.pendingScreening,
      icon: 'Clock',
      color: 'bg-warning',
      textColor: 'text-warning'
    },
    {
      title: 'Active Districts',
      value: stats?.activeDistricts,
      icon: 'MapPin',
      color: 'bg-secondary',
      textColor: 'text-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg medical-shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat?.title}</p>
              <p className={`text-2xl font-bold ${stat?.textColor} mt-1`}>
                {stat?.value?.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegistrationStats;