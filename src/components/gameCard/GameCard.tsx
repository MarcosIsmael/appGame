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

interface Props {
  image: string,
  title:string,
  description:string,
  freeToGame:string,
  get:string,
  id:number,
  review:number
}
export default function GameCard({image, title, description,get,freeToGame, id, review}: Props) {
  const history= useHistory()
  const dispatch = useAppDispatch()
  console.log('reiew', review)
  // const [review,setReview] = React.useState(0)
  const listFavorites = useAppSelector((state)=> state.favorites.favorites)
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
      dispatch(setFavorites(id))
    }else{
      dispatch(removeFavorites(id))

    }
  }
  return (
    <Card sx={{ maxWidth: 345, minWidth:345, minHeight:345, backgroundColor:'#000', border: '3px solid blue' }} >
      <Grid container direction='row' justifyContent='flex-end'>
        <Grid item xs={2}>
          <Favorite active={listFavorites.includes(id)} onChange={(active:boolean)=>handleClick(active)}/>
        </Grid>
      </Grid>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent style={{backgroundColor:'#0000000'}} >
        <Typography color='primary' gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color='primary'>
          {description}
        </Typography>
      </CardContent>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={6}> 
         <Rating value={review}/>
        </Grid>
      </Grid>
      <CardActions>
        <Button onClick={()=> history.push(`/detail/${id}`)}size="small">detail</Button>
        <Button component='a' target='_blank' href={get} size="small">get</Button>
        <Button component='a' target='_blank' href={freeToGame} size="small">Free to game</Button>
      </CardActions>
    </Card>
  );
}
