import { Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import DialogSelect from '../dialogSelect/dialogSelect'

const Portada = () => {
    const juegos = useAppSelector((state)=> state.counter.listGames)
    const [img,setImg]=  useState('https://www.freetogame.com/g/1/thumbnail.jpg')
    const status = useAppSelector((state)=> state.counter.status)
    const styles : any = makeStyles({
        containerPortada: {
            backgroundImage:`url("${img}")`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            marginBottom:10
        },
    })

    useEffect(()=>{
        if(status === 'succeded'){
            setImg('https://i0.wp.com/todasgamers.com/wp-content/uploads/2016/09/gamers.png?fit=1200%2C400&ssl=1&w=640')
        }
    },[status])
    console.log(img)
    const classes = styles()
    return (
        <Paper elevation={2} className={classes.containerPortada}  square>
            <Grid container direction='column' spacing={10}>
                <Grid item xs/>
                <Grid item xs/>
                <Grid item xs/>
                <Grid item xs/>

                <Grid item xs={12}>
                    <Box bgcolor='#000000' height={40} display='flex' alignItems='center'>  
                    <Grid container direction='row' alignContent='center' >
                        <Grid item xs={4}>
                            <DialogSelect title={'Plataforma'} titleDialog={'filtrar por Plataforma'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DialogSelect title={'Categoria'} titleDialog={'filtrar por categoria'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DialogSelect title={'Ordenar'} titleDialog={'Ordenar por..'}/>
                        </Grid>
                    </Grid>
                    </Box>     
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Portada
