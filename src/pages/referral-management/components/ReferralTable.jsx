import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReferralTable = ({ 
  referrals, 
  onStatusUpdate, 
  onEditReferral, 
  onViewPatient,
  userRole = 'field-worker' 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const facilityOptions = [
    { value: 'general-hospital-kochi', label: 'General Hospital Kochi' },
    { value: 'medical-college-trivandrum', label: 'Medical College Trivandrum' },
    { value: 'district-hospital-kozhikode', label: 'District Hospital Kozhikode' },
    { value: 'tb-clinic-ernakulam', label: 'TB Clinic Ernakulam' },
    { value: 'community-health-center-thrissur', label: 'Community Health Center Thrissur' },
    { value: 'primary-health-center-palakkad', label: 'Primary Health Center Palakkad' }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-warning/10 text-warning border border-warning/20`;
      case 'DONE':
        return `${baseClasses} bg-success/10 text-success border border-success/20`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (priority) {
      case 'HIGH':
        return `${baseClasses} bg-destructive/10 text-destructive border border-destructive/20`;
      case 'MEDIUM':
        return `${baseClasses} bg-warning/10 text-warning border border-warning/20`;
      case 'LOW':
        return `${baseClasses} bg-success/10 text-success border border-success/20`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const handleEdit = (referral) => {
    setEditingId(referral?.id);
    setEditData({
      facility: referral?.facility,
      appointmentDate: referral?.appointmentDate,
      notes: referral?.notes || ''
    });
  };

  const handleSaveEdit = (referralId) => {
    onEditReferral(referralId, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFacilityName = (facilityId) => {
    const facility = facilityOptions?.find(f => f?.value === facilityId);
    return facility?.label || facilityId;
  };

  if (referrals?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow">
        <div className="p-8 text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Referrals Found</h3>
          <p className="text-muted-foreground mb-4">
            No referrals match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-foreground">Patient</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Facility</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Appointment</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Priority</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Created</th>
              <th className="text-right p-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {referrals?.map((referral) => (
              <tr key={referral?.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} color="white" />
                    </div>
                    <div>
                      <button
                        onClick={() => onViewPatient(referral?.patientId)}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {referral?.patientName}
                      </button>
                      <p className="text-sm text-muted-foreground">
                        ID: {referral?.patientId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {editingId === referral?.id ? (
                    <Select
                      options={facilityOptions}
                      value={editData?.facility}
                      onChange={(value) => setEditData({...editData, facility: value})}
                      className="min-w-48"
                    />
                  ) : (
                    <div>
                      <p className="font-medium text-foreground">
                        {getFacilityName(referral?.facility)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {referral?.district}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  {editingId === referral?.id ? (
                    <Input
                      type="date"
                      value={editData?.appointmentDate}
                      onChange={(e) => setEditData({...editData, appointmentDate: e?.target?.value})}
                    />
                  ) : (
                    <div>
                      <p className="font-medium text-foreground">
                        {formatDate(referral?.appointmentDate)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {referral?.appointmentTime || '10:00 AM'}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={getStatusBadge(referral?.status)}>
                    {referral?.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={getPriorityBadge(referral?.priority)}>
                    {referral?.priority}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm text-foreground">
                      {formatDate(referral?.createdAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {referral?.createdBy}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    {editingId === referral?.id ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveEdit(referral?.id)}
                          iconName="Check"
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          iconName="X"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        {referral?.status === 'PENDING' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onStatusUpdate(referral?.id, 'DONE')}
                            iconName="CheckCircle"
                          >
                            Mark Done
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(referral)}
                          iconName="Edit"
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {referrals?.map((referral) => (
          <div key={referral?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div>
                  <button
                    onClick={() => onViewPatient(referral?.patientId)}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {referral?.patientName}
                  </button>
                  <p className="text-sm text-muted-foreground">
                    ID: {referral?.patientId}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={getStatusBadge(referral?.status)}>
                  {referral?.status}
                </span>
                <span className={getPriorityBadge(referral?.priority)}>
                  {referral?.priority}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Facility:</span>
                <span className="text-sm font-medium text-foreground">
                  {getFacilityName(referral?.facility)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Appointment:</span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(referral?.appointmentDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm text-foreground">
                  {formatDate(referral?.createdAt)} by {referral?.createdBy}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewPatient(referral?.patientId)}
                iconName="Eye"
              >
                View Patient
              </Button>
              <div className="flex items-center space-x-2">
                {referral?.status === 'PENDING' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusUpdate(referral?.id, 'DONE')}
                    iconName="CheckCircle"
                  >
                    Mark Done
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(referral)}
                  iconName="Edit"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralTable;