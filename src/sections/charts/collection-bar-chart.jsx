import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { Box, Paper, Divider, Container, Typography } from '@mui/material';

const ChartComponent = () => {
  const chartOptions = {
    series: [
      {
        name: 'Collection Amount',
        data: [
          {
            x: 'Amount Collected through accurate billing',
            y: 52000,
          },
          {
            x: 'Amount collected against insurance wrong claim adjudication',
            y: 9000,
          },
          {
            x: 'Amount collected through rebilling claims after resolving issues',
            y: 19000,
          },
          {
            x: 'Amount recovered through appeals for denied claims',
            y: 3000,
          },
        ],
      },
    ],
    chart: {
      height: 374,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        borderRadius: 8,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
    dataLabels: {
      enabled: false, // Changed from true to false
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        'Amount Collected through accurate billing',
        'Amount collected against insurance wrong claim adjudication',
        'Amount collected through rebilling claims after resolving issues',
        'Amount recovered through appeals for denied claims',
      ],
      labels: {
        style: {
          fontSize: '10px',
          colors: '#292929',
          fontWeight:400,
        },
        maxHeight: 80,
        formatter(val) {
          // Wrap text for better readability
          const words = val.split(' ');
          const lines = [];
          let currentLine = '';

          words.forEach((word) => {
            if ((currentLine + word).length > 25) {
              if (currentLine) lines.push(currentLine.trim());
              currentLine = `${word} `;
            } else {
              currentLine += `${word} `;
            }
          });

          if (currentLine) lines.push(currentLine.trim());
          return lines;
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
      title: {
        style: {
          fontSize: '14px',
          color: '#E5E5EF',
          fontWeight: 500,
        },
      },
      labels: {
        formatter(value) {
          if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}k`;
          }
          return `$${value}`;
        },
        style: {
          fontSize: '14px',
          colors: '#292929',
        },
      },
      min: 0,
      max: 80000,
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
      padding: {
        top: 0,
        right: -30,
        bottom: 0,
        left: 10,
      },
    },
   tooltip: {
  enabled: true,
  y: {
    formatter(value) {
      return `$${value.toLocaleString()}`;
    },
  },
  custom({ series, seriesIndex, dataPointIndex, w }) {
    const value = series[seriesIndex][dataPointIndex];
    return `
      <div style="
        background: #374151;
        padding: 6px 12px;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      ">
        <div style="
          font-weight: 600;
          font-size: 13px;
          color: #ffffff;
        ">${(value / 1000).toFixed(0)}k</div>
      </div>
    `;
  }
},
  };

  return (
    <Container maxWidth="xl" sx={{ py: 0 }}>
      <Paper
        elevation={1}
        sx={{
          p: 0,
          borderRadius: 2,
          border: '1px solid #f3f4f6',
          bgcolor: '#FFFFFF',
          height: '374px',
        }}
      >
        <Box mb={3}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#292929',
              mb: -1,
              fontSize: '16px',
              mt: 2,
              ml: 4,
            }}
          >
            Collection Summary
          </Typography>
        </Box>
        <Divider sx={{ml:'20px', mr:'20px', color:'#E5E5EF'}} />

        <Box sx={{ mt: 0}}>
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={320}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChartComponent;