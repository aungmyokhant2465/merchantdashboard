import React from 'react';
import loginService from '../services/login';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

const Login = () => {

    const history = useHistory()

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const [loading, setLoading] = React.useState(false);
    const [ errors, setErrors ] = React.useState({
        username: '',
        password: '',
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
            });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClick = async () => {
        setErrors({
            username: '',
            password: '',
        })
        setLoading(true);
        if(!values.username) {
            setErrors({ username: 'Username is required.', password: '' })
            setLoading(false)
            return
        }
        if(!values.password) {
            setErrors({ password: 'Password is required.', username: '' })
            setLoading(false)
            return
        }
         loginService.login({ username: values.username, password: values.password })
            .then(res => {
                setLoading(false)
                console.log(res)
                const decodedToken = jwt.decode(res.data.token)
                window.localStorage.setItem('loggedMerchant', JSON.stringify({ token: res.data.token, username: values.username, id: decodedToken.id }))
                history.push('/profile')
            })
            .catch(error => {
                const err = error.response
                if(err.status === 500) {
                    setErrors({ username: err.data, password: '' })
                }
                if(err.status === 401) {
                    setErrors({ username: '', password: err.data.message })
                }
                setLoading(false)
            })
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }} >
                    <Box  sx={{ m: 5 }}>
                        <Typography variant='h4' paragraph>
                           AIC Pass Merchant Panel
                        </Typography>
                        <Typography variant="subtitle2" component="p" >
                            Enter your credentials to continue
                        </Typography>
                    </Box>
                    <Box>
                        <FormControl sx={{ m: 2, width: '300px' }} variant="outlined">
                            <TextField id="username" label="Username"
                                value={values.username}
                                onChange={handleChange('username')}
                                error={errors.username? true: false}
                                helperText={errors.username}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '300px' }} variant="outlined">
                            <TextField
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                label="Password"
                                error={errors.password? true: false}
                                helperText={errors.password}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '300px' }} >
                            <LoadingButton
                                onClick={handleClick}
                                loading={loading}
                                variant="contained"
                                sx={{ backgroundColor: '#4b26d1' }}
                            >
                                Sign In
                            </LoadingButton>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login