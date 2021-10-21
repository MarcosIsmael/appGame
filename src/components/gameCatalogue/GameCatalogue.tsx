import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import GameCard from '../gameCard/GameCard'
import PaginationGame from '../paginationGame/PaginationGame'

interface Props {
    cantidadPages:number
}
const GameCatalogue = ({cantidadPages}:Props) => {
    const listGame = useAppSelector((state)=> state.counter.listGames)
    const [desde, setDesde]=useState(0)
    const [hasta, setHasta]=useState(30)
console.log('DESDE', desde, 'hasta', hasta)
    return (
        <Grid container direction='column'>
            <Grid container direction='row' spacing={2} justifyContent='center'>
                {listGame.length > 0 ?
                listGame.slice(desde,hasta).map((item,index) => {
                     return <Grid item key={index}>
                                 <GameCard 
                                 image={item.thumbnail} 
                                 title={item.title} 
                                 description={item.short_description}
                                 get={item.game_url}
                                 freeToGame={item.freetogame_profile_url}
                                 id={item.id}
                                 />
                            </Grid>
                    }):

               'Cargando..'
            }
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <PaginationGame
                    juegosPorPage={30}
                    cantidadPages={cantidadPages}
                    setDesde={setDesde}
                    setHasta={setHasta}
                    />
                </Grid>
            </Grid>
            </Grid>
)
}

export default GameCatalogue
