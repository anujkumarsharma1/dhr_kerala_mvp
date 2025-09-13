import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ReferralFilters from './components/ReferralFilters';
import ReferralTable from './components/ReferralTable';
import CreateReferralModal from './components/CreateReferralModal';
import StatusUpdateModal from './components/StatusUpdateModal';

const ReferralManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userRole] = useState('field-worker'); // Mock user role
  const [userName] = useState('Dr. Sarah Kumar'); // Mock user name

  // State management
  const [referrals, setReferrals] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    facility: '',
    status: '',
    district: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState({
    isOpen: false,
    referral: null,
    newStatus: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock referral data
  const mockReferrals = [
    {
      id: 'REF001',
      patientId: 'DHR001',
      patientName: 'Rajesh Kumar',
      facility: 'general-hospital-kochi',
      facilityName: 'General Hospital Kochi',
      district: 'Ernakulam',
      appointmentDate: '2025-01-15',
      appointmentTime: '10:00 AM',
      status: 'PENDING',
      priority: 'HIGH',
      reason: 'suspected-tb',
      notes: 'Patient showing symptoms of persistent cough and weight loss. Requires immediate TB screening.',
      createdAt: '2025-01-10T09:30:00Z',
      createdBy: 'Dr. Sarah Kumar',
      updatedAt: '2025-01-10T09:30:00Z'
    },
    {
      id: 'REF002',
      patientId: 'DHR002',
      patientName: 'Priya Sharma',
      facility: 'tb-clinic-ernakulam',
      facilityName: 'TB Clinic Ernakulam',
      district: 'Ernakulam',
      appointmentDate: '2025-01-12',
      appointmentTime: '2:00 PM',
      status: 'DONE',
      priority: 'MEDIUM',
      reason: 'tb-screening',
      notes: 'Follow-up screening after initial positive result.',
      createdAt: '2025-01-08T14:15:00Z',
      createdBy: 'Dr. Sarah Kumar',
      updatedAt: '2025-01-12T14:30:00Z',
      completedAt: '2025-01-12T14:30:00Z'
    },
    {
      id: 'REF003',
      patientId: 'DHR003',
      patientName: 'Mohammed Ali',
      facility: 'district-hospital-kozhikode',
      facilityName: 'District Hospital Kozhikode',
      district: 'Kozhikode',
      appointmentDate: '2025-01-18',
      appointmentTime: '11:00 AM',
      status: 'PENDING',
      priority: 'LOW',
      reason: 'routine-checkup',
      notes: 'Annual health checkup for migrant worker.',
      createdAt: '2025-01-09T11:20:00Z',
      createdBy: 'Dr. Sarah Kumar',
      updatedAt: '2025-01-09T11:20:00Z'
    },
    {
      id: 'REF004',
      patientId: 'DHR004',
      patientName: 'Sunita Devi',
      facility: 'community-health-center-thrissur',
      facilityName: 'Community Health Center Thrissur',
      district: 'Thrissur',
      appointmentDate: '2025-01-14',
      appointmentTime: '9:00 AM',
      status: 'PENDING',
      priority: 'MEDIUM',
      reason: 'specialist-consultation',
      notes: 'Requires gynecological consultation.',
      createdAt: '2025-01-11T16:45:00Z',
      createdBy: 'Dr. Sarah Kumar',
      updatedAt: '2025-01-11T16:45:00Z'
    },
    {
      id: 'REF005',
      patientId: 'DHR005',
      patientName: 'Arjun Singh',
      facility: 'primary-health-center-palakkad',
      facilityName: 'Primary Health Center Palakkad',
      district: 'Palakkad',
      appointmentDate: '2025-01-16',
      appointmentTime: '3:00 PM',
      status: 'DONE',
      priority: 'HIGH',
      reason: 'diagnostic-tests',
      notes: 'Blood tests and X-ray completed successfully.',
      createdAt: '2025-01-07T10:30:00Z',
      createdBy: 'Dr. Sarah Kumar',
      updatedAt: '2025-01-16T15:45:00Z',
      completedAt: '2025-01-16T15:45:00Z'
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadReferrals = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReferrals(mockReferrals);
      } catch (error) {
        console.error('Error loading referrals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReferrals();
  }, []);

  // Filter referrals based on current filters
  useEffect(() => {
    let filtered = [...referrals];

    // Search filter
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(referral =>
        referral?.patientName?.toLowerCase()?.includes(searchLower) ||
        referral?.facilityName?.toLowerCase()?.includes(searchLower) ||
        referral?.patientId?.toLowerCase()?.includes(searchLower)
      );
    }

    // Facility filter
    if (filters?.facility) {
      filtered = filtered?.filter(referral => referral?.facility === filters?.facility);
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(referral => referral?.status === filters?.status);
    }

    // District filter
    if (filters?.district) {
      filtered = filtered?.filter(referral => 
        referral?.district?.toLowerCase() === filters?.district?.toLowerCase()
      );
    }

    // Date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter(referral => 
        new Date(referral.appointmentDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(referral => 
        new Date(referral.appointmentDate) <= new Date(filters.dateTo)
      );
    }

    // Sort by creation date (newest first)
    filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredReferrals(filtered);
  }, [referrals, filters]);

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle create referral
  const handleCreateReferral = async (referralData) => {
    try {
      const newReferral = {
        id: `REF${String(referrals?.length + 1)?.padStart(3, '0')}`,
        ...referralData,
        createdBy: userName,
        updatedAt: new Date()?.toISOString()
      };

      setReferrals(prev => [newReferral, ...prev]);
      
      // Show success message (in real app, use toast notification)
      console.log('Referral created successfully:', newReferral);
    } catch (error) {
      console.error('Error creating referral:', error);
      throw error;
    }
  };

  // Handle status update
  const handleStatusUpdate = (referralId, newStatus) => {
    const referral = referrals?.find(r => r?.id === referralId);
    if (referral) {
      setStatusUpdateModal({
        isOpen: true,
        referral,
        newStatus
      });
    }
  };

  // Confirm status update
  const handleConfirmStatusUpdate = async (referralId, newStatus, notes) => {
    try {
      setReferrals(prev => prev?.map(referral => {
        if (referral?.id === referralId) {
          const updatedReferral = {
            ...referral,
            status: newStatus,
            updatedAt: new Date()?.toISOString()
          };

          if (newStatus === 'DONE') {
            updatedReferral.completedAt = new Date()?.toISOString();
            if (notes) {
              updatedReferral.completionNotes = notes;
            }
          }

          return updatedReferral;
        }
        return referral;
      }));

      console.log(`Referral ${referralId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating referral status:', error);
      throw error;
    }
  };

  // Handle edit referral
  const handleEditReferral = async (referralId, editData) => {
    try {
      setReferrals(prev => prev?.map(referral => {
        if (referral?.id === referralId) {
          return {
            ...referral,
            ...editData,
            updatedAt: new Date()?.toISOString()
          };
        }
        return referral;
      }));

      console.log(`Referral ${referralId} updated successfully`);
    } catch (error) {
      console.error('Error updating referral:', error);
    }
  };

  // Handle view patient
  const handleViewPatient = (patientId) => {
    navigate(`/patient-search?id=${patientId}`);
  };

  // Handle export data
  const handleExportData = () => {
    const csvContent = [
      ['Patient ID', 'Patient Name', 'Facility', 'Appointment Date', 'Status', 'Priority', 'Created Date']?.join(','),
      ...filteredReferrals?.map(referral => [
        referral?.patientId,
        referral?.patientName,
        referral?.facilityName,
        referral?.appointmentDate,
        referral?.status,
        referral?.priority,
        new Date(referral.createdAt)?.toLocaleDateString('en-IN')
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referrals-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} userName={userName} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading referrals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters Section */}
        <ReferralFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalCount={referrals?.length}
          filteredCount={filteredReferrals?.length}
          onCreateReferral={() => setIsCreateModalOpen(true)}
          onExportData={handleExportData}
        />

        {/* Referrals Table */}
        <ReferralTable
          referrals={filteredReferrals}
          onStatusUpdate={handleStatusUpdate}
          onEditReferral={handleEditReferral}
          onViewPatient={handleViewPatient}
          userRole={userRole}
        />

        {/* Create Referral Modal */}
        <CreateReferralModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateReferral}
          userRole={userRole}
        />

        {/* Status Update Modal */}
        <StatusUpdateModal
          isOpen={statusUpdateModal?.isOpen}
          onClose={() => setStatusUpdateModal({ isOpen: false, referral: null, newStatus: null })}
          onConfirm={handleConfirmStatusUpdate}
          referral={statusUpdateModal?.referral}
          newStatus={statusUpdateModal?.newStatus}
        />
      </main>
    </div>
  );
};

export default ReferralManagement;