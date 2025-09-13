import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QRCodeDisplay = ({ patientData, qrId, onNewRegistration }) => {
  const qrRef = useRef(null);

  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    const qrElement = qrRef?.current;
    
    if (qrElement && printWindow) {
      const qrSVG = qrElement?.innerHTML;
      
      printWindow?.document?.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Patient QR Card - ${patientData?.name}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: white;
              }
              .qr-card {
                width: 300px;
                margin: 0 auto;
                border: 2px solid #2563EB;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                background: white;
              }
              .header {
                color: #2563EB;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .patient-name {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 5px;
                color: #1F2937;
              }
              .patient-details {
                font-size: 12px;
                color: #6B7280;
                margin-bottom: 15px;
              }
              .qr-code {
                margin: 15px 0;
              }
              .qr-id {
                font-size: 14px;
                font-weight: bold;
                color: #2563EB;
                margin-top: 10px;
              }
              .footer {
                font-size: 10px;
                color: #6B7280;
                margin-top: 15px;
                border-top: 1px solid #E5E7EB;
                padding-top: 10px;
              }
              @media print {
                body { margin: 0; padding: 10px; }
                .qr-card { border: 2px solid #000; }
              }
            </style>
          </head>
          <body>
            <div class="qr-card">
              <div class="header">DHR Kerala</div>
              <div class="patient-name">${patientData?.name}</div>
              <div class="patient-details">
                Age: ${patientData?.age} | Sex: ${patientData?.sex}<br>
                Phone: ${patientData?.phone}<br>
                District: ${patientData?.district}
              </div>
              <div class="qr-code">${qrSVG}</div>
              <div class="qr-id">ID: ${qrId}</div>
              <div class="footer">
                Digital Health Record<br>
                Scan for patient information
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow?.document?.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    const qrElement = qrRef?.current?.querySelector('svg');
    
    if (qrElement) {
      const svgData = new XMLSerializer()?.serializeToString(qrElement);
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img?.width;
        canvas.height = img?.height;
        ctx?.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `patient-qr-${qrId}.png`;
        link.href = canvas?.toDataURL();
        link?.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="bg-card rounded-lg medical-shadow p-6">
      <div className="text-center space-y-6">
        {/* Success Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Registration Successful!</h2>
            <p className="text-muted-foreground">Patient has been registered with QR ID</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-muted rounded-lg p-4 text-left">
          <h3 className="text-lg font-medium text-foreground mb-3">Patient Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <span className="ml-2 font-medium text-foreground">{patientData?.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Age:</span>
              <span className="ml-2 font-medium text-foreground">{patientData?.age} years</span>
            </div>
            <div>
              <span className="text-muted-foreground">Sex:</span>
              <span className="ml-2 font-medium text-foreground capitalize">{patientData?.sex}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <span className="ml-2 font-medium text-foreground">{patientData?.phone}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Language:</span>
              <span className="ml-2 font-medium text-foreground capitalize">{patientData?.language}</span>
            </div>
            <div>
              <span className="text-muted-foreground">District:</span>
              <span className="ml-2 font-medium text-foreground capitalize">{patientData?.district}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-muted-foreground">Worksite:</span>
              <span className="ml-2 font-medium text-foreground">{patientData?.worksite}</span>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="bg-white rounded-lg p-6 border-2 border-primary">
          <div className="flex flex-col items-center space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Patient QR Code</h3>
              <p className="text-sm text-muted-foreground">Scan this code for quick patient identification</p>
            </div>
            
            <div ref={qrRef} className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={JSON.stringify({
                  id: qrId,
                  name: patientData?.name,
                  phone: patientData?.phone,
                  type: 'patient'
                })}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#1F2937"
                bgColor="#FFFFFF"
              />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-bold text-primary">ID: {qrId}</p>
              <p className="text-xs text-muted-foreground">8-character alphanumeric identifier</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrintQR}
            iconName="Printer"
            iconPosition="left"
            className="min-w-40"
          >
            Print QR Card
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadQR}
            iconName="Download"
            iconPosition="left"
            className="min-w-40"
          >
            Download QR
          </Button>
          
          <Button
            variant="default"
            size="lg"
            onClick={onNewRegistration}
            iconName="Plus"
            iconPosition="left"
            className="min-w-40"
          >
            New Registration
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-3">What would you like to do next?</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/tb-screening-form'}
              iconName="Stethoscope"
              iconPosition="left"
            >
              Start TB Screening
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/patient-search'}
              iconName="Search"
              iconPosition="left"
            >
              Search Patients
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/admin-dashboard'}
              iconName="LayoutDashboard"
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;