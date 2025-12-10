import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import NightEvents from "./pages/NightEvents";
import OutdoorEvents from "./pages/OutdoorEvents";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import GalleryManager from "./pages/admin/GalleryManager";
import ImageManager from "./pages/admin/ImageManager";
import Login from "./pages/admin/Login";
import Migration from "./pages/admin/Migration";
import RecentWorksManager from "./pages/admin/RecentWorksManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import TextManager from "./pages/admin/TextManager";
import WeddingSectionManager from "./pages/admin/WeddingSectionManager";
import NotFound from "./pages/NotFound";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminShortcut />
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
              <Route path="migration" element={<Migration />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
