
export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  currentSite?: string; // Optional field to track which site a user is currently checked into
  lastCheckIn?: {
    time: string;
    date: string;
    siteId: string;
  };
}

export interface CheckIn {
  id: string;
  userId: string;
  siteId: string;
  timestamp: string;
  geolocation?: string;
  notes?: string;
}
