import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateReferralModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedPatient = null,
  userRole = 'field-worker' 
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    facility: '',
    appointmentDate: '',
    appointmentTime: '10:00',
    priority: 'MEDIUM',
    notes: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Mock patient data
  const mockPatients = [
    {
      id: 'DHR001',
      name: 'Rajesh Kumar',
      age: 34,
      sex: 'Male',
      phone: '+91 9876543210',
      district: 'Ernakulam',
      worksite: 'Metro Construction Site'
    },
    {
      id: 'DHR002',
      name: 'Priya Sharma',
      age: 28,
      sex: 'Female',
      phone: '+91 9876543211',
      district: 'Thiruvananthapuram',
      worksite: 'IT Park Construction'
    },
    {
      id: 'DHR003',
      name: 'Mohammed Ali',
      age: 42,
      sex: 'Male',
      phone: '+91 9876543212',
      district: 'Kozhikode',
      worksite: 'Highway Project'
    },
    {
      id: 'DHR004',
      name: 'Sunita Devi',
      age: 31,
      sex: 'Female',
      phone: '+91 9876543213',
      district: 'Thrissur',
      worksite: 'Housing Complex'
    },
    {
      id: 'DHR005',
      name: 'Arjun Singh',
      age: 26,
      sex: 'Male',
      phone: '+91 9876543214',
      district: 'Palakkad',
      worksite: 'Industrial Park'
    }
  ];

  const facilityOptions = [
    { value: 'general-hospital-kochi', label: 'General Hospital Kochi', district: 'Ernakulam' },
    { value: 'medical-college-trivandrum', label: 'Medical College Trivandrum', district: 'Thiruvananthapuram' },
    { value: 'district-hospital-kozhikode', label: 'District Hospital Kozhikode', district: 'Kozhikode' },
    { value: 'tb-clinic-ernakulam', label: 'TB Clinic Ernakulam', district: 'Ernakulam' },
    { value: 'community-health-center-thrissur', label: 'Community Health Center Thrissur', district: 'Thrissur' },
    { value: 'primary-health-center-palakkad', label: 'Primary Health Center Palakkad', district: 'Palakkad' }
  ];

  const priorityOptions = [
    { value: 'LOW', label: 'Low Priority' },
    { value: 'MEDIUM', label: 'Medium Priority' },
    { value: 'HIGH', label: 'High Priority' }
  ];

  const reasonOptions = [
    { value: 'tb-screening', label: 'TB Screening Follow-up' },
    { value: 'suspected-tb', label: 'Suspected TB Case' },
    { value: 'routine-checkup', label: 'Routine Health Checkup' },
    { value: 'specialist-consultation', label: 'Specialist Consultation' },
    { value: 'diagnostic-tests', label: 'Diagnostic Tests Required' },
    { value: 'treatment-monitoring', label: 'Treatment Monitoring' },
    { value: 'other', label: 'Other Medical Condition' }
  ];

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  useEffect(() => {
    if (selectedPatient) {
      setFormData(prev => ({
        ...prev,
        patientId: selectedPatient?.id
      }));
    }
  }, [selectedPatient]);

  useEffect(() => {
    if (searchQuery?.trim()) {
      const filtered = mockPatients?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        patient?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        patient?.phone?.includes(searchQuery)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(mockPatients);
    }
  }, [searchQuery]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.patientId) {
      newErrors.patientId = 'Please select a patient';
    }

    if (!formData?.facility) {
      newErrors.facility = 'Please select a facility';
    }

    if (!formData?.appointmentDate) {
      newErrors.appointmentDate = 'Please select appointment date';
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Appointment date cannot be in the past';
      }
    }

    if (!formData?.reason) {
      newErrors.reason = 'Please select referral reason';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPatient = mockPatients?.find(p => p?.id === formData?.patientId);
      const selectedFacility = facilityOptions?.find(f => f?.value === formData?.facility);
      
      const referralData = {
        ...formData,
        patientName: selectedPatient?.name,
        facilityName: selectedFacility?.label,
        district: selectedFacility?.district,
        createdAt: new Date()?.toISOString(),
        status: 'PENDING'
      };

      await onSubmit(referralData);
      handleClose();
    } catch (error) {
      console.error('Error creating referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientId: '',
      facility: '',
      appointmentDate: '',
      appointmentTime: '10:00',
      priority: 'MEDIUM',
      notes: '',
      reason: ''
    });
    setErrors({});
    setSearchQuery('');
    onClose();
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Referral</h2>
            <p className="text-sm text-muted-foreground">
              Refer patient to healthcare facility for further care
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Patient Information</h3>
            
            {!selectedPatient && (
              <div>
                <Input
                  label="Search Patient"
                  type="search"
                  placeholder="Search by name, ID, or phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  description="Type to search for existing patients"
                />
              </div>
            )}

            {!selectedPatient && (
              <div className="max-h-48 overflow-y-auto border border-border rounded-md">
                {filteredPatients?.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredPatients?.map((patient) => (
                      <button
                        key={patient?.id}
                        type="button"
                        onClick={() => setFormData({...formData, patientId: patient?.id})}
                        className={`w-full p-3 text-left hover:bg-muted transition-colors ${
                          formData?.patientId === patient?.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{patient?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {patient?.id} • {patient?.age}y {patient?.sex} • {patient?.phone}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {patient?.worksite}, {patient?.district}
                            </p>
                          </div>
                          {formData?.patientId === patient?.id && (
                            <Icon name="Check" size={20} className="text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <Icon name="Search" size={24} className="mx-auto mb-2" />
                    <p>No patients found matching your search</p>
                  </div>
                )}
              </div>
            )}

            {selectedPatient && (
              <div className="p-4 bg-muted/30 rounded-md border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedPatient?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ID: {selectedPatient?.id} • {selectedPatient?.age}y {selectedPatient?.sex}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors?.patientId && (
              <p className="text-sm text-destructive">{errors?.patientId}</p>
            )}
          </div>

          {/* Referral Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Referral Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Referral Reason"
                options={reasonOptions}
                value={formData?.reason}
                onChange={(value) => setFormData({...formData, reason: value})}
                placeholder="Select reason for referral"
                error={errors?.reason}
                required
              />

              <Select
                label="Priority Level"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => setFormData({...formData, priority: value})}
                required
              />
            </div>

            <Select
              label="Healthcare Facility"
              options={facilityOptions}
              value={formData?.facility}
              onChange={(value) => setFormData({...formData, facility: value})}
              placeholder="Select healthcare facility"
              error={errors?.facility}
              searchable
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Appointment Date"
                type="date"
                value={formData?.appointmentDate}
                onChange={(e) => setFormData({...formData, appointmentDate: e?.target?.value})}
                min={getMinDate()}
                error={errors?.appointmentDate}
                required
              />

              <Select
                label="Preferred Time"
                options={timeSlots}
                value={formData?.appointmentTime}
                onChange={(value) => setFormData({...formData, appointmentTime: value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => setFormData({...formData, notes: e?.target?.value})}
                placeholder="Add any additional information or special instructions..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              Create Referral
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReferralModal;