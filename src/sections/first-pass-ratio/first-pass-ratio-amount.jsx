/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';

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
  LinearProgress,
} from '@mui/material';

import FirstPassAmountChart from '../charts/first-pass-amount-bar-chart';

// LinearProgressWithLabel component
function LinearProgressWithLabel(props) {
return (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ minWidth: 35, mr: 1 }}>   {/* 👈 added margin-right */}
      <Typography
        variant="body2"
        sx={{ color: '#292929', fontSize: '10px' ,fontWeight:400}}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
  </Box>
);
}

// ✅ Prop validation
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const agingData = [
  {
    month: 'May 25',
    received: '$118,454',
    submitted: '$118,454',
    clean: '$96,991',
    fixed: '$3,392',
    ratio: '79.02%',
    pendingCapline: '$436',
    pendingOffice: '$21,027',
  },
  {
    month: 'Apr 25',
    received: '$104,617',
    submitted: '$104,617',
    clean: '$91,317',
    fixed: '$4,566',
    ratio: '82.92%',
    pendingCapline: '$700',
    pendingOffice: '$12,599',
  },
  {
    month: 'Mar 25',
    received: '$101,746',
    submitted: '$101,746',
    clean: '$87,755',
    fixed: '$4,913',
    ratio: '81.42%',
    pendingCapline: '$1,389',
    pendingOffice: '$12,603',
  },
  {
    month: 'Feb 25',
    received: '$75,800',
    submitted: '$75,800',
    clean: '$66,128',
    fixed: '$4,701',
    ratio: '81.04%',
    pendingCapline: '$1,244',
    pendingOffice: '$8,429',
  },
  {
    month: 'Jan 25',
    received: '$105,714',
    submitted: '$105,714',
    clean: '$91,241',
    fixed: '$3,029',
    ratio: '81.55%',
    pendingCapline: '$3,019',
    pendingOffice: '$11,454',
  },
  {
    month: 'Dec 24',
    received: '$91,466',
    submitted: '$91,466',
    clean: '$80,882',
    fixed: '$3,271',
    ratio: '84.85%',
    pendingCapline: '$1,904',
    pendingOffice: '$8,680',
  },
  {
    month: 'Nov 24',
    received: '$110,963',
    submitted: '$110,963',
    clean: '$92,707',
    fixed: '$4,296',
    ratio: '79.68%',
    pendingCapline: '$2,315',
    pendingOffice: '$15,942',
  },
];

// Common header style - fixed height
const headerCell = {
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '10px',
  textAlign: 'center',
  borderRight: '1px solid #FFFFFF',
  backgroundColor: '#0D477A',
  padding: '8px 4px',
  lineHeight: 1.2,
};

// Subheader style for second row
const subHeaderCell = {
  color: 'white',
  fontWeight: 600,
  fontSize: '10px',
  textAlign: 'center',
  borderRight: '1px solid #FFFFFF',
  backgroundColor: '#0D477A',
  padding: '4px',
  lineHeight: 1.2,
  height: '24px',
};

// Common styles
const cellStyle = {
  fontSize: '10px',
  textAlign: 'right',
  borderRight: '1px solid #C4C4C4',
  color: '#292929',
  padding: '8px 12px',
};

const rowStyle = {
  backgroundColor: '#FFFFFF',
  height: '28px',color: '#292929', fontSize: '10px' ,fontWeight:400

};

export default function FirstRatioAmount() {
  return (
    <Container maxWidth="xxl" sx={{ px: 3,mb:-10 }}>
      <Typography
        sx={{
          mb: 3,
          color: '#292929',
          fontWeight: 700,
          fontSize: '16px',
          ml:3
        }}
      >
        First Pass Ratio (Amount)
      </Typography>

      <TableContainer
        sx={{ border: '1px solid #C4C4C4', borderRadius: '8px' }}
      >
        <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#0D477A', height: '41px' }}>
              <TableCell 
                rowSpan={2}
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                As on Month End
              </TableCell>
              <TableCell 
                rowSpan={2} 
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                Est Amount of Claim Received
              </TableCell>
              <TableCell 
                rowSpan={2} 
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                Est Amount of Claim Submitted
              </TableCell>
              <TableCell 
                rowSpan={2} 
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                Est Amount of <br/> Clean Claim
              </TableCell>
              <TableCell 
                rowSpan={2} 
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                Est Amount of <br/> Claims fixed by <br/> Capline
              </TableCell>
              <TableCell 
                rowSpan={2} 
                sx={{
                  ...headerCell,
                  height: '65px',
                  verticalAlign: 'middle',
                }}
              >
                First Pass Ratio
              </TableCell>
              <TableCell 
                colSpan={2} 
                sx={{
                  ...headerCell,
                  borderBottom: '1px solid #FFFFFF',
                }}
              >
                Pending for Billing
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#0D477A', height: '24px' }}>
              <TableCell sx={subHeaderCell}>
                Pending with Capline
              </TableCell>
              <TableCell sx={{...subHeaderCell, borderRight: 'none'}}>
                Pending with Office
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Current Month Row */}
            <TableRow sx={rowStyle}>
              {renderRow(agingData[0])}
            </TableRow>

            {/* Historical Header */}
            <TableRow sx={{ backgroundColor: '#0D477A' }}>
              <TableCell
                colSpan={8}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'left',
                  fontSize: '12px',
                  padding: '8px 12px',
                  height: '28px',
                }}
              >
                Historical
              </TableCell>
            </TableRow>

            {/* Historical Rows */}
            {agingData.slice(1).map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                  height: '28px',color: '#292929', fontSize: '10px' ,fontWeight:400
                }}
              >
                {renderRow(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{mr :-5, ml:-1,mb:-10}}>
      <FirstPassAmountChart /> </Box>
    </Container>
  );
}

// Row renderer
function renderRow(row) {
  // Parse the ratio percentage value
  const ratioValue = parseFloat(row.ratio.replace('%', ''));
  
  return (
    <>
      <TableCell sx={{...cellStyle, textAlign: 'center'}}>{row.month}</TableCell>
      <TableCell sx={cellStyle}>{row.received}</TableCell>
      <TableCell sx={cellStyle}>{row.submitted}</TableCell>
      <TableCell sx={cellStyle}>{row.clean}</TableCell>
      <TableCell sx={cellStyle}>{row.fixed}</TableCell>
      <TableCell sx={cellStyle}>
        <LinearProgressWithLabel value={ratioValue} />
      </TableCell>
      <TableCell sx={cellStyle}>{row.pendingCapline}</TableCell>
      <TableCell sx={{...cellStyle, borderRight: 'none'}}>{row.pendingOffice}</TableCell>
    </>
  );
}