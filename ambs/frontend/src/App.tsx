/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AccessibilityWidget } from "@access-kit/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { ProgressBar } from "./components/ProgressBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { CustomSolutions } from "./pages/CustomSolutions";
import { Contact } from "./pages/Contact";
import { BuyNewEquipment } from "./pages/BuyNewEquipment";
import { GenericPage } from "./pages/GenericPage";
import { IndustriesServed } from "./pages/IndustriesServed";
import { Manufacturers } from "./pages/Manufacturers";
import { ManufacturerDetail } from "./pages/ManufacturerDetail";
import { ServiceDetail } from "./pages/ServiceDetail";

// Admin Imports
import AdminLayout from "./Admin/layouts/AdminLayout";
import Login from "./Admin/pages/Login";
import Dashboard from "./Admin/pages/Dashboard";
import ServicesManagement from "./Admin/pages/Services";
import HomeCMS from "./Admin/pages/HomeCMS";
import PageManager from "./Admin/pages/PageManager";
import LogosManagement from "./Admin/pages/Logos";
import TestimonialsManagement from "./Admin/pages/Testimonials";
import FAQsManagement from "./Admin/pages/FAQs";
import Settings from "./Admin/pages/Settings";
import IndustriesCMS from "./Admin/pages/IndustriesCMS";
import ManufacturersManagement from "./Admin/pages/Manufacturers";
import InquiriesManagement from "./Admin/pages/Inquiries";
import MediaLibrary from "./Admin/pages/MediaLibrary";
import ProfileSettings from "./Admin/pages/ProfileSettings";
import ProtectedRoute from "./Admin/components/ProtectedRoute";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/custom-solutions" element={<CustomSolutions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buy-new-equipment" element={<BuyNewEquipment />} />
        <Route path="/industries-served" element={<IndustriesServed />} />
        
        {/* Dynamic Service Routes */}
        <Route path="/repair-shop/:slug" element={<ServiceDetail />} />
        <Route path="/machine-shop/:slug" element={<ServiceDetail />} />
        
        <Route path="/manufacturers" element={<Manufacturers />} />
        <Route path="/manufacturers/:slug" element={<ManufacturerDetail />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/home" element={<HomeCMS />} />
            <Route path="/admin/pages" element={<PageManager />} />
            <Route path="/admin/services" element={<ServicesManagement />} />
            <Route path="/admin/industries" element={<IndustriesCMS />} />
            <Route path="/admin/manufacturers" element={<ManufacturersManagement />} />
            <Route path="/admin/gallery" element={<LogosManagement />} />
            <Route path="/admin/testimonials" element={<TestimonialsManagement />} />
            <Route path="/admin/faqs" element={<FAQsManagement />} />
            {/* Add other admin routes here */}
            <Route path="/admin/projects" element={<div className="bg-white p-6 rounded-lg">Projects Management (Coming Soon)</div>} />
            <Route path="/admin/team" element={<div className="bg-white p-6 rounded-lg">Team Management (Coming Soon)</div>} />
            <Route path="/admin/inquiries" element={<InquiriesManagement />} />
            <Route path="/admin/media" element={<MediaLibrary />} />
            <Route path="/admin/profile" element={<ProfileSettings />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<GenericPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BackToTop />}
      <AccessibilityWidget />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <ProgressBar />
        <div className="min-h-screen flex flex-col font-sans">
          <AppContent />
        </div>
        <Toaster position="top-right" richColors />
      </Router>
    </QueryClientProvider>
  );
}
