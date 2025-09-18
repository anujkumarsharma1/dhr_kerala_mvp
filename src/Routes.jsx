import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import PatientRegistration from './pages/patient-registration';
import LoginPage from './pages/login';
import TBScreeningForm from './pages/tb-screening-form';
import ReferralManagement from './pages/referral-management';
import PatientSearch from './pages/patient-search';

const Routes = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tb-screening-form" element={<TBScreeningForm />} />
        <Route path="/referral-management" element={<ReferralManagement />} />
        <Route path="/patient-search" element={<PatientSearch />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;
