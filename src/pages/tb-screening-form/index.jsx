import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PatientHeader from './components/PatientHeader';
import SymptomSection from './components/SymptomSection';
import ClinicalSection from './components/ClinicalSection';
import RiskFactorSection from './components/RiskFactorSection';
import SuspectedCaseAlert from './components/SuspectedCaseAlert';

const TBScreeningForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams?.get('patientId');

  // Mock patient data
  const mockPatient = {
    id: patientId || "PAT001",
    name: "Rajesh Kumar Singh",
    qrId: "DHR8K2M9",
    age: 34,
    sex: "Male",
    phone: "+91 9876543210",
    district: "Ernakulam",
    worksite: "Metro Construction Site - Phase 2",
    language: "Hindi"
  };

  // Form state management
  const [expandedSections, setExpandedSections] = useState({
    symptoms: true,
    clinical: false,
    riskFactors: false
  });

  const [symptoms, setSymptoms] = useState({
    cough: { present: false, duration: '', bloodInSputum: false },
    fever: { present: false, duration: '', severity: '' },
    weightLoss: { present: false, duration: '' },
    nightSweats: { present: false, severity: '' },
    chestPain: { present: false, severity: '' },
    fatigue: { present: false, severity: '' }
  });

  const [clinicalData, setClinicalData] = useState({
    vitalSigns: {
      temperature: '',
      bloodPressure: '',
      heartRate: ''
    },
    physicalExam: {
      breathingSounds: '',
      lymphNodes: '',
      chestDeformity: false,
      visibleWeightLoss: false,
      pallor: false
    },
    notes: ''
  });

  const [riskFactors, setRiskFactors] = useState({
    tbExposure: { type: 'none', details: '' },
    medicalHistory: {
      previousTB: false,
      hivPositive: false,
      diabetes: false,
      immunosuppressed: false,
      chronicLungDisease: false
    },
    lifestyle: {
      livingConditions: '',
      tobaccoUse: false,
      alcoholUse: false,
      malnutrition: false,
      occupationalExposure: false
    },
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screeningResult, setScreeningResult] = useState(null);

  // Business rules for TB suspected case detection
  const evaluateTBRisk = () => {
    let riskScore = 0;
    let riskFactors = [];

    // Symptom scoring
    if (symptoms?.cough?.present) {
      riskScore += symptoms?.cough?.duration === 'more_than_3_weeks' ? 3 : 
                   symptoms?.cough?.duration === '2_to_3_weeks' ? 2 : 1;
      if (symptoms?.cough?.bloodInSputum) riskScore += 2;
      riskFactors?.push('Persistent cough');
    }

    if (symptoms?.fever?.present) {
      riskScore += symptoms?.fever?.duration === 'more_than_3_weeks' ? 2 : 1;
      riskFactors?.push('Fever');
    }

    if (symptoms?.weightLoss?.present) {
      riskScore += 2;
      riskFactors?.push('Unexplained weight loss');
    }

    if (symptoms?.nightSweats?.present) {
      riskScore += 1;
      riskFactors?.push('Night sweats');
    }

    // Risk factor scoring
    if (riskFactors?.tbExposure?.type !== 'none') {
      riskScore += riskFactors?.tbExposure?.type === 'household' ? 3 : 2;
    }

    if (riskFactors?.medicalHistory?.hivPositive) riskScore += 3;
    if (riskFactors?.medicalHistory?.previousTB) riskScore += 2;
    if (riskFactors?.medicalHistory?.diabetes) riskScore += 1;
    if (riskFactors?.medicalHistory?.immunosuppressed) riskScore += 2;

    // Clinical findings
    if (clinicalData?.physicalExam?.visibleWeightLoss) riskScore += 1;
    if (clinicalData?.physicalExam?.lymphNodes?.includes('enlarged')) riskScore += 1;

    // Determine risk level and recommendations
    let riskLevel = 'low';
    let recommendations = [];

    if (riskScore >= 6) {
      riskLevel = 'high';
      recommendations = [
        'Immediate sputum collection for microscopy and GeneXpert',
        'Chest X-ray within 24 hours',
        'HIV testing if status unknown',
        'Contact tracing for household and close contacts',
        'Isolation precautions until TB is ruled out'
      ];
    } else if (riskScore >= 3) {
      riskLevel = 'moderate';
      recommendations = [
        'Sputum collection for microscopy',
        'Chest X-ray within 48 hours',
        'Follow-up in 1 week if symptoms persist',
        'Patient education on TB symptoms'
      ];
    } else {
      recommendations = [
        'Continue routine health monitoring',
        'Return if symptoms worsen or persist',
        'Maintain good nutrition and hygiene'
      ];
    }

    return {
      isSuspected: riskScore >= 3,
      riskLevel,
      riskScore,
      recommendations,
      riskFactors
    };
  };

  // Event handlers
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSymptomChange = (symptom, field, value) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: {
        ...prev?.[symptom],
        [field]: value
      }
    }));
  };

  const handleClinicalChange = (section, field, value) => {
    if (section === 'notes') {
      setClinicalData(prev => ({
        ...prev,
        notes: value
      }));
    } else {
      setClinicalData(prev => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: value
        }
      }));
    }
  };

  const handleRiskFactorChange = (section, field, value) => {
    if (section === 'additionalInfo') {
      setRiskFactors(prev => ({
        ...prev,
        additionalInfo: value
      }));
    } else {
      setRiskFactors(prev => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = evaluateTBRisk();
      setScreeningResult(result);
      
      // Auto-expand result section
      window.scrollTo({ top: document.body?.scrollHeight, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Screening submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateReferral = () => {
    navigate(`/referral-management?patientId=${mockPatient?.id}&type=tb_screening&urgent=true`);
  };

  const handleReset = () => {
    setSymptoms({
      cough: { present: false, duration: '', bloodInSputum: false },
      fever: { present: false, duration: '', severity: '' },
      weightLoss: { present: false, duration: '' },
      nightSweats: { present: false, severity: '' },
      chestPain: { present: false, severity: '' },
      fatigue: { present: false, severity: '' }
    });
    setClinicalData({
      vitalSigns: { temperature: '', bloodPressure: '', heartRate: '' },
      physicalExam: {
        breathingSounds: '',
        lymphNodes: '',
        chestDeformity: false,
        visibleWeightLoss: false,
        pallor: false
      },
      notes: ''
    });
    setRiskFactors({
      tbExposure: { type: 'none', details: '' },
      medicalHistory: {
        previousTB: false,
        hivPositive: false,
        diabetes: false,
        immunosuppressed: false,
        chronicLungDisease: false
      },
      lifestyle: {
        livingConditions: '',
        tobaccoUse: false,
        alcoholUse: false,
        malnutrition: false,
        occupationalExposure: false
      },
      additionalInfo: ''
    });
    setScreeningResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="field-worker" userName="Dr. Sarah Kumar" />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">TB Screening Form</h1>
              <p className="text-sm text-muted-foreground">
                Systematic tuberculosis risk assessment and screening
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleReset}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Form
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <PatientHeader patient={mockPatient} />

          {/* Symptoms Section */}
          <SymptomSection
            symptoms={symptoms}
            onSymptomChange={handleSymptomChange}
            isExpanded={expandedSections?.symptoms}
            onToggle={() => toggleSection('symptoms')}
          />

          {/* Clinical Assessment Section */}
          <ClinicalSection
            clinicalData={clinicalData}
            onClinicalChange={handleClinicalChange}
            isExpanded={expandedSections?.clinical}
            onToggle={() => toggleSection('clinical')}
          />

          {/* Risk Factors Section */}
          <RiskFactorSection
            riskFactors={riskFactors}
            onRiskFactorChange={handleRiskFactorChange}
            isExpanded={expandedSections?.riskFactors}
            onToggle={() => toggleSection('riskFactors')}
          />

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="FileCheck"
              iconPosition="left"
              className="px-8"
            >
              {isSubmitting ? 'Processing Screening...' : 'Complete TB Screening'}
            </Button>
          </div>
        </form>

        {/* Screening Result */}
        {screeningResult && (
          <div className="mt-8">
            <SuspectedCaseAlert
              isSuspected={screeningResult?.isSuspected}
              riskLevel={screeningResult?.riskLevel}
              recommendations={screeningResult?.recommendations}
              onCreateReferral={handleCreateReferral}
            />
          </div>
        )}

        {/* Action Buttons */}
        {screeningResult && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => navigate('/patient-search')}
              iconName="Users"
              iconPosition="left"
              className="flex-1"
            >
              Back to Patients
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/admin-dashboard')}
              iconName="LayoutDashboard"
              iconPosition="left"
              className="flex-1"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="default"
              onClick={() => navigate(`/patient-registration?edit=${mockPatient?.id}`)}
              iconName="Edit"
              iconPosition="left"
              className="flex-1"
            >
              Update Patient
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TBScreeningForm;