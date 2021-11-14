import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getDetailGame } from '../../slices/gameDetailSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import PaperImage from '../../components/paperImage/PaperImage'
import FormValoration from '../../components/formValoration/FormValoration'
import { Box } from '@mui/system'
import { db } from '../../components/firebase/firebase'
import Rating from '../../components/rating/Rating'
import Reviews from '../../components/reviews/Review'
import Portada from '../../components/portada/Portada'
import { getAllDocuments, postReview } from '../../slices/reviewSlice'
import CustomAlert from '../../components/alert/CustomAlert'
type Review = 
    {
        valor:string,
        titulo:string,
        descripcion:string
      }

const Details = () => {
 const params : {id:string}= useParams()
 const dispatch = useAppDispatch()
 const detail = useAppSelector((state)=> state.gameDetail.detail)
 const statusDetail = useAppSelector(state => state.gameDetail.status)
 const statusPost = useAppSelector((state)=> state.reviews.statusPost)
 const reviewList = useAppSelector((state)=> state.reviews.reviews)
 const user = useAppSelector((state)=> state.auth.user)
 const [errorGameDetail,setErrorGameDetail] = useState(false)
 const [errorPostReview,setErrorPostReview]= useState(false)

 useEffect(()=>{
    dispatch(getDetailGame(params.id))
 },[])

 useEffect(() => {
    if(statusPost === 'succeded'){
        dispatch(getAllDocuments())
    }
 }, [statusPost])

 useEffect(()=>{
     if(statusDetail == 'failed'){
         setErrorGameDetail(true)
     }
 },[statusDetail])

 const customOnSubmit = (data:Review) => {
    let obj = {
        titulo: data.titulo,
        valor:data.valor,
        descripcion : data.descripcion,
        juegoId:params.id,
        mail:user.mail,
        imagen: user.image,
        nombre: user.nombreCompleto
    }
    // db.collection("reviews").doc().set(obj)
    dispatch(postReview(obj))
}

const getReview = (id:number)=>{
    const listValoration =  reviewList.filter(element=> element.juegoId == id).map(element => element.valor *1)
    const cantidad = listValoration.length
    const total = listValoration.reduce((previusValue, currentValue)=> {
    return previusValue + currentValue
    },0
    )
    return  Math.ceil(total / cantidad) 
  }
    return (
            <Grid container direction='column' justifyContent='center' >
                <CustomAlert 
                open={errorGameDetail}
                setOpen={setErrorGameDetail}
                textAlert='Error al traer el detalle del juego'
                severity='error'
                />
                 <CustomAlert 
                open={errorPostReview}
                setOpen={setErrorPostReview}
                textAlert='Error guardar su review'
                severity='error'
                />
                <Grid item xs={12}>
                    <Portada filter={false}>
                        {detail && 
                            <Typography align='center' color='primary' variant='h2'>{detail.title}</Typography>
                        }
                    </Portada>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs={12} >
                            <Grid container direction='row' justifyContent='center'>

                                {detail && 
                                    <Grid item xs={12} sm={8}>
                                        <Grid container direction='row' justifyContent='center'>

                                            {   detail.screenshots.map(item => {
                                                    return <Grid item>
                                                                <PaperImage img={item.image}/>
                                                            </Grid>
                                                })}
                                        </Grid>

                                    </Grid>

                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid container justifyContent='center'>
                                <Grid item sm={11}>
                                    <Typography component='p' align='center' color='primary' variant='h6'> {detail && detail.description}</Typography>  
                                </Grid>
                            </Grid>
                        </Grid> 
                        <Grid item xs={6} sm={4}>

                                    {detail && 
                                    <Grid container justifyContent='center'>
                                        <Grid item xs={12}sm={4}>
                                          <PaperImage xl img={ detail.thumbnail}/>
                                        </Grid>
                                    </Grid>
                                    }
                                    <Typography component='p' color='primary' variant='h6'>Requisitos</Typography>

                                    <Typography component='p' color='primary' variant='h6'>{ detail && detail.minimum_system_requirements.graphics}</Typography>
                                    <Typography component='p' color='primary' variant='h6'>{ detail && detail.minimum_system_requirements.memory}</Typography>
                                    <Typography component='p' color='primary' variant='h6'>{ detail && detail.minimum_system_requirements.processor}</Typography>
                                    <Typography component='p' color='primary' variant='h6'>{ detail && detail.minimum_system_requirements.os}</Typography>
                                    <Typography component='p' color='primary' variant='h6'>{ detail && detail.minimum_system_requirements.storage}</Typography>

                                </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container direction='row'>
                        <Grid item sm></Grid>
                        <Grid item xs={12} sm={6}>

                            <Reviews 
                            juegoId={ Number(params.id)}
                            />
                        </Grid>
                        <Grid item sm></Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='row' justifyContent='center'>
                        <Grid item xs={12} sm={6}>
                            
                            <FormValoration customOnSubmit={customOnSubmit} disabledForm={reviewList.some(review => review.mail === user.mail && review.juegoId == Number(params.id))}/>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
    )
}

export default Details
