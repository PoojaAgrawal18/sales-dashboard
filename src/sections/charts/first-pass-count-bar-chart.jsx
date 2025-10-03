/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import { Bar, XAxis, YAxis, Legend, Tooltip, BarChart, CartesianGrid, ResponsiveContainer } from 'recharts';

import {
  Box,
  Paper,
  Typography,
} from '@mui/material';

const FirstPassCountChart = () => {

  // Data for the stacked bar chart matching the image design
  const data = [
    {
      month: 'NOV 24',
      'Count of Claim Received': 400,
      'Count of Claim Submitted': 350,
      'Count of Claim Found Clean': 100,
      'Counts of Claim Fixed by Capline': 50,
      'Pending with Capline': 80,
      'Pending with Office': 70,
    },
    {
      month: 'DEC 24',
      'Count of Claim Received': 500,
      'Count of Claim Submitted': 450,
      'Count of Claim Found Clean': 150,
      'Counts of Claim Fixed by Capline': 100,
      'Pending with Capline': 120,
      'Pending with Office': 90,
    },
    {
      month: 'JAN 25',
      'Count of Claim Received': 650,
      'Count of Claim Submitted': 600,
      'Count of Claim Found Clean': 200,
      'Counts of Claim Fixed by Capline': 150,
      'Pending with Capline': 140,
      'Pending with Office': 110,
    },
    {
      month: 'FEB 25',
      'Count of Claim Received': 750,
      'Count of Claim Submitted': 700,
      'Count of Claim Found Clean': 250,
      'Counts of Claim Fixed by Capline': 200,
      'Pending with Capline': 180,
      'Pending with Office': 140,
    },
    {
      month: 'MAR 25',
      'Count of Claim Received': 600,
      'Count of Claim Submitted': 550,
      'Count of Claim Found Clean': 180,
      'Counts of Claim Fixed by Capline': 130,
      'Pending with Capline': 160,
      'Pending with Office': 120,
    },
    {
      month: 'APR 25',
      'Count of Claim Received': 550,
      'Count of Claim Submitted': 500,
      'Count of Claim Found Clean': 160,
      'Counts of Claim Fixed by Capline': 110,
      'Pending with Capline': 140,
      'Pending with Office': 100,
    },
    {
      month: 'MAY 25',
      'Count of Claim Received': 700,
      'Count of Claim Submitted': 650,
      'Count of Claim Found Clean': 220,
      'Counts of Claim Fixed by Capline': 170,
      'Pending with Capline': 170,
      'Pending with Office': 130,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper 
          elevation={3}
          sx={{ 
            p: 1.5, 
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            fontSize: '12px'
          }}
        >
          <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5, fontSize: '12px' }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ color: entry.color, fontSize: '11px' }}
            >
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        dataKey: PropTypes.string,
        value: PropTypes.number,
        color: PropTypes.string,
      })
    ),
    label: PropTypes.string,
  };

  const CustomLegend = ({ payload }) => (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 1,
          pl: 0
        }}
      >
        {payload.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                backgroundColor: entry.color,
                borderRadius: 0.5
              }} 
            />
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );

  CustomLegend.propTypes = {
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minWidth: '1109px', 
        height:"427px",
        mx: 'auto', 
        p: 0,mt:2
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          p: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            mb: 3, 
            color: '#333',
            fontWeight: 600,
            fontSize: '16px'
          }}
        >
          Month on Month First Pass Ratio (Count)
        </Typography>

        <Box sx={{ height: '427px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                
                // bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#666' }}
                tickFormatter={(value) => `$${value}`}
                domain={[0, 1800]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} align="right" verticalAlign="middle" layout="vertical" />
              
              {/* Stacked bars */}
              <Bar dataKey="Count of Claim Received" stackId="a" fill="#1a365d"  barSize={60} bor />
              <Bar dataKey="Count of Claim Submitted" stackId="a" fill="#2c5282"  barSize={60} />
              <Bar dataKey="Count of Claim Found Clean" stackId="a" fill="#3182ce"  barSize={60} />
              <Bar dataKey="Counts of Claim Fixed by Capline" stackId="a" fill="#4299e1"  barSize={60} />
              <Bar dataKey="Pending with Capline" stackId="a" fill="#63b3ed"  barSize={60} />
              <Bar dataKey="Pending with Office" stackId="a" fill="#90cdf4"  barSize={60}/>
              
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default FirstPassCountChart;