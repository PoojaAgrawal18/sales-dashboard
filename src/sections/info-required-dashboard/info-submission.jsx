import * as React from 'react';

import {
  Box,
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import SubmissionComponent from '../charts/info-submission-bar-chart';

// ----------------------------------------------------------------------

export default function InfoSubmission() {
  const errorData = [
    {
      reason: 'Pending Since',
      action: 'Pending Since',
      count: 14,
    },
    {
      reason: 'Count of Claim',
      action: 'Count of Claim',
      count: 14,
    },
    {
      reason: 'Billed Amount',
      action: 'Billed Amount',
      count: 14,
    },
  ];

  // Header style
  const headerCell = {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: '10px',
    textAlign: 'left',
    backgroundColor: '#0D477A',
    padding: '0px 25px',
    borderRight: '1px solid #FFFFFF',
    height: '55px',
  };

  // Body cell style
  const cellStyle = {
    fontSize: '10px',
    borderRight: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    color: '#292929',
    height: '30px',
    padding: '0px 25px',
    fontWeight: 400,
    textAlign: 'center',
  };

  // Total row style

  return (
    <Container maxWidth="xxl" sx={{ px: 3, py: 0, mt: -1, mb: -10 }}>
      <Box sx={{ bgcolor: '#FFFFFF',
          px: '10px',
          borderRadius: '8px',
          mb: 0,
          paddingTop: 1.5,
          paddingBottom: 1.5, width:'859px'}}>
        <TableContainer
          sx={{
            border: '1px solid #C4C4C4',
            borderRadius: '8px',
            overflow: 'hidden',
            width: '830px',
            justifyContent: 'left',ml:0.4
          }}
        >
          <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    ...headerCell,
                    width: '30%',
                    textAlign: 'center',
                  }}
                >
                  Pending Since
                </TableCell>
                <TableCell
                  sx={{
                    ...headerCell,
                    width: '50%',
                    textAlign: 'center',
                  }}
                >
                  Count of Claim
                </TableCell>
                <TableCell
                  sx={{
                    ...headerCell,
                    width: '20%',
                    borderRight: 'none',
                    textAlign: 'center',
                  }}
                >
                  Billed Amount
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Data Rows */}
              {errorData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#F5F5F5' : '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#FAFAFA',
                    },
                  }}
                >
                  <TableCell sx={cellStyle}>{row.reason}</TableCell>
                  <TableCell sx={cellStyle}>{row.action}</TableCell>
                  <TableCell
                    sx={{
                      ...cellStyle,
                      borderRight: 'none',
                      textAlign: 'center',
                    }}
                  >
                    {row.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mr: -5,ml:-1,mb:-10 }}>
        <SubmissionComponent />
      </Box>
    </Container>
  );
}
