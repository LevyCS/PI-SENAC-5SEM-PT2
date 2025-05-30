import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

export default function AuthRoute() {
  const token = useAuth((state) => state.token);

  console.log(token)
  if (token) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}