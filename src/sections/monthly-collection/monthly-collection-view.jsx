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

import MonthlyCollectionChart from '../charts/monthly-collection-bar-chart';

export default function MonthlyCollectionView() {
  // Hardcoded dummy data - will not change
  const tableData = [
    {
      month: 'Apr, 2025',
      production: '$15,857.00',
      collections: '$61,457.00',
      adjustments: '$89,009.00',
      inProcessAR: '$243,765',
      isHistorical: false
    },
    {
      month: 'Mar, 2025',
      production: '$0.00',
      collections: '$13,20.00',
      adjustments: '$15,433.00',
      inProcessAR: '$278,211',
      isHistorical: true
    },
    {
      month: 'Feb, 2025',
      production: '$65,945.00',
      collections: '$5,780.00',
      adjustments: '$67,334.00',
      inProcessAR: '$294,217',
      isHistorical: true
    }
  ];

  return (
    <Container maxWidth="xxl">
      <Typography sx={{ mb: 3, color: '#292929', fontWeight: 700, fontSize: '16px', mt: 2, ml: 3 }}>
        Monthly Collection/Production/AR/Adjustment/BTP
      </Typography>

      <TableContainer sx={{ mx: 0, px: 0, border: '1px solid #C4C4C4', borderRadius: '8px' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead sx={{ height: '63px' }}>
            <TableRow sx={{ backgroundColor: '#1565c0' }}>
              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 120,
                  backgroundColor: '#0D477A',
                  py: 1,
                  pl: 3,
                  verticalAlign: 'middle',
                  borderBottom: 'none',
                }}
              >
                Month
              </TableCell>

              <TableCell
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '10px',
                  minWidth: 140,
                  backgroundColor: '#0D477A',
                  py: 0,
                  borderLeft: '1px solid #FFFFFF',
                  borderRight: '1px solid #FFFFFF',
                  textAlign: 'center',
                  lineHeight: '12px',
                }}
              >
                <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '10px' }}>
                  Production
                </Typography>
                (Total Billing Amount)
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
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
                Collections
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
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
                Adjustments
              </TableCell>
              <TableCell
                sx={{
                  color: 'white',
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
                In Process AR
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Current Month Row - Apr 2025 */}
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
                  pl: 3,
                }}
              >
                {tableData[0].month}
              </TableCell>
              <TableCell
                sx={{
                  py: 1,
                  px: 2,
                  borderRight: '1px solid #C4C4C4',
                  textAlign: 'center',
                  color: '#292929',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {tableData[0].production}
              </TableCell>
              <TableCell
                sx={{
                  py: 1,
                  px: 2,
                  borderRight: '1px solid #C4C4C4',
                  textAlign: 'center',
                  color: '#292929',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {tableData[0].collections}
              </TableCell>
              <TableCell
                sx={{
                  py: 1,
                  px: 2,
                  borderRight: '1px solid #C4C4C4',
                  textAlign: 'center',
                  color: '#292929',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {tableData[0].adjustments}
              </TableCell>
              <TableCell
                sx={{
                  py: 1,
                  px: 2,
                  borderRight: '1px solid #C4C4C4',
                  textAlign: 'center',
                  color: '#292929',
                  fontWeight: 400,
                  fontSize: '10px',
                }}
              >
                {tableData[0].inProcessAR}
              </TableCell>
            </TableRow>

            {/* Historical Header Row */}
            <TableRow sx={{ backgroundColor: '#0D477A', height: 41 }}>
              <TableCell
                colSpan={5}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'left',
                  py: 1,
                  fontSize: '12px',
                  pl: 3,
                }}
              >
                Historical
              </TableCell>
            </TableRow>

            {/* Historical data rows */}
            {tableData.slice(1).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  height: 41,
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
                    pl: 3,
                  }}
                >
                  {row.month}
                </TableCell>
                <TableCell
                  sx={{
                    py: 1,
                    px: 2,
                    borderRight: '1px solid #C4C4C4',
                    textAlign: 'center',
                    color: '#292929',
                    fontWeight: 400,
                    fontSize: '10px',
                  }}
                >
                  {row.production}
                </TableCell>
                <TableCell
                  sx={{
                    py: 1,
                    px: 2,
                    borderRight: '1px solid #C4C4C4',
                    textAlign: 'center',
                    color: '#292929',
                    fontWeight: 400,
                    fontSize: '10px',
                  }}
                >
                  {row.collections}
                </TableCell>
                <TableCell
                  sx={{
                    py: 1,
                    px: 2,
                    borderRight: '1px solid #C4C4C4',
                    textAlign: 'center',
                    color: '#292929',
                    fontWeight: 400,
                    fontSize: '10px',
                  }}
                >
                  {row.adjustments}
                </TableCell>
                <TableCell
                  sx={{
                    py: 1,
                    px: 2,
                    borderRight: '1px solid #C4C4C4',
                    textAlign: 'center',
                    color: '#292929',
                    fontWeight: 400,
                    fontSize: '10px',
                  }}
                >
                  {row.inProcessAR}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mr: -5, ml: -1, mb: -10 }}>
        <MonthlyCollectionChart />
      </Box>
    </Container>
  );
}