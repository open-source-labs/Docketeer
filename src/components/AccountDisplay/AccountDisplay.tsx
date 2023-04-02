import React from 'react';
import {
  handlePasswordChange,
  handleEmailUpdate,
  handlePhoneUpdate,
} from '../../helpers/settingsHelper';
import { useAppSelector } from '../../reducers/hooks';

/**
 * @module | AccountDisplay.tsx
 * @description | Provides account management features (i.e. modification of password, username, phone-number)
 **/

const AccountDisplay = () => {
  const session = useAppSelector((state) => state.sessions);
  return (
    <>
      <div className="card bg-neutral text-neutral-content rounded-lg">
        <div className="card-body text-left space-y-2">
          <h2 className="card-title text-sm pb-2">ACCOUNT INFORMATION</h2>
          <div className="divider py-8"></div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Email</span>
            </label>
            <input
              type="text"
              placeholder={session.email}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Username</span>
            </label>
            <input
              type="text"
              placeholder={session.username}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Phone</span>
            </label>
            <input
              type="text"
              placeholder={session.phone}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content rounded-lg">
        <div className="card-body text-left space-y-2">
          <h2 className="card-title text-sm pb-2">
            UPDATE ACCOUNT INFORMATION
          </h2>
          <div className="divider py-8"></div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Email</span>
            </label>
            <input
              type="text"
              placeholder={session.email}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={() => handleEmailUpdate()}
            >
              Update
            </button>
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Phone</span>
            </label>
            <input
              type="text"
              placeholder={session.phone}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={() => handlePhoneUpdate()}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-neutral text-neutral-content rounded-lg">
        <div className="card-body text-left space-y-2">
          <h2 className="card-title text-sm pb-2">UPDATE PASSWORD</h2>
          <div className="divider py-8"></div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Current Password</span>
            </label>
            <input
              type="password"
              placeholder="Current Password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">New Password</span>
            </label>
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text text-xs">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={() => handlePasswordChange()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDisplay;
