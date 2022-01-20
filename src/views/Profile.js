import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { PROFILE } from '../query';
import loginService, { user } from '../services/login';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { CardContent, Typography, Card, CardActions, Button, FormControl, TextField, Alert } from '@mui/material';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';

const Profile = () => {
    const result = useQuery(PROFILE, { variables: {id: user.id} })
    let admin = null

    const [open, setOpen] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ values, setValues ] = useState({
      oldPassword: '',
      password: '',
      confirmPassword: '',
      showPassword: false
    })
    const [ errors, setErrors ] = useState({
      oldPassword: '',
      password: '',
      confirmPassword: ''
    })
    const [ showAlert, setShowAlert ] = useState({
      message: '',
      isError: false
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(result.data) {
      admin = result.data.merchant_accounts[0]
    }

    if(!admin) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    let typeOfAdmin = 'Merchant'

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

    const handleClick = () => {
      setErrors({
        oldPassword: '',
        password: '',
        confirmPassword: ''
      })
      if(!values.oldPassword) {
        setErrors({ ...errors, oldPassword: 'Old password is required.' })
        return
      }
      if(!values.password) {
        setErrors({ ...errors, password: 'New password is required.' })
        return
      }
      if(!values.confirmPassword) {
        setErrors({ ...errors, confirmPassword: 'Confirm password is required.' })
        return
      }
      if( values.password !== values.confirmPassword) {
        setErrors({ ...errors, password: 'Password and Confirm password must to be the same.', confirmPassword: 'Password and Confirm password must to be the same.' })
        return
      }
      setLoading(true)
      loginService.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.password
      })
      .then(res => {
        setShowAlert({ isError: false, message: res.data.message })
      })
      .catch(err => {
        setShowAlert({ isError: true, message: 'Wrong old password' })
      })
      .finally(() => {
        handleClose()
        setLoading(false)
        setTimeout(() => {
          setShowAlert({
            message: '',
            isError: false
          })
        }, 3000)
        setErrors({
          oldPassword: '',
          password: '',
          confirmPassword: ''
        })
        setValues({
          oldPassword: '',
          password: '',
          confirmPassword: '',
          showPassword: false
        })
      })
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    return (
        <div>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                  Dashboard
                </Link>
                <Link to='#' >
                  Profile
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
                }}
            >
                <Paper variant="outlined" square sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                  <Card sx={{ p: 5 }}>
                      <CardContent sx={{ textAlign: 'center' }} >
                          <Typography variant='h3' component='h2' >
                            {typeOfAdmin}
                          </Typography>
                          <Typography variant='h4' component='h4' >
                            Profile
                          </Typography>
                          <TableContainer sx={{ mt: 4 }} >
                            <Table sx={{ minWidth: 100 }} aria-label="user information table">
                              <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Full Name
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="right">
                                      { admin.full_name }
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      Username
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                      { admin.username }
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                            </Table>
                          </TableContainer>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'end' }} >
                        <Button size="small" onClick={handleOpen}>Change Password</Button>
                      </CardActions>
                  </Card>
                </Paper>
            </Box>
            <div>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Change Password
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    Enter your old password and new password.
                  </Typography>
                  <FormControl sx={{ m: 2, width: 400 }} variant="outlined">
                    <TextField
                      id="oldPassword"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.oldPassword}
                      onChange={handleChange('oldPassword')}
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
                      label="Old Password"
                      error={errors.oldPassword? true: false}
                      helperText={errors.oldPassword}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 2, width: 400 }} variant="outlined">
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
                          label="New Password"
                          error={errors.password? true: false}
                          helperText={errors.password}
                      />
                  </FormControl>
                  <FormControl sx={{ m: 2, width: 400 }} variant="outlined">
                      <TextField
                          id="confPassword"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.confirmPassword}
                          onChange={handleChange('confirmPassword')}
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
                          label="Confirm Password"
                          error={errors.confirmPassword? true: false}
                          helperText={errors.confirmPassword}
                      />
                  </FormControl>
                  <Box sx={{ textAlign: 'right', mt: 2 }}>
                    <Button onClick={handleClose} color='secondary' >Close modal</Button>
                    <LoadingButton
                        variant="contained"
                        loading={loading}
                        onClick={handleClick}
                        sx={{ backgroundColor: '#4b26d1', alignSelf: 'end' }}
                    >
                      Change
                    </LoadingButton>
                  </Box>
                </Box>
              </Modal>
            </div>
            {
              ( showAlert.message && !showAlert.isError ) && <Alert sx={{ position: 'absolute', bottom: '1em', right: '1em' }} severity="success">{ showAlert.message }</Alert>
            }
            {
              ( showAlert.message && showAlert.isError ) && <Alert sx={{ position: 'absolute', bottom: '1em', right: '1em' }} severity="warning">{ showAlert.message }</Alert>
            }
        </div>
    )
}

export default Profile
