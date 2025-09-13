import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'field-worker', userName = 'Dr. Sarah Kumar', isCollapsed = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'field-worker']
    },
    {
      label: 'Patients',
      path: '/patient-search',
      icon: 'Users',
      roles: ['admin', 'field-worker']
    },
    {
      label: 'Register',
      path: '/patient-registration',
      icon: 'UserPlus',
      roles: ['admin', 'field-worker']
    },
    {
      label: 'Screen',
      path: '/tb-screening-form',
      icon: 'Stethoscope',
      roles: ['admin', 'field-worker']
    },
    {
      label: 'Referrals',
      path: '/referral-management',
      icon: 'ArrowRightLeft',
      roles: ['admin', 'field-worker'],
      badge: 3
    }
  ];

  const visibleItems = navigationItems?.filter(item => item?.roles?.includes(userRole));

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/patient-search?q=${encodeURIComponent(searchQuery?.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setIsProfileOpen(false);
  };

  const getRoleDisplayName = (role) => {
    return role === 'admin' ? 'Administrator' : 'Field Worker';
  };

  return (
    <header className="bg-card border-b border-border medical-shadow sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">DHR Kerala</h1>
              <p className="text-xs text-muted-foreground">Digital Health Records</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visibleItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-medical touch-target ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item?.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => navigate('/patient-search')}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-medical touch-target"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md medical-shadow z-50">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle profile navigation
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-medical"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle help navigation
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-medical"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-medical"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-1">
            {visibleItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`relative flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-medical touch-target ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                  {item?.badge && (
                    <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item?.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Mobile Search */}
          <div className="px-4 pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical touch-target"
              />
            </form>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Overlay for profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;