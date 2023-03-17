import React from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { UserInfo } from '../../../types';
import NewUserDisplay from '../displays/NewUserDisplay';

/**
 * @module | Users.js
 * @description | Provides admin ability to view & add users to grant them read-only access to the Docketeer interface
 **/

const UserTable = (): JSX.Element => {
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
    <>
      <div className="h-3"></div>
      <div className="usersFlex flex flex-wrap gap-3">
        <div className="card bg-neutral text-neutral-content rounded-lg flex-1">
          <div className="card-body space-y-2">
            <h2 className="card-title text-sm">USER MANAGEMENT</h2>
            <div className="divider py-8"></div>
            <div className="items-center">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="text-xs">ID</th>
                      <th className="text-xs">USER</th>
                      <th className="text-xs">ROLE</th>
                      <th className="text-xs">EMAIL</th>
                      <th className="text-xs">PHONE</th>
                      <th className="text-xs">CONTACT PREF.</th>
                      <th className="text-xs">MEMORY</th>
                      <th className="text-xs">CPU</th>
                    </tr>
                  </thead>
                  {renderUsers}
                </table>
              </div>
            </div>
          </div>
        </div>
        <NewUserDisplay />
      </div>
    </>
  );
};

export default UserTable;
