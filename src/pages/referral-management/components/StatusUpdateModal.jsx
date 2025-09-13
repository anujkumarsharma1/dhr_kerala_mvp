import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusUpdateModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  referral,
  newStatus 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [notes, setNotes] = useState('');

  const handleConfirm = async () => {
    setIsUpdating(true);
    
    try {
      await onConfirm(referral?.id, newStatus, notes);
      handleClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setNotes('');
    onClose();
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'DONE':
        return {
          title: 'Mark Referral as Completed',
          description: 'This will mark the referral as completed and update the patient record.',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'PENDING':
        return {
          title: 'Mark Referral as Pending',
          description: 'This will change the referral status back to pending.',
          icon: 'Clock',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      default:
        return {
          title: 'Update Referral Status',
          description: 'This will update the referral status.',
          icon: 'AlertCircle',
          iconColor: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20'
        };
    }
  };

  if (!isOpen || !referral) return null;

  const statusInfo = getStatusInfo(newStatus);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusInfo?.bgColor} ${statusInfo?.borderColor} border`}>
              <Icon name={statusInfo?.icon} size={24} className={statusInfo?.iconColor} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {statusInfo?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {statusInfo?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Referral Details */}
          <div className="bg-muted/30 rounded-md p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Patient:</span>
              <span className="text-sm font-medium text-foreground">
                {referral?.patientName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Facility:</span>
              <span className="text-sm font-medium text-foreground">
                {referral?.facilityName || referral?.facility}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Appointment:</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(referral.appointmentDate)?.toLocaleDateString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current Status:</span>
              <span className={`text-sm font-medium ${
                referral?.status === 'PENDING' ? 'text-warning' : 'text-success'
              }`}>
                {referral?.status}
              </span>
            </div>
          </div>

          {/* Status Change Info */}
          <div className="flex items-center justify-center space-x-4 py-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              referral?.status === 'PENDING' ?'bg-warning/10 text-warning border border-warning/20' :'bg-success/10 text-success border border-success/20'
            }`}>
              {referral?.status}
            </span>
            <Icon name="ArrowRight" size={20} className="text-muted-foreground" />
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              newStatus === 'PENDING' ?'bg-warning/10 text-warning border border-warning/20' :'bg-success/10 text-success border border-success/20'
            }`}>
              {newStatus}
            </span>
          </div>

          {/* Notes Section */}
          {newStatus === 'DONE' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Completion Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e?.target?.value)}
                placeholder="Add any notes about the completed referral..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus-medical transition-medical resize-none"
              />
            </div>
          )}

          {/* Warning for completion */}
          {newStatus === 'DONE' && (
            <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Important</p>
                <p className="text-xs text-warning/80">
                  Once marked as completed, this referral will be archived and cannot be easily modified.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant={newStatus === 'DONE' ? 'default' : 'outline'}
            onClick={handleConfirm}
            loading={isUpdating}
            iconName={statusInfo?.icon}
            iconPosition="left"
          >
            {newStatus === 'DONE' ? 'Mark as Completed' : 'Update Status'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;