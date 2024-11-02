import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorLogin } from '../../services/slices/user.slice';
import { getLoginData } from '../../services/asyncFetch/AsyncFetch';
import { AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const errorLogin = useSelector(getErrorLogin);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getLoginData({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
