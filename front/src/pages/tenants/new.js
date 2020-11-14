import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createTenant } from '../../api/tenants';
import { AuthContext } from '../../context/auth';

const useStyles = makeStyles(() => ({
    input: {
        marginBottom: 30,
    },
    goBack: {
        marginBottom: 20,
        color: 'blue',
        display: 'block',
    }
}));

export default function CreateTenant() {
    const { token } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [updateMessage, setUpdateMessage] = useState('');

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [debt, setDebt] = useState('');
    const [address, setAddress] = useState('');

    const history = useHistory();

    const classes = useStyles();

    const handleCreate = async () => {
      try {
        await createTenant({
          name,
          phoneNumber,
          debt,
          address,
        }, token);

        history.push('/tenants');
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (loading)
        return <span>Loading...</span>;

    if (error)
        return <span>Tenant is not found.</span>

    return (
      <div>
        <Link to="/tenants" className={classes.goBack}>
          ← Go back to all tenants
        </Link>
        <Typography variant="h4" gutterBottom>
          Tenant details
        </Typography>
        <TextField
          placeholder="Name"
          label="Tenant Name"
          value={name}
          className={classes.input}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <TextField
          placeholder="phoneNumber"
          label="Phone Number"
          value={phoneNumber}
          className={classes.input}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <TextField
          placeholder="Address"
          label="Address"
          value={address}
          className={classes.input}
          onChange={(event) => setAddress(event.target.value)}
        />
        <br />
        <TextField
          placeholder="Debt"
          label="Debt"
          type="number"
          value={debt}
          className={classes.input}
          onChange={(event) => setDebt(event.target.value)}
        />
        <br />
        <Button onClick={handleCreate}>Create</Button>
        <br />
      </div>
    );
}
