import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Mock credentials for different user roles
  const mockCredentials = {
    admin: {
      email: 'admin@dhrkerala.gov.in',
      password: 'Admin@123',
      role: 'admin',
      name: 'Dr. Rajesh Kumar'
    },
    fieldWorker: {
      email: 'fieldworker@dhrkerala.gov.in',
      password: 'Field@123',
      role: 'field-worker',
      name: 'Sarah Mathew'
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    clearErrors();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { email, password } = data;
      let userCredentials = null;

      // Check against mock credentials
      if (email === mockCredentials?.admin?.email && password === mockCredentials?.admin?.password) {
        userCredentials = mockCredentials?.admin;
      } else if (email === mockCredentials?.fieldWorker?.email && password === mockCredentials?.fieldWorker?.password) {
        userCredentials = mockCredentials?.fieldWorker;
      }

      if (userCredentials) {
        // Mock JWT token
        const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
          id: userCredentials?.role === 'admin' ? 1 : 2,
          email: userCredentials?.email,
          role: userCredentials?.role,
          name: userCredentials?.name,
          exp: Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000) // 30 days or 1 day
        }))}.signature`;

        // Store authentication data
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userRole', userCredentials?.role);
        localStorage.setItem('userName', userCredentials?.name);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Role-based navigation
        if (userCredentials?.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/admin-dashboard'); // Field workers also go to dashboard but with limited access
        }
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid email or password. Please check your credentials and try again.'
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to password reset
    alert('Password reset functionality will be implemented. Please contact your administrator for assistance.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          error={errors?.email?.message}
          required
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="mb-4"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            error={errors?.password?.message}
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              }
            })}
            className="mb-4"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-medical"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e?.target?.checked)}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-medical"
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {errors?.root && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.root?.message}</p>
            </div>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="right"
          className="mt-6"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      {/* Mock Credentials Helper */}
      <div className="mt-8 p-4 bg-muted/50 rounded-md border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Demo Credentials
        </h4>
        <div className="space-y-3 text-xs">
          <div className="p-2 bg-card rounded border">
            <p className="font-medium text-foreground">Administrator</p>
            <p className="text-muted-foreground">Email: admin@dhrkerala.gov.in</p>
            <p className="text-muted-foreground">Password: Admin@123</p>
          </div>
          <div className="p-2 bg-card rounded border">
            <p className="font-medium text-foreground">Field Worker</p>
            <p className="text-muted-foreground">Email: fieldworker@dhrkerala.gov.in</p>
            <p className="text-muted-foreground">Password: Field@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;