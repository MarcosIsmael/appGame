import React, { useEffect, useState } from 'react'
// import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
// import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
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


    useEffect(()=>{
        setCheck(active)
    },[active])

    if(check){
        return <ThumbUpIcon color='primary' fontSize='large' onClick={()=> handleChange(false)}/>
    }else{
        return <ThumbUpOutlinedIcon color='primary' fontSize='large' onClick={()=> handleChange(true)}/>
    }


}

export default Favorite
