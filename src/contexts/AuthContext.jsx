
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
          console.error('Error fetching profile:', error);
          toast({ title: "Error fetching profile", description: error.message, variant: "destructive" });
        } else {
          setUser({ ...session.user, ...profile });
        }
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile on auth change:', error);
            toast({ title: "Error fetching profile", description: error.message, variant: "destructive" });
            setUser(session.user);
          } else {
            setUser({ ...session.user, ...profile });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile after login:', profileError);
        toast({ title: "Error fetching profile", description: profileError.message, variant: "destructive" });
      } else {
         setUser({ ...data.user, ...profile });
      }
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    }
    setLoading(false);
    return data.user;
  };

  const register = async (userData) => {
    setLoading(true);
    const { email, password, firstName, lastName } = userData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: 'user', 
        },
      },
    });

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
    
    if (data.user) {
       const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
         console.error('Error fetching profile after registration:', profileError);
      } else {
        setUser({ ...data.user, ...profile });
      }

      toast({
        title: "Account created!",
        description: "Welcome to EcoShop! Please check your email to confirm your account.",
      });
    }
    setLoading(false);
    return data.user;
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
    setUser(null);
    toast({
      title: "Logged out",
      description: "See you soon! Keep living sustainably.",
    });
    setLoading(false);
  };

  const updateProfile = async (updates) => {
    if (!user) {
      toast({ title: "Not authenticated", description: "You must be logged in to update your profile.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { first_name, last_name, ...otherUpdates } = updates; 
    
    const profileUpdates = {};
    if (first_name !== undefined) profileUpdates.first_name = first_name;
    if (last_name !== undefined) profileUpdates.last_name = last_name;
    
    if (Object.keys(profileUpdates).length > 0) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id)
        .select()
        .single();

      if (profileError) {
        toast({ title: "Profile update failed", description: profileError.message, variant: "destructive" });
        setLoading(false);
        throw profileError;
      }
      setUser(prevUser => ({ ...prevUser, ...profileData }));
    }
    
    if (Object.keys(otherUpdates).length > 0 && otherUpdates.password) {
       const { error: userError } = await supabase.auth.updateUser({ password: otherUpdates.password });
        if (userError) {
            toast({ title: "Password update failed", description: userError.message, variant: "destructive" });
            setLoading(false);
            throw userError;
        }
    }


    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
    setLoading(false);
  };


  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
