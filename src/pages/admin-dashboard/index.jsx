import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import ScreeningChart from './components/ScreeningChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    district: 'all',
    worksite: 'all',
    timeRange: 'today'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalPatients: {
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase'
    },
    screeningsCompleted: {
      value: '89',
      change: '+8.2%',
      changeType: 'increase'
    },
    suspectedCases: {
      value: '23',
      change: '+15.7%',
      changeType: 'increase'
    },
    pendingReferrals: {
      value: '12',
      change: '-5.3%',
      changeType: 'decrease'
    }
  };

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const formatLastUpdated = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName="Dr. Sarah Kumar" />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive oversight of migrant worker health programs across Kerala
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleRefresh}
              loading={isLoading}
              iconName="RefreshCw"
              iconSize={16}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <FilterControls onFiltersChange={handleFiltersChange} />
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Patients"
            value={dashboardMetrics?.totalPatients?.value}
            change={dashboardMetrics?.totalPatients?.change}
            changeType={dashboardMetrics?.totalPatients?.changeType}
            icon="Users"
            color="primary"
          />
          <MetricsCard
            title="Screenings Today"
            value={dashboardMetrics?.screeningsCompleted?.value}
            change={dashboardMetrics?.screeningsCompleted?.change}
            changeType={dashboardMetrics?.screeningsCompleted?.changeType}
            icon="Stethoscope"
            color="success"
          />
          <MetricsCard
            title="Suspected TB Cases"
            value={dashboardMetrics?.suspectedCases?.value}
            change={dashboardMetrics?.suspectedCases?.change}
            changeType={dashboardMetrics?.suspectedCases?.changeType}
            icon="AlertTriangle"
            color="warning"
          />
          <MetricsCard
            title="Pending Referrals"
            value={dashboardMetrics?.pendingReferrals?.value}
            change={dashboardMetrics?.pendingReferrals?.change}
            changeType={dashboardMetrics?.pendingReferrals?.changeType}
            icon="ArrowRightLeft"
            color="accent"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Chart Section - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <ScreeningChart />
          </div>
          
          {/* Activity Feed - Takes 1 column on xl screens */}
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">System Status</h3>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-sm font-medium text-success">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Services</span>
                <span className="text-sm font-medium text-success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">SMS Gateway</span>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Backup Status</span>
                <span className="text-sm font-medium text-success">Up to date</span>
              </div>
            </div>
          </div>

          {/* Field Workers */}
          <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Field Workers</h3>
              <Icon name="Users" size={20} className="text-secondary" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Today</span>
                <span className="text-sm font-medium text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Registered</span>
                <span className="text-sm font-medium text-foreground">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">On Leave</span>
                <span className="text-sm font-medium text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Training Required</span>
                <span className="text-sm font-medium text-warning">2</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
              <Icon name="Bell" size={20} className="text-accent" />
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">High Risk Case</p>
                  <p className="text-xs text-muted-foreground">Urgent referral needed - ID: AS240911</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">System Maintenance</p>
                  <p className="text-xs text-muted-foreground">Scheduled for tonight 11 PM - 2 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Backup Completed</p>
                  <p className="text-xs text-muted-foreground">Daily backup successful at 3:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;