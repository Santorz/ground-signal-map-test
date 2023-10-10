'use client';

import {
  ChangeEventHandler,
  FC,
  useState,
  useCallback,
  useRef,
  createContext,
} from 'react';
import Image from 'next/image';
import styles from '@/styles/searcharea.module.css';
import sampleData from '@/data-files/sample-data';
import SearchResults from './SearchResults';

// Since we just need names for search, create an array of names
const locationNames = sampleData.map((location) => location.name);

// interfaces for Context API
interface locationMatchAndInputInterface {
  locationMatchArray: null | typeof sampleData;
  userInputNotFound: boolean;
}

// Main exported context
export const LocationMatchAndInputContext =
  createContext<locationMatchAndInputInterface>({
    locationMatchArray: null,
    userInputNotFound: false,
  });

// Main Component
const SearchField: FC = () => {
  // Hooks

  // State Values
  const [locationMatchArray, setLocationMatchArray] = useState<
    null | typeof sampleData
  >(null);
  const [userInputNotFound, setUserInputNotFound] = useState(false);

  // Refs
  const inputElemRef = useRef<HTMLInputElement>(null);

  // useEffects

  // Main Event Handler
  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;

    // If the input box gets ever empty
    if (!value) {
      // Send 'null' to Context
      setLocationMatchArray(null);
      setUserInputNotFound(false);
      //
    } else {
      // // Compare values and check for similar, annd send array of strings

      const autoCompleteList = locationNames.filter((elem) =>
        elem.toLowerCase().includes(value.toLowerCase())
      );

      const locationMatchesRealArr: typeof sampleData = [];

      autoCompleteList.map((eachMatch) => {
        const matchinRealData = sampleData.filter((eachLocation) =>
          Object.keys(eachLocation).some(
            (key) => eachLocation.name === eachMatch
          )
        );
        matchinRealData.map((elem) => locationMatchesRealArr.push(elem));
      });

      if (locationMatchesRealArr && locationMatchesRealArr.length > 0) {
        setLocationMatchArray(locationMatchesRealArr);
        setUserInputNotFound(false);
      } else {
        setLocationMatchArray(null);
        setUserInputNotFound(true);
      }
    }
  }, []);

  // Main JSX
  return (
    <div className={`${styles.search_area} absolute top-5 left-20 `}>
      {/* The Search Input Field */}
      <section
        className={` flex-row flex  py-2 px-3
      bg-white bg-opacity-75 ${styles.glass} shadow-lg rounded-sm
      ${styles.searchfield_container}`}
        id='searchfield-container'
      >
        <Image
          src='/icon-search.svg'
          alt='Search icon'
          width={20}
          height={20}
          className={styles.search_icon}
        />
        <input
          type='text'
          id='address-search'
          placeholder='Search...'
          className={`focus:outline-none active:outline-none text-lg ${styles.search_box}`}
          onChange={handleInput}
          ref={inputElemRef}
          autoFocus={true}
        />
      </section>

      <LocationMatchAndInputContext.Provider
        value={{ locationMatchArray, userInputNotFound }}
      >
        <SearchResults />
      </LocationMatchAndInputContext.Provider>
      {/* The results auto-complete suggestions */}
    </div>
  );
};

export default SearchField;
