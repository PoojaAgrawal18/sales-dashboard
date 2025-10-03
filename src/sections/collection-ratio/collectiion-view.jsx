/* eslint-disable no-nested-ternary */
import {
  Box,
  Paper,
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import AllowedAmountBreakdown from '../charts/breakdown-chart';
import CollectionSummaryChart from '../charts/collection-bar-chart';

// ----------------------------------------------------------------------

export default function CollectionView() {
  const collectionData = [
    {
      category: 'Total Allowed Amount',
      description: 'Insurance allowed amount of posted claim',
      amount: '$103,330',
      isHeader: false,
    },
    {
      category: 'Total Collection',
      description: 'Amount collected against the total production',
      amount: '$95,664',
      isHeader: false,
    },
    {
      category: 'Non-Covered Services and ETF',
      description: 'Claim amount adjusted or denied by insurance companies',
      amount: '$37,566',
      isHeader: false,
    },
    {
      category: 'Breakdown Of Collection Summary',
      description: '',
      amount: '',
      isHeader: true,
    },
    {
      category: 'First Pass Collection',
      description: 'Amount collected through accurate billing',
      amount: '$46,368',
      isHeader: false,
    },
    {
      category: 'Collection Through Reprocessing',
      description: 'Amount collected against insurance wrong claim adjudication',
      amount: '$953',
      isHeader: false,
    },
    {
      category: 'Collection Through Rebilling',
      description: 'Amount collected through rebilling claims after resolving issues',
      amount: '$15,704',
      isHeader: false,
    },
    {
      category: 'Collection Through Appeal',
      description: 'Amount recovered through appeals for denied claims',
      amount: '$3,039',
      isHeader: false,
    },
  ];

  return (
    <Container maxWidth="xxl">
      <Typography sx={{ mb: 3, color: '#292929', fontWeight: 700, fontSize: '16px', mt: 2, ml: 3 }}>
        Collection Ratio
      </Typography>

      <Box
        sx={{
          bgcolor: '#FFFFFF',
          px: '10px',
          borderRadius: '8px',
          mb: 0,
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            overflow: 'hidden',
            mx: 0, // Remove horizontal margin
            px: 0, // Remove horizontal padding
          }}
        >
          <TableContainer sx={{ mx: 0, px: 0 }}>
            <Table sx={{ border: '1px solid #e0e0e0', width: '100%' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1565c0', height: 47 }}>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      minWidth: 200,
                      backgroundColor: '#0D477A',
                      py: 0,
                      borderLeft: '1px solid #ffffff20',
                      borderRight: '1px solid #ffffff20',
                      fontSize: '12px',
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      minWidth: 200,
                      backgroundColor: '#0D477A',
                      py: 0,
                      borderLeft: '1px solid #ffffff20',
                      borderRight: '1px solid #ffffff20',
                      fontSize: '12px',
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      minWidth: 200,
                      textAlign: 'left',
                      backgroundColor: '#0D477A',
                      py: 0,
                      borderLeft: '1px solid #ffffff20',
                      borderRight: '1px solid #ffffff20',
                      fontSize: '12px',
                    }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collectionData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      height: 28,
                      backgroundColor: row.isHeader
                        ? '#0D477A'
                        : index % 2 === 0
                        ? 'white'
                        : '#F5F5F5',
                      '&:hover': {
                        backgroundColor: row.isHeader ? '#0D477A' : '#f0f0f0',
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: row.isHeader ? 'white' : '#292929',
                        fontWeight: row.isHeader ? '600' : '400',
                        fontSize: row.isHeader ? '12px' : '12px',
                        py: 0,
                        borderLeft: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                        borderRight: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                      }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: row.isHeader ? '12px' : '12px',
                        color: row.isHeader ? 'white' : '#292929',
                        fontWeight: row.isHeader ? '600' : '400',
                        py: 0,
                        borderLeft: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                        borderRight: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                      }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: row.isHeader ? '12px' : '12px',
                        color: row.isHeader ? 'white' : '#292929',
                        fontWeight: row.isHeader ? '600' : '400',
                        textAlign: 'left',
                        alignItems: 'left',
                        py: 0,
                        borderLeft: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                        borderRight: row.isHeader ? '1px solid #ffffff20' : '1px solid #e0e0e0',
                      }}
                    >
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', mt: { xs: 6, sm: 9, md: 2 }, mb: -8 }}>
        <Box sx={{ width: '100%', maxWidth: '401px' }}>
          <AllowedAmountBreakdown />
        </Box>
        <Box sx={{ width: '100%', mr: -3, ml: 0 }}>
          <CollectionSummaryChart />
        </Box>
      </Box>
    </Container>
  );
}
