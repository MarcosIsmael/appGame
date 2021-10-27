import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';

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
  return (
    <Card sx={{ maxWidth: 345, minWidth:345, minHeight:345, backgroundColor:'#000', border: '3px solid blue' }} >
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
