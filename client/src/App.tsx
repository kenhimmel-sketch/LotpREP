import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { CommunityPanelProvider } from "./contexts/CommunityPanelContext";
import { AuthProvider } from "./features/auth/AuthContext";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home/HomePage";
import ParksIndexPage from "./pages/Parks/ParksIndexPage";
import ParkDetailPage from "./pages/Parks/ParkDetailPage";
import RulesPage from "./pages/Rules/RulesPage";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CommunityPanelProvider>
            <Toaster />
            <RootLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/parks" element={<ParksIndexPage />} />
                <Route path="/parks/:slug" element={<ParkDetailPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </RootLayout>
          </CommunityPanelProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
