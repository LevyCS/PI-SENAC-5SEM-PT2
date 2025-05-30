import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

export default function PrivateRoute() {
  const token = useAuth((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}