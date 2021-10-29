import React, { useState } from 'react'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
interface Props {
    active: boolean,
    onChange : (arg : boolean)=> void
}
const Favorite = ({active, onChange}:Props) => {
const [check,setCheck] = useState(active)
const handleChange = (active:boolean)=>{
    setCheck(active)
    onChange(active)
}
    if(check){
        return <StarsRoundedIcon color='primary' fontSize='large' onClick={()=> handleChange(false)}/>
    }else{
        return <StarsOutlinedIcon color='primary' fontSize='large' onClick={()=> handleChange(true)}/>
    }
}

export default Favorite
