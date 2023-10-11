/*eslint import/no-unresolved: 2*/

import { FC, MouseEventHandler, useCallback } from 'react';
import styles from '@/styles/searcharea.module.css';
import sampleData, { SampleDataType } from '@/data-files/sample-data';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { changeActiveLocation } from '@/redux/slices/locationSlice';
import { AppDispatch } from '@/redux/store';

// Interfaces

// Main Component
const ResultsLists: FC<{ results: SampleDataType }> = ({ results }) => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Handlers
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const targetButton = e.currentTarget as HTMLButtonElement;
      const sampleLocationID = targetButton.id.split('sample-location-')[1];

      const sampleLocation = sampleData.find(
        (elem) => elem.id === Number(sampleLocationID)
      );

      const { lat, lon } = sampleLocation?.location || {};

      const coOrdinates = lat && lon ? [lat, lon] : null;

      if (lat && lon) {
        dispatch(changeActiveLocation(coOrdinates));
      }
    },
    [dispatch]
  );

  // Main JSX
  return (
    <div
      className={`flex flex-col w-full bg-white bg-opacity-75 dark:bg-gray-300 ${styles.glass}`}
    >
      <>
        {results.map((result, index) => {
          const {
            name,
            id,
            location: { lat, lon },
          } = result;

          return (
            <button
              className={`bg-transparent flex text-left gap-4 items-center p-3 
              ${
                index < results.length - 1
                  ? 'border-b border-slate-800 dark:border-gray-400'
                  : ''
              }`}
              key={`${name}_${id}`}
              id={`sample-location-${id}`}
              onClick={handleClick}
            >
              <Image
                src='/icon-pin.svg'
                alt='Search icon'
                width={20}
                height={20}
              />
              <section className='flex flex-col gap-0.5'>
                <h5 className='font-bold'>{name}</h5>{' '}
                <h6
                  className={`${styles.tiniest_text} text-gray-700`}
                >{`${lat}, ${lon}`}</h6>
              </section>
            </button>
          );
        })}
      </>
    </div>
  );
};

export default ResultsLists;
