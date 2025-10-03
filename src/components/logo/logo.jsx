import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="../../../favicon/android-chrome-192x192.png"
      sx={{ width: 50, height: 50, cursor: 'pointer', ...sx }}
    />
  );

  //   const logo = (
  //     <Box
  //       ref={ref}
  //       component="div"
  //       sx={{
  //         width: 50,
  //         height: 50,
  //         display: 'inline-flex',
  //         ...sx,
  //       }}
  //       {...other}
  //     >
  //       <img src="../../../public/favicon/android-chrome-192x192.png" alt="Capline Logo" />
  //     </Box>
  //   );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
