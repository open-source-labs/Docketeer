import React, { useState } from 'react';
import useHelper from '../helpers/commands';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

/**
 * @module | Images.tsx
 * @description | Provides ability to pull images from DockerHub image repository, run images, and remove images
 **/

const Images = () => {
  const imagesList = useAppSelector((state) => state.images.imagesList);
  const [repo, setRepo] = useState('');
  const dispatch = useAppDispatch();
  const { runIm, removeIm, pullImage } = useHelper();

  const handleClick = () => {
    if (!repo) {
      dispatch(
        createAlert(
          `Please enter an image name prior to attempting to pull.`,
          5,
          'error'
        )
      );
      return;
    } else {
      let existingRepo = false;
      if (repo.includes(':')) {
        const splitRepo = repo.split(':');
        imagesList.map((el) => {
          if (el.reps === splitRepo[0] && el.tag === splitRepo[1]) {
            existingRepo = true;
            return;
          }
        });
        // @ts-ignore
        if (existingRepo === true) {
          dispatch(
            createAlert(
              `This image already exists within your Docketeer image collection.`,
              5,
              'error'
            )
          );
          return;
        } else {
          dispatch(
            createPrompt(
              `Are you sure you want to pull ${repo}?`,
              () => {
                pullImage(repo);
                dispatch(createAlert(`Pulling ${repo}...`, 5, 'success'));
              },
              () => {
                dispatch(
                  createAlert(
                    `The request to pull ${repo} has been cancelled.`,
                    5,
                    'warning'
                  )
                );
              }
            )
          );
          return;
        }
      } else {
        imagesList.map((el) => {
          if (el.reps === repo && el.tag === 'latest') {
            existingRepo = true;
            return;
          }
        });
        // @ts-ignore
        if (existingRepo === true) {
          dispatch(
            createAlert(
              `This image already exists within your Docketeer image collection.`,
              5,
              'error'
            )
          );
          return;
        } else {
          dispatch(
            createPrompt(
              `Are you sure you want to pull ${repo}?`,
              () => {
                pullImage(repo);
                dispatch(createAlert(`Pulling ${repo}...`, 5, 'success'));
              },
              () => {
                dispatch(
                  createAlert(
                    `The request to pull ${repo} has been cancelled.`,
                    5,
                    'warning'
                  )
                );
              }
            )
          );
          return;
        }
      }
    }
  };

  const handleError = (e: any) => {
    e.target.src =
      'https://d36jcksde1wxzq.cloudfront.net/54e48877dab8df8f92cd.png';
  };

  const renderImagesList = imagesList.map((image, i: number) => {
    return (
      <div className='card w-96 glass' key={i}>
        <figure className='pt-20'>
          <img
            src={`https://d1q6f0aelx0por.cloudfront.net/product-logos/library-${image.reps}-logo.png`}
            onError={handleError}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{image.reps}</h2>
          <p className='text-xs'>{image.tag}</p>
          <div className='divider py-1'></div>
          <p className='text-xs'>{`Image ID: ${image.imgid}`}</p>
          <p className='text-xs'>{`Image Size: ${image.size}`}</p>
          <div className='divider py-2'></div>
          <div className='card-actions justify-end'>
            <button
              className='btn bg-success text-success-content'
              onClick={() => {
                dispatch(
                  createPrompt(
                    `Are you sure you want to run ${image.reps}?`,
                    () => {
                      runIm(image);
                      dispatch(
                        createAlert(`Running ${image.reps}...`, 5, 'success')
                      );
                    },
                    () => {
                      dispatch(
                        createAlert(
                          `The request to run ${image.reps} has been cancelled.`,
                          5,
                          'warning'
                        )
                      );
                    }
                  )
                );
              }}
            >
              RUN
            </button>
            <button
              className='btn bg-error text-error-content'
              onClick={() => {
                dispatch(
                  createPrompt(
                    `Are you sure you want to remove ${image.reps}?`,
                    () => {
                      removeIm(image.imgid);
                      dispatch(
                        createAlert(`Removing ${image.reps}...`, 5, 'success')
                      );
                    },
                    () => {
                      dispatch(
                        createAlert(
                          `The request to remove ${image.reps} has been cancelled.`,
                          5,
                          'warning'
                        )
                      );
                    }
                  )
                );
              }}
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='h-3'></div>
      <div className='usersFlex flex flex-col gap-3'>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <div className='flex flex-col justify-between items-left'>
              <h2 className='card-title text-sm'>IMAGE REPOSITORY</h2>
              <div className='divider py-8'></div>
              <div className='form-control'>
                <div className='flex items-left input-group'>
                  <input
                    type='text'
                    placeholder='Search…'
                    className='w-96 input input-bordered'
                    onChange={(e) => {
                      setRepo(e.target.value);
                    }}
                  />
                  <button
                    className='btn-primary w-20 text-center btn-square font-bold text-primary-content text-xs'
                    onClick={() => handleClick()}
                  >
                    PULL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <h2 className='card-title text-sm'>AVAILABLE IMAGES</h2>
            <div className='divider py-8'></div>
            <div className='containerFlex flex flex-wrap gap-3'>
              {renderImagesList}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
