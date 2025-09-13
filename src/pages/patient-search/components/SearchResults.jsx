import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResults = ({ 
  results, 
  loading, 
  currentPage, 
  totalPages, 
  totalResults,
  onPageChange,
  onSort,
  sortField,
  sortDirection,
  userRole 
}) => {
  const navigate = useNavigate();
  const [selectedPatients, setSelectedPatients] = useState([]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'not_screened': { 
        label: 'Not Screened', 
        className: 'bg-gray-100 text-gray-800 border-gray-200' 
      },
      'normal': { 
        label: 'Normal', 
        className: 'bg-green-100 text-green-800 border-green-200' 
      },
      'suspected': { 
        label: 'TB Suspected', 
        className: 'bg-red-100 text-red-800 border-red-200' 
      },
      'referred': { 
        label: 'Referred', 
        className: 'bg-blue-100 text-blue-800 border-blue-200' 
      }
    };

    const config = statusConfig?.[status] || statusConfig?.['not_screened'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.className}`}>
        {config?.label}
      </span>
    );
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSelectPatient = (patientId) => {
    setSelectedPatients(prev => 
      prev?.includes(patientId) 
        ? prev?.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients?.length === results?.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(results?.map(patient => patient?.id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow">
        <div className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching patients...</p>
        </div>
      </div>
    );
  }

  if (results?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow">
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No patients found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more results.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/patient-registration')}
            iconName="UserPlus"
            iconPosition="left"
          >
            Register New Patient
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalResults)} of {totalResults} patients
          </p>
          {selectedPatients?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {selectedPatients?.length} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/patient-registration')}
            iconName="UserPlus"
            iconPosition="left"
          >
            Add Patient
          </Button>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-card border border-border rounded-lg medical-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedPatients?.length === results?.length}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary"
                  />
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-medical"
                  >
                    <span>Patient Name</span>
                    <Icon name={getSortIcon('name')} size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('phone')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-medical"
                  >
                    <span>Phone</span>
                    <Icon name={getSortIcon('phone')} size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <span className="text-sm font-medium text-foreground">QR ID</span>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('registrationDate')}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-medical"
                  >
                    <span>Registered</span>
                    <Icon name={getSortIcon('registrationDate')} size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <span className="text-sm font-medium text-foreground">Status</span>
                </th>
                <th className="text-left p-4">
                  <span className="text-sm font-medium text-foreground">District</span>
                </th>
                <th className="text-right p-4">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results?.map((patient) => (
                <tr key={patient?.id} className="hover:bg-muted/50 transition-medical">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedPatients?.includes(patient?.id)}
                      onChange={() => handleSelectPatient(patient?.id)}
                      className="rounded border-border focus:ring-primary"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{patient?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient?.age} years, {patient?.sex}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-foreground">{patient?.phone}</p>
                  </td>
                  <td className="p-4">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                      {patient?.qrId}
                    </code>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{formatDate(patient?.registrationDate)}</p>
                    {userRole === 'admin' && (
                      <p className="text-xs text-muted-foreground">by {patient?.registeredBy}</p>
                    )}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(patient?.screeningStatus)}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{patient?.district}</p>
                    <p className="text-xs text-muted-foreground">{patient?.worksite}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/patient-profile/${patient?.id}`)}
                        iconName="Eye"
                      >
                        View
                      </Button>
                      {patient?.screeningStatus === 'not_screened' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/tb-screening-form?patientId=${patient?.id}`)}
                          iconName="Stethoscope"
                        >
                          Screen
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {results?.map((patient) => (
          <div key={patient?.id} className="bg-card border border-border rounded-lg medical-shadow p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedPatients?.includes(patient?.id)}
                    onChange={() => handleSelectPatient(patient?.id)}
                    className="rounded border-border focus:ring-primary"
                  />
                  <h3 className="font-medium text-foreground">{patient?.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {patient?.age} years, {patient?.sex} • {patient?.phone}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                    {patient?.qrId}
                  </code>
                  {getStatusBadge(patient?.screeningStatus)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">District</p>
                <p className="text-foreground">{patient?.district}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Worksite</p>
                <p className="text-foreground">{patient?.worksite}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Registered</p>
                <p className="text-foreground">{formatDate(patient?.registrationDate)}</p>
              </div>
              {userRole === 'admin' && (
                <div>
                  <p className="text-muted-foreground">By</p>
                  <p className="text-foreground">{patient?.registeredBy}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/patient-profile/${patient?.id}`)}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                View Profile
              </Button>
              {patient?.screeningStatus === 'not_screened' && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate(`/tb-screening-form?patientId=${patient?.id}`)}
                  iconName="Stethoscope"
                  iconPosition="left"
                  className="flex-1"
                >
                  Screen
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 medical-shadow">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
            >
              Next
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;