<<<<<<< HEAD:src/tabs/Users.js
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NewUserDisplay from '../display/NewUserDisplay';
import * as actions from '../../redux/actions/actions';
=======
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NewUserDisplay from '../display/NewUserDisplay';

// Material UI imports
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Checkbox from '@material-ui/core/Checkbox';

// Redux Imports (actions)
import * as actions from '../../actions/actions';

// Table Style Generator
export const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

// Pagination Footer Style Generator
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

// Function store of all pagination functions, these functions update the count, the current range of pages, etc. Essentially, any action on the pagination bar will be handled by this function store which is passed into the TablePagination component
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
// Similar to TypeScript, we can use propTypes to explicit declare a type for a prop. This enables type checking and allows for catching of bugs.
// https://reactjs.org/docs/typechecking-with-proptypes.html
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/tabs/Users.js

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

<<<<<<< HEAD:src/tabs/Users.js
    { field: 'email', headerName: 'Email', width: '200' },
=======
  // Determine how many empty rows to display on a certain page, e.g. if rowsPerPage = 5, and there are only 3 rows, should display 2 rows
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/tabs/Users.js

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
          // return response.json(); // This needs to be changed to one line since console.logs have been removed
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
<<<<<<< HEAD:src/tabs/Users.js
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
          sx={{ textAlign: 'center', mt: 4, mb: 1 }}
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
=======
    <div className='renderContainers'>
      <div className='header'>
        <h1 className='tabTitle'>Users</h1>
      </div>
      <div className='metric-section-title'>
        <h3>List of Users in Docketeer</h3>
      </div>
      <div className='settings-containers'>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact Preference</TableCell>
                <TableCell>Memory Threshold</TableCell>
                <TableCell>CPU Threshold</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRows.length > 0
                ? renderRows.map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow key={row._id} hover>
                        <TableCell component='th' scope='row'>
                          {row._id}
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>{row.contact_pref}</TableCell>
                        <TableCell>{row.mem_threshold}</TableCell>
                        <TableCell>{row.cpu_threshold}</TableCell>
                        <TableCell>
                          <Checkbox
                            id={`${row._id}`}
                            userid={`${row._id}`}
                            checked={selected[row._id]}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onChange={handleCheckboxClick}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ''}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                  colSpan={10}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <br />
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/components/tabs/Users.js
      <NewUserDisplay />
    </div>
  );
};

export default UserTable;
