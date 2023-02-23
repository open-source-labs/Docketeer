import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../../redux/reducers/hooks';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NewUserDisplay from '../display/NewUserDisplay';
import useSurvey from '../helper/dispatch';

const UserTable = () => {
  const userList = useAppSelector((state) => state.users.userList);
  console.log('userList', userList);
  const { updateRoles } = useSurvey();
  const [pageSize, setPageSize] = useState(5);

  // Create columns for table
  const columns = useMemo(() => [
    { field: '_id', headerName: 'ID', width: '60' },

    { field: 'username', headerName: 'User', width: '150' },

    {
      field: 'role',
      headerName: 'Role',
      width: '150',
      type: 'singleSelect',
      valueOptions: ['user', 'admin', 'system admin'],
      editable: true,
      preProcessEditCellProps: (params) => handleRoleChange(params),
    },

    { field: 'email', headerName: 'Email', width: '200' },

    { field: 'phone', headerName: 'Phone', width: '150' },

    { field: 'contact_pref', headerName: 'Contact Pref.', width: '100' },

    { field: 'mem_threshold', headerName: 'Memory', width: '100' },

    { field: 'cpu_threshold', headerName: 'CPU', width: '100' },
  ]);

  const handleRoleChange = (event) => {
    const id = event.id;
    const role = event.props.value;

    return new Promise((resolve) => {
      // preProcessEditCellProps requires you to use a Promise/Resolve
      fetch('http://localhost:3000/admin/switch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          role: role,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Sets hasError to true/false based on API call. This will be true if the user tries to remove the last sysadmin
          const hasError = data;
          if (data) {
            console.log('no change');
            window.alert(
              "Uh-oh! You're the LAST sysadmin! Before reassigning yourself you need to assign a new sysadmin."
            );
          } else {
            const payload = {
              _id: id,
              role,
            };
            updateRoles(payload); // Updates local state
          }
          event.props.value = role; // Set's the cell's props to the role that was passed in
          resolve({
            ...event.props, // Send the resolve with the selected props.
            error: hasError, // If this is false, the value of the cell will not be updated. If it is true, it will be udpated
          });
        })
        .catch((err) => {
          console.log('Error in front end switching roles: ', err);
        });
    });
  };

  const renderUsers = userList.map((user, i) => {
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
      <div className='h-3'></div>
      <div className='usersFlex flex flex-wrap gap-3'>
        <div className='card bg-neutral text-neutral-content rounded-lg flex-1'>
          <div className='card-body space-y-2'>
            <h2 className='card-title text-sm'>USER MANAGEMENT</h2>
            <div className='divider py-8'></div>
            <div className='items-center'>
              <div className='overflow-x-auto'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                      <th className='text-xs'>ID</th>
                      <th className='text-xs'>USER</th>
                      <th className='text-xs'>ROLE</th>
                      <th className='text-xs'>EMAIL</th>
                      <th className='text-xs'>PHONE</th>
                      <th className='text-xs'>CONTACT PREF.</th>
                      <th className='text-xs'>MEMORY</th>
                      <th className='text-xs'>CPU</th>
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
