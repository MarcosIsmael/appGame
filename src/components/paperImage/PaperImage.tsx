import { Grid, Paper } from '@mui/material'
import React from 'react'

interface Props {
    img : string,
    xl?:boolean
}
const PaperImage = ({img, xl}:Props) => {
    return (
        <Grid container>
            { xl ?
            <Grid item xs={12}>
                <Paper elevation={4} style={{
                    width: !xl ? '395px': '100%',
                    height:'235px',
                    backgroundRepeat:'no-repeat',
                    backgroundImage:`url('${ img}')`,
                    backgroundSize:'cover',
                    // border:'2px solid white',
                    margin:4
                }} />
            </Grid>
                :
                <Grid item xs>
                <Paper elevation={4} style={{
                    width: !xl ? '395px': '100%',
                    height:'235px',
                    backgroundRepeat:'no-repeat',
                    backgroundImage:`url('${ img}')`,
                    backgroundSize:'cover',
                    // border:'2px solid white',
                    margin:4
                }} />
            </Grid>
            }
        </Grid>
    )
}

export default PaperImage
