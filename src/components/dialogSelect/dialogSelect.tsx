import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TipoFiltro } from '../../utils/interfaces'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFilters } from '../../slices/gameSlice';
type State =  string
interface Props {
    title : TipoFiltro,
    titleDialog :string,
    optionsSelect:string[],
    handleClick:(data:string, tipo:TipoFiltro)=>void
}
export default function DialogSelect(props: Props) {
  const [open, setOpen] = React.useState(false);
  const filtros = useAppSelector((state)=> state.game.filters)[props.title]
  const [age, setAge] = React.useState<State>(filtros);
  const dispatch = useAppDispatch()


  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setFilters({type:props.title, value:event.target.value}))

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event :  object, reason:string) => {
    if(reason === 'filtrar' && filtros){
      props.handleClick(filtros, props.title)
    }
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
    if(reason === 'cancelar'){
      dispatch(setFilters({type:props.title, value:''}))

    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Button onClick={handleClickOpen} variant='outlined' style={{margin:'auto'}}>{props.title}</Button>
      <Dialog  disableEscapeKeyDown open={open} onClose={ (event,reason)=> handleClose(event,reason)}>
        <DialogTitle>{props.titleDialog}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120, width:300 }} >
              <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
              <Select
                native
                value={filtros}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {props.optionsSelect.map((item,index) => {
                  return (
                    <option key={index} value={item}>{item}</option>

                  )
                })}
                {/* <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
                <option value={30}>Thirty</option>
                <option value={30}>Thirty</option> */}
 


              </Select>
            </FormControl>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>handleClose({},'cancelar')}>Cancel</Button>
          <Button  onClick={()=>handleClose({},'filtrar')}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
