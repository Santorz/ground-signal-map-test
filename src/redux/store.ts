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
