import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

interface Props{
    value:number
}
const RatingSIze =({value}:Props) =>{
    const styles =makeStyles({
        star:{
            "& span":{
                color:'#faaf00'
            },
            justifyContent:'center'
        }
    })
    const classes=styles()
  return (
      <Box >
        <Stack spacing={1} >
        <Rating className={classes.star} name="size-small" defaultValue={0} value={value} size="small" />
        </Stack>
      </Box>
  );
}
export default RatingSIze