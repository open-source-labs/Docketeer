import React, { SyntheticEvent, useState } from 'react';
import useHelper from '../../helpers/commands';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import { ImageObj } from '../../../types';

import styles from './Images.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Images.tsx
 * @description | Provides ability to pull images from DockerHub image repository, run images, and remove images
 **/

// eslint-disable-next-line react/prop-types
const Images = ({ imagesList: initialImagesList }): JSX.Element => {
  // imagesList for testing purposes only
  const reduxImagesList = useAppSelector((state) => state.images.imagesList);
  const imagesList = initialImagesList ? [initialImagesList] : reduxImagesList;
  const [repo, setRepo] = useState('');
  const dispatch = useAppDispatch();
  const { runIm, removeIm, pullImage } = useHelper();

  const handleClick = () => {
    if (!repo) {
      dispatch(
        createAlert(
          'Please enter an image name prior to attempting to pull.',
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (existingRepo === true) {
          dispatch(
            createAlert(
              'This image already exists within your Docketeer image collection.',
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (existingRepo === true) {
          dispatch(
            createAlert(
              'This image already exists within your Docketeer image collection.',
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

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://d36jcksde1wxzq.cloudfront.net/54e48877dab8df8f92cd.png';
  };

  const runImage = (image: ImageObj) => {
    {
      dispatch(
        createPrompt(
          `Are you sure you want to run ${image.reps}?`,
          () => {
            runIm(image);
            dispatch(createAlert(`Running ${image.reps}...`, 5, 'success'));
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
    }
  };

  const removeImage = (image: ImageObj) => {
    {
      dispatch(
        createPrompt(
          `Are you sure you want to remove ${image.reps}?`,
          () => {
            removeIm(image.imgid);
            dispatch(createAlert(`Removing ${image.reps}...`, 5, 'success'));
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
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSearchHolder}>
        <h2>IMAGE REPOSITORY</h2>
        <input
          className={globalStyles.input}
          type="text"
          placeholder="Search…"
          onChange={(e) => {
            setRepo(e.target.value);
          }}
        />
        <button className={globalStyles.button1} onClick={() => handleClick()}>
          PULL
        </button>
      </div>
      <div className={styles.availableImagesHolder}>
        <h2>AVAILABLE IMAGES</h2>
        <div className={styles.imageHolder}>
          {imagesList.map((image, i: number) => {
            return (
              <div key={`image-${i}`} className={styles.imageCard}>
                <div className={styles.textHolder}>
                  <figure>
                    <img
                      className={styles.image}
                      src={`https://d1q6f0aelx0por.cloudfront.net/product-logos/library-${image.reps}-logo.png`}
                      onError={handleError}
                    />
                  </figure>
                  <div>
                    <h2>{image.reps}</h2>
                    <p>{image.tag}</p>
                    <p>{`Image ID: ${image.imgid}`}</p>
                    <p>{`Image Size: ${image.size}`}</p>
                  </div>
                  <div className={styles.buttonHolder}>
                    <div className={styles.buttonSpacer}>
                      <button
                        className={globalStyles.buttonSmall}
                        onClick={() => runImage(image)}
                      >
                        RUN
                      </button>
                      <button
                        className={globalStyles.buttonSmall}
                        onClick={() => removeImage(image)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Images;
