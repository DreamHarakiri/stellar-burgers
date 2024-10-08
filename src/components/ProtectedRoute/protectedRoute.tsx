import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/slices/user.slice';
import { Preloader } from '@ui';

type TProtectedRoute = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth,
  children
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};
