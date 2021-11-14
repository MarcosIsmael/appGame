import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Portada from '../../components/portada/Portada'
import { getAllGames } from '../../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import GameCatalogue from '../../components/gameCatalogue/GameCatalogue'
import Loading from '../../components/loading/Loading'
import { getAllDocuments } from '../../slices/reviewSlice'
import Filters from '../../components/filters/Filters'
import CustomAlert from '../../components/alert/CustomAlert'
import { truncate } from 'fs'
const Home = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state)=>state.game.status)
    const listGames = useAppSelector((state)=> state.game.listGames)
    const reviewStatus = useAppSelector((state)=> state.reviews.status)
    const [errorGame, setErrorGame]= useState(false)
    const [errorReview,setErrorReview]= useState(false)
    useEffect(()=>{
            dispatch(getAllDocuments())
    },[])

    useEffect(()=>{
        if(listGames.length ===0 && reviewStatus === 'succeded'){
            dispatch(getAllGames())
        }
        if(reviewStatus == 'failed'){
            setErrorReview(true)
        }
    },[reviewStatus])
    
    useEffect(()=>{
        if(status == 'failed'){
            setErrorGame(true)
        }
    },[status])

    console.log(errorReview)
    return (
        <div>
            <CustomAlert
            severity='error'
            open={errorReview}
            setOpen={setErrorReview}
            textAlert='Error al traer la valoracion'
             />
            <CustomAlert
            severity='error'
            open={errorGame}
            setOpen={setErrorGame}
            textAlert='Error al traer los juegos'
             />
            <Grid container  direction='column' style={{backgroundImage:'url("https://wallpapercave.com/wp/wp2757956.gif")'}}>
                <Grid item xs={12}>
                   <Portada filter={true}>
                       <Filters/>
                   </Portada>
                </Grid>
                <Grid item xs={12}>
                    {status !== 'loading' ?     
                        <GameCatalogue cantidadPages={Math.ceil(listGames.length / 30)}/>
                    : <Loading/>
                }
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
