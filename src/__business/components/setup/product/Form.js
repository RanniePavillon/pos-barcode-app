import { useState } from "react"
import { Box, Grid, IconButton } from "@mui/material"
import { LeftArrowTCIcons } from "../../../../core/global/Icons"
import { useHistory } from "react-router-dom"
import { CstmTextField } from "../../../../core/global/forms/CstmTextField"
import { TxtNumber } from "../../../../core/global/Format"
import { BarcodeGenerator } from "./BarcodeGenerator"
// import { QRCodeGenerator } from "./QRCodeGenerator"

export const Form = ({pdata, pLoader}) => {
    const nav = useHistory()
    const [pForm, setPForm] = useState({
        id:pdata.data.length + 1,
        name:'',
        qty:'',
        price:'',
        barcode:''
    })

    const redirectHandler = () => {
        setPForm({id:0, name:'', qty:0, price:0, barcode:[]})
        nav.push('/biz/products/list')
    }

    const changeHandler = (e) => {
        const {name, value} = e.target
        setPForm({...pForm, [name]:value, barcode:`0000000${pdata.data.length + 1}`})
    }

    const submitHandler = (e) => {
        if (pForm.name === '' || pForm.qty === '' || pForm.price === '') {
            alert('All fields are required!')
        }else{
            pLoader.set(true)
            pdata.set([...pdata.data, {...pForm}])
            nav.push('/biz/products/list')
        }
    }

    return (
        <Box width="100%" display="flex" flexDirection="column" py="16px">
            <Box display="flex" gap="8px" bgcolor="rgb(236, 236, 236)" borderRadius="6px 6px 0px 0px" p="8px" fontWeight={600}>
                <Box>Create Product</Box>
            </Box>
            <Box height="100%" width="100%" bgcolor="#FFFFFF" borderRadius="0px 0px 6px 6px" px="4px" py="16px">
                <Box width="100%" display="flex" justifyContent="space-between" mb="16px">
                    <IconButton onClick={()=>redirectHandler()} sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0px", height:"25px !important", width:"50px",}}>
                        <LeftArrowTCIcons stroke="#107038"/>
                    </IconButton>
                    <IconButton onClick={(e)=>submitHandler(e)} sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0px", height:"30px !important", width:"70px", bgcolor:"#107038", borderRadius:"4px", '&:hover':{ bgcolor: '#107038' }}}>
                        <Box color="#FFFFFF" fontWeight={600} fontSize={10} lineHeight="16px" textAlign="center">SAVE</Box>
                    </IconButton>
                </Box>
                <Box p="8px" mb="8px" display="flex" justifyContent="center" alignItems="center" fontSize={12} fontWeight={600}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CstmTextField onChange={(e)=>changeHandler(e)} autoComplete='off' size="small" fullWidth variant="outlined" label="Name" name="name" placeholder='ex: Egg Plant' value={pForm.name}/>
                        </Grid>
                        <Grid item xs={12}>
                            <CstmTextField onChange={(e)=>changeHandler(e)} autoComplete='off' size="small" onPaste={(e)=>{ e.preventDefault() }} onKeyPress={(e)=>TxtNumber(e)} inputProps= {{ maxLength: 6 }} fullWidth variant="outlined" label="Quantity" name="qty" value={pForm.qty}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CstmTextField onChange={(e)=>changeHandler(e)} autoComplete='off' size="small" onPaste={(e)=>{ e.preventDefault() }} onKeyPress={(e)=>TxtNumber(e)} inputProps= {{ maxLength: 10 }} fullWidth variant="outlined" label="Price" name="price" value={pForm.price}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <BarcodeGenerator pForm={pForm}/>
                {/* <QRCodeGenerator pForm={pForm}/> */}
            </Box>
        </Box>
    )
}