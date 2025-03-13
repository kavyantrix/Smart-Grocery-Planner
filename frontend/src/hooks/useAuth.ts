import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { fetchUserProfile, login, logout, register, updateUser } from '@/store/slices/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('token');
    // Clear any other auth-related data if needed
    window.location.href = '/login';
  };

  return {
    user,
    loading,
    logout, // Add logout to the returned object
    login: (email: string, password: string) => dispatch(login({ email, password })),
    register: (email: string, password: string, name: string) => 
      dispatch(register({ email, password, name })),
    updateUser: (userData: any) => dispatch(updateUser(userData)),
  };
}