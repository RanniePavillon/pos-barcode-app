import React, { useEffect, useState } from 'react'
import { useBarcode } from '@createnextapp/react-barcode'
import { Box } from '@mui/material';

export const BarcodeGenerator = ({pForm}) => {
    const [barcode, setBarcode] = useState('0000000');
   
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
            background: '#FFFFFF',
            textAlign: 'center'
        }
    });

    useEffect(() => {
        const __init = () => {
            let code = barcode + pForm.id
            setBarcode(code)
        }
        __init()
        // eslint-disable-next-line
    }, [])
    
    return (
        <Box width="100%" display="flex" justifyContent="center">
            {
                barcode !== '' ?
                    <canvas id="posBarcode" ref={inputRef} />
                :
                    <p>No barcode preview</p>
            }
        </Box>
    );
}