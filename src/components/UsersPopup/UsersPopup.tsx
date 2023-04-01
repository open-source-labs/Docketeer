import React, { useState } from 'react';
import styles from './UsersPopup.module.scss';
import globalStyles from '../global.module.scss';

const UsersPopup = ({ togglePopup }): JSX.Element => {
  const [updatedUserValues, setUpdatedUserValues] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    contactPref: '',
    memThreshold: '',
    cpuThreshold: '',
  });

  const updateUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setUpdatedUserValues({
      username: '',
      password: '',
      email: '',
      phone: '',
      contactPref: '',
      memThreshold: '',
      cpuThreshold: '',
    });

    togglePopup();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.general}>
        <div className={styles.updateUserHolder}>
          <form onSubmit={(e) => updateUser(e)} className={styles.editUser}>
            <input
              className={globalStyles.input}
              type="text"
              id="username"
              value={updatedUserValues.username}
              placeholder="Username"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  username: e.target.value,
                });
              }}
            />
            <input
              className={globalStyles.input}
              type="text"
              id="password"
              value={updatedUserValues.password}
              minLength={6}
              placeholder="Password"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  password: e.target.value,
                });
              }}
            />
            <input
              className={globalStyles.input}
              type="text"
              id="email"
              value={updatedUserValues.email}
              placeholder="Email"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  email: e.target.value,
                });
              }}
            />
            <input
              className={globalStyles.input}
              type="text"
              id="phone"
              value={updatedUserValues.phone}
              placeholder="Phone Number"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  phone: e.target.value,
                });
              }}
            />
            <input
              className={globalStyles.input}
              type="text"
              id="memThreshold"
              value={updatedUserValues.memThreshold}
              placeholder="Memory Threshold"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  memThreshold: e.target.value,
                });
              }}
            />
            <input
              className={globalStyles.input}
              type="text"
              id="cpuThreshold"
              value={updatedUserValues.cpuThreshold}
              placeholder="CPU Threshold"
              onChange={(e) => {
                setUpdatedUserValues({
                  ...updatedUserValues,
                  cpuThreshold: e.target.value,
                });
              }}
            />

            <fieldset className={globalStyles.radioForm}>
              <legend>Choose Contact Preference</legend>
              <input
                className={globalStyles.radioButton}
                type="radio"
                name="set-permissions"
                id="email"
                value="email"
                onChange={(e) => {
                  setUpdatedUserValues({
                    ...updatedUserValues,
                    contactPref: e.target.value,
                  });
                }}
              />
              <label htmlFor="set-email">Email</label>
              <input
                className={globalStyles.radioButton}
                type="radio"
                name="set-permissions"
                id="phone"
                value="text"
                onChange={(e) => {
                  setUpdatedUserValues({
                    ...updatedUserValues,
                    contactPref: e.target.value,
                  });
                }}
              />
              <label htmlFor="set-phone">Text</label>
            </fieldset>

            <div className={styles.buttonHolder}>
              <button className={globalStyles.button1}>Update User</button>
              <button onClick={togglePopup} className={globalStyles.button2}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersPopup;
