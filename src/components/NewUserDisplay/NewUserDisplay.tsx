import React, { useState } from 'react';
import { createNewUser } from '../../helpers/commands';
import globalStyles from '../global.module.scss';

/**
 * @module | NewUserDisplay.tsx
 * @description | Provides registration/sign-up features
 **/

const NewUserDisplay = (): JSX.Element => {
  const [valueRole, setValueRole] = useState('3');
  const [values, setValues] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  });

  return (
    <div>
      <h2>CREATE NEW USER</h2>
      <p>
        Create a new Docketeer account for an employee. Please confirm with the
        employee that their information is accurate before submitting.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault;
          createNewUser(values.username, values.password, valueRole);
        }}
      >
        <input
          className={globalStyles.input}
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => {
            setValues({ ...values, username: e.target.value });
          }}
        />
        <input
          className={globalStyles.input}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
        />
        <input
          className={globalStyles.input}
          type="password"
          id="confirm-password"
          placeholder="Confirm"
          onChange={(e) => {
            setValues({
              ...values,
              passwordConfirmation: e.target.value,
            });
          }}
        />
        <fieldset className={globalStyles.radioForm}>
          <legend>Set Permissions</legend>

          <input
            type="radio"
            name="set-permissions"
            id="set-sys-admin"
            value="1"
            checked={valueRole === '1'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor="set-sys-admin">System Admin</label>

          <input
            type="radio"
            name="set-permissions"
            id="set-admin"
            value="2"
            checked={valueRole === '2'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor="set-admin">Admin</label>

          <input
            className={globalStyles.radioButton}
            type="radio"
            name="set-permissions"
            id="set-user"
            value="3"
            checked={valueRole === '3'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor="set-user">User</label>
        </fieldset>

        <button className={globalStyles.button1} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUserDisplay;
