import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QRScanner = ({ onScanResult, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualQRId, setManualQRId] = useState('');
  const [scanError, setScanError] = useState('');
  const fileInputRef = useRef(null);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanError('');
    
    // Simulate QR scanning process
    setTimeout(() => {
      // Mock QR scan result - in real app this would use camera API
      const mockQRIds = ['AB12CD34', 'EF56GH78', 'IJ90KL12', 'MN34OP56'];
      const randomQRId = mockQRIds?.[Math.floor(Math.random() * mockQRIds?.length)];
      
      setIsScanning(false);
      onScanResult(randomQRId);
    }, 3000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setScanError('');
  };

  const handleManualSubmit = (e) => {
    e?.preventDefault();
    if (manualQRId?.trim()) {
      onScanResult(manualQRId?.trim()?.toUpperCase());
      setManualQRId('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setScanError('');
      // Simulate QR code reading from image
      setTimeout(() => {
        const mockQRIds = ['UV78WX90', 'YZ12AB34'];
        const randomQRId = mockQRIds?.[Math.floor(Math.random() * mockQRIds?.length)];
        onScanResult(randomQRId);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="QrCode" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">QR Code Scanner</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Camera Scanner Section */}
          <div className="text-center">
            <div className="bg-muted border-2 border-dashed border-border rounded-lg p-8 mb-4">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-muted-foreground">
                    Scanning for QR code...
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Point your camera at the patient's QR code
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Icon name="Camera" size={48} className="text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Use your camera to scan patient QR codes
                  </p>
                </div>
              )}
            </div>

            {!isScanning ? (
              <Button
                variant="default"
                onClick={handleStartScan}
                iconName="Camera"
                iconPosition="left"
                className="w-full"
              >
                Start Camera Scan
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleStopScan}
                iconName="Square"
                iconPosition="left"
                className="w-full"
              >
                Stop Scanning
              </Button>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Manual QR ID Entry */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <Input
              label="Enter QR ID Manually"
              type="text"
              placeholder="e.g., AB12CD34"
              value={manualQRId}
              onChange={(e) => setManualQRId(e?.target?.value?.toUpperCase())}
              description="Enter the 8-character QR ID from patient card"
              maxLength={8}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={!manualQRId?.trim()}
              iconName="Search"
              iconPosition="left"
              className="w-full"
            >
              Search by QR ID
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Upload QR Image */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-2">
                Upload QR Code Image
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Select an image file containing the QR code
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                iconName="Upload"
                iconPosition="left"
                className="w-full"
              >
                Choose Image File
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {scanError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <p className="text-sm text-destructive">{scanError}</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Ensure good lighting when scanning</p>
                <p>• Hold camera steady and focus on QR code</p>
                <p>• QR ID format: 8 alphanumeric characters</p>
                <p>• Each patient has a unique QR ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;