import React from 'react';
import { useAppSelector } from '../../reducers/hooks';
import styles from './Alert.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Alert.tsx
 * @description | Manages alerts & prompts (i.e. Are you sure you want ...?)
 **/
const Alert = (): JSX.Element => {
  // useApp is pulling state from the alert reducer
  // state.alerts is used to access the alert reducer
  // alertList = [time, Redux type] : object
  // promptList = [prompt msg, onClickFunc1, onClickFunc2] : object
  const { alertList, promptList } = useAppSelector((state) => state.alerts);
  const { prunePromptList } = useAppSelector((state) => state.pruneNetwork);

  const alertType = alertList[1];
  const alertText = alertList[0];
  const promptText = promptList[0];
  const prunePromptText = prunePromptList[0];

  const alertExists = alertType || alertText || promptText || prunePromptText;

  const svgs = {
    info: (
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    prompt: (
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    alertExists && (
      <div className={styles.wrapper}>
        {alertType === 'info' && (
          <div className={styles.info}>
            {svgs.info}
            <p>{alertText}</p>
          </div>
        )}
        {alertType === 'success' && (
          <div className={styles.success}>
            {svgs.success}
            <p>{alertText}</p>
          </div>
        )}
        {alertType === 'warning' && (
          <div className={styles.warning}>
            {svgs.success}
            <p>{alertText}</p>
          </div>
        )}
        {alertType === 'error' && (
          <div className={styles.error}>
            {svgs.error}
            <p>{alertText}</p>
          </div>
        )}
        {typeof promptText === 'string' && (
          <div className={styles.general}>
            {svgs.prompt}
            <p>{promptText}</p>
            <div className={styles.buttonHolder}>
              <button
                className={globalStyles.button2}
                onClick={() => promptList[2]?.()}
              >
                Deny
              </button>
              <button
                className={globalStyles.button1}
                onClick={() => promptList[1]?.()}
              >
                Accept
              </button>
            </div>
          </div>
        )}
        {typeof prunePromptText === 'string' && (
          <div className={styles.general}>
            {svgs.prompt}
            <p>{prunePromptText}</p>
            <div className={styles.buttonHolder}>
              <button
                className={globalStyles.button1}
                onClick={() => prunePromptList[1]?.()}
              >
                System Prune
              </button>
              <button
                className={globalStyles.button1}
                onClick={() => prunePromptList[2]?.()}
              >
                Network Prune
              </button>
              <button
                className={globalStyles.button2}
                onClick={() => prunePromptList[3]?.()}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Alert;
