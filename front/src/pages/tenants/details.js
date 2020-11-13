/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
// import MaterialTable from 'material-table';

import { useHistory } from "react-router-dom";

import { fetchAllTenants, fetchTenantsByName } from '../../api/tenants';
import {
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginBottom: 15,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  gridContainer: {
    marginBottom: 20,
  },
}));
  
export default function Tenants({ match }) {
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState(null);

  const [displayDebts, setDisplayDebts] = useState(0);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchAllTenants();
        setTenants(response.data.data.tenants);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChangeDebts = (event) => {
    const val = event.target.value;
    setDisplayDebts(val);
  }

  const handleChangeSearch = async (event) => {
    const val = event.target.value;

    setLoading(true);
    try {
      const response = await fetchTenantsByName(val);
      setTenants(response.data.data.tenants);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // const handleDelete = (id) => {
  //   // @TODO: complete this function
  //   // try {
  //   //   const response = deleteTenantById();
  //   // } catch (err) {
  //   // }
  // }

  const changeUrl = (task, id) => {
    history.push(`${match.url}/${task}/${id}`);
  }

  let content;

  if (loading)
    content = <span>Loading...</span>;
  else if (error)
    content = <span>Error: {error.message}</span>;
  else 
    content = (
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Debt</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant._id}>
                <TableCell component="th" scope="row">
                  {tenant.name}
                </TableCell>
                <TableCell>{tenant.phoneNumber}</TableCell>
                <TableCell>{tenant.address}</TableCell>
                <TableCell>{tenant.debt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => changeUrl('edit', tenant._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => changeUrl('view', tenant._id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  return (
    <>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
            <TextField fullWidth placeholder="Search by name" onChange={handleChangeSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={displayDebts}
              onChange={handleChangeDebts}
            >
              <MenuItem value={0}>Display all</MenuItem>
              <MenuItem value={1}>Only tenants with debts</MenuItem>
              <MenuItem value={2}>Only tenants without debts</MenuItem>
            </Select>
        </Grid>
      </Grid>
      {content}
    </>
  );
}
