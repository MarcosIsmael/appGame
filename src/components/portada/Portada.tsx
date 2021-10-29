import { Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DialogSelect from '../dialogSelect/dialogSelect'
import {filters} from '../../utils/filters'
import { getGamesByCategory, getGamesByOrder, getGamesByPlatform, setFilters } from '../../slices/gameSlice';
const Portada = () => {
    const juegos = useAppSelector((state)=> state.game.listGames)
    const dispatch= useAppDispatch()
    const [img,setImg]=  useState('https://www.freetogame.com/g/1/thumbnail.jpg')
    const status = useAppSelector((state)=> state.game.status)
    const styles : any = makeStyles({
        containerPortada: {
            backgroundImage:`url("${img}")`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            marginBottom:10
        },
    })

    const handleClick = (dataFilters:string, tipo:string)=>{
        if(tipo === 'Plataforma'){
            dispatch(getGamesByPlatform(dataFilters))
            dispatch(setFilters({type:tipo, value:dataFilters}))
        }else
        if(tipo === 'Ordenar'){
            dispatch(setFilters({type:tipo, value:dataFilters}))
            dispatch(getGamesByOrder(dataFilters))
        }else
        if(tipo === 'Categoria'){
            dispatch(getGamesByCategory(dataFilters))
            dispatch(setFilters({type:tipo, value:dataFilters}))
        }
    }

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
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm/>

                <Grid item xs={12}>
                    <Box bgcolor='#000000' height={40} display='flex' alignItems='center'>  
                    <Grid container direction='row' alignContent='center' >
                        <Grid item xs={4}>
                            <DialogSelect handleClick={handleClick} optionsSelect={filters.platform} title={'Plataforma'} titleDialog={'filtrar por Plataforma'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DialogSelect handleClick={handleClick} optionsSelect={filters.tag} title={'Categoria'} titleDialog={'filtrar por categoria'}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DialogSelect handleClick={handleClick} optionsSelect={filters.order} title={'Ordenar'} titleDialog={'Ordenar por..'}/>
                        </Grid>
                    </Grid>
                    </Box>     
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Portada
