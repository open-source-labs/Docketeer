import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import NewUserDisplay from '../components/display/NewUserDisplay';

// Material UI imports
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// Redux Imports (actions)
<<<<<<< HEAD:src/tabs/Users.js
import * as actions from '../module/actions/actions';
=======
import * as actions from '../../redux/actions/actions';
>>>>>>> 551bed2 (Fix Adminview and SysAdminView so that it shows):src/components/tabs/Users.js

// Table Style Generator
// export const useStyles = makeStyles({
//   table: {
//     minWidth: 1000,
//   },
// });

// Pagination Footer Style Generator
// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(2.5),
//   },
// }));

// Function store of all pagination functions, these functions update the count, the current range of pages, etc. Essentially, any action on the pagination bar will be handled by this function store which is passed into the TablePagination component
function TablePaginationActions(props) {
  // const classes = useStyles1();
  // const theme = useTheme();
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
    <div
    // className={classes.root}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {/* {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />} */}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {/* {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )} */}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {/* {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )} */}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {/* {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />} */}
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
  rowsPerPage: PropTypes.number.isRequired
};

const UserTable = () => {
  // const classes = useStyles();
  const rows = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  const updateUserRole = (data) => dispatch(actions.updateUserRole(data));

  const tempSelected = {};
  for (let i = 0; i < rows.length; i++) {
    tempSelected[rows[i]._id] =
      rows[i].role === 'admin' || rows[i].role === 'sysadmin';
  }

  // Local state variables for table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Local state variable to keep track of which admin checkboxes are selected
  const [selected, setSelected] = React.useState(tempSelected);

  // Determine how many empty rows to display on a certain page, e.g. if rowsPerPage = 5, and there are only 3 rows, should display 2 rows
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // Update local state variable page upon clicking a new page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Update local state variable rowsPerPage upon selecting new number of rows to be displayed
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxClick = (event) => {
    // event persist is required to access target property of event. Without this, a synthetic event object would be used where target is re-assigned to null for performance reasons
    event.persist();

    const id = event.target.getAttribute('id');
    const invertPreviousValue = !selected[id];

    // create temporary copy of selected object
    const temp = {
      ...selected
    };
    // update key of checkbox id to switched/inverted value
    temp[id] = invertPreviousValue;

    // update local state variable selected
    setSelected(temp);

    // send request to endpoint http://localhost:3000/admin/switch
    fetch('http://localhost:3000/admin/switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        changeToAdmin: invertPreviousValue
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { _id, role } = data;
        const payload = {
          _id,
          role
        };
        updateUserRole(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // To get an array of user objects
  const renderRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  return (
    <div className="renderContainers">
      <div className="header">
        <h1 className="tabTitle">Users</h1>
      </div>
      <div className="metric-section-title">
        <h3>List of Users in Docketeer</h3>
      </div>
      <div className="settings-containers">
        <TableContainer component={Paper}>
<<<<<<< HEAD:src/tabs/Users.js
          <Table className={classes.table} aria-label="simple table">
=======
          <Table
            // className={classes.table}
            aria-label='simple table'
          >
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id):src/components/tabs/Users.js
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
                        <TableCell component="th" scope="row">
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
                    native: true
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
      <NewUserDisplay />
    </div>
  );
};

export default UserTable;
