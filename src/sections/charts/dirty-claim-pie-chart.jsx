/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Paper, Typography } from '@mui/material';

// Dummy data for testing
const DUMMY_DATA = [
  ['Incorrect code', '450', '$125.50'],
  ['Incorrect Fee', '275', '$189.75'],
  ['Missing Patient / Insurance Information', '180', '$95.25'],
];

const ApplicationStatistics = ({
  showBarChart = true,
  showDonutChart = true,
  chartTitle = 'Dirty Claim Error',
  donutSize = 240,
  customColors = ['#0D477A', '#1F86E0', '#8CC6F9'], 
    useDummyData = false, // New prop to control dummy data usage
}) => {
  // Get dashboard data from Redux store or use dummy data
  const { dashboardData: reduxData } = useSelector((state) => state.sheetReducer || {});
  const data = useDummyData ? DUMMY_DATA : reduxData;

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });
  const [hoveredData, setHoveredData] = useState(null); // New state for center data display

  const safeData = Array.isArray(data) ? data : [];

  const fixedCategories = [
    'Incorrect code',
    'Incorrect Fee',
    'Missing Patient / Insurance Information',
  ];
  const colors = customColors;

  // Initialize display data with zeros
  const displayIvsData = [0, 0, 0, 0, 0];
  const displayRateData = [0, 0, 0, 0, 0];
  let totalIVs = 0;

  // Process data
  try {
    if (safeData && safeData.length > 0) {
      safeData.forEach((row) => {
        if (!Array.isArray(row) || row.length < 3) return;

        const category = String(row[0] || '');
        if (!category) return;

        if (category.toLowerCase() === 'total') {
          totalIVs = parseInt(row[1], 10) || 0;
          return;
        }

        const ivValue = parseInt(row[1], 10) || 0;
        let rateValue = 0;
        if (typeof row[2] === 'string' && row[2].startsWith('$')) {
          rateValue = parseFloat(row[2].substring(1)) || 0;
        } else {
          rateValue = parseFloat(row[2]) || 0;
        }

        const index = fixedCategories.findIndex((c) => c.toLowerCase() === category.toLowerCase());

        if (index !== -1) {
          displayIvsData[index] = ivValue;
          displayRateData[index] = rateValue;
        }
      });
    }
  } catch (error) {
    console.error('Error processing chart data:', error);
  }

  // Calculate totals
  let calculatedTotalIVs = totalIVs || displayIvsData.reduce((sum, val) => sum + val, 0);
  if (calculatedTotalIVs <= 0) {
    calculatedTotalIVs = 100;
  }

  // Create chart data
  const chartData = fixedCategories
    .map((category, index) => ({
      label: category,
      value: displayIvsData[index],
      color: colors[index],
      percentage: calculatedTotalIVs > 0 ? (displayIvsData[index] / calculatedTotalIVs) * 100 : 0,
    }))
    .filter((item) => item.value > 0);

  const CustomTooltip = ({ visible, x, y, data }) => {
    if (!visible || !data) return null;

    return (
      <Paper
        elevation={2}
        sx={{
          position: 'fixed',
          left: x + 10,
          top: y - 10,
          p: 1,
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          zIndex: 1000,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease-in-out, transform 0.1s ease-out',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        <Typography variant="body2" sx={{ my: 0.3 }}>
          Dirty Claim Error:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {data.label}
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ my: 0.3 }}>
          Percentage:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {data.percentage.toFixed(1)}%
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ my: 0.3 }}>
          Value:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {data.value.toLocaleString()}
          </Box>
        </Typography>
      </Paper>
    );
  };
  CustomTooltip.propTypes = {
    visible: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    data: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    }),
  };

  // Enhanced Donut Chart Component with center data display
  const DonutChart = ({ data, size = 120 }) => {
    const center = size / 2;
    const outerRadius = (size - 0) / 2;
    const innerRadius = 95;

    let cumulativePercentage = 0;

    const createPath = (startAngle, endAngle, outerR, innerR) => {
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;

      const x1 = center + outerR * Math.cos(startAngleRad);
      const y1 = center + outerR * Math.sin(startAngleRad);
      const x2 = center + outerR * Math.cos(endAngleRad);
      const y2 = center + outerR * Math.sin(endAngleRad);

      const x3 = center + innerR * Math.cos(endAngleRad);
      const y3 = center + innerR * Math.sin(endAngleRad);
      const x4 = center + innerR * Math.cos(startAngleRad);
      const y4 = center + innerR * Math.sin(startAngleRad);

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      return [
        'M',
        x1,
        y1,
        'A',
        outerR,
        outerR,
        0,
        largeArcFlag,
        1,
        x2,
        y2,
        'L',
        x3,
        y3,
        'A',
        innerR,
        innerR,
        0,
        largeArcFlag,
        0,
        x4,
        y4,
        'Z',
      ].join(' ');
    };

    const handleMouseEnter = (event, item) => {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        data: item,
      });
      setHoveredData(item); // Set hovered data for center display
    };

    const handleMouseMove = (event) => {
      setTooltip((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
      }));
    };

    const handleMouseLeave = () => {
      setTooltip({ visible: false, x: 0, y: 0, data: null });
      setHoveredData(null); // Reset hovered data
    };

    // Determine what to display in center
    const centerData = hoveredData || {
      label: 'Total',
      value: calculatedTotalIVs,
      percentage: 100,
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, position: 'relative' }}>
        <svg
          width={size}
          height={size}
          onMouseLeave={handleMouseLeave}
          style={{ overflow: 'visible' }}
        >
          {data.map((item, index) => {
            const startAngle = (cumulativePercentage / 100) * 360;
            const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360;
            cumulativePercentage += item.percentage;

            const path = createPath(startAngle, endAngle, outerRadius, innerRadius);

            return (
              <path
                key={index}
                d={path}
                fill={item.color}
                stroke="none"
                style={{
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </svg>
        {/* Center Data Display */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              color: hoveredData ? hoveredData.color : '#615E83',
              mb: 0.5,
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {centerData.label}
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#292929',
              lineHeight: 1,
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {centerData.value.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    );
  };

  // PropTypes for DonutChart
  DonutChart.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        percentage: PropTypes.number.isRequired,
      })
    ).isRequired,
    size: PropTypes.number,
  };

  DonutChart.defaultProps = {
    size: 240,
  };

  // Legend Component using MUI
  const Legend = ({ data }) => (
    <Box
      sx={{
        mt: -3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      {data.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 ,mt:2}}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: item.color,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: '10px',
              color: '#292929',
              fontWeight: 600,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  // PropTypes for Legend
  Legend.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        p: 0,
        height: '311px',
        width: ' 547px',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      {/* Custom Tooltip */}
      <CustomTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} data={tooltip.data} />

      {/* Original 3D Bar Chart */}

      {showDonutChart && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #FFFFFF',
              bgcolor: 'white',
              width: '100%',
              borderRadius: '4px',
              height: '313px',
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#000000',
                mb: 4,
                textAlign: 'left',
              }}
            >
              {chartTitle}
            </Typography>

            {/* Chart */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -7 }}>
              {chartData.length > 0 ? (
                <>
                  <DonutChart data={chartData} size={donutSize} />
                  <Legend data={chartData} />
                </>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    color: 'text.secondary',
                  }}
                >
                  <Typography variant="body2">No data available</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

// PropTypes for main ApplicationStatistics component
ApplicationStatistics.propTypes = {
  showBarChart: PropTypes.bool,
  showDonutChart: PropTypes.bool,
  chartTitle: PropTypes.string,
  donutSize: PropTypes.number,
  customColors: PropTypes.arrayOf(PropTypes.string),
  useDummyData: PropTypes.bool, // New prop
};

ApplicationStatistics.defaultProps = {
  showBarChart: true,
  showDonutChart: true,
  chartTitle: 'Dirty Claim Error',
  donutSize: 240,
  customColors: ['#0D477A', '#1F86E0', '#8CC6F9'],
  useDummyData: true, // Changed to true for testing
};

export default ApplicationStatistics;
