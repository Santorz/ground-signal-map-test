/*eslint import/no-unresolved: 2*/

import { closeModal } from '@/redux/slices/modalActionSlice';
import { AppDispatch } from '@/redux/store';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

const ModalCLoseButton: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Main JSx
  return (
    <button
      type='button'
      className={`box-content rounded-none border-none hover:no-underline 
      hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none
      absolute right-[50px] 30 top-[30px] text-white text-xl`}
      onClick={() => dispatch(closeModal(false))}
      aria-label='Close'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='currentColor'
        className='h-10 w-10'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );
};

export default ModalCLoseButton;
