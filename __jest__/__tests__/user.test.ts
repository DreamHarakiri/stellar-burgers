import { expect, describe } from '@jest/globals';
import {
  UserReducer,
  initialState,
  authChecked,
  userDataSelector
} from '../../src/services/slices/user.slice';
import {
  checkUserData,
  getUser,
  getLoginData,
  checkUserAuth,
  logoutUserThunk,
  getRegisterData,
  updateUser
} from '../../src/services/asyncFetch/AsyncFetch';
import { userCurrently } from '../test-constaints';

describe('[UserSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Выставить статус проверки авторизации', () => {
      const newState = UserReducer(initialState, authChecked());
      const { isAuth } = newState;
      expect(isAuth).toBe(true);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('login / Request', () => {
      const newState = UserReducer(initialState, {
        type: getLoginData.pending.type
      });
      const { loginLoading } = newState;
      expect(loginLoading).toBe(true);
    });
    it('login / Success', () => {
      const newState = UserReducer(initialState, {
        type: getLoginData.fulfilled.type,
        payload: userDataSelector
      });
      const { isAuth, user, loginLoading, loginError } = newState;
      expect(isAuth).toBe(true);
      expect(user).toEqual(user);
      expect(loginLoading).toBe(false);
      expect(loginError).toBe('');
    });
    it('login / Failed', () => {
      const error = { message: 'Не удалось авторизироваться' };
      const newState = UserReducer(initialState, {
        type: getLoginData.rejected.type,
        payload: error // Обновите здесь
      });
      const { loginLoading, isAuth, loginError } = newState;
      expect(loginLoading).toBe(false);
      expect(isAuth).toBe(false);
      expect(loginError).toBe(error.message); // 'Не удалось авторизироваться'
    });

    it('register / Request', () => {
      const newState = UserReducer(initialState, {
        type: getRegisterData.pending.type
      });
      const { registerLoading } = newState;
      expect(registerLoading).toBe(true);
    });
    it('register / Success', () => {
      const newState = UserReducer(initialState, {
        type: getRegisterData.fulfilled.type,
        payload: userCurrently
      });
      const { user, registerLoading } = newState;
      expect(registerLoading).toBe(false);
      expect(user).toEqual(user);
    });
    it('register / Failed', () => {
      const error = { message: 'Не удалось зарегистрироваться' };
      const newState = UserReducer(initialState, {
        type: getRegisterData.rejected.type,
        payload: error // Передача ошибки через payload
      });
      const { registerLoading, registerError } = newState;
      expect(registerLoading).toBe(false);
      expect(registerError).toBe(error.message); // 'Не удалось зарегистрироваться'
    });

    it('logout / Request', () => {
      const newState = UserReducer(initialState, {
        type: logoutUserThunk.pending.type
      });
      const { profileLoading } = newState;
      expect(profileLoading).toBe(true);
    });
    it('logout / Success', () => {
      const newState = UserReducer(initialState, {
        type: logoutUserThunk.fulfilled.type
      });
      const { profileLoading, user } = newState;
      expect(profileLoading).toBe(false);
      expect(user).toBe(null);
    });
    it('logout / Failed', () => {
      const log = jest.spyOn(console, 'log').mockImplementation(() => {});
      const error = { message: 'Не удалось выполнить выход' };
      const newState = UserReducer(initialState, {
        type: logoutUserThunk.rejected.type,
        payload: error // передаем ошибку через payload
      });
      const { profileLoading } = newState;
      expect(profileLoading).toBe(false);
      expect(log).toHaveBeenCalledWith('Ошибка выполнения выхода');
      log.mockRestore();
    });

    it('Проверка авторизации / Request', () => {
      const newState = UserReducer(initialState, {
        type: checkUserAuth.pending.type
      });
      const { loginError, registerError } = newState;
      expect(loginError).toBe('');
      expect(registerError).toBe('');
    });
    it('Получение пользователя / Success', () => {
      const newState = UserReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: { success: true, user: userCurrently }
      });
      const { user } = newState;
      expect(user).toBe(userCurrently);
    });
    it('Обновление пользователя / Pending', () => {
      const newState = UserReducer(initialState, {
        type: updateUser.pending.type
      });
      const { profileLoading } = newState;
      expect(profileLoading).toBe(true);
    });
    it('Обновление пользователя / Success', () => {
      const newState = UserReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: { success: true, user: updateUser }
      });
      const { profileLoading, user } = newState;
      expect(profileLoading).toBe(false);
      expect(user).toEqual(updateUser);
    });
    it('Обновление пользователя / Failed', () => {
      const error = { message: 'Не удалось обновить пользователя' };
      const newState = UserReducer(initialState, {
        type: updateUser.rejected.type,
        error
      });
      const { profileLoading, updateError } = newState;
      expect(profileLoading).toBe(false);
      expect(updateError).toBe(error.message);
    });
  });
});
