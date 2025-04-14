import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from './supabase';
import { Platform } from 'react-native';

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  fullName: string;
  userType: 'artist' | 'collector';
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async ({ email, password, username, fullName, userType }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName,
        user_type: userType,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const signIn = async ({ email, password }: SignInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};