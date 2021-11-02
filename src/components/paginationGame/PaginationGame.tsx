import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPagination } from '../../slices/gameSlice';


interface Props {
    juegosPorPage:number,
    setHasta: (numero :number)=> void,
    setDesde: (numero : number)=> void,
    cantidadPages: number
}

//! hasta: page x cantidad de juegos (30)
//! desde : page -1 x cantidad de juegos(30)

//page 1 = 0,30
//page 2 = 30,60
//page 3 = 60,90



export default function PaginationGame({juegosPorPage, setHasta,setDesde, cantidadPages}:Props) {
  // const [page, setPage] = React.useState(1);
  const page = useAppSelector((state)=> state.game.page)
  const dispatch = useAppDispatch()
  const styles = makeStyles(()=>({
      colorPagination:{
          "& li button":{
              color:'blue',
              fontSize:20
          },
          "& li button svg":{
            fontSize:30
        }
      }
  }))
  const classes = styles()
  const handleChange = (event:object, value: number) => {
      console.log('value',value)
    setHasta(value * juegosPorPage)
    if(value > 1){
        setDesde((value -1) * juegosPorPage)
        dispatch(setPagination({hasta:value * juegosPorPage, desde: (value -1) * juegosPorPage, page:value}))
    }else{
        setDesde(0)
        dispatch(setPagination({hasta:value * juegosPorPage, desde: 0, page:value}))

    }
    // setPage(value);
  };

  return (
    <Stack spacing={2}>
        <Box color='green'>
      <Pagination color='primary' className={classes.colorPagination} count={cantidadPages} page={page} onChange={handleChange} />
        </Box>
    </Stack>
  );
}
