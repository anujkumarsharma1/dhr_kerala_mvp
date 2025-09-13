import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PatientForm from './components/PatientForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import RegistrationStats from './components/RegistrationStats';
import Icon from '../../components/AppIcon';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);
  const [qrId, setQrId] = useState('');

  // Mock statistics data
  const [stats, setStats] = useState({
    totalRegistered: 1247,
    todayRegistrations: 23,
    pendingScreening: 45,
    activeDistricts: 12
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Generate 8-character alphanumeric QR ID
  const generateQRId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    return result;
  };

  const handlePatientRegistration = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate QR ID
      const newQrId = generateQRId();
      
      // Mock patient data with additional fields
      const patientData = {
        ...formData,
        id: Date.now(),
        qrId: newQrId,
        registrationDate: new Date()?.toISOString(),
        status: 'registered',
        screeningStatus: 'pending'
      };
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalRegistered: prev?.totalRegistered + 1,
        todayRegistrations: prev?.todayRegistrations + 1,
        pendingScreening: prev?.pendingScreening + 1
      }));
      
      setRegisteredPatient(patientData);
      setQrId(newQrId);
      setRegistrationComplete(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRegistration = () => {
    setRegistrationComplete(false);
    setRegisteredPatient(null);
    setQrId('');
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="field-worker" userName="Dr. Sarah Kumar" />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToDashboard}
              className="p-2 hover:bg-muted rounded-lg transition-medical touch-target"
            >
              <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Patient Registration</h1>
              <p className="text-muted-foreground">Register new migrant workers for health screening</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{new Date()?.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Registration Statistics */}
        <RegistrationStats stats={stats} />

        {/* Main Content */}
        <div className="space-y-6">
          {!registrationComplete ? (
            <>
              {/* Registration Form */}
              <PatientForm 
                onSubmit={handlePatientRegistration}
                isSubmitting={isSubmitting}
              />
              
              {/* Help Section */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-2">Registration Guidelines</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Ensure all patient information is accurate before submission</li>
                      <li>• Digital consent is mandatory for data collection and processing</li>
                      <li>• QR codes will be generated automatically for patient identification</li>
                      <li>• Print QR cards immediately for field distribution</li>
                      <li>• Proceed to TB screening after successful registration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* QR Code Display */
            (<QRCodeDisplay 
              patientData={registeredPatient}
              qrId={qrId}
              onNewRegistration={handleNewRegistration}
            />)
          )}
        </div>

        {/* Footer Information */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>DHR Kerala © {new Date()?.getFullYear()}</span>
              <span>•</span>
              <span>Digital Health Records</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span>Need help?</span>
              <button className="text-primary hover:underline">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;