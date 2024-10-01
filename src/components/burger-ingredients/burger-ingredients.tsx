import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TIngredient } from '@utils-types';

import {
  selectIngredients,
  getIngredientBuns,
  getIngredientMains,
  getIngredientSauces,
  selectLoading,
  selectError,
  getCard
} from '@slices';
import { getIngredientData } from '@slices';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';

export const BurgerIngredients: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const ingredientBun = useSelector(getIngredientBuns);
  const ingredientMains = useSelector(getIngredientMains);
  const ingredientSauces = useSelector(getIngredientSauces);
  const ingredients = useSelector(selectIngredients);
  const getCardData = useSelector(getCard);

  const [bunsList, setBunsList] = useState<TIngredient[]>([]);
  const [mainsList, setMainsList] = useState<TIngredient[]>([]);
  const [saucesList, setSaucesList] = useState<TIngredient[]>([]);

  useEffect(() => {
    dispatch(getIngredientData());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientBun) {
      setBunsList(ingredientBun);
    }
    if (ingredientMains) {
      setMainsList(ingredientMains);
    }
    if (ingredientSauces) {
      setSaucesList(ingredientSauces);
    }
  }, [ingredientBun, ingredientMains, ingredientSauces]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={bunsList}
      mains={mainsList}
      sauces={saucesList}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
