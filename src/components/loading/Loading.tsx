import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
 const Loading=() =>{
  return (
    <Box sx={{ width: '100%', justifyContent:'center' }}>
      <LinearProgress color='primary'/>
      <Typography color='primary'>Cargando..</Typography>
    </Box>
  );
}
export default Loading