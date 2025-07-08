import React, { useContext, useState } from 'react';
import { Box, Container, IconButton } from '@mui/material';
// import { BarcodeScanner } from './BarcodeScanner';
import { ToolContext } from '../../../core/context/ToolContext';
import { Scanner } from './Scanner';
import { useEffect } from 'react';
import moment from "moment";

export const Orders = () => {
    const { product_state, order_state } = useContext(ToolContext)
    const { pdata } = product_state
    const { cart, results } = order_state
    // const _onDetected = (result) => {
    //     let ids = result.codeResult.code.slice(7);
    //     let fdata = pdata.data.filter(v => v.id === parseInt(ids))
    //     if (fdata.length > 0) {
    //         cart.set([...cart.data, {...fdata[0], id:cart.data.length + 1, pid:ids, total_price:fdata[0].price}])
    //     }
    //     results.set(() => fdata)
    // };

    let total = cart.data.reduce((prev, current) => {
        return prev + +current.total_price;
    }, 0);


    const [cameraAllowed, setCameraAllowed] = useState(false)
    
    useEffect(() => {
        // Check if the browser supports mediaDevices and getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.log('getUserMedia is not supported');
          return;
        }
    
        // Check camera permission
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
            setCameraAllowed(true);
            console.log('Camera access granted');
        })
        .catch((error) => {
            console.log('Camera access denied:', error);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Box width="100%" height="100%">
            <Box sx={{height:'360px !important'}}>
                <Scanner cameraAllowed={cameraAllowed} pdata={pdata} cart={cart} results={results}/>
                {/* <BarcodeScanner onDetected={_onDetected} /> */}
            </Box>
            <Container sx={{mt:2}}>
                <Box width="100%" bgcolor="#FFFFFF" borderRadius="6px" p={2}>
                    {results.data.length > 0 ?
                        results.data?.map((v,k) => (
                            <Box key={k} width="100%" display="flex" flexDirection="column" gap="8px" fontSize={12}>
                                <Box fontSize={14} fontWeight={600}>Last Scanned Details</Box>
                                <Box><b>Name: </b>{v.name}</Box>
                                <Box><b>Qty: </b>{v.qty}</Box>
                                <Box><b>Price: </b>{v.price}</Box>
                                <Box><b>Barcode: </b>{v.barcode}</Box>
                                <Box><b>Date & Time: </b>{moment().format('MM-DD-YYYY hh:mm:ss a')}</Box>
                            </Box>
                        ))
                    :
                        <Box textAlign="center" width="100%" display="flex" flexDirection="column" gap="8px">
                            <Box fontWeight={600}>NO RECORD FOUND</Box>
                        </Box>
                    }
                </Box>
            </Container>
            <Box width="100%" position="absolute" bottom={120}>
                <IconButton sx={{px:'16px', display:"flex", justifyContent:"space-between", alignItems:"center", gap:"8px", height:"64px !important", width:"100%", bgcolor:'#107038', borderRadius:"4px", '&:hover':{ bgcolor:'#107038'}}}>
                    <Box display="flex" alignItems="center" gap="8px">
                        <Box color={'#FFFFFF'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">{cart.data.length}</Box>
                        <Box color={'#000000'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">Items</Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap="8px">
                        <Box color={'#000000'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">Subtotal:</Box>
                        <Box color={'#FFFFFF'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">₱ {parseFloat(total).toFixed(2)}</Box>
                    </Box>
                </IconButton>
            </Box>
            {/* <Box width="100%" position="absolute" bottom={120}>
                <Box color="#FFFFFF" height="64px" bgcolor="#107038" display="flex" justifyContent="space-around" alignItems="center">
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box fontWeight={700}>2</Box>
                        <Box>ITEMS</Box>
                    </Box>
                    <Box>
                        Subtotal:
                    </Box>
                </Box>
            </Box> */}
        </Box>
    );
};