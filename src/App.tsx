
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import Absentee from "./pages/Absentee";
import OnSite from "./pages/OnSite";
import Office from "./pages/Office";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Layout
import AppLayout from "./components/layout/AppLayout";

// Context types
type UserContextType = {
  user: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  } | null>>;
};

// Create contexts
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  // Mock logged in user - in a real app this would come from authentication
  const [user, setUser] = useState({
    id: "1",
    name: "Alex Morgan",
    role: "Survey Engineer",
    avatar: "/avatar.jpg"
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="absentee" element={<Absentee />} />
                <Route path="onsite" element={<OnSite />} />
                <Route path="office" element={<Office />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<ProjectDetail />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
