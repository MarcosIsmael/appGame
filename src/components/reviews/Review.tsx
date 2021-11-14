import { Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllDocuments } from '../../slices/reviewSlice'
import Rating from '../rating/Rating'
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system'
import { Button } from '@mui/material';

interface Props {
    juegoId: number,
}
const Review = ({juegoId}:Props) => {
    const dispatch = useAppDispatch()
    const reviewList = useAppSelector((state)=> state.reviews.reviews)
    const listReview = reviewList.filter(element=> element.juegoId == juegoId)
    const [verMas,setVerMas]= useState(3)
    const getReview = (id:number)=>{
        const listValoration =  reviewList.filter(element=> element.juegoId == id).map(element => element.valor *1)
        const cantidad = listValoration.length
        const total = listValoration.reduce((previusValue, currentValue)=> {
        return previusValue + currentValue
        },0
        )
        return  !isNaN(Math.ceil(total / cantidad)) ? Math.ceil(total / cantidad) : 0
      }

    useEffect(()=>{
        dispatch(getAllDocuments())
    },[])

    return (
        <Grid container direction='column' justifyContent='center'>
            <Divider color='blue'/>
                <Typography variant={'h4'} component={'h4'} color='secondary'> {`${getReview(juegoId)}`}<StarIcon color='warning' fontSize='medium'/>Reviews</Typography>
                {listReview.slice(0,verMas).map((juego,index )=>{
                    return (
                            <Grid item xs={12} sm={6} key={index}>
                                <Divider color='blue'/>
                                <Box m={2} p={1}>
                                    <Grid container direction='row' justifyContent='center'>
                                        <Grid item xs></Grid>
                                        <Grid item xs={1}>
                                            <Avatar alt={juego.nombre} color='primary' src={juego.imagen} />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant={'h6'} color='secondary'>{juego.titulo}</Typography>                                    
                                            <Typography component={'p'} variant='subtitle1' color='primary'>{juego.descripcion}</Typography>                                    

                                        </Grid>
                                        <Grid item xs></Grid>


                                    
                                    </Grid>
                                </Box>
                                <Rating value={juego.valor}/>
                             </Grid>
                        )

                })}
                {listReview.length > verMas ? 
                
                <Button color='secondary' size='small' onClick={()=> setVerMas(verMas + 2)}> ver mas</Button>
                    :null
            }
        </Grid>
    )
}

export default Review
