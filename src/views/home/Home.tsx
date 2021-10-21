import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import Portada from '../../components/portada/Portada'
import { getAllGames } from '../../features/counter/gameSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import GameCatalogue from '../../components/gameCatalogue/GameCatalogue'
const Home = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state)=>state.counter.status)
    const listGames = useAppSelector((state)=> state.counter.listGames)
    useEffect(()=>{
        if(listGames.length ===0){
            dispatch(getAllGames())
        }
    },[])
    return (
        <div>
            <Grid container  direction='column' style={{backgroundImage:'url("https://wallpapercave.com/wp/wp2757956.gif")'}}>
                <Grid item xs={12}>
                   <Portada/>
                </Grid>
                <Grid item xs={12}>
                    {status === 'succeded' ?     
                        <GameCatalogue cantidadPages={Math.ceil(listGames.length / 30)}/>
                    : <Typography> No hay juegos</Typography>
                }
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
