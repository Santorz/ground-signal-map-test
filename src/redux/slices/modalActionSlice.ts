import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modalState = {
  isOpen: boolean;
  isHomeLocation: boolean;
  LatLonStringArray: number[] | null;
};

type initialState = {
  value: modalState;
};

const initialState = {
  value: {
    isOpen: false,
    isHomeLocation: false,
    LatLonStringArray: null,
  } as modalState,
} as initialState;

export const modalDataState = createSlice({
  name: 'modalDataStae',
  initialState: initialState,
  reducers: {
    triggerModalOpen: (state, action: PayloadAction<modalState>) => {
      return {
        value: {
          ...state.value,
          ...action.payload,
        },
      };
    },
    closeModal: (state, action: PayloadAction<boolean>) => {
      return {
        value: {
          ...state.value,
          isOpen: action.payload,
        },
      };
    },
  },
});

export const { triggerModalOpen, closeModal } = modalDataState.actions;

export default modalDataState.reducer;
