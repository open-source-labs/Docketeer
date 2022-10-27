import React, { useEffect, useState, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';
import * as actions from '../../redux/actions/actions';


const UserTable = () => {
  const userList = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  const updateUserRole = (data) => dispatch(actions.updateUserRole(data));
  const [pageSize, setPageSize] = useState(5);
  const [userRole, setUserRole] = useState(userList);

  const columns = useMemo(() => [
    {field: '_id', 
      headerName: 'ID', 
      width: '30'},

    {field: 'username', 
      headerName: 'User', 
      width: '170'},

    {field: 'role', 
      headerName: 'Role', 
      width: '100', 
      type: 'singleSelect', 
      valueOptions:['user', 'admin', 'system admin'], 
      editable: true, preProcessEditCellProps: (params => handleRoleChange(params))
    },

    {field: 'email', 
      headerName: 'Email', 
      width: '200'},

    {field: 'phone', 
      headerName: 'Phone', 
      width: '150'},

    {field: 'contact_pref', 
      headerName: 'Contact Preference', 
      width: '100'},

    {field: 'mem_threshold', 
      headerName: 'Memory Threshold', 
      width: '100'},

    {field: 'cpu_threshold', 
      headerName: 'CPU Threshold', 
      width: '100'},
  ]);


  // //TODO: in use effect, pass in the new array as the second argument and call the function handling the fetch call
  // useEffect(()=>{
  //   handleRoleChange(event);
  // }, userList);

  const handleRoleChange = (event)=>{
    // required to access target property of event
    // event.persist();
    const target = event;
    const id = event.id;
    const role = event.props.value;
    console.log('id and role: ', id, role);
      
    return new Promise( resolve => {
      fetch('http://localhost:3000/admin/switch', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          role: role
        }),
      })
        .then((response) => {
          console.log('fetch response: ', response);
          response = response.json();
          return response;
        })
        .then((data) => {
          const hasError = data;
          if(data) {
            console.log('no change');
            window.alert('Uh-oh! You\'re the LAST sysadmin! Before reassigning yourself you need to assign a new sysadmin.');
          } else {
            console.log('from front end after fetch call: ', data);
            const payload = {
              _id: id,
              role
            };
            console.log('payload: ', payload);
            updateUserRole(payload); 
          }
          console.log('event props: ', event.props);
          event.props.value = role;
          console.log(event.props);
          resolve({ ...event.props,
            error: hasError
          });
        })    
        .catch((err) => {
          console.log('Error in front end switching roles: ', err);
        });
    });
  };
    
 

  return (
    <Box
      sx={{
        width: '100%',
        height: 550,
        background: 'white'
      }}>
      <Typography
        variant='h6'
        // component='h3'
        sx={{textAlign: 'center', mt:2, mb: 2}}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={userList}
        experimentalFeatures={{ preventCommitWhileValidating: true }} // This is needed for preProcessEditCellProp not not be called twice
        getRowId={row=>row._id}
        rowsPerPageOptions={[5, 10, 20]}
        footer
        pageSize={pageSize}
        onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
        getRowSpacing={params=>({   // Sets spacing between rows
          top: params.isFirstVisible ? 0 : 5,  // Sets spacing for top row to zero and 5 for everything else
          bottom: params.isLastVisible ? 0 : 5
        })}
      />
    </Box>
  );
};

export default UserTable;