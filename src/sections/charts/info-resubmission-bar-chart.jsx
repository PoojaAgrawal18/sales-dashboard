import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { Box, Paper, Button, Container, Typography } from '@mui/material';

const ResubmissionComponent = () => {
  // Sample data for 3 months with 5 bars each representing different day ranges
  const chartData = [
    {
      name: '0 - 29 Days',
      data: [30000, 35000, 25000, 170000, 40000, 30000, 30000, 35000], // FEB 25, MAR 25, APR 25
      color: '#0D477A',
    },
    {
      name: '30 - 59 Days',
      data: [170000, 40000, 30000, 170000, 40000, 30000, 170000, 40000],
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
        columnWidth: '20%',
        borderRadius: 0,
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
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['FEB 25', 'MAR 25', 'APR 25', 'FEB 25', 'MAR 25', 'APR 25', 'MAR 25', 'APR 25'],
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
      show: false,
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

    colors: chartData.map((item) => item.color),
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 2, width: '100%', ml: -2 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: '#FFFFFF',
          display: 'flex',
          gap: 3,
          border: '1px solid #C4C4C4',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#292929',
              fontSize: '16px',
              mb: 3,
            }}
          >
            Information Required from you
            <br />
            for Resubmission
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -9, mr: 1 }}>
                    <Button
                      sx={{
                        bgcolor: '#0D477A',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 500,
                        width: '145px',
                      }}
                    >
              Submit the Required <br />
              Info. Here
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <ReactApexChart options={chartOptions} series={chartData} type="bar" height={350} />
          </Box>

          {/* Button moved here 👇 */}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResubmissionComponent;
