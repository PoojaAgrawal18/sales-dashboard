/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import PropTypes from 'prop-types';

import { Gauge } from '@mui/x-charts/Gauge';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { Box, Grid, Card, Container, Typography, CardContent } from '@mui/material';

import VariableRadiusPieChart from '../charts/ar-pie-chart';
import AccountsReceivableTrend from '../charts/account-line-chart';

// Custom progress circle component
const ProgressCircle = ({ value, maxValue, color = '#1976d2' }) => {
  const percentage = (value / maxValue) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <svg width="120" height="120">
        <circle cx="60" cy="60" r={radius} stroke="#e0e0e0" strokeWidth="8" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: '60px 60px',
          }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Points
        </Typography>
      </Box>
    </Box>
  );
};

ProgressCircle.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default function DashboardView() {
  return (
    <Container maxWidth="xxl">
      <Typography sx={{ mb: 3, color: '#292929', fontWeight: 700, fontSize: '16px', mt: 2, ml: 3 }}>
        RCM Insights | Billing & Collections{' '}
      </Typography>

      <Grid container spacing={3} mb={3}>
        {/* Collection Ratio */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 140,
              boxShadow: 2,
              bgcolor: '#F1FBFF',
              border: '1px solid #0AA5DC',
              borderRadius: '8px',
            }}
          >
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" color="#292929" gutterBottom sx={{fontSize:'13px', fontWeight:400}}>
                    Collection ratio
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0, mt: 3 }}>
                    $15000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    97% collected
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 76, mt: 3, mr: 0, ml: 8, maxWidth: '103px' }}>
                  <SparkLineChart
                    data={[15, 25, 35, 45, 35, 25]}
                    // width={103}
                    height={76}
                    color="#1F86E0"
                    curve="natural"
                    area={true}
                    showTooltip={false}
                    showHighlight={false}
                    margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    sx={{
                      '& .MuiLineElement-root': {
                        strokeWidth: 2,
                        filter: 'drop-shadow(0px 3px 6px rgba(33, 150, 243, 0.6))',
                      },
                      '& .MuiAreaElement-root': {
                        fill: 'rgba(33, 150, 243, 0.2)',
                        opacity: 0.4,
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Accurate Billing */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 140,
              boxShadow: 2,
              bgcolor: '#F1FBFF',
              border: '1px solid #0AA5DC',
              borderRadius: '8px',
            }}
          >
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" color="#292929" gutterBottom sx={{fontSize:'13px', fontWeight:400}}>
                    Accurate billing
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0, mt: 3 }}>
                    11000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    58% collected
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 76, mt: 3, mr: 0, ml: 8, maxWidth: '103px' }}>
                  <SparkLineChart
                    data={[15, 25, 35, 45, 35, 25]}
                    // width={103}
                    height={76}
                    color="#1F86E0"
                    curve="natural"
                    area={true}
                    showTooltip={false}
                    showHighlight={false}
                    margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    sx={{
                      '& .MuiLineElement-root': {
                        strokeWidth: 2,
                        filter: 'drop-shadow(0px 3px 6px rgba(33, 150, 243, 0.6))',
                      },
                      '& .MuiAreaElement-root': {
                        fill: 'rgba(33, 150, 243, 0.2)',
                        opacity: 0.4,
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rebilling & Appeals */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 140,
              boxShadow: 2,
              bgcolor: '#F1FBFF',
              border: '1px solid #0AA5DC',
              borderRadius: '8px',
            }}
          >
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" color="#292929" gutterBottom sx={{fontSize:'13px', fontWeight:400}}>
                    Rebilling & appeals
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0, mt: 3 }}>
                    1300
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    37% collected
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 76, mt: 3, mr: 0, ml: 8, maxWidth: '103px' }}>
                  <SparkLineChart
                    data={[15, 25, 35, 45, 35, 25]}
                    // width={103}
                    height={76}
                    color="#1F86E0"
                    curve="natural"
                    area={true}
                    showTooltip={false}
                    showHighlight={false}
                    margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    sx={{
                      '& .MuiLineElement-root': {
                        strokeWidth: 2,
                        filter: 'drop-shadow(0px 3px 6px rgba(33, 150, 243, 0.6))',
                      },
                      '& .MuiAreaElement-root': {
                        fill: 'rgba(33, 150, 243, 0.2)',
                        opacity: 0.4,
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Clean Claim Ratio */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 140,
              boxShadow: 2,
              bgcolor: '#F1FBFF',
              border: '1px solid #0AA5DC',
              borderRadius: '8px',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" color="#292929" gutterBottom sx={{fontSize:'13px', fontWeight:400}}>
                    Clean Claim Ratio
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0, mt: 3 }}>
                    1300
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 500 }}>
                      +21.01%
                    </Typography>
                    <TrendingUp sx={{ fontSize: 16, color: '#4caf50', ml: 0.5 }} />
                  </Box>
                </Box>
                <Box>
                  <Gauge width={100} height={100} value={69} startAngle={-90} endAngle={90} cornerRadius={10} sx={{fontSize:'12px', fontWeight:700}} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending AR */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: 140,
              boxShadow: 2,
              bgcolor: '#F1FBFF',
              border: '1px solid #0AA5DC',
              borderRadius: '8px',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2" color="#292929" gutterBottom sx={{fontSize:'13px', fontWeight:400}}>
                    Pending AR
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0, mt: 3 }}>
                    1300
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 500 }}>
                      -21.01%
                    </Typography>
                    <TrendingDown sx={{ fontSize: 16, color: '#f44336', ml: 0.5 }} />
                  </Box>
                </Box>
                <Box>
                  <Gauge width={100} height={100} value={69} startAngle={-90} endAngle={90} cornerRadius={10} sx={{fontSize:'12px', fontWeight:700}} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Accounts Receivable Trend Chart and AR Distribution */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          position: 'relative',
          alignItems: 'flex-start',
        }}
      >
        {/* Accounts Receivable Trend */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '1 1 40%' },
            mt: -1.3,
            height: '287px',
          }}
        >
          <AccountsReceivableTrend />
        </Box>

        {/* AR Distribution Chart */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 0%' },
            mr: -8,
            mt: -1.3,
          }}
        >
          <VariableRadiusPieChart />
        </Box>

        {/* Banner */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 auto' },
            width: '100%',
            maxWidth: '433px',
            height: { xs: '450px', sm: '467px' },
            borderRadius: '8px',
            overflow: 'hidden',
            mt: { xs: 2, md: -20.5 },
            ml: { md: 'auto' },
            mr: -5,
          }}
        >
          <img
            src="/assets/background/Banner.png"
            alt="5% Cash Back Banner"
            style={{
              width: '100%',
              height: '467px', // Keep original height
              minHeight: '467px', // Ensure minimum height              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: '#0D477A',
          height: '44px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',mt:-1,mb:-8
        }}
      >
        <Typography align="center" color="#FFFFFF" sx={{ fontSize: '13px', fontWeight:400 }}>
          Upon Clicking, the Client Will Be Directed to the RCM Tool’s ‘List of Claims’ Page for
          Offices.
        </Typography>
      </Box>
    </Container>
  );
}
