import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import MainLayouts from '../components/Layouts/MainLayouts';
import Spinner from '../components/Elements/Spinner';

export const ProtectedRoute = ({ token, redirectPath = '/login' }) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const AdminAcces = ({ redirectPath = '/unauthorized' }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <MainLayouts>
        <div className="flex items-center justify-center h-[80vh]">
          <Spinner />
        </div>
      </MainLayouts>
    );
  }
  if (!user || user.usrgroup !== 'ADM') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
