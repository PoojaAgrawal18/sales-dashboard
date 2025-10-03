import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';

const SuspenseLoader = () => {
  const animationArr = [
    'https://assets6.lottiefiles.com/packages/lf20_cevou807.json',
    'https://assets5.lottiefiles.com/packages/lf20_uUwoJg.json',
    'https://assets10.lottiefiles.com/private_files/lf30_kslg6b9h.json',
    'https://assets3.lottiefiles.com/packages/lf20_tnzizfur.json',
    'https://assets5.lottiefiles.com/packages/lf20_fhr2buol.json',
    'https://assets5.lottiefiles.com/packages/lf20_haxuhcgq.json',
    'https://assets2.lottiefiles.com/packages/lf20_6kbjigp3.json',
  ];
  const number = Math.floor(Math.random() * animationArr.length);
  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100%' }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Player
          autoplay
          // loop
          src={animationArr[number]}
          style={{
            height: '300px',
            width: '300px',
            background: '#ecf0f1',
            borderRadius: '2000px',
          }}
        />
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/temp/lf20_doiisQ.json"
          style={{ height: '150px', marginTop: '-50px' }}
        />
      </Stack>
    </Grid>
  );
};

export default SuspenseLoader;
