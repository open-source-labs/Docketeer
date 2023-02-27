import React from 'react';
import { useAppSelector } from '../reducers/hooks';

/**
 * @module | Alert.tsx
 * @description | Manages alerts & prompts (i.e. Are you sure you want ...?)
 **/

const Alert = () => {
  const { alertList, promptList } = useAppSelector((state) => state.alerts);

  return (
    <>
      {alertList[1] === 'info' && (
        <div className='alert alert-info shadow-lg rounded-lg p-5 my-5'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>{alertList[0]}</span>
          </div>
        </div>
      )}
      {alertList[1] === 'success' && (
        <div className='alert alert-success shadow-lg rounded-lg p-5 my-5'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{alertList[0]}</span>
          </div>
        </div>
      )}
      {alertList[1] === 'warning' && (
        <div className='alert alert-warning shadow-lg rounded-lg p-5 my-5'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <span>{alertList[0]}</span>
          </div>
        </div>
      )}
      {alertList[1] === 'error' && (
        <div className='alert alert-error shadow-lg rounded-lg p-5 my-5'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{alertList[0]}</span>
          </div>
        </div>
      )}
      {typeof promptList[0] === 'string' && (
        <div className='alert shadow-lg p-5 my-5 rounded-lg'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-info flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>{promptList[0]}</span>
          </div>
          <div className='flex-none'>
            <button
              className='btn btn-sm btn-ghost'
              onClick={() => promptList[2]()}
            >
              Deny
            </button>
            <button
              className='btn btn-sm btn-primary'
              onClick={() => promptList[1]()}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
