/**
 * @module AccountDisplay
 * @description Account Display for Settings tab, this will host any forms to update account details such as email, passwords, etc.
 */
import React from "react";
import { useSelector } from "react-redux";

// Material UI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import {
  handlePasswordChange,
  confirmPassword,
  checkPasswordLength,
  checkCurrentPassword,
  handleEmailUpdate,
  handlePhoneUpdate,
  checkPhone,
} from "../helper/settingsHelper";
import { RootState } from "../../renderer/store";

const input = document.getElementById(
  "update-phone-input"
) as HTMLTextAreaElement | null;

const AccountDisplay = () => {
  const session = useSelector((state: RootState) => state.session);

  return (
    <div>
      <div className="metric-section-title">
        <h3>Account Information</h3>
      </div>
      <div className="settings-container">
        <p>View your account information.</p>
        <br />
        <strong>Email</strong>
        <p>{session.email}</p>
        <br />
        <strong>Username</strong>
        <p>{session.username}</p>
        <br />
        <strong>Phone</strong>
        <p>{session.phone}</p>
        <br />
      </div>
      <div className="metric-section-title">
        <h3>Update Your Account</h3>
      </div>
      <div className="settings-container">
        <p>1. Update your email address</p>
        <br />
        <form className="settingsForm" autoComplete="off">
          <TextField
            id="update-email-input"
            label="Email"
            helperText={session.email}
            variant="outlined"
            size="small"
          />
          <Button
            sx={{
              ml: 1,
              width: 100,
            }}
            size="medium"
            variant="contained"
            onClick={() => handleEmailUpdate()}
          >
            Update
          </Button>
          <br />
          <span id="update-email-alert"></span>
        </form>
        <p>2. Update your phone number</p>
        <br />
        <form className="settings" autoComplete="off">
          <TextField
            id="update-phone-input"
            label="Phone Number"
            helperText={session.phone}
            onChange={() => checkPhone(input?.value)}
            variant="outlined"
            size="small"
          />
          <Button
            sx={{
              ml: 1,
              width: 100,
            }}
            size="medium"
            variant="contained"
            onClick={() => handlePhoneUpdate()}
          >
            Update
          </Button>
          <br />
          <span id="update-phone-alert"></span>
        </form>
        <p>3. Use the form below to update your password:</p>
        <br />
        <form className="settingsForm" autoComplete="off">
          <p>Current Password</p>
          <br />
          <TextField
            required
            id="current-password-input"
            label="Current Password"
            variant="outlined"
            type="password"
            onChange={() => checkCurrentPassword()}
            size="small"
          />
          <span id="current-password-alert"></span>
          <br />
          <p>New Password</p>
          <br />
          <TextField
            required
            id="new-password-input"
            label="New Password"
            variant="outlined"
            type="password"
            onChange={() => checkPasswordLength()}
            size="small"
          />
          <span id="new-password-alert"></span>
          <br />
          <p>Confirm New Password</p>
          <br />
          <TextField
            required
            id="new-password-confirmation-input"
            label="Confirm New Password"
            variant="outlined"
            type="password"
            onChange={() => confirmPassword()}
            size="small"
          />
          <span id="confirm-new-password-alert"></span>
          <br />
          <br />
          <Button
            sx={{
              ml: 1,
              width: 100,
            }}
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => handlePasswordChange()}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDisplay;
