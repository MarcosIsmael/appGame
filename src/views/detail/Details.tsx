import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDetailGame } from '../../slices/gameDetailSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import PaperImage from '../../components/paperImage/PaperImage'
import { Box } from '@mui/system'
const Details = () => {
 const params : {id:string}= useParams()
 const dispatch = useAppDispatch()
 const detail = useAppSelector((state)=> state.gameDetail.detail)
 const status = useAppSelector((state)=> state.gameDetail.status)

 useEffect(()=>{
    dispatch(getDetailGame(params.id))
 },[])
    return (
            <Grid container direction='column' >
                <Grid item xs={12}>
                    <Typography align='center' color='primary' variant='h2'>{detail && detail.title}</Typography>
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
            </Grid>
    )
}

export default Details
