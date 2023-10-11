/*eslint import/no-unresolved: 2*/

'use client';

import SearchArea from './components/SearchArea';
import { useEffect } from 'react';
import getRealTimeLocation from '@/funcs/getRealTImeLocation';
import { useDispatch } from 'react-redux';
import {
  changeActiveLocation,
  changeUserLocation,
} from '@/redux/slices/locationSlice';
import { AppDispatch } from '@/redux/store';
import dynamic from 'next/dynamic';
import Modal from './components/Modal';

// Dynamic Imports
const Map = dynamic(() => import('./components/Map').then((m) => m), {
  ssr: false,
});

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
    <main className='w-full relative bg-white dark:bg-black'>
      {/* Map and Finder container */}
      <div id='map-and-finder-container' className='relative w-full'>
        <SearchArea />
        <Map />
      </div>

      {/* Modal here */}
      <Modal />
    </main>
  );
}
