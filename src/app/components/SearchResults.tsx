/*eslint import/no-unresolved: 2*/

import { FC, useContext } from 'react';
import { LocationMatchAndInputContext } from './SearchArea';
import styles from '@/styles/searcharea.module.css';
import ResultsList from './ResultsList';
import Image from 'next/image';

const SearchResults: FC = () => {
  // Hooks
  const { locationMatchArray, userInputNotFound } = useContext(
    LocationMatchAndInputContext
  );

  //   vars
  const res_len = locationMatchArray?.length;

  return (
    <>
      {((locationMatchArray && locationMatchArray.length >= 1) ||
        userInputNotFound) && (
        // Whole container for error and Results' List
        <div className={`container w-full mt-3 select-none`}>
          {/*  */}
          {/* Results Component */}
          {locationMatchArray &&
            locationMatchArray.length > 0 &&
            !userInputNotFound && (
              <div className='block rounded-md select-none'>
                {/* Header */}
                <div
                  className={`bg-blue-700 rounded-t-md dark:bg-blue-500 py-2 px-3 bg-opacity-75 ${styles.glass}`}
                >
                  <h5 className='text-white dark:text-slate-200 font-bold'>
                    Found {res_len}{' '}
                    {`Result${res_len && res_len > 1 ? 's' : ''}`}:
                  </h5>
                </div>

                {/* Results' List */}
                <ResultsList results={locationMatchArray} />
                {/*  */}
              </div>
            )}

          {/* Not found component */}
          {userInputNotFound && !locationMatchArray && (
            <div
              className={`flex flex-col w-full justify-center items-center 
              bg-white bg-opacity-75 dark:bg-gray-200 ${styles.glass} p-5`}
            >
              <Image
                src='/location-not-found.png'
                alt='Not found Image'
                loading='lazy'
                width='200'
                height='200'
              />

              <h1 className='mt-4 text-xl text-center whitespace-pre-line'>
                {`Sorry, we couldn't find that 😔
              Please check back later...`}
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
