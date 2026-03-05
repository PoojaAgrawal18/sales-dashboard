import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              mx: 'auto',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
              boxShadow: '0 8px 32px rgba(14, 165, 233, 0.35)',
            }}
          >
            <Typography sx={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>404</Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5, letterSpacing: '-0.02em' }}>
            Page not found
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 360, mx: 'auto' }}>
            Sorry, we couldn’t find the page you’re looking for. Check the URL or head back to the dashboard.
          </Typography>

          <Button
            component={RouterLink}
            href="/dashboard"
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              boxShadow: (t) => t.customShadows?.primary || '0 4px 14px rgba(14, 165, 233, 0.35)',
            }}
          >
            Back to dashboard
          </Button>

          <Typography
            component={RouterLink}
            href="/"
            sx={{
              display: 'inline-block',
              mt: 2,
              color: 'primary.main',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 14,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign in
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
