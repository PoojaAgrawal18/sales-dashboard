import React from 'react';
import ReactApexChart from 'react-apexcharts';

import {
  Box,
  Paper,
  Radio,
  Container,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

const MonthArChart = () => {
  const [selectedRange, setSelectedRange] = React.useState('total');

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  // Sample data for 3 months with 5 bars each representing different day ranges
  const chartData = [
    {
      name: '0 - 29 Days',
      data: [30000, 35000, 25000], // FEB 25, MAR 25, APR 25
      color: '#1F86E0',
    },
    {
      name: '30 - 59 Days',
      data: [170000, 40000, 30000],
      color: '#155994',
    },
    {
      name: '60 - 89 Days',
      data: [210000, 110000, 85000],
      color: '#104472',
    },
    {
      name: '90 + Days',
      data: [260000, 220000, 180000],
      color: '#1F86E0',
    },
    {
      name: 'Total',
      data: [250000, 270000, 210000],
      color: '#104472',
    },
  ];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%', // keeps bar width constant
        barSpacing: 8, // ✅ pixels gap between bars in same month
        borderRadius: 4,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['FEB 25', 'MAR 25', 'APR 25'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 400,
          colors: '#292929',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter(value) {
          if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}k`;
          }
          return `$${value}`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 400,
          colors: '#292929',
        },
      },
      min: 0,
      max: 300000,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(value) {
          return `$${value.toLocaleString()}`;
        },
      },
      style: {
        fontSize: '12px', // fix tooltip font size
        fontFamily: 'Arial, sans-serif',
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: '#E5E5EF',
      strokeDashArray: 4,
      strokeWidth: 1.5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: '#E5E5EF',
          strokeDashArray: 0, // solid
          borderWidth: 1.5,
        },
      ],
    },

    colors: chartData.map((item) => item.color),
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 2, width: '100%', ml: -2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: '#FFFFFF',
          display: 'flex',
          gap: 3,
          border: '1px solid #C4C4C4',
          height: 446, // ✅ fixed overall height
        }}
      >
        {/* Chart Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#292929',
              fontSize: '16px',
              mb: 3,
            }}
          >
            Month on Month AR Pendency
          </Typography>

          <Box sx={{ mt: 2 }}>
            <ReactApexChart options={chartOptions} series={chartData} type="bar" height={350} />
          </Box>
        </Box>

        {/* Sidebar with Radio Options */}
        <Box
          sx={{
            minWidth: 200,
            pl: 5,
            mt: -3,
            borderLeft: '1px solid #C4C4C4',
            height: '445px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl component="fieldset" sx={{ mt: 14 }}>
            <RadioGroup
              value={selectedRange}
              onChange={handleRangeChange}
              sx={{
                '& .MuiFormControlLabel-root': {
                  mb: 3,
                  alignItems: 'flex-start',
                },
                '& .MuiRadio-root': {
                  padding: '4px 9px',
                  '&.Mui-checked': {
                    color: '#3b82f6',
                  },
                },
                '& .MuiFormControlLabel-label': {
                  fontSize: '12px',
                  color: '#292929',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  mt: 0.5,
                },
              }}
            >
              <FormControlLabel value="0-29" control={<Radio size="small" />} label="0 - 29 Days" />
              <FormControlLabel
                value="30-59"
                control={<Radio size="small" />}
                label="30 - 59 Days"
              />
              <FormControlLabel
                value="60-89"
                control={<Radio size="small" />}
                label="60 - 89 Days"
              />
              <FormControlLabel value="90+" control={<Radio size="small" />} label="90 + Days" />
              <FormControlLabel value="total" control={<Radio size="small" />} label="Total" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
};

export default MonthArChart;
