import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* This is the slice holding the central stte of both the user's current location
 and the one selcted on the map*/

//  The Initial State Type
type InitialState = {
  value: LocationsState;
};
type LocType = number[] | null;

// The main state object (location) object type
type LocationsState = {
  usersLocation: LocType;
  activeLocation: LocType;
};

// Declaring the first default state variable
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
