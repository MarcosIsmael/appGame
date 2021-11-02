import React from 'react';
import { useForm, NestedValue } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grid, Paper, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { db } from '../firebase/firebase';

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
        valoracion:string,
        nombre:string,
        descripcion:string
      }
interface Props {
    customOnSubmit: (arg:Review)=> void
}
 const  FormValoration =({customOnSubmit}:Props)=> {
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
    valoracion:string,
    nombre:string,
    descripcion:string
  }>({
    // defaultValues: { select: 10 },
  });
  console.log(errors)  
  const onSubmit = handleSubmit(customOnSubmit);
    // const { ref: inputRef, ...inputProps } = register("nombre", {
    //     required: "error text"
    //   });
   React.useEffect(() => {

     register('valoracion', {
         max:{value:5, message:'solo hasta 5'},
         min:{value:0, message:'solo desde 0'},
         required:'campo requerido',         
    });
    register('nombre', {
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
                        Ingresa tu valoracion de 1 a 5
                    </Typography>
                    <TextField 
                    variant='outlined' 
                    fullWidth
                    type='number'
                    className={classes.input}
                    placeholder={'ingresa una valoracion de 1 a 5'}
                    onChange={(e:any) => {setValue('valoracion', e.target.value)}}
                    error={errors && errors.valoracion ? true : false}
                    helperText={errors && errors.valoracion ? errors.valoracion.message : null}
                    />
                </Grid>
                <Grid item xs>
                    <Typography variant='subtitle1' color='turquoise'>
                        Ingresa tu nombre
                    </Typography>
                    <TextField 
                    variant='outlined' 
                    type='text'
                    fullWidth
                    className={classes.input}
                    placeholder={'ingresa tu nombre'}
                    onChange={(e:any) => {setValue('nombre', e.target.value)}}
                    error={errors && errors.nombre ? true : false}
                    helperText={errors && errors.nombre ? errors.nombre.message : null}
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
export default FormValoration