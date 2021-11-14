import React, { useState } from 'react'
import Alert from '@mui/material/Alert';

interface Props {
    open :boolean,
    textAlert : string,
    severity: 'error'| 'warning' | 'success' | 'info',
    setOpen : (arg :boolean)=>void
}
const CustomAlert = ({open, textAlert, severity,setOpen}:Props) => {
    return (
        <div>
            {open && 
                <Alert onClose={() => {setOpen(false)}} variant='filled' severity={severity}>{textAlert}</Alert>
            }
        </div>
    )
}

export default CustomAlert
