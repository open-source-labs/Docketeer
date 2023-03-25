import React, { useState } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { UserInfo } from '../../../types';
import { createNewUser } from '../helpers/newUserHelper';

import styles from './Users.module.scss';
import globalStyles from '../global.module.scss';

// import globalStyles from '../global.module.scss';

/**
 * @module | Users.js
 * @description | Provides admin ability to view & add users to grant them read-only access to the Docketeer interface
 **/

const UserTable = (): JSX.Element => {
  const [valueRole, setValueRole] = useState('3');
  const [values, setValues] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  });


  const userList = useAppSelector((state) => state.users.userList);

  const renderUsers = userList.map((user: UserInfo, i: number): JSX.Element => {
    return (
      <tbody key={i}>
        <tr>
          <td>{user._id}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.contact_pref}</td>
          <td>{user.mem_threshold}</td>
          <td>{user.cpu_threshold}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className={styles.wrapper}>
      <h2 >USER MANAGEMENT</h2>
      <div className={styles.tableHolder} >
        <table >
          <thead>
            <tr>
              <th >ID</th>
              <th >USER</th>
              <th >ROLE</th>
              <th >EMAIL</th>
              <th >PHONE</th>
              <th >CONTACT PREF.</th>
              <th >MEMORY</th>
              <th >CPU</th>
            </tr>
          </thead>
          {renderUsers}
        </table>
      </div>

      <h2 >CREATE NEW USER</h2>
      <p >
        Create a new Docketeer account for an employee. Please confirm with the employee that their information is accurate before submitting.
      </p>

      <form
        onSubmit={(e) => {
          (e.preventDefault);
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
            id='set-sys-admin'
            value='1'
            checked={valueRole === '1'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor='set-sys-admin'>
            System Admin
          </label>

          <input
            type="radio"
            name="set-permissions"
            id='set-admin'
            value='2'
            checked={valueRole === '2'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor='set-admin'>Admin</label>

          <input
            className={globalStyles.radioButton}
            type="radio"
            name="set-permissions"
            id='set-user'
            value='3'
            checked={valueRole === '3'}
            onChange={(event) => setValueRole(event.target.value)}
          />
          <label htmlFor='set-user'>User</label>
        </fieldset>


        <button
          className={globalStyles.button1}
          type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default UserTable;
