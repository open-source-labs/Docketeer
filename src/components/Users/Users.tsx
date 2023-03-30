import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { UserInfo } from '../../../types';
import styles from './Users.module.scss';
import globalStyles from '../global.module.scss';
import { SignUpValues } from '../../../types';

import useHelper from '../../helpers/commands';

/**
 * @module | Users.js
 * @description | Provides admin ability to view & add users to grant them read-only access to the Docketeer interface
 **/

const defaultSignUpValues: SignUpValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
  showPassword: false,
};

const UserTable = (): JSX.Element => {
  const [valueRole, setValueRole] = useState('3');
  const [values, setValues] = useState<SignUpValues>(defaultSignUpValues);

  const userList = useAppSelector((state) => state.users.userList);
  const { createNewUser, getUpdatedUserList } = useHelper();

  useEffect(() => {
    getUpdatedUserList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.userManagement}>
        <h2>USER MANAGEMENT</h2>
        <div className={styles.tableHolder}>
          <table className={globalStyles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>ROLE</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>CONTACT PREF.</th>
                <th>MEMORY</th>
                <th>CPU</th>
              </tr>
            </thead>
            {userList.map((user: UserInfo, i: number): JSX.Element => {
              return (
                <tbody key={`user-${i}`}>
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
            })}
          </table>
        </div>
      </div>
      <div className={styles.createUserHolder}>
        <h2>CREATE NEW USER</h2>
        <p>
          Create a new Docketeer account for an employee. Please confirm with
          the employee that their information is accurate before submitting.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              'ab to create user -> users.tsx',
              values.username,
              values.password,
              valueRole
            );
            createNewUser(values.username, values.password, valueRole);
            setValues(defaultSignUpValues);
          }}
        >
          <input
            className={globalStyles.input}
            type="text"
            id="username"
            placeholder="Username"
            value={values.username}
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
          />
          <input
            className={globalStyles.input}
            type="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
          <input
            className={globalStyles.input}
            type="password"
            id="confirm-password"
            placeholder="Confirm"
            value={values.passwordConfirmation}
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
              className={globalStyles.radioButton}
              type="radio"
              name="set-permissions"
              id="set-user"
              value="3"
              checked={valueRole === '3'}
              onChange={(event) => {
                console.log('event.target.value: ', event.target.value);
                setValueRole(event.target.value);
              }}
            />
            <label htmlFor="set-user">User</label>
            <input
              type="radio"
              name="set-permissions"
              id="set-sys-admin"
              value="1"
              checked={valueRole === '1'}
              onChange={(event) => {
                console.log('event.target.value: ', event.target.value);
                setValueRole(event.target.value);
              }}
            />
            <label htmlFor="set-sys-admin">System Admin</label>
          </fieldset>

          <button className={globalStyles.button1} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserTable;
