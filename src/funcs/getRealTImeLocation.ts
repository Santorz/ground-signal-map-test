import { AppDispatch } from '@/redux/store';
import {
  changeActiveLocation,
  changeUserLocation,
} from '@/redux/slices/locationSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getRandomInRange } from '@/app/components/Map';

// Interfaces
interface GeoLocAndIPInterface {
  changeActiveLocation: typeof changeActiveLocation;
  changeUserLocation: typeof changeUserLocation;
  dispatchFunc: AppDispatch;
}

// Main Func
export default function getRealTimeLocation(
  GeoLocAndIPObject: GeoLocAndIPInterface
) {
  // If Geolocation is supported in browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      //
      (position: GeolocationPosition) => {
        getAndSetCoordinates(position, GeoLocAndIPObject);
      },
      //   Error Checker Func
      (error: GeolocationPositionError) => {
        handleGeoPositionError(error, GeoLocAndIPObject);
      }
    );
  } else {
    // Run IP check here
    getCoordsFromIP(GeoLocAndIPObject.dispatchFunc);
  }
}

// Function id the Request is successfull
const getAndSetCoordinates = (
  position: GeolocationPosition,
  GeoLocAndIPObject: GeoLocAndIPInterface
) => {
  const { longitude: lon, latitude: lat } = position.coords;
  const { dispatchFunc, changeActiveLocation, changeUserLocation } =
    GeoLocAndIPObject;

  dispatchFunc(changeActiveLocation([lat, lon]));
  dispatchFunc(changeUserLocation([lat, lon]));
};

// Function to Handle Error or Request Denial
const handleGeoPositionError = (
  error: GeolocationPositionError,
  GeoLocAndIPObject: GeoLocAndIPInterface
) => {
  // Run IP check too here
  getCoordsFromIP(GeoLocAndIPObject.dispatchFunc);
};

type IPLookupType = {
  city: string;
  country: string;
  hostname: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
};
// IP-based Coordinate getter func
const getCoordsFromIP = async (dispatchFunc: AppDispatch) => {
  // Response
  const resp = await axios
    .get('https://ipinfo.io/json?token=92f2283cb19853')
    .then((res: AxiosResponse<IPLookupType>) => {
      return res.data;
    })
    .catch((err: AxiosError | any) => {
      return { failed: true };
    });

  if (Object.keys(resp).length <= 1) {
    const rand_coord1 = getRandomInRange(50, 60, 4);
    const rand_coord2 = getRandomInRange(100, 120, 4);

    dispatchFunc(changeActiveLocation([rand_coord1, rand_coord2]));
    dispatchFunc(changeUserLocation([rand_coord1, rand_coord2]));
  } else {
    const fetchResponse = resp as IPLookupType;
    const latLongArr = fetchResponse.loc.split(',').map((each) => Number(each));
    dispatchFunc(changeActiveLocation(latLongArr));
    dispatchFunc(changeUserLocation(latLongArr));
  }
};
