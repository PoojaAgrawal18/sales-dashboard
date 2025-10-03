import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { Box, Paper, Container, Typography } from '@mui/material';

const MonthlyCollectionChart = () => {
  // Data for Apr 25, Mar 25, Feb 25 for each category
  const chartData = [
    {
      name: 'Apr 25',
      data: [78000, 85000, 78000, 21000], // Production, Collection, Adjustment, In Process AR
      color: '#104472',
    },
    {
      name: 'Mar 25',
      data: [88000, 68000, 50000, 42000],
      color: '#1F86E0',
    },
    {
      name: 'Feb 25',
      data: [38000, 30000, 69000, 18000],
      color: '#1E81D8',
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
        columnWidth: '60%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${(val / 1000).toFixed(0)}`;
      },
      offsetY: -8,
      style: {
        fontSize: '10px',
        colors: ['#000000B2'],
        fontWeight: 400,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Production', 'Collection', 'Adjustment', 'In Process AR'],
      labels: {
        style: {
          fontSize: '12px',
          colors: '#000000B2',
          fontWeight: 400,
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
          colors: '#000000B2',
          fontWeight:'400',
        },
      },
      min: 0,
      max: 100000,
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
        fontSize: '12px',
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
        colors: '#292929B2',
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
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
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
    colors: chartData.map((item) => item.color),
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 2, width: '100%', ml: -2 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '8px',
          bgcolor: '#FFFFFF',
          display: 'flex',
          gap: 3,
          border: '1px solid #C4C4C4',
          height: '449px',
        }}
      >
        {/* Chart Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#292929',
              fontSize: '16px',
              mb: 0,p: 3,
            }}
          >
            Monthly Collection/Production/AR/Adjustment/BTP.
          </Typography>

          <Box sx={{ m: 0, mr:-3 }}>
            <ReactApexChart options={chartOptions} series={chartData} type="bar" height={350} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MonthlyCollectionChart;
