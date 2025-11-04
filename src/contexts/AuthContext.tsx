import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, setAuthToken, clearAuthToken } from '../lib/api';
import type { UserRole } from '../lib/database.types';

interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
}

interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  panchayat_id: string | null;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setProfile(userData);
      setSession({ user: userData });
    }
    setLoading(false);
  }, []);

  const refreshProfile = async () => {
    if (user) {
      const profileData = await api.profile.get(user.id);
      setProfile(profileData);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);
    setAuthToken(response.token);
    setUser(response.user);
    setProfile(response.user);
    setSession({ user: response.user });
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
    throw new Error('Sign up not implemented yet');
  };

  const signOut = async () => {
    clearAuthToken();
    localStorage.removeItem('user');
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
