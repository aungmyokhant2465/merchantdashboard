import React from 'react';
import { Link } from 'react-router-dom';
import { user } from '../services/login'

import { Breadcrumbs, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useQuery } from '@apollo/client';
import { TRANSCATIONHISTORT } from '../query';

const Transcations = () => {

    let transcations = null
    const result = useQuery(TRANSCATIONHISTORT, { variables: { id: user.id } })

    if(result.data) {
        transcations = result.data.loyalty_point_history
    }

    if(!transcations) {
      return (
        <div>Loading...</div>
      )
    }

    return (
        <div>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                  Dashboard
                </Link>
                <Link to='#' >
                  Transcations
                </Link>
              </Breadcrumbs>
            </div>
            <Box
                sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    minHeight: '25vh',
                },
                flexDirection: 'column'
                }}
            >
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <Typography variant='h4' component='h2' sx= {{ m: 3 }} >Loyalty Transcation History</Typography>
                  <TableContainer sx={{ maxHeight: '75vh' }} >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 10 }} >
                              Passenger ID
                            </TableCell>
                            <TableCell style={{ minWidth: 30 }} >
                              Point Amount
                            </TableCell>
                            <TableCell style={{ minWidth: 10 }} >
                              Merchant ID
                            </TableCell>
                            <TableCell style={{ minWidth: 50 }} >
                              Created At
                            </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          transcations.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                              <TableCell>
                                { row.fk_passengerid }
                              </TableCell>
                              <TableCell>
                                { row.point_amount }
                              </TableCell>
                              <TableCell>
                                { row.fk_merchant_id }
                              </TableCell>
                              <TableCell>
                                    { row.created_at }
                                </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
            </Box>
        </div>
    )
}

export default Transcations