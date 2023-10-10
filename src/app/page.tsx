'use client';

import SearchArea from './components/SearchArea';
import Map from './components/Map';
import { useEffect } from 'react';
import getRealTimeLocation from '@/funcs/getRealTImeLocation';
import { useDispatch } from 'react-redux';
import {
  changeActiveLocation,
  changeUserLocation,
} from '@/redux/slices/locationSlice';
import { AppDispatch } from '@/redux/store';

// Main Home Component

export default function Home() {
  // Hooks
  const dispatchFunc = useDispatch<AppDispatch>();

  // UseEffects
  useEffect(() => {
    getRealTimeLocation({
      changeActiveLocation,
      changeUserLocation,
      dispatchFunc,
    });
  }, [dispatchFunc]);

  // JSX
  return (
    <main className='w-full bg-white dark:bg-black'>
      {/* Map and Finder container */}
      <div id='map-and-finder-container' className='relative w-full h-screen'>
        <SearchArea />
        <Map />
      </div>

      {/* Modal here */}
    </main>
  );
}
