import { Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DialogSelect from '../dialogSelect/dialogSelect'
import {filters} from '../../utils/filters'
import InfoProfile from '../infoProfile/InfoProfile'
import { getGamesByCategory, getGamesByOrder, getGamesByPlatform, setFilters } from '../../slices/gameSlice';

interface Props {
    filter:boolean,
    children?:any
}
const Portada = ({ filter, children}:Props) => {
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
        <Box mb={1}>
            <Grid container direction='column' spacing={2}>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='center'>
                        <Grid xs={12} sm={6}>
                            <CardMedia
                            component="img"
                            alt="imagen portada"
                            height="118"
                            image={img}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <InfoProfile/>
                </Grid>
                    <Grid item xs={12}>
                        {/* <Box bgcolor='#000000' height={40} display='flex' alignItems='center'>  
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
                        </Box>      */}
                        {children}
                    </Grid>
            </Grid>
            </Box>
    )
}

export default Portada
