import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useAppDispatch } from '../../redux/hooks';
import { signInWithGoogle } from '../../slices/authSlice';

interface Props{
    value:number
}
const RatingSIze =({value}:Props) =>{
    const dispatch = useAppDispatch()
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
        <Rating className={classes.star} readOnly name="size-small" defaultValue={0} onClick={()=> dispatch(signInWithGoogle())} value={value} size="small" />
        </Stack>
      </Box>
  );
}
export default RatingSIze