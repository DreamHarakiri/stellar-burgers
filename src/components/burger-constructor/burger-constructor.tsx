import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearConstructor,
  getConstructor,
  moveConstructor
} from '../../services/slices/constructor.slice';
import {
  clearOrder,
  getOrder,
  getRequest
} from '../../services/slices/order.slice';
import { userDataSelector } from '../../services/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { getOrderBurger } from '../../services/asyncFetch/AsyncFetch';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const user = useSelector(userDataSelector);

  const dispatch: AppDispatch = useDispatch();
  const constructorItems = useSelector(getConstructor);

  const ingredientsArray =
    !constructorItems.bun || !constructorItems.ingredients
      ? []
      : [
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id)
        ];

  const orderRequest = useSelector(getRequest);

  const orderModalData = useSelector(getOrder);

  const onOrderClick = () => {
    if (!constructorItems?.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    dispatch(getOrderBurger(ingredientsArray));
    dispatch(clearConstructor());
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
