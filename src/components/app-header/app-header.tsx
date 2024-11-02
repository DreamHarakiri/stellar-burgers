import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../services/slices/user.slice';

export const AppHeader: FC = () => {
  const userDataName = useSelector(userDataSelector);
  return (
    <>
      <AppHeaderUI userName={userDataName?.name} />
    </>
  );
};
