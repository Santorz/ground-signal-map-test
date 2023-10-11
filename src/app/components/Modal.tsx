import { closeModal } from '@/redux/slices/modalActionSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import styles from '@/styles/modal.module.css';
import Image from 'next/image';
import sampleData from '@/data-files/sample-data';
import getDistance from '@/funcs/getDistance';
import Link from 'next/link';
import ModalCLoseButton from './ModalCloseButton';
import { FC, ReactNode } from 'react';
import { FallbackImage } from './FallbackImage';
import dynamic from 'next/dynamic';

// Dynamic Imports
const TERipple = dynamic(() =>
  import('tw-elements-react').then((res) => res.TERipple)
);
const TEModal = dynamic(() =>
  import('tw-elements-react').then((res) => res.TEModal)
);
const TEModalDialog = dynamic(() =>
  import('tw-elements-react').then((res) => res.TEModalDialog)
);
const TEModalContent = dynamic(() =>
  import('tw-elements-react').then((res) => res.TEModalContent)
);
const TEModalHeader = dynamic(() =>
  import('tw-elements-react').then((res) => res.TEModalHeader)
);
const TEModalBody = dynamic(() =>
  import('tw-elements-react').then((res) => res.TEModalBody)
);

// Main Component
export default function Modal(): JSX.Element {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const modalData = useAppSelector(
    (state) => state.modalActionStateReducer.value
  );
  const homeLocation = useAppSelector(
    (state) => state.locationDataStateReducer.value.usersLocation
  );
  const { isOpen, isHomeLocation, LatLonStringArray } = modalData;

  //   useEffects

  //   Vars
  const isLatLonNull = !LatLonStringArray;
  const reduxLat = isLatLonNull ? null : LatLonStringArray[0];
  const reduxLon = isLatLonNull ? null : LatLonStringArray[1];

  //   Main Location Data
  const matchingLocation = sampleData.find(
    (loc) => loc.location.lat === reduxLat && loc.location.lon === reduxLon
  );

  const { name, location, details, images } = matchingLocation || {};
  const { lat, lon } = location || {};
  const { description, website, avgStoreTraffic } = details || {};

  const [homeLat, homeLon] = homeLocation || [];

  //   Custom close func
  const customClose = () => {
    dispatch(closeModal(false));
  };

  //   Main JSX
  return (
    //   {/* <!--Verically centered scrollable modal--> */}
    <TEModal
      show={isOpen}
      setShow={customClose}
      scrollable
      className={`${styles.glass} m-0`}
    >
      <ModalCLoseButton />
      <TEModalDialog centered>
        <TEModalContent className='select-none'>
          {/* Location Exists and isn't Home Location */}
          {!isLatLonNull && !isHomeLocation && (
            <>
              {/* <!--Modal Header--> */}
              <TEModalHeader className='py-2 justify-between flex items-center'>
                {/* Name and Co-ordinates */}
                <section className='bg-transparent flex text-left gap-4 items-center px-2.5'>
                  <Image
                    src='/icon-pin.svg'
                    alt='Search icon'
                    width={20}
                    height={20}
                  />
                  <section className='flex flex-col gap-[1px]'>
                    <h5 className='font-bold text-[18px]'>{name}</h5>{' '}
                    <h6
                      className={`${styles.tiny_text} leading-none text-gray-400`}
                    >{`${lat}, ${lon}`}</h6>
                  </section>
                </section>

                {website && (
                  <TERipple rippleColor='light'>
                    <Link
                      target='_blank'
                      href={website}
                      className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                    >
                      Visit Website
                    </Link>
                  </TERipple>
                )}
              </TEModalHeader>

              {/*  */}

              {/* <!--Modal body--> */}
              {/*  */}
              <TEModalBody>
                <h4 className=' py-2 text-base underline underline-offset-4'>
                  {getDistance(lat, homeLat, lon, homeLon)} miles from 🏠
                </h4>
                <h4 className='text-[1.1rem]'>
                  {description
                    ? description
                    : `Lorem ipsum dolor, sit amet consectetur adipisicing.`}
                </h4>

                {/* Images */}
                {images && images.length > 0 && <ImageGrid imageArr={images} />}
              </TEModalBody>
            </>
          )}
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
}

const ImageGrid: FC<{ imageArr: string[]; children?: ReactNode }> = ({
  imageArr,
}) => {
  // Main JSX
  return (
    <div
      className='gap-4 mx-auto
     columns-3 w-full px-0 mt-7'
    >
      {imageArr.map((img) => (
        <FallbackImage
          src={img}
          alt={img}
          key={img}
          width={140}
          height={150}
          //   className='h-[200px]'
          //   layout='fill'
        />
      ))}
    </div>
  );
};
