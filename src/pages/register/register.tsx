import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorRegister } from '../../services/slices/user.slice';
import { getRegisterData } from '../../services/asyncFetch/AsyncFetch';
import { AppDispatch } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const errorRegister = useSelector(getErrorRegister);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      getRegisterData({ name: userName, email: email, password: password })
    );
  };

  return (
    <RegisterUI
      errorText={errorRegister}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
