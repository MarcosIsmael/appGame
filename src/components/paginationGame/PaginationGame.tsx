import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';


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
  const [page, setPage] = React.useState(1);
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
    }else{
        setDesde(0)

    }
    setPage(value);
  };

  return (
    <Stack spacing={2}>
        <Box color='green'>
      <Pagination color='primary' className={classes.colorPagination} count={cantidadPages} page={page} onChange={handleChange} />
        </Box>
    </Stack>
  );
}
