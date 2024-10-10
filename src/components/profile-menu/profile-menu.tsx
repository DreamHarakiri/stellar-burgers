import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/asyncFetch/AsyncFetch';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
