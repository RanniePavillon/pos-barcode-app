import React, { useRef, useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import { Box, IconButton } from '@mui/material';

export const BarcodeScanner = ({ onDetected }) => {

    const [scan, setScan] = useState(false) 
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const __init = async() => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment'
                }
            });
    
            videoRef.current.srcObject = stream;
        }
        __init()
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    width: { max: window.innerWidth },
                    height: { max: window.innerHeight },
                    facingMode: 'environment',
                },
                area: { top: "10%", right: "10%", left: "10%", bottom: "10%" }
            },
            locator: {
                halfSample: true,
                patchSize: 'large', // x-small, small, medium, large, x-large
                debug: {
                    showCanvas: false,
                    showPatches: false,
                    showFoundPatches: false,
                    showSkeleton: false,
                    showLabels: false,
                    showPatchLabels: false,
                    showRemainingPatchLabels: false,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true,
                    },
                },
            },
            numOfWorkers: 4,
            decoder: {
                readers: ['code_128_reader'],
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true,
                },
            },
            locate: true,
        },
            function (err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        if (scan) {
            Quagga.onDetected(_onDetected);
            // console.clear()
        }
        return () => {
            Quagga.offDetected(_onDetected);
        };
        // eslint-disable-next-line
    }, [scan]);
    
    const _onDetected = (result) => {
        if (scan) {
            onDetected(result);
            if (result) {
                setScan(prev=>!prev)
            }
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Quagga.offDetected(_onDetected);
    };

    const scanReadyHandler = () => {
        if (!scan) {
            setScan(prev=>!prev)
            Quagga.onDetected(_onDetected);
        }
    }
    
    return (
        <div style={{ position: 'relative' }}>
            <video ref={videoRef} id="interactive" className="viewport" style={{ width: '100%' }} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', zIndex: 100 }} />
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="80" height="40" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2" />
                </svg>
            </div>
            <Box width="100%" display="flex" justifyContent="center">
                <IconButton onClick={scanReadyHandler} sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0px", height:"64px !important", width:"100px", bgcolor:scan ?'#107038':'#FFFFFF', borderRadius:"4px", '&:hover':{ bgcolor: scan ?'#107038':'#FFFFFF' }}}>
                    <Box color={scan ?'#FFFFFF':'#000000'} fontWeight={600} fontSize={14} lineHeight="16px" textAlign="center">SCAN</Box>
                </IconButton>
            </Box>
        </div>
    )
};