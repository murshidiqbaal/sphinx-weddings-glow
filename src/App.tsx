import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy-loaded pages for Lighthouse 95+ performance
const Index = React.lazy(() => import("./pages/Index"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const NightEvents = React.lazy(() => import("./pages/NightEvents"));
const OutdoorEvents = React.lazy(() => import("./pages/OutdoorEvents"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Lazy-loaded Admin Pages
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const GalleryManager = React.lazy(() => import("./pages/admin/GalleryManager"));
const ImageManager = React.lazy(() => import("./pages/admin/ImageManager"));
const Login = React.lazy(() => import("./pages/admin/Login"));
const Migration = React.lazy(() => import("./pages/admin/Migration"));
const RecentWorksManager = React.lazy(() => import("./pages/admin/RecentWorksManager"));
const TeamManager = React.lazy(() => import("./pages/admin/TeamManager"));
const TestimonialsManager = React.lazy(() => import("./pages/admin/TestimonialsManager"));
const TextManager = React.lazy(() => import("./pages/admin/TextManager"));
const WeddingSectionManager = React.lazy(() => import("./pages/admin/WeddingSectionManager"));

const queryClient = new QueryClient();

const AdminShortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && (event.key === 'a' || event.key === 'A')) {
        event.preventDefault();
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#d6bba3] animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminShortcut />
      <WhatsAppButton />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/outdoor-events" element={<OutdoorEvents />} />
          <Route path="/gallery/night-events" element={<NightEvents />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="texts" element={<TextManager />} />
              <Route path="images" element={<ImageManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="recent-works" element={<RecentWorksManager />} />
              <Route path="wedding-section" element={<WeddingSectionManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="migration" element={<Migration />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
