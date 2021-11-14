import React from 'react';
import { useForm, NestedValue } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grid, Paper, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { db } from '../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signInWithGoogle } from '../../slices/authSlice';
import { Box } from '@mui/system';

type Option = {
  label: string;
  value: string;
};

const options = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

type Review = 
    {
        valor:string,
        titulo:string,
        descripcion:string
      }
interface Props {
    customOnSubmit: (arg:Review)=> void,
    disabledForm: boolean
}
 const  FormValoration =({customOnSubmit, disabledForm}:Props)=> {
    const styles = makeStyles({
        input:{
            '& input':{
                color:'blue', 
                border:'1px solid blue'
            }
        }
    })
    const classes = styles()
  const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm<{
    valor:string,
    titulo:string,
    descripcion:string
  }>({
    // defaultValues: { select: 10 },
  });
  console.log(errors)  
  const onSubmit = handleSubmit(customOnSubmit);
  const logueado = useAppSelector((state)=> state.auth.logueado)
  const dispatch = useAppDispatch()
  const reviewStatus = useAppSelector((state)=> state.reviews.status)
    // const { ref: inputRef, ...inputProps } = register("titulo", {
    //     required: "error text"
    //   });
   React.useEffect(() => {

     register('valor', {
         max:{value:5, message:'solo hasta 5'},
         min:{value:0, message:'solo desde 0'},
         required:'campo requerido',         
    });
    register('titulo', {
        maxLength:{value:20,message:'muy largo'},
        minLength:{value:2, message:'muy corto'},
        required:'campo requerido',         
   });
   register('descripcion', {
    maxLength:{value:200,message:'muy largo'},
    minLength:{value:7, message:'muy corto'},
    required:'campo requerido',         
});
   }, [register]);

if(logueado){
    if(disabledForm){
           return null
    }
    // else if(reviewStatus === 'succeded'){ 
    //     return <Typography color='green'> se guardo correctamente! gracias!</Typography>
    // }
    else{
        return (
            <Paper elevation={4} sx={{backgroundColor:'black'}}>
                
            <form onSubmit={onSubmit}>
                <Grid container direction='column'>
                    <Grid item xs >
                        <Typography variant='h2' color='turquoise'>
                            Form review
                        </Typography>
                    </Grid>
                    <Grid item xs>
                    <Typography variant='subtitle1' color='turquoise'>
                            Ingresa tu valor de 1 a 5
                        </Typography>
                        <TextField 
                        variant='outlined' 
                        fullWidth
                        type='number'
                        className={classes.input}
                        placeholder={'ingresa una valor de 1 a 5'}
                        onChange={(e:any) => {setValue('valor', e.target.value)}}
                        error={errors && errors.valor ? true : false}
                        helperText={errors && errors.valor ? errors.valor.message : null}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant='subtitle1' color='turquoise'>
                            Ingresa tu titulo
                        </Typography>
                        <TextField 
                        variant='outlined' 
                        type='text'
                        fullWidth
                        className={classes.input}
                        placeholder={'ingresa tu titulo'}
                        onChange={(e:any) => {setValue('titulo', e.target.value)}}
                        error={errors && errors.titulo ? true : false}
                        helperText={errors && errors.titulo ? errors.titulo.message : null}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant='subtitle1' color='turquoise'>
                            Ingresa una descripcion
                        </Typography>
                        <TextField 
                        fullWidth
                        variant='outlined' 
                        type='text'
                        className={classes.input}
                        placeholder={'ingresa tu descripcion'}
                        onChange={(e:any) => {setValue('descripcion', e.target.value)}}
                        error={errors && errors.descripcion ? true : false}
                        helperText={errors && errors.descripcion ? errors.descripcion.message : null}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button sx={{margin:4}} color='secondary' variant='contained' type='submit'> Enviar</Button>
                        {/* <input type="submit" /> */}
                    </Grid>
                </Grid>
    
    
            </form>
            </Paper>
        );
    }
}else{
    return <Box m={2}>

        <Button variant='contained' color='secondary' onClick={()=> dispatch(signInWithGoogle())} > Dejar review </Button>
    </Box>
}
}
export default FormValoration