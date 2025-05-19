import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDetails from "./pages/PatientDetails";
import NotFound from "./pages/NotFound";
import DashboardPatient from "./pages/DashboardPatient";
import EncounterForm from "./pages/EncounterForm"; // ✅ เพิ่มตรงนี้
import EncounterViewer from "./pages/EncounterViewer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardpatient" element={<DashboardPatient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/encounters" element={<EncounterForm />} /> {/* ✅ เส้นทางใหม่ */}
          <Route path="/encounters-firebase" element={<EncounterViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
