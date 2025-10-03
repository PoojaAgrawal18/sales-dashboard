import React from 'react';
import ReactApexChart from 'react-apexcharts';

import {
  Box,
  Paper,
  Container,
  Typography,
} from '@mui/material';

const FirstPassAmountChart = () => {


  // Sample data for 3 months with 5 bars each representing different day ranges
  const chartData = [
    {
      name: '0 - 29 Days',
      data: [30000, 35000, 25000,180000,180000], // FEB 25, MAR 25, APR 25
      color: '#3b82f6'
    },
    {
      name: '30 - 59 Days',
      data: [170000, 40000, 30000,180000,180000],
      color: '#1d4ed8'
    },
    {
      name: '60 - 89 Days',
      data: [210000, 110000, 85000,180000 ,180000],
      color: '#1e40af'
    },
    {
      name: '90 + Days',
      data: [260000, 220000, 180000,180000, 180000],
      color: '#1e3a8a'
    },
    {
      name: 'Total',
      data: [250000, 270000, 210000 ,180000, 180000],
      color: '#172554'
    }
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
        columnWidth: '20%',
        borderRadius: 3,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['FEB 25', 'MAR 25', 'APR 25','MAR 25', 'APR 25'],
      labels: {
        style: {
          fontSize: '12px',
          colors: '#6b7280',
          fontWeight: 500,
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
          fontSize: '12px',
          colors: '#6b7280',
        },
      },
      min: 0,
      max: 300000,
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter(value) {
          return `$${value.toLocaleString()}`;
        },
      },
       style: {
    fontSize: '12px',  // fix tooltip font size
    fontFamily: 'Arial, sans-serif',
  },
    },
      legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 400,
      labels: {
        colors: '#6b7280',
      },
      markers: {
        width: 8,
        height: 8,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 2,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      offsetY: 8,
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
    
    colors: chartData.map(item => item.color),
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 2 , width:'100%', ml:-2}}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: '#FFFFFF',
          display: 'flex',
          gap: 3, border:'1px solid #C4C4C4'
        }}
      >
        {/* Chart Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#292929',
              fontSize:'16px',
              mb: 3,ml:2
            }}
          >
Month on Month First Pass Ratio (Amount)          </Typography>

          <Box sx={{ mt: 2 }}>
            <ReactApexChart
              options={chartOptions}
              series={chartData}
              type="bar"
              height={350}
            />
          </Box>
        </Box>

      </Paper>
    </Container>
  );
};

export default FirstPassAmountChart;