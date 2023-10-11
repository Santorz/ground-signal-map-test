import { FC, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import sampleData from '@/data-files/sample-data';
import { closeModal } from '@/redux/slices/modalActionSlice';
import styles from '@/styles/modal.module.css';
import Link from 'next/link';
import getDistance from '@/funcs/getDistance';
import { FallbackImage } from './FallbackImage';
import ModalCLoseButton from './ModalCloseButton';

export default function NewModal() {
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

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-[1000]'
        // initialFocus={cancelButtonRef}
        onClose={customClose}
      >
        <ModalCLoseButton />

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${styles.glass}`}
          />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto flex justify-center items-center'>
          <div className='flex  justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                {/*  */}
                {/* Header */}
                <div className='bg-gray-50 py-2 justify-between flex items-center px-2.5'>
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
                    <Link
                      target='_blank'
                      href={website}
                      className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                    >
                      Visit Website
                    </Link>
                  )}
                </div>
                {/* Header End */}

                {/* Body of Modal */}
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <h4 className=' py-2 text-base underline underline-offset-4'>
                    {getDistance(lat, homeLat, lon, homeLon)} miles from 🏠
                  </h4>
                  <h4 className='text-[1.1rem]'>
                    {description
                      ? description
                      : `Lorem ipsum dolor, sit amet consectetur adipisicing.`}
                  </h4>

                  {/* Images */}
                  {images && images.length > 0 && (
                    <ImageGrid imageArr={images} />
                  )}
                </div>
                {/* Body End */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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
