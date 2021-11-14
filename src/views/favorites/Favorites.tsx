import React from 'react'
import InfoProfile from '../../components/infoProfile/InfoProfile'
import Portada from '../../components/portada/Portada'
import { useAppSelector } from '../../redux/hooks'
import GameCard from '../../components/gameCard/GameCard'
import { Grid, Typography } from '@mui/material'
const Favorites = () => {
    const reviewList = useAppSelector((state)=> state.reviews.reviews)

    const getReview = (id:number)=>{
        const listValoration =  reviewList.filter(element=> element.juegoId == id).map(element => element.valor *1)
        const cantidad = listValoration.length
        const total = listValoration.reduce((previusValue, currentValue)=> {
        return previusValue + currentValue
        },0
        )
        return  Math.ceil(total / cantidad) 
      }
    const listFavorites = useAppSelector((state)=> state.favorites.favorites)


    return (
        <>
        
            <Portada filter={false}>
                <Typography  component='h1' variant='h5' color='secondary'> Favorites</Typography>
            </Portada>
        <Grid container direction='row' justifyContent='center' spacing={1}>
            {/* <Portada/>
            <InfoProfile/> */}
            <Grid item xs={12}>
            </Grid>

            {listFavorites.map((card, index) => {
               return <Grid item xs key={index}>
                            <GameCard
                            game={card}
                            review={getReview(card.id)}
                            />
                        </Grid>
            })}
        </Grid>
        </>
    )
}

export default Favorites
