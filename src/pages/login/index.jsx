import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (authToken && userRole) {
      // Redirect to appropriate dashboard based on role
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      
      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-xl medical-shadow p-8 sm:p-10">
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </div>
        </div>
      </div>

      {/* Mobile Optimization */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border p-4 sm:hidden">
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Secure connection established</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;