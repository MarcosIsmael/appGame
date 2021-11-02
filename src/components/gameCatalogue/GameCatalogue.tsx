import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import GameCard from '../gameCard/GameCard'
import PaginationGame from '../paginationGame/PaginationGame'

interface Props {
    cantidadPages:number
}
type Review = 
    {
        valoracion:number,
        nombre:string,
        descripcion:string,
        juegoId:number
      }

const GameCatalogue = ({cantidadPages}:Props) => {
    const listGame = useAppSelector((state)=> state.game.listByPage)
    const [desde, setDesde]=useState(0)
    const [hasta, setHasta]=useState(30)
    const reviewList = useAppSelector((state)=> state.reviews.reviews)
    const reviewStatus = useAppSelector((state)=> state.reviews.status)
    
    const getReview = (id:number)=>{
      const listValoration =  reviewList.filter(element=> element.juegoId == id).map(element => element.value *1)
      const cantidad = listValoration.length
      console.log('LISTA', listValoration)
      const total = listValoration.reduce((previusValue, currentValue)=> {
          console.log('PREVIO',previusValue)
          console.log('POSICION',currentValue)

      return previusValue + currentValue
      },0
      )
    //   console.log('TOTAL', total)
    //   console.log('CANTIDAD',cantidad)
      return  Math.ceil(total / cantidad) 
    }
    return (
        <Grid container direction='column'>
            <Grid container direction='row' spacing={2} justifyContent='center'>
                {listGame.length > 0 ?
                listGame.map((item,index) => {
                     return <Grid item key={index}>
                                 <GameCard 
                                //  image={item.thumbnail} 
                                //  title={item.title} 
                                //  description={item.short_description}
                                //  get={item.game_url}
                                //  freeToGame={item.freetogame_profile_url}
                                //  id={item.id}
                                game={item}
                                 review={getReview(item.id)}
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
