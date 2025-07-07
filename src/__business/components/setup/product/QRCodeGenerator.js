import React, {useState } from 'react'
import { Box } from '@mui/material';
import QRCode from "react-qr-code";

export const QRCodeGenerator = ({pForm}) => {
    const [qrCodeData] = useState('0000000');

    return (
        <Box width="100%" display="flex" justifyContent="center">
            {
                qrCodeData !== '' ?
                    <QRCode id='posBarcode' value={qrCodeData}/>
                :
                    <p>No QRcode preview</p>
            }
        </Box>
    );
}