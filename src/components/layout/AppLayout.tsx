
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calendar, 
  ClipboardList, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  MapPin, 
  Menu, 
  Moon, 
  Settings, 
  Sun, 
  User 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout, hasPermission } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on mobile automatically
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast("Logged out successfully");
  };

  // Navigation items for sidebar
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: "",
      roles: ['admin', 'manager', 'staff']
    },
    { 
      name: "Absentee", 
      path: "/absentee", 
      icon: <ClipboardList className="w-5 h-5" />,
      badge: "2",
      roles: ['admin', 'manager', 'staff'] 
    },
    { 
      name: "OnSite", 
      path: "/onsite", 
      icon: <MapPin className="w-5 h-5" />,
      badge: "",
      roles: ['admin', 'manager', 'staff']
    },
    { 
      name: "Office", 
      path: "/office", 
      icon: <Home className="w-5 h-5" />,
      badge: "",
      roles: ['admin', 'manager']
    },
    { 
      name: "Projects", 
      path: "/projects", 
      icon: <Calendar className="w-5 h-5" />,
      badge: "5",
      roles: ['admin', 'manager']
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    hasPermission(item.roles as any)
  );

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-navy-900 transition-colors duration-200">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white dark:bg-navy-800 fixed inset-y-0 left-0 z-50 w-64 transition-all duration-300 ease-in-out shadow-lg border-r border-gray-100 dark:border-navy-700 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "shadow-xl" : ""
        )}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-100 dark:border-navy-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/d53afdbe-f04b-4e57-9276-33d555eaebbf.png" 
              alt="PT Pageo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-semibold">PT Pageo</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* User role badge */}
        <div className="px-4 py-2">
          <span className={cn(
            "text-xs font-medium px-2.5 py-0.5 rounded-full",
            user?.role === 'admin' 
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
              : user?.role === 'manager'
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          )}>
            {user?.role === 'admin' ? 'Administrator' : user?.role === 'manager' ? 'Manager' : 'Staff'}
          </span>
        </div>
        
        {/* Sidebar navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left px-3 py-6 h-10 font-normal relative",
                    location.pathname === item.path 
                      ? "text-white dark:text-white bg-pageo-blue hover:bg-pageo-darkBlue dark:bg-pageo-blue dark:hover:bg-pageo-darkBlue" 
                      : "text-gray-700 dark:text-gray-200"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                  {item.badge && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[1.25rem] h-5 rounded-full bg-pageo-blue/20 text-pageo-blue dark:bg-pageo-blue/30 dark:text-white flex items-center justify-center text-xs font-medium">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-100 dark:border-navy-700 space-y-4">
          {/* User profile button */}
          <Button
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => navigate("/profile")}
          >
            <div className="flex items-center w-full">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-pageo-blue/20 text-pageo-blue">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.department}</p>
              </div>
            </div>
          </Button>
          
          {/* Settings & theme toggle */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        {/* Top navigation bar */}
        <header className="h-16 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 dark:text-gray-300"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-300">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="h-8 w-8" onClick={() => navigate("/profile")}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-pageo-blue/20 text-pageo-blue">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Bell icon component
const Bell = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// X icon component
const X = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default AppLayout;
