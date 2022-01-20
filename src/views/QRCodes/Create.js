import React, { useState } from 'react';

import { Breadcrumbs, Box, Alert, Card, CardContent, FormControl, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATEQR } from '../../query';

const CreateQR = () => {

    const [values, setValues] = useState({
        amount: '', note: ''
    })
    const [loading, setLoading] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false)
    const [ errors, setErrors ] = useState({
        amount: ''
    })

    const [ createQR ] = useMutation(CREATEQR, {
        onError: (error) => {
            console.log(error)
        },
        onCompleted: () => {
            setLoading(false)
            setShowAlert('QR Code have been created.')
            setTimeout(() => {
                setShowAlert('')
            }, 3000)
            setValues({ amount: '', note: '' })
        }
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClick = async () => {
        setLoading(true)
        setErrors({ amount: '' })
        if(!values.amount) {
            setErrors({ ...errors, amount: 'Point amount is required' })
            setLoading(false)
            return
        }
        createQR({ variables: { ...values } })
    }

    return (
        <div>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">
                Dashboard
            </Link>
            <Link to='#' >
                Create QR
            </Link>
          </Breadcrumbs>
        </div>
        <Box
            sx={{
            display: 'flex',
            '& > :not(style)': {
                m: 1,
                width: '100%',
                minHeight: '83vh',
            },
            flexDirection: 'column'
            }}
        >
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column'}} >
                        <FormControl sx={{ m: 2, width: '50vw' }} variant="outlined">
                            <TextField id="amount" label="Point Amount"
                                value={values.amount}
                                type="number"
                                onChange={handleChange('amount')}
                                error={errors.amount? true: false}
                                helperText={errors.amount}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '50vw' }} variant="outlined">
                            <TextField id="note" label="Note"
                                value={values.note}
                                onChange={handleChange('note')}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '50vw' }} variant="outlined">
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                onClick={handleClick}
                                sx={{ backgroundColor: '#4b26d1', alignSelf: 'end' }}
                            >
                                Create
                            </LoadingButton>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
        </Box>
        {
            showAlert && <Alert sx={{ position: 'absolute', bottom: '1em', right: '1em' }} severity="success">{ showAlert }</Alert>
        }
    </div>
    )
}

export default CreateQR