import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { VeriticalThreeDots } from "../../../../core/global/Icons"
import { Add } from "@mui/icons-material"
import { NoResult } from "../../empty/Index"
import { Loader } from "../../fetching/Loader"
import { PMenu } from "./Menu"

export const List = ({pdata, pLoader}) => {
    const nav = useHistory()
    const [mdata, setMdata] = useState({anchor:null, value:[]});

    const menuHandler = (e, v) => {
        e.preventDefault()
        setMdata({anchor:e.currentTarget, value:v})
    }
   
    useEffect(() => {
        const __init = () => {
            setTimeout(() => {
                pLoader.set(false)
            }, 1000);
        }
        __init()
        // eslint-disable-next-line
    }, [])
    
    return (
        <Box display="flex" flexDirection="column" py="16px">
            <Box display="flex" gap="8px" bgcolor="rgb(236, 236, 236)" borderRadius="6px 6px 0px 0px" p="8px" fontWeight={600}>
                <Box>Product</Box>
            </Box>
            <Box height="100%" width="100%" bgcolor="#FFFFFF" borderRadius="0px 0px 6px 6px" px="4px" py="16px">
                <Box width="100%" display="flex" justifyContent="flex-end" mb="16px">
                    <IconButton onClick={()=>nav.push('/biz/products/create')} sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0px", height:"30px !important", width:"90px", bgcolor:"#107038", borderRadius:"4px", '&:hover':{ bgcolor: '#107038' }}}>
                        <Add sx={{color:'#FFFFFF', width:20, height:20}}/>
                        <Box color="#FFFFFF" fontWeight={600} fontSize={10} lineHeight="16px" textAlign="center">CREATE</Box>
                    </IconButton>
                </Box>
                <Box p="8px" mb="8px" display="flex" justifyContent="center" alignItems="center" fontSize={12} fontWeight={600}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>Name</Grid>
                        <Grid item xs={2}>Qty</Grid>
                        <Grid item xs={2}>Price</Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Box>
                <Box height="100%" display="flex" flexDirection="column" gap="8px">
                    {pLoader.data ? 
                        <Box height="100px">
                            <Loader rem="0.5rem"/>
                        </Box>
                    :
                        (pdata.data.length === 0 ? 
                            <NoResult/>
                        :
                            pdata.data?.map((v,k) => (
                                <Box key={k} p="16px" display="flex" justifyContent="center" alignItems="center" fontSize={12} border="1px solid rgb(235, 235, 235)" borderRadius="4px">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography sx={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', fontSize:12}}>
                                                {v.name} 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>{v.qty}</Grid>
                                        <Grid item xs={2}>{parseFloat(v.price).toFixed(2)}</Grid>
                                        <Grid item xs={2}>
                                            <IconButton sx={{p: '0px'}} onClick={(e)=>menuHandler(e, v)}>
                                                <VeriticalThreeDots fill={"#737373"} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )).reverse()
                        )
                    }
                </Box>
            </Box>
            <PMenu mdata={mdata} setMdata={setMdata}/>
        </Box>
    )
}