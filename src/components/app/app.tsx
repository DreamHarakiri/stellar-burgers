import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { StrictMode, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import store, { AppDispatch, useDispatch } from '../../services/store';
import { ProtectedRoute } from '../ProtectedRoute/protectedRoute';
import {
  checkUserData,
  getIngredientData
} from '../../services/asyncFetch/AsyncFetch';
import { userDataSelector } from '../../services/slices/user.slice';
import { clearOrder } from '../../services/slices/order.slice';
import { DetailsContainer } from '../ui/details-orders/detailsContainer';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch: AppDispatch = useDispatch();
  const logUser = useSelector(userDataSelector);
  const id = location.pathname.split('/').at(-1);

  useEffect(() => {
    dispatch(checkUserData());
    dispatch(getIngredientData());
    console.log(logUser);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <DetailsContainer title='Детали ингредиента'>
              <IngredientDetails />
            </DetailsContainer>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <DetailsContainer title={`#0${id}`}>
              <OrderInfo />
            </DetailsContainer>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate('/');
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#0${id}`}
                onClose={() => {
                  navigate('/profile/orders');
                  dispatch(clearOrder());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#0${id}`}
                onClose={() => {
                  navigate('/feed');
                  dispatch(clearOrder());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const Root = () => (
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

export default Root;
