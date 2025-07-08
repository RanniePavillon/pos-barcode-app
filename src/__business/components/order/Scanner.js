import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode"
import { Box } from '@mui/material';
import useSound from 'use-sound';
import clickNoise from '../../../assets/mp3/barcode_scanner_beep.wav'
// import clickNoise from '../../../assets/mp3/click-noise.mp3'

export const Scanner = ({cameraAllowed, pdata, cart, results }) => {
    const [play] = useSound(clickNoise);
    const [scan, setScan] = useState(false);

    // const resumeHandler = () => {
    //     setScan(false)
    // }

    const QRScanner = async () => {
        let crt = [...cart.data]
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox:{
                width:200,
                height:180,
            },
            fps:10,
            aspectRatio: 1.0,
            supportedScanTypes: [Html5QrcodeScanner.SCAN_TYPE_CAMERA],
            videoConstraints:{
                facingMode:'environment',
                width: { ideal: 640 },     // or '100%' if wrapped in CSS
                height: { ideal: 480 }
            },
            experimentalFeatures: { useBarCodeDetectorIfSupported: true },
        })
        scanner.render(success)   

        function success(result){
            console.log(result)
            // let ids = result.slice(7);
            // console.log(ids)
            // console.log(pdata.data)
            // let fdata = pdata.data.filter(v => v.id === parseInt(ids))
            let fdata = pdata.data.filter(v => v.barcode === result)
            if (fdata.length > 0) {
                crt  =  [...crt, {...fdata[0], id:cart.data.length + 1, pid:fdata[0].id, total_price:fdata[0].price}]
                cart.set((data) => data = crt)
            }
            results.set((data) => data = fdata)
            setScan(true)
            scanner.pause()
            setTimeout(()=>{
                scanner.resume()
                setScan(false)
            }, 1500)
        } 
    }

    useEffect(() => {
        if (scan) {
            play()
        }
        // eslint-disable-next-line 
    }, [scan])

    useEffect(() => {
        QRScanner()
        // if (scan && results.data.length > 0) {
        //     SoundClick()
        //     ScannerReady()
        // }
        // if (!scan) {
        //     const scanner = new Html5QrcodeScanner('reader', {
        //         qrbox:{
        //             width:200,
        //             height:180,
        //         },
        //         fps:2,
        //         videoConstraints:{
        //             facingMode:'user'
        //         }
        //     })
        //     scanner.render(success)   
    
        //     function success(result){
        //         console.log(result)
        //         let ids = result.slice(7);
        //         let fdata = pdata.data.filter(v => v.id === parseInt(ids))
        //         if (fdata.length > 0) {
        //             cart.set([...cart.data, {...fdata[0], id:cart.data.length + 1, pid:ids, total_price:fdata[0].price}])
        //         }
        //         results.set(() => fdata)
        //         setScan(true)
        //         scanner.pause()
        //         SoundClick()
        //         // scanner.clear();
        //     } 
        // }
        // eslint-disable-next-line
        // eslint-disable-next-line 
    }, [])
   
    return (
        <>
            {scan && (
                <Box sx={{display: 'block', position:'absolute', top:'41px', zIndex:'2 !important', bgcolor:'#FFFFFF', textAlign:'center', width:'100%'}}>
                    <Box fontWeight={700}>Wait to ready scan...</Box>
                </Box>
            )}
            <Box sx={{height:'290px !important'}} id="reader"></Box>
            {/* <Box width="100%" display="flex" justifyContent="center" mt={1}>
                <IconButton onClick={resumeHandler} sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0px", height:"64px !important", width:"100%", bgcolor:scan ?'#107038':'#FFFFFF', borderRadius:"4px", '&:hover':{ bgcolor: scan ?'#107038':'#FFFFFF' }}}>
                    <Box color={scan ?'#FFFFFF':'#000000'} fontWeight={600} fontSize={14} lineHeight="16px" textAlign="center">{scan ? 'SCAN' : 'SCANNING...'}</Box>
                </IconButton>
            </Box> */}
        </>
    );
}