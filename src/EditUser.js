import React, { useState} from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import './App.css'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    transparentDialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '450px',
        background: "transparent",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        borderRadius: '20px',
        backdropFilter: "blur(15px)",
    },
    title: {
        marginBottom: "-1rem",
        fontWeight: '800',
        marginTop: '1rem'
    },
    textField: {
        marginBottom: theme.spacing(2.5),
        transition: 'color 0.3s ease-in-out',
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: 'white',
        },
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: 'black',
        width: '100%',
        height: '40px',
        borderRadius: '40px',
        background: '#fff',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontWeight: '500',
        '&:hover': {
            backgroundColor: '#dce0dd',
        }
    }
}));


const EditForm = ({ open, setOpen, id }) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    

    const handleClose = () => {
        setName('');
        setEmail('');
        setNumber('');
        setError('');
        setOpen(false)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(id)
    };

    const handlePhoneNumberChange = (value) => {
        const cleanedValue = value.replace(/\D/g, '');

        const isValidPhoneNumber = cleanedValue.length === 12;
        console.log(cleanedValue.length);

        if (isValidPhoneNumber) {
            return true;
        } else {
            setError("Invalid phone number")
            return false;
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!handlePhoneNumberChange(number)) return;

            console.log(name,email,number)
        const res = await fetch(`/users/${id}`,{
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name,email,number
            })
           })
    
           const data  = await res.json();
           console.log(data);
        handleClose();
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{
                    paper: classes.transparentDialog,
                }}
            >
                <DialogTitle className={classes.title} component="h1">Edit User's Details</DialogTitle>
                <DialogContent
                    className={classes.alignCenter}
                >
                    <form action="PUT" onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className={classes.textField}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={classes.textField}
                            fullWidth
                            required
                        />

                        <MuiPhoneNumber
                            autoComplete="off"
                            disableDropdown={true}
                            label="Mobile No"
                            value={number}
                            onChange={(value) => setNumber(value)}
                            className={classes.textField}
                            fullWidth
                            required
                            defaultCountry={'in'}
                        />
                        <DialogActions className={classes.alignCenter}>
                            <Button type="submit" color="primary"
                                className={classes.button}>
                                Done
                            </Button>
                            <p className='error'>{error !== '' ? error : ''}</p>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditForm;
