import React from 'react';
import PropTypes from 'prop-types';
import {
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

import { Box, Paper, Typography } from '@mui/material';

const data = [
  { month: 'Feb 24', value: 40000, displayValue: '$40k' },
  { month: 'Mar 24', value: 5000, displayValue: '$5k' },
  { month: 'Apr 24', value: 8000, displayValue: '$8k' },
  { month: 'May 24', value: 18000, displayValue: '$18k' },
  { month: 'Jun 24', value: 10000, displayValue: '$10k' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {`${Math.round(payload[0].value / 100)}`}
      </div>
    );
  }
  return null;
};

// PropTypes for CustomTooltip
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      dataKey: PropTypes.string,
      color: PropTypes.string,
      fill: PropTypes.string,
      stroke: PropTypes.string,
      strokeWidth: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

// Custom dot component for the highlighted point
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  // Highlight the point that shows "1150" in tooltip (March data point)
  if (payload.month === 'Mar 24') {
    return <circle cx={cx} cy={cy} r={4} fill="#2563eb" stroke="white" strokeWidth={2} />;
  }
  return null;
};

// PropTypes for CustomDot
CustomDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  payload: PropTypes.shape({
    month: PropTypes.string,
    value: PropTypes.number,
    displayValue: PropTypes.string,
  }),
};

export default function AccountsReceivableTrend({
  data: propData,
  title,
  subtitle,
  highlightMonth,
  showBottomBar,
}) {
  // Use prop data if provided, otherwise use default data
  const chartData = propData || data;
  const chartTitle = title || 'Accounts Receivable Trend';
  const chartSubtitle = subtitle || 'Over Time';

  return (
    <Paper
      sx={{
        borderRadius: '16px',
        pl: 1,
        pt: 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #C4C4C4',
        width: '100%',
        maxWidth: '2000px',
        margin: '0 auto',
        height: '287px',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#292929',
            mb: 0.5,
            ml: 1.7,
          }}
        >
          {chartTitle}
        </Typography>
        <Typography
          sx={{
            ml: 2,
            fontSize: '13px',
            fontWeight: 400,
            color: '#292929',
          }}
        >
          {chartSubtitle}
        </Typography>
      </Box>

      {/* Chart Container */}
      <Box sx={{ height: '260px', width: '100%', mt: -5, ml: -2.5 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#292929' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#615E83',fontWeight:400 }}
              tickFormatter={(value) => {
                if (value >= 1000) return `$${value / 1000}k`;
                return `$${value}`;
              }}
              domain={[0, 45000]}
              ticks={[0, 10000, 20000, 30000, 40000]}
            />

            {/* Area fill */}
            <Area type="linear" dataKey="value" stroke="none" fill="url(#colorGradient)" />

            {/* Line */}
            <Line
              type="linear"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />

            {/* Custom tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '5,5' }}
              position={{ x: undefined, y: undefined }}
              allowEscapeViewBox={{ x: false, y: true }}
            />

          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

// PropTypes validation
AccountsReceivableTrend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      displayValue: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  highlightMonth: PropTypes.string,
  showBottomBar: PropTypes.bool,
};
