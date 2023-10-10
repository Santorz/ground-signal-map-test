import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: LocationsState;
};
type LocType = number[] | null;

type LocationsState = {
  usersLocation: LocType;
  activeLocation: LocType;
};

const initialState = {
  value: {
    usersLocation: null,
    activeLocation: null,
  } as LocationsState,
} as InitialState;

export const locationDataState = createSlice({
  name: 'locationDataState',
  initialState,
  reducers: {
    changeActiveLocation: (state, action: PayloadAction<LocType>) => {
      return {
        value: {
          usersLocation: state.value.usersLocation,
          activeLocation: action.payload,
        },
      };
    },
    changeUserLocation: (state, action: PayloadAction<LocType>) => {
      return {
        value: {
          usersLocation: action.payload,
          activeLocation: state.value.activeLocation,
        },
      };
    },
  },
});

export const { changeActiveLocation, changeUserLocation } =
  locationDataState.actions;

export default locationDataState.reducer;
