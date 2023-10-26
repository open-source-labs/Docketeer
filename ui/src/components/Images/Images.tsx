import React, { SyntheticEvent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import styles from './Images.module.scss';
import globalStyles from '../global.module.scss';
import { ImageType } from 'types';
import { fetchImages } from '../../reducers/imageReducer';
import Client from '../../models/Client';

/**
 * @module | Images.tsx
 * @description | Provides ability to pull images from DockerHub image repository, run images, and remove images
 **/

export interface TestParams {
  imagesListTest?: ImageType[];
} 
// eslint-disable-next-line react/prop-types
const Images = (params?: TestParams ): React.JSX.Element => {
  // const Images = () => {
  // imagesList for testing purposes only
  // * above comment left by previous iteration. resolved type errors in order to test
  console.log("Running images function");
  const reduxImagesList = useAppSelector((state) => state.images.imagesList);
  const imagesList = params.imagesListTest ? params.imagesListTest : reduxImagesList;
  // const [repo, setRepo] = useState('');
  console.log("images list: ", imagesList);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(fetchImages());
  }, []);

  const runImage = async (image: ImageType) => {
    const success = await Client.ImageService.runImage(
      image.Repository,
      image.Tag
    );
    if (success) dispatch(fetchImages());
  };

  const removeImage = async (imageId: string) => {
    const success = await Client.ImageService.removeImage(imageId);
    if (success) dispatch(fetchImages());
  };

  const runImageAlert = (image: ImageType) => {
    {
      dispatch(
        createPrompt(
          `Are you sure you want to run ${image.Repository}?`,
          () => {
            runImage(image);
            dispatch(
              createAlert(`Running ${image.Repository}...`, 5, "success")
            );
          },
          () => {
            dispatch(
              createAlert(
                `The request to run ${image.Repository} has been cancelled.`,
                5,
                "warning"
              )
            );
          }
        )
      );
    }
  };

  const removeImageAlert = (image: ImageType) => {
    {
      dispatch(
        createPrompt(
          `Are you sure you want to remove ${image.Repository}?`,
          () => {
            removeImage(image.ID);
            dispatch(
              createAlert(`Removing ${image.Repository}...`, 5, "success")
            );
          },
          () => {
            dispatch(
              createAlert(
                `The request to remove ${image.Repository} has been cancelled.`,
                5,
                "warning"
              )
            );
          }
        )
      );
    }
  };

  return (
    <div className={styles.wrapper}>
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
                      src={`https://d36jcksde1wxzq.cloudfront.net/54e48877dab8df8f92cd.png`}
                    />
                  </figure>
                  <div>
                    <h2>{image.Repository}</h2>
                    <p>{image.Tag}</p>
                    <p>{`Image ID: ${image.ID}`}</p>
                    <p>{`Image Size: ${image.Size}`}</p>
                  </div>
                  <div className={styles.buttonHolder}>
                    <div className={styles.buttonSpacer}>
                      <button
                        role="button"
                        name="RUN"
                        className={globalStyles.buttonSmall}
                        onClick={() => runImageAlert(image)}
                      >
                        RUN
                      </button>
                      <button
                        role="button"
                        name="REMOVE"
                        className={globalStyles.buttonSmall}
                        onClick={() => removeImageAlert(image)}
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
