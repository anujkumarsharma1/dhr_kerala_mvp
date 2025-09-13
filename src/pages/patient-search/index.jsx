import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import QRScanner from './components/QRScanner';

const PatientSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    district: '',
    worksite: '',
    screeningStatus: '',
    minAge: '',
    maxAge: '',
    registrationFrom: '',
    registrationTo: ''
  });
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [userRole] = useState('field-worker'); // Mock user role
  const [allPatients, setAllPatients] = useState([]);

  // Mock patient data
  const mockPatients = [
    {
      id: 1,
      name: 'Rajesh Kumar Singh',
      phone: '+91 9876543210',
      qrId: 'AB12CD34',
      age: 28,
      sex: 'Male',
      district: 'Ernakulam',
      worksite: 'Construction Site',
      registrationDate: '2024-12-10T10:30:00Z',
      screeningStatus: 'not_screened',
      registeredBy: 'Dr. Sarah Kumar',
      language: 'Hindi'
    },
    {
      id: 2,
      name: 'Mohammad Alam',
      phone: '+91 8765432109',
      qrId: 'EF56GH78',
      age: 35,
      sex: 'Male',
      district: 'Thiruvananthapuram',
      worksite: 'Port/Harbor',
      registrationDate: '2024-12-09T14:15:00Z',
      screeningStatus: 'normal',
      registeredBy: 'Dr. Priya Nair',
      language: 'Bengali'
    },
    {
      id: 3,
      name: 'Suresh Babu',
      phone: '+91 7654321098',
      qrId: 'IJ90KL12',
      age: 42,
      sex: 'Male',
      district: 'Kottayam',
      worksite: 'Plantation',
      registrationDate: '2024-12-08T09:45:00Z',
      screeningStatus: 'suspected',
      registeredBy: 'Dr. Sarah Kumar',
      language: 'Tamil'
    },
    {
      id: 4,
      name: 'Ramesh Chandra',
      phone: '+91 6543210987',
      qrId: 'MN34OP56',
      age: 31,
      sex: 'Male',
      district: 'Kollam',
      worksite: 'Factory',
      registrationDate: '2024-12-07T16:20:00Z',
      screeningStatus: 'referred',
      registeredBy: 'Dr. Anil Kumar',
      language: 'Hindi'
    },
    {
      id: 5,
      name: 'Prakash Yadav',
      phone: '+91 5432109876',
      qrId: 'QR78ST90',
      age: 26,
      sex: 'Male',
      district: 'Thrissur',
      worksite: 'Construction Site',
      registrationDate: '2024-12-06T11:10:00Z',
      screeningStatus: 'normal',
      registeredBy: 'Dr. Sarah Kumar',
      language: 'Hindi'
    },
    {
      id: 6,
      name: 'Dinesh Kumar',
      phone: '+91 4321098765',
      qrId: 'UV12WX34',
      age: 39,
      sex: 'Male',
      district: 'Palakkad',
      worksite: 'Textile Mill',
      registrationDate: '2024-12-05T13:30:00Z',
      screeningStatus: 'not_screened',
      registeredBy: 'Dr. Meera Jose',
      language: 'Tamil'
    },
    {
      id: 7,
      name: 'Santosh Mishra',
      phone: '+91 3210987654',
      qrId: 'YZ56AB78',
      age: 33,
      sex: 'Male',
      district: 'Kozhikode',
      worksite: 'Quarry',
      registrationDate: '2024-12-04T08:45:00Z',
      screeningStatus: 'suspected',
      registeredBy: 'Dr. Ravi Menon',
      language: 'Hindi'
    },
    {
      id: 8,
      name: 'Manoj Singh',
      phone: '+91 2109876543',
      qrId: 'CD90EF12',
      age: 29,
      sex: 'Male',
      district: 'Kannur',
      worksite: 'Construction Site',
      registrationDate: '2024-12-03T15:20:00Z',
      screeningStatus: 'normal',
      registeredBy: 'Dr. Lakshmi Pillai',
      language: 'Hindi'
    }
  ];

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    setAllPatients([...mockPatients, ...storedPatients]);
  }, []);

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryParam = urlParams?.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location?.search]);

  // Filter and search logic
  const filteredPatients = useMemo(() => {
    let filtered = [...allPatients];

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(patient => 
        patient?.name?.toLowerCase()?.includes(query) ||
        patient?.phone?.includes(query) ||
        patient?.qrId?.toLowerCase()?.includes(query)
      );
    }

    // Apply filters
    if (filters?.district) {
      filtered = filtered?.filter(patient => 
        patient?.district?.toLowerCase() === filters?.district?.toLowerCase()
      );
    }

    if (filters?.worksite) {
      filtered = filtered?.filter(patient => 
        patient?.worksite?.toLowerCase()?.includes(filters?.worksite?.toLowerCase())
      );
    }

    if (filters?.screeningStatus) {
      filtered = filtered?.filter(patient => 
        patient?.screeningStatus === filters?.screeningStatus
      );
    }

    if (filters?.minAge) {
      filtered = filtered?.filter(patient => 
        patient?.age >= parseInt(filters?.minAge)
      );
    }

    if (filters?.maxAge) {
      filtered = filtered?.filter(patient => 
        patient?.age <= parseInt(filters?.maxAge)
      );
    }

    if (filters?.registrationFrom) {
      filtered = filtered?.filter(patient => 
        new Date(patient.registrationDate) >= new Date(filters.registrationFrom)
      );
    }

    if (filters?.registrationTo) {
      filtered = filtered?.filter(patient => 
        new Date(patient.registrationDate) <= new Date(filters.registrationTo + 'T23:59:59')
      );
    }

    // Role-based filtering
    if (userRole === 'field-worker') {
      filtered = filtered?.filter(patient => 
        patient?.registeredBy === 'Dr. Sarah Kumar'
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (sortField === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortField, sortDirection, userRole, allPatients]);

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPatients?.length / itemsPerPage);
  const paginatedResults = filteredPatients?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    e?.preventDefault();
    setLoading(true);
    setCurrentPage(1);
    
    // Simulate search delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      district: '',
      worksite: '',
      screeningStatus: '',
      minAge: '',
      maxAge: '',
      registrationFrom: '',
      registrationTo: ''
    });
    setCurrentPage(1);
  };

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQRScanResult = (qrId) => {
    setSearchQuery(qrId);
    setIsQRScannerOpen(false);
    setCurrentPage(1);
    
    // Simulate search
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Patient Search</h1>
              <p className="text-muted-foreground">
                Find and manage migrant worker health records
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsQRScannerOpen(true)}
                iconName="QrCode"
                iconPosition="left"
              >
                Scan QR
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/patient-registration')}
                iconName="UserPlus"
                iconPosition="left"
              >
                Add Patient
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-lg font-semibold text-foreground">
                    {userRole === 'admin' ? allPatients?.length : allPatients?.filter(p => p?.registeredBy === 'Dr. Sarah Kumar')?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">TB Suspected</p>
                  <p className="text-lg font-semibold text-foreground">
                    {allPatients?.filter(p => p?.screeningStatus === 'suspected')?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Screen</p>
                  <p className="text-lg font-semibold text-foreground">
                    {allPatients?.filter(p => p?.screeningStatus === 'not_screened')?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRightLeft" size={20} className="text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Referred</p>
                  <p className="text-lg font-semibold text-foreground">
                    {allPatients?.filter(p => p?.screeningStatus === 'referred')?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-6">
          {/* Main Search Bar */}
          <div className="bg-card border border-border rounded-lg medical-shadow p-4">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      type="text"
                      placeholder="Search by name, phone number, or QR ID..."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical text-base"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    variant="default"
                    loading={loading}
                    iconName="Search"
                    iconPosition="left"
                    className="touch-target"
                  >
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsQRScannerOpen(true)}
                    iconName="QrCode"
                    className="touch-target"
                  >
                    QR Scan
                  </Button>
                </div>
              </div>

              {/* Quick Search Buttons */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-foreground">Quick Search:</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickSearch('suspected')}
                  className="text-xs"
                >
                  TB Suspected
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickSearch('not_screened')}
                  className="text-xs"
                >
                  Pending Screening
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickSearch('Ernakulam')}
                  className="text-xs"
                >
                  Ernakulam District
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickSearch('Construction')}
                  className="text-xs"
                >
                  Construction Sites
                </Button>
              </div>
            </form>
          </div>

          {/* Advanced Filters */}
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isExpanded={isFiltersExpanded}
            onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
          />

          {/* Search Results */}
          <SearchResults
            results={paginatedResults}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={filteredPatients?.length}
            onPageChange={handlePageChange}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            userRole={userRole}
          />
        </div>
      </div>
      {/* QR Scanner Modal */}
      {isQRScannerOpen && (
        <QRScanner
          onScanResult={handleQRScanResult}
          onClose={() => setIsQRScannerOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientSearch;