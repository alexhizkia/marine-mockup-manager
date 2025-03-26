
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'admin@pageo.com',
    role: 'admin',
    department: 'Human Resources',
    avatar: '/avatar.jpg'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'manager@pageo.com',
    role: 'manager',
    department: 'Field Operations',
    avatar: '/avatar.jpg'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'staff@pageo.com',
    role: 'staff',
    department: 'Data Processing',
    avatar: '/avatar.jpg'
  }
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('pageo-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pageo-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pageo-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find user with matching email
        const foundUser = mockUsers.find(u => u.email === email);
        
        // In a real app, you'd check password here
        if (foundUser && password === '123456') {
          setUser(foundUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]) => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    // Admin role can do everything
    if (user.role === 'admin') return true;
    
    // Manager can do manager and staff roles
    if (user.role === 'manager' && (requiredRole === 'manager' || requiredRole === 'staff')) return true;
    
    // Staff can only do staff roles
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
