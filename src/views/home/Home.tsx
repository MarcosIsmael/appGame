import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import Portada from '../../components/portada/Portada'
import { getAllGames } from '../../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import GameCatalogue from '../../components/gameCatalogue/GameCatalogue'
import Loading from '../../components/loading/Loading'
import { getAllDocuments } from '../../slices/reviewSlice'
const Home = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state)=>state.game.status)
    const listGames = useAppSelector((state)=> state.game.listGames)
    const reviewStatus = useAppSelector((state)=> state.reviews.status)
    useEffect(()=>{
            dispatch(getAllDocuments())
    },[])
    useEffect(()=>{
        if(listGames.length ===0 && reviewStatus === 'succeded'){
            dispatch(getAllGames())
        }
    },[reviewStatus])
    return (
        <div>
            <Grid container  direction='column' style={{backgroundImage:'url("https://wallpapercave.com/wp/wp2757956.gif")'}}>
                <Grid item xs={12}>
                   <Portada/>
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
