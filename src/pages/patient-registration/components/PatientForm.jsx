import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PatientForm = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm({
    defaultValues: {
      name: '',
      sex: '',
      age: '',
      phone: '',
      language: '',
      worksite: '',
      district: '',
      consent: false
    }
  });

  const [consentChecked, setConsentChecked] = useState(false);

  const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'malayalam', label: 'Malayalam' },
    { value: 'hindi', label: 'Hindi' }
  ];

  const districtOptions = [
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'pathanamthitta', label: 'Pathanamthitta' },
    { value: 'alappuzha', label: 'Alappuzha' },
    { value: 'kottayam', label: 'Kottayam' },
    { value: 'idukki', label: 'Idukki' },
    { value: 'ernakulam', label: 'Ernakulam' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'palakkad', label: 'Palakkad' },
    { value: 'malappuram', label: 'Malappuram' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'wayanad', label: 'Wayanad' },
    { value: 'kannur', label: 'Kannur' },
    { value: 'kasaragod', label: 'Kasaragod' }
  ];

  const handleConsentChange = (checked) => {
    setConsentChecked(checked);
    setValue('consent', checked);
    trigger('consent');
  };

  const onFormSubmit = (data) => {
    if (!consentChecked) {
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="bg-card rounded-lg medical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="UserPlus" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Patient Registration</h2>
          <p className="text-sm text-muted-foreground">Register new migrant worker for health screening</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter patient's full name"
              required
              error={errors?.name?.message}
              {...register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Name can only contain letters and spaces'
                }
              })}
            />

            <Select
              label="Sex"
              placeholder="Select sex"
              options={sexOptions}
              required
              error={errors?.sex?.message}
              value={watch('sex')}
              onChange={(value) => {
                setValue('sex', value);
                trigger('sex');
              }}
              {...register('sex', {
                required: 'Sex selection is required'
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              placeholder="Enter age"
              required
              error={errors?.age?.message}
              {...register('age', {
                required: 'Age is required',
                min: {
                  value: 1,
                  message: 'Age must be at least 1'
                },
                max: {
                  value: 120,
                  message: 'Age must be less than 120'
                }
              })}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter 10-digit phone number"
              required
              error={errors?.phone?.message}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter valid 10-digit Indian phone number'
                }
              })}
            />
          </div>

          <Select
            label="Preferred Language"
            placeholder="Select preferred language"
            options={languageOptions}
            required
            error={errors?.language?.message}
            value={watch('language')}
            onChange={(value) => {
              setValue('language', value);
              trigger('language');
            }}
            {...register('language', {
              required: 'Language selection is required'
            })}
          />
        </div>

        {/* Work Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Work Information
          </h3>
          
          <Input
            label="Worksite Location"
            type="text"
            placeholder="Enter worksite address or location"
            required
            error={errors?.worksite?.message}
            {...register('worksite', {
              required: 'Worksite location is required',
              minLength: {
                value: 5,
                message: 'Worksite location must be at least 5 characters'
              }
            })}
          />

          <Select
            label="District"
            placeholder="Select district"
            options={districtOptions}
            required
            searchable
            error={errors?.district?.message}
            value={watch('district')}
            onChange={(value) => {
              setValue('district', value);
              trigger('district');
            }}
            {...register('district', {
              required: 'District selection is required'
            })}
          />
        </div>

        {/* Digital Consent Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
            Digital Consent
          </h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-1 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong className="text-foreground">Data Collection & Usage:</strong> By providing consent, you agree to the collection and processing of your health information for TB screening and healthcare management purposes.
                </p>
                <p className="mb-2">
                  <strong className="text-foreground">Information Sharing:</strong> Your data will be shared with authorized healthcare providers and government health departments as required for treatment and public health monitoring.
                </p>
                <p>
                  <strong className="text-foreground">Rights:</strong> You have the right to access, update, or request deletion of your personal information at any time by contacting the healthcare facility.
                </p>
              </div>
            </div>
          </div>

          <Checkbox
            label="I provide my digital consent for health data collection and processing"
            description="This consent is required to proceed with registration and health screening"
            required
            error={errors?.consent?.message}
            checked={consentChecked}
            onChange={(e) => handleConsentChange(e?.target?.checked)}
            {...register('consent', {
              required: 'Digital consent is required to proceed'
            })}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isSubmitting}
            disabled={!consentChecked || isSubmitting}
            iconName="UserPlus"
            iconPosition="left"
            className="min-w-48"
          >
            {isSubmitting ? 'Registering Patient...' : 'Register Patient'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;