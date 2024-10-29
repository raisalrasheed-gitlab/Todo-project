import { checkToken } from '../../utils/localfunctions';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = props => {
  return checkToken() ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
