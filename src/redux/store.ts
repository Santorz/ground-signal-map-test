import { configureStore } from '@reduxjs/toolkit';
import locationDataStateReducer from './slices/locationSlice';
import modalActionStateReducer from './slices/modalActionSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { locationDataStateReducer, modalActionStateReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
  Here, I created a global store that combines multiple imported slices that hold their own respective data.
  Also, since I'm using Typescript, I had to export a typed selector so, Children components accesing this state
  wouldn't get type errors
*/
