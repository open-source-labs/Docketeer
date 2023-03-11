import React, { useState } from 'react';
import { handleNewUser } from '../helpers/newUserHelper';

/**
 * @module | NewUserDisplay.tsx
 * @description | Provides registration/sign-up features
 **/
// TODO: change useState to redux? Actually I think it's appropriate for forms to do it this way
const NewUserDisplay = () => {
  const [valueRole, setValueRole] = useState('3');
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    showPassword: false,
  });

  return (
    <div className="card bg-neutral text-neutral-content rounded-lg flex-0">
      <div className="card-body text-left space-y-2">
        <h2 className="card-title text-sm">CREATE NEW USER</h2>
        <p className="text-xs w-full max-w-xs">
          Create a new Docketeer account for an employee. Please confirm with
          the employee that their information is accurate before submitting.
        </p>
        <div className="divider py-8"></div>
        <div className="form-control">
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValues({
                ...values,
                passwordConfirmation: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-control">
          <input
            type="phone"
            id="phone"
            placeholder="Phone number"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setValues({
                ...values,
                phone: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">System Admin</span>
            <input
              type="radio"
              name="radio-sys-admin"
              className="radio primary radio-xs"
              onChange={() => setValueRole('1')}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Admin</span>
            <input
              type="radio"
              name="radio-admin"
              className="radio primary radio-xs"
              onChange={() => setValueRole('2')}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">User</span>
            <input
              type="radio"
              name="radio-user"
              className="radio primary radio-xs"
              onChange={() => setValueRole('3')}
            />
          </label>
        </div>
        <div className="form-control mt-6 flex space-y-2">
          <button
            className="btn btn-primary w-full max-w-xs"
            onClick={() => {
              handleNewUser(values, valueRole, setValues);
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUserDisplay;
