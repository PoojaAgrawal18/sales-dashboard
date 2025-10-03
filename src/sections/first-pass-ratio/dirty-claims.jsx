import * as React from 'react';

import {
  Box,
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import ApplicationStatistics from '../charts/dirty-claim-pie-chart';

const errorData = [
  {
    reason: 'Incorrect code',
    action: 'Service walked incorrect, Submitted after correction',
    count: 14,
  },
  {
    reason: 'Incorrect Fee',
    action: 'Service Code fee was incorrect, corrected the same & submitted',
    count: 14,
  },
  {
    reason: 'Missing Patient/Insurance Inormation',
    action: 'Service Code fee was incorrect, corrected the same & submitted',
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
  textAlign: 'left',
  borderRight: '1px solid #E0E0E0',
  borderBottom: '1px solid #E0E0E0',
  color: '#292929',
  height: '30px',
  padding: '0px 25px',
  fontWeight: 400,
};

// Total row style
const totalCellStyle = {
  fontSize: '10px',
  fontWeight: 600,
  textAlign: 'left',
  borderRight: '1px solid #E0E0E0',
  color: '#292929',
  padding: '0px 25px',
  backgroundColor: '#FFFFFF',
  height: '30px',
};

export default function DirtyClaimsView() {
  const totalCount = errorData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Container maxWidth="xxl" sx={{ px: 3, py: 0, mt: -1, mb: -10 }}>
      <Typography
        sx={{
          mb: 2,
          color: '#292929',
          fontWeight: 700,
          fontSize: '16px',
          ml: 3,
        }}
      >
        Details of dirty claim fixed by Capline{' '}
      </Typography>
      <TableContainer
        sx={{
          border: '1px solid #C4C4C4',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...headerCell,
                  width: '30%',
                }}
              >
                Dirty Claim Error Reasson
              </TableCell>
              <TableCell
                sx={{
                  ...headerCell,
                  width: '50%',
                }}
              >
                Action Taken
              </TableCell>
              <TableCell
                sx={{
                  ...headerCell,
                  width: '20%',
                  borderRight: 'none',
                  textAlign: 'center',
                }}
              >
                Count of Dirty Claim Errors
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
                    textAlign: 'right',
                  }}
                >
                  {row.count}
                </TableCell>
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow>
              <TableCell sx={totalCellStyle}>Total</TableCell>
              <TableCell sx={totalCellStyle} />
              <TableCell
                sx={{
                  ...totalCellStyle,
                  borderRight: 'none',
                  textAlign: 'right',
                }}
              >
                {totalCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <ApplicationStatistics />
      </Box>
    </Container>
  );
}
