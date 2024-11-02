import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  moveConstructor,
  removeConstructor
} from '../../services/slices/constructor.slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveConstructor({ item: ingredient, position: -1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveConstructor({ item: ingredient, position: +1 }));
    };

    const handleClose = () => {
      dispatch(removeConstructor(ingredient)); //заглушка чтоб ошибок не было
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
