import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import { Grid } from '@mui/material';
import Favorite from '../favorite/Favorite'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeFavorites, setFavorites } from '../../slices/favoriteSlice';
import Rating from "../rating/Rating"
import { Juego } from '../../utils/interfaces';
interface Props {
 game:Juego,
 review:number
}
export default function GameCard({game,review}:Props) {
  const history= useHistory()
  const dispatch = useAppDispatch()
  // const [review,setReview] = React.useState(0)
  const favorite = useAppSelector((state)=> state.favorites.favorites).filter(item=> item.id === game.id)
  // const reviewList = useAppSelector((state)=> state.reviews.reviews)
  // const reviewStatus = useAppSelector((state)=> state.reviews.status)


// React.useEffect(()=>{
//   if(reviewStatus === 'succeded' && reviewList.length > 0){
//     setReview(reviewList.filter(item => { if(item.juegoId == id) return item}).length > 0 
//     ? reviewList.filter(item => { if(item.juegoId == id) return item})[0].valoracion
//     : 0)
//   }
// },[reviewStatus])
  const handleClick = (active:boolean)=>{
    if(active){
      dispatch(setFavorites(game))
    }else{
      dispatch(removeFavorites(game.id))

    }
  }
  return (
    <Card sx={{ maxWidth: 345, minWidth:345, minHeight:345, backgroundColor:'#000', border: '3px solid blue' }} >
      <Grid container direction='row' justifyContent='flex-end'>
        <Grid item xs={2}>
          <Favorite active={favorite.length >0} onChange={(active:boolean)=>handleClick(active)}/>
        </Grid>
      </Grid>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={game.thumbnail}
      />
      <CardContent style={{backgroundColor:'#0000000'}} >
        <Typography color='primary' gutterBottom variant="h5" component="div">
          {game.title}
        </Typography>
        <Typography variant="body2" color='primary'>
          {game.short_description}
        </Typography>
      </CardContent>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={6}> 
         <Rating value={review}/>
        </Grid>
      </Grid>
      <CardActions>
        <Button onClick={()=> history.push(`/detail/${game.id}`)}size="small">detail</Button>
        <Button component='a' target='_blank' href={game.game_url} size="small">get</Button>
        <Button component='a' target='_blank' href={game.freetogame_profile_url} size="small">Free to game</Button>
      </CardActions>
    </Card>
  );
}
