/* eslint-disable react/display-name */
import React, { useContext, useEffect, useState } from 'react';
// import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";

import { deleteTenantById, fetchTenants } from '../../api/tenants';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import Pagination from '@material-ui/lab/Pagination';

import { AuthContext } from '../../context/auth';

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
  page: {
    marginTop: 20,
  },
}));

export default function Tenants({ match }) {
  const { token } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState(null);
  const [tenant, setTenant] = useState(null);
  // const [open, setOpen] = useState(true);

  const [displayDebts, setDisplayDebts] = useState(0);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTenants({name: search, debts: displayDebts, page}, token);
        console.log('response', response);
        setTenants(response.data.data.tenants);
        setTotalPages(response.data.data.pages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const handleChangeDebts = async (event) => {
    const val = event.target.value;
    setDisplayDebts(val);
    setLoading(true);

    try {
      const response = await fetchTenants({name: search, debts: val, page}, token);
      setTenants(response.data.data.tenants);
      setTotalPages(response.data.data.pages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChangeSearch = async (event) => {
    const val = event.target.value;

    setLoading(true);
    try {
      const response = await fetchTenants({name: val, debts: displayDebts, page}, token);
      setTenants(response.data.data.tenants);
      setTotalPages(response.data.data.pages);
      setSearch(val);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTenantById(id, token);
      setTenants(oldTenants => oldTenants.filter(tenant => tenant._id !== id));
    } catch (err) {
      setError(err);
    }
  }

  const handleRead = (tenant) => {
    setTenant(tenant);
  }

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
      <>
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
                    <IconButton onClick={() => handleRead(tenant)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => changeUrl('edit', tenant._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tenant._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className={classes.page}
          count={totalPages}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
        {tenant && (
          <Dialog
            open={true}
            onClose={() => setTenant(null)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Tenant Details</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <strong>Name:</strong> {tenant.name}
                <br />
                <strong>Phone Number:</strong> {tenant.phoneNumber}
                <br />
                <strong>Address:</strong> {tenant.address}
                <br />
                <strong>Debt:</strong> {tenant.debt}
                <br />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </>
    );

  return (
    <>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Button
            onClick={() => history.push(`${match.url}/new`)}
            variant="contained"
            color="primary"
            component="span"
          >
            Add tenant
          </Button>
          <br />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by name"
            onChange={handleChangeSearch}
          />
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
