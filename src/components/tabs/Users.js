import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NewUserDisplay from '../display/NewUserDisplay';
import * as actions from '../../redux/actions/actions';

const UserTable = () => {
  const userList = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  const updateUserRole = (data) => dispatch(actions.updateUserRole(data));
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
      preProcessEditCellProps: (params) => handleRoleChange(params)
    },

    { field: 'email', headerName: 'Email', width: '200' },

    { field: 'phone', headerName: 'Phone', width: '150' },

    { field: 'contact_pref', headerName: 'Contact Pref.', width: '100' },

    { field: 'mem_threshold', headerName: 'Memory', width: '100' },

    { field: 'cpu_threshold', headerName: 'CPU', width: '100' }
  ]);

  const handleRoleChange = (event) => {
    const id = event.id;
    const role = event.props.value;

    return new Promise((resolve) => {
      // preProcessEditCellProps requires you to use a Promise/Resolve
      fetch('http://localhost:3000/admin/switch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          role: role
        })
      })
        .then((response) => response.json())
        .then((data) => {
          // Sets hasError to true/false based on API call. This will be true if the user tries to remove the last sysadmin
          const hasError = data;
          if (data) {
            console.log('no change');
            window.alert(
              'Uh-oh! You\'re the LAST sysadmin! Before reassigning yourself you need to assign a new sysadmin.'
            );
          } else {
            const payload = {
              _id: id,
              role
            };
            updateUserRole(payload); // Updates local state
          }
          event.props.value = role; // Set's the cell's props to the role that was passed in
          resolve({
            ...event.props, // Send the resolve with the selected props.
            error: hasError // If this is false, the value of the cell will not be updated. If it is true, it will be udpated
          });
        })
        .catch((err) => {
          console.log('Error in front end switching roles: ', err);
        });
    });
  };

  return (
    <div style={{ background: '#E1E4E6', height: 600 }}>
      <Box
        sx={{
          ml: 5,
          width: '90%',
          height: 425,
          background: 'white'
        }}
      >
        <Typography
          variant='h6'
          sx={{ textAlign: 'center', mt: 10, mb: 1 }}
        >
          Manage Users
        </Typography>
        <Typography
          sx={{ textAlign: 'center', mt: 0, mb: 1, color: 'gray', fontStyle: 'italic', fontWeight: 'lighter' }}
        >
          * Double click on the role to access the drop down menu
        </Typography>
        <DataGrid
          sx={{}}
          columns={columns}
          rows={userList}
          experimentalFeatures={{ preventCommitWhileValidating: true }} // This is needed for preProcessEditCellProp not not be called twice
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            // Sets spacing between rows
            top: params.isFirstVisible ? 0 : 5, // Sets spacing for top row to zero and 5 for everything else
            bottom: params.isLastVisible ? 0 : 5
          })}
        />
      </Box>
      <NewUserDisplay />
    </div>
  );
};

export default UserTable;
