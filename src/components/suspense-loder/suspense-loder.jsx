import React from 'react';
import { keyframes } from '@emotion/react';

import { Box, useTheme, Typography } from '@mui/material';

const pulseRing = keyframes({
  '0%': {
    transform: 'scale(0.9)',
    opacity: 0.6,
  },
  '50%': {
    transform: 'scale(1.05)',
    opacity: 1,
  },
  '100%': {
    transform: 'scale(0.9)',
    opacity: 0.6,
  },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const SuspenseLoader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: `radial-gradient(circle at top, ${theme.palette.primary.lighter} 0, ${theme.palette.background.default} 55%, ${theme.palette.grey[100]} 100%)`,
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.background.paper,
          borderRadius: 4,
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
          px: 6,
          py: 5,
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 14,
            borderRadius: '999px',
            background: `conic-gradient(from 120deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light}, ${theme.palette.primary.main})`,
            opacity: 0.16,
            filter: 'blur(16px)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            width: 120,
            height: 120,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: `1px dashed ${theme.palette.primary.light}`,
              animation: `${pulseRing} 2.4s ease-in-out infinite`,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              width: 88,
              height: 88,
              borderRadius: '50%',
              borderWidth: 4,
              borderStyle: 'solid',
              borderColor: `${theme.palette.primary.main} transparent ${theme.palette.secondary.main} transparent`,
              animation: `${spin} 1.2s linear infinite`,
            }}
          />

          <Box
            sx={{
              position: 'relative',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.32)',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: theme.palette.common.white,
                opacity: 0.95,
              }}
            />
          </Box>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Loading your sales insights
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 320,
            mb: 3,
          }}
        >
          We’re fetching your latest pipeline, deals and performance data. This won’t take long.
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 5,
            borderRadius: 999,
            overflow: 'hidden',
            bgcolor: theme.palette.grey[200],
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              width: '40%',
              borderRadius: 999,
              background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              animation: 'loading-bar 1.4s ease-in-out infinite',
              '@keyframes loading-bar': {
                '0%': { transform: 'translateX(-120%)' },
                '50%': { transform: 'translateX(40%)' },
                '100%': { transform: 'translateX(120%)' },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SuspenseLoader;
