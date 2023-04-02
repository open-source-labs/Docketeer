import React, { useState } from 'react';
import styles from './UsersDeletePopup.module.scss';
import globalStyles from '../global.module.scss';

const UsersDeletePopup = ({ togglePopup }): JSX.Element => {
  const [deletedUser, setDeletedUser] = useState<string>('');

  const deleteUser = (): void => {
    console.log('deleting user');
    togglePopup();
  };

  // TODO: refactor to use the existing alert component

  return (
    <div className={styles.wrapper}>
      <div className={styles.general}>
        <p>Are you sure you want to delete this user?</p>
        <div className={styles.buttonHolder}>
          <button onClick={deleteUser} className={globalStyles.button1}>
            Delete User
          </button>

          <button onClick={togglePopup} className={globalStyles.button2}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersDeletePopup;
