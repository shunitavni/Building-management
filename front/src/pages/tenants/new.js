import { makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createTenant } from '../../api/tenants';

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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    //const [updateMessage, setUpdateMessage] = useState('');

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [debt, setDebt] = useState('');
    const [address, setAddress] = useState('');

    const classes = useStyles();

    //const { id } = match.params;

    useEffect(() => {
        (async () => {
            try {
                const response = await createTenant();
                const tenant = response.data.data.tenant;

                setName(tenant.name);
                setPhoneNumber(tenant.phoneNumber);
                setDebt(tenant.debt);
                setAddress(tenant.address);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // const handleUpdate = async () => {
    //     setUpdateMessage('');
    //     try {
    //         // const response = await changeTenantDetails(id, {
    //         //     name,
    //         //     phoneNumber,
    //         //     debt,
    //         //     address,
    //         // });

    //         setUpdateMessage(response.data.status);
    //     } catch (err) {
    //         setError(err);
    //     }
    // };

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
            {/* <Button onClick={handleUpdate}>Update</Button>
            <br />
            <br />
            <span style={{ color: 'green' }}>{updateMessage && updateMessage}</span> */}
        </div>
    );
}
