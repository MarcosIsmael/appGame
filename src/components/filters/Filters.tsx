import React from 'react'
import { Box } from '@mui/system';
import { Grid, Paper, Typography } from '@mui/material'
import DialogSelect from '../dialogSelect/dialogSelect'
import {filters} from '../../utils/filters'
import { useAppDispatch } from '../../redux/hooks';
import { getGamesByCategory, getGamesByOrder, getGamesByPlatform, setFilters } from '../../slices/gameSlice';
const Filters = () => {
    const dispatch= useAppDispatch()

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
    return (
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
    )
}

export default Filters
