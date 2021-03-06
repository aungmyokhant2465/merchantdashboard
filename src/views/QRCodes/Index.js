import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { user } from '../../services/login';
import qr from 'qrcode'

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
import { QRCODES } from '../../query';

const QRCodes = () => {

    // let QRCodes = null
    const [ QRCodes, setQRCodes ] = useState(null)
    const result = useQuery(QRCODES, { variables: { id: user.id } })

    // if(result.data) {
    //   QRCodes = result.data.merchant_loyalty_qr_codes
    //   QRCodes = new Array(...QRCodes)
    //   QRCodes = QRCodes.map(row => {
    //     row = { ...row }
    //     const qrcode = await qr.toDataURL(row.id)
    //       // .then(res => {
    //       //   console.log(res)
    //       //   row.qrcode = res
    //       // })
    //     console.log(" qrcode: ",qrcode)
    //     return row
    //   } )
    //   console.log(QRCodes)
    // }
    // console.log('end')

    useEffect(async() => {
      if(result.data) {
        // setQRCodes(result.data.merchant_loyalty_qr_codes)
        let rows = new Array(...result.data.merchant_loyalty_qr_codes)
        const ro = await rows.map( row => {
          row = { ...row }
          qr.toDataURL(row.id)
            .then(res => {
              row.qrcode = res
            })
          return row
        })
        setQRCodes(ro)
      }
    }, [result.data])

    if(!QRCodes) {
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
                  QR codes
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
                  <Typography variant='h4' component='h2' sx= {{ m: 3 }} >QR codes</Typography>
                  <TableContainer sx={{ maxHeight: '75vh' }} >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 10 }} >
                              ID
                            </TableCell>
                            <TableCell style={{ minWidth: 30 }} >
                              Request Point Amount
                            </TableCell>
                            <TableCell style={{ minWidth: 50 }} >
                              note
                            </TableCell>
                            <TableCell style={{ minWidth: 10 }} >
                              Merchant ID
                            </TableCell>
                            <TableCell style={{ minWidth: 10 }} >
                              Active
                            </TableCell>
                            <TableCell style={{ minWidth: 50 }} >
                              Created At
                            </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          QRCodes.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                              <TableCell>
                                <a href={row.qrcode} download={`${index}_${Date.now()}_qrcode.png`}>
                                  <img src={row.qrcode} alt="qrcode" />
                                </a>
                              </TableCell>
                              <TableCell>
                                { row.request_point_amount }
                              </TableCell>
                              <TableCell>
                                { row.note }
                              </TableCell>
                              <TableCell>
                                { row.fk_merchant_id }
                              </TableCell>
                              <TableCell>
                                { row.active ? 'true' : 'false' }
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

export default QRCodes