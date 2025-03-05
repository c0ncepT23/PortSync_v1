// src/hooks/useRedux.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRedux = () => {
  const dispatch = useDispatch();
  
  // Create a type-safe selector function
  const selector = <T>(selector: (state: RootState) => T) => useSelector(selector);
  
  return { dispatch, selector };
};