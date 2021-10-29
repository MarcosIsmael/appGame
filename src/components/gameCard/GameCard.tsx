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
interface Props {
  image: string,
  title:string,
  description:string,
  freeToGame:string,
  get:string,
  id:number
}
export default function GameCard({image, title, description,get,freeToGame, id}: Props) {
  const history= useHistory()
  const dispatch = useAppDispatch()
  const listFavorites = useAppSelector((state)=> state.favorites.favorites)
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
      <CardActions>
        <Button onClick={()=> history.push(`/detail/${id}`)}size="small">detail</Button>
        <Button component='a' target='_blank' href={get} size="small">get</Button>
        <Button component='a' target='_blank' href={freeToGame} size="small">Free to game</Button>

      </CardActions>
    </Card>
  );
}
