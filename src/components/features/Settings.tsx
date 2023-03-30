import React from 'react';
import AccountDisplay from '../displays/AccountDisplay';

/**
 * @module | Settings.tsx
 * @description | Provides ability to manage account information (i.e. modification of password, username, & phone-number)
 **/

const Settings = () => {
  return (
    <>
      <div className='h-3'></div>
      <div className='settingsFlex flex flex-wrap gap-3'>
        <AccountDisplay />
      </div>
    </>
  );
};

export default Settings;
