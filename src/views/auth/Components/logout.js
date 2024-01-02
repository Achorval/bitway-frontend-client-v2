import { useEffect } from 'react';
import { useAuth } from '../../../core/utils/useAuth';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Navigate to='/auth/login' />
  )
}