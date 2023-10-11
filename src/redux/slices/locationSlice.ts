import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* This is the slice holding the central state of both the user's current location
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

/* Here, we are creating a slice that will hold everything related to the user's Home Location
and their current selected location.. The value of the state would be an object with two properties: 
usersLocation and activeLocation. 
Also, we'll have two reducers, one to change the user's Home Location, and another to change the active Location*/
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

// Exporting both diaptcher action functions, so they can be accessed
export const { changeActiveLocation, changeUserLocation } =
  locationDataState.actions;

// Exporting the reducer as default
export default locationDataState.reducer;
