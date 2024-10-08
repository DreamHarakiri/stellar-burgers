import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../services/slices/orders.slice';
import { userDataSelector } from '../../services/slices/user.slice';
import { AppDispatch } from '../../services/store';
import { fetchOrders } from '../../services/asyncFetch/AsyncFetch';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);
  const user = useSelector(userDataSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders()).finally(() => {
        console.log('Orders after fetch:', orders);
      });
    }
  }, [user, dispatch]);

  if (!orders || orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
