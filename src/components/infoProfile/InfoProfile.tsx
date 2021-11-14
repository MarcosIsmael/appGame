import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Grid } from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import Avatar from '@mui/material/Avatar';
import { logout, signInWithGoogle } from '../../slices/authSlice';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

type Type = 'login' | 'logout' | 'favoritos'| undefined
export default function InfoProfile() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authState = useAppSelector((state)=> state.auth)
  const history = useHistory()
const dispatch = useAppDispatch()

  const handleMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type:Type) => {
      if(type === 'login'){
          dispatch(signInWithGoogle())
      }
      if(type === 'logout'){
          dispatch(logout())
      }
      if(type === 'favoritos'){
          history.push('/favorites')
      }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color='transparent'>
          
        <Toolbar>
            <Grid container direction='row' justifyContent='flex-end'>
                {/* <Grid item xs={10}>
                    {authState.logueado &&      
                        <Typography variant="h6" component="h6" color='secondary' >
                            Hola!  {authState.user.nombreCompleto} {authState.user.mail}
                        </Typography>
                    }
                </Grid> */}
                <Grid item xs={4} sm={6}></Grid>
                   <Grid item xs={8} sm={6}>                     
                     <Button onClick={()=> history.push('/')}>Home</Button>
                     <Button  onClick={()=> history.push('/favorites')}> Favorites</Button>
                </Grid>

            </Grid>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              {!authState.logueado ? 
              
              <AccountCircle color='primary' fontSize='large'/>
              : < Avatar alt={authState.user.nombreCompleto} color='primary' src={authState.user.image} />
            }  
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={()=>handleClose(undefined)}
                >
                {!authState.logueado ? (
                        <MenuItem color='secondary' onClick={ ()=>handleClose('login')}>Iniciar sesion</MenuItem>
                ) : 

                        <MenuItem  color='secondary' onClick={()=>handleClose('logout')}>Cerrar sesion</MenuItem>

                }
                <MenuItem  color='secondary' onClick={()=>handleClose('favoritos')}>Favoritos</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
