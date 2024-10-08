import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../services/slices/ingredient.slice';
import { getOrder } from '../../services/slices/order.slice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../services/store';
import { getOrderNumber } from '../../services/asyncFetch/AsyncFetch';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderId = Number(useParams().number);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderNumber(orderId));
  }, []);

  const orderData = useSelector(getOrder);

  const ingredients: TIngredient[] = useSelector(getAllIngredients).filter(
    (ingredient) => orderData?.ingredients.includes(ingredient._id)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
