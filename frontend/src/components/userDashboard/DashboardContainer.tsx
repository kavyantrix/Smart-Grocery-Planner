'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchUserProfile } from '@/store/slices/authSlice';
import DashboardView from './DashboardView';

export default function DashboardContainer() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    
    initialized.current = true
    if (!user) {
      dispatch(fetchUserProfile())
    }
  }, []) // Remove dependencies

  if (!user) return null

  return <DashboardView />
}