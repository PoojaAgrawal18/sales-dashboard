import React from 'react';

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

import MonthArChart from '../charts/month-ar-bar-chart';

// ----------------------------------------------------------------------

export default function ArView() {
  const agingData = [
    {
      month: 'Apr, 2025',
      isHeader: false,
      data: {
        '0-29': { amount: '$46,564', count: '173' },
        '30-59': { amount: '$32,825', count: '141' },
        '60-89': { amount: '$33,239', count: '68' },
        '90+': { amount: '$131,137', count: '308' },
        total: { amount: '$234,765', count: '690' },
      },
    },
    {
      month: 'Mar, 2025',
      data: {
        '0-29': { amount: '$46,102', count: '185' },
        '30-59': { amount: '$59,678', count: '137' },
        '60-89': { amount: '$27,842', count: '78' },
        '90+': { amount: '$144,588', count: '277' },
        total: { amount: '$278,211', count: '677' },
      },
    },
    {
      month: 'Feb, 2025',
      data: {
        '0-29': { amount: '$68,137', count: '177' },
        '30-59': { amount: '$52,371', count: '144' },
        '60-89': { amount: '$24,241', count: '56' },
        '90+': { amount: '$149,468', count: '280' },
        total: { amount: '$294,217', count: '657' },
      },
    },
    {
      month: 'Jan, 2025',
      data: {
        '0-29': { amount: '$52,891', count: '162' },
        '30-59': { amount: '$48,923', count: '128' },
        '60-89': { amount: '$31,456', count: '72' },
        '90+': { amount: '$138,742', count: '295' },
        total: { amount: '$272,012', count: '657' },
      },
    },
  ];

  return (
    <Container maxWidth="xxl">
      <Typography sx={{ mb: 3, color: '#292929', fontWeight: 700, fontSize: '16px', mt: 2, ml: 3 }}>
        Month on Month AR pendency
      </Typography>

      <TableContainer sx={{ mx: 0, px: 0, border: '1px solid #C4C4C4', borderRadius: '8px' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ height: '63px' }}>
            <TableRow sx={{ backgroundColor: '#1565c0' }}>
              <TableCell
                rowSpan={2}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 120,
                  backgroundColor: '#0D477A',
                  py: 1,
                  verticalAlign: 'middle',
                  borderBottom: 'none',
                }}
              >
                Month
              </TableCell>

              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  borderLeft: '1px solid #FFFFFF',
                  borderRight: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                0-29 Days
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  borderLeft: '1px solid #FFFFFF',
                  borderRight: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                30 - 59 Days
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  borderLeft: '1px solid #FFFFFF',
                  borderRight: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                60 - 89 Days
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  borderLeft: '1px solid #FFFFFF',
                  borderRight: '1px solid #FFFFFF',
                  textAlign: 'center',
                }}
              >
                90+ Days
              </TableCell>
              <TableCell
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  textAlign: 'center',
                }}
              >
                Total
              </TableCell>
            </TableRow>

            {/* second header row - no empty first cell now because Month spans both rows */}
            <TableRow sx={{ backgroundColor: '#0D477A', height: 32 }}>
              {[...Array(5)].map((_, index) => (
                <TableCell
                  key={index}
                  sx={{
                    backgroundColor: '#0D477A',
                    py: 0,
                    px: 0,
                    borderLeft: '1px solid #FFFFFF',
                    borderBottom: 'none',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '10px',
                        flex: 1,
                        py: 0.5,
                        px: 1,
                        textAlign: 'center',
                      }}
                    >
                      Amount
                    </Box>
                    <Box
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '10px',
                        flex: 1,
                        py: 0.5,
                        px: 1,
                        textAlign: 'center',
                      }}
                    >
                      Count
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* First row - Apr 2025 */}
            <TableRow
              sx={{
                backgroundColor: '#FFFFFF',
                height: '41px',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              <TableCell
                sx={{
                  py: 0,
                  borderRight: '1px solid #C4C4C4',
                  color: '#292929',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {agingData[0].month}
              </TableCell>
              {['0-29', '30-59', '60-89', '90+', 'total'].map((period, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    py: 0,
                    px: 0,
                    borderRight: '1px solid #C4C4C4',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        flex: 1,
                        py: 1,
                        px: 1,
                        textAlign: 'right',
                        color: '#292929',
                        fontWeight: 400,
                        fontSize: '10px',
                        mr: 2,
                      }}
                    >
                      {agingData[0].data[period].amount}
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        py: 1,
                        px: 1,
                        textAlign: 'right',
                        color: '#292929',
                        fontWeight: 400,
                        fontSize: '10px',
                        mr: 3.5,
                      }}
                    >
                      {agingData[0].data[period].count}
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>

            {/* Historical Header Row */}
            <TableRow sx={{ backgroundColor: '#0D477A', height: 41 }}>
              <TableCell
                colSpan={6}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  textAlign: 'left',
                  py: 1,
                  fontSize: '12px',
                }}
              >
                Historical
              </TableCell>
            </TableRow>

            {/* Historical data rows */}
            {agingData.slice(1).map((row, index) => (
              <TableRow
                key={index + 1}
                sx={{
                  height: 28,
                  backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                  '&:hover': {
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                  },
                }}
              >
                <TableCell
                  sx={{
                    py: 0,
                    borderRight: '1px solid #C4C4C4',
                    color: '#292929',
                    fontWeight: 400,
                    fontSize: '10px',
                  }}
                >
                  {row.month}
                </TableCell>
                {['0-29', '30-59', '60-89', '90+', 'total'].map((period, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{
                      py: 0,
                      px: 0,
                      borderRight: '1px solid #C4C4C4',
                      height: '41px',
                    }}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        sx={{
                          flex: 1,
                          py: 1,
                          textAlign: 'right',
                          color: '#292929',
                          fontWeight: 400,
                          fontSize: '10px',
                          mr: 2,
                        }}
                      >
                        {row.data[period].amount}
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          py: 1,
                          px: 1,
                          textAlign: 'right',
                          color: '#292929',
                          fontWeight: 400,
                          fontSize: '10px',
                          mr: 3.5,
                        }}
                      >
                        {row.data[period].count}
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mr: -5, ml: -1, mb: -10 }}>
        <MonthArChart />
      </Box>
    </Container>
  );
}
