"use client"

import type React from "react";
import { useRef } from "react";

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null;
  authLoading: boolean; // Renamed 'loading' to 'authLoading'
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoading: true, // Renamed 'loading' to 'authLoading'
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // Renamed 'loading' to 'authLoading'
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const initialUser = session?.user ?? null;
      setUser(initialUser);
      console.log("Initial user session fetched:", initialUser);
      setAuthLoading(false); // Renamed 'setLoading'
      isInitialLoad.current = false;
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      console.log("Auth state change event. User:", currentUser, "Event:", _event);
      if (!isInitialLoad.current) {
        setAuthLoading(false); // Renamed 'setLoading'
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setAuthLoading(true); // Renamed 'setLoading'
    await supabase.auth.signOut();
    setUser(null);
    setAuthLoading(false); // Renamed 'setLoading'
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, signOut }}> {/* Renamed 'loading' */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};