import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { env } from '../core/Env';
import { rqx } from '../core/request/API';
import { motion } from 'framer-motion';
import { Logo } from '../core/global/Icons';
import ErrorBot from '../assets/images/core/error_bot.jpg'

export const SSORqx = () => {

    return <Router><Validate /></Router>
}

const Validate = () => {
    const q = new URLSearchParams(useLocation().search);
    const [err, setErr] = useState(false)
	// const [preloader, setPreloader] = useState(false)

    // const history = useHistory()
    useEffect(() => {
        const __init = async () => {
            if (q.get('ainfo') !== null) {
                const ainfo = JSON.parse(q.get('ainfo'))
                const acc = await rqx.get(`<<global>>/${env()==='prod'?env():'sb'}/account/read`, {aid: ainfo.aid})

                if (typeof acc === 'object') {
                    setErr(false)
                    let d = new Date()
                    d.setDate(d.getDate() + 30);
                    
                    const strg = {
                        expiration: `${d.getMonth()+1}${d.getUTCDate()}${d.getUTCFullYear()}`,
                        ainfo: ainfo
                    }
                    localStorage.setItem('pos_biz_session', JSON.stringify(strg))
                    window.location.href = '/biz'
                } else {
                    setErr(true)
                }
                
            }
        }

        setTimeout(() => {
            __init()
        }, 2400);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return !err ? (
        <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <Box component={motion.div} animate={{ x: [100, 0], rotate: [30, -30, 0], opacity: [0, 1]}} transition={{ duration: 0.8 }} mt={0.5} zIndex={2}>
                <Logo size={60}/>
            </Box>
            <Box component={motion.div} animate={{ x: [-80, 0], opacity: [0, 1]}} transition={{ duration: 0.8, delay: 0.8 }} ml={1} zIndex={1}>
                <Box  fontSize={24} >POF<strong>Your Tool</strong></Box>
                <Box fontSize={12}>
                    Powered by: POFSIS
                </Box>
            </Box>
        </Box>
    ) : (
        <Box height="100%" width="100%" display="flex" justifyContent="center" bgcolor="#ffffff">
            <Box height="100%" width="400px" display="flex" justifyContent="center" alignItems="center">
                <Grid container>
                    <Grid item xs={12}>
                        <img src={ErrorBot} alt={ErrorBot} width="100%" />
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Box  fontSize={14} >POF<strong>Your Tool</strong></Box>
                            <Box fontSize={24}><b>SHEEESSHH!</b></Box> 
                            {/* <Box fontSize={18} mb={3}>Looks like an expolosion...</Box> */}
                            <Box fontSize={18} mb={3}>Well, this is unexpected. . .</Box>
                            <Box textAlign="justify" fontSize={14} mb={1}>
                                We were unable to authenticate you because your tool did not provide the proper authorization. Please contact your tool's customer support for assistance with this issue.
                            </Box>
                            <Box textAlign="justify" fontSize={14} color="gray">
                                Error code: AUTHORIZATION_ERROR. AID is invalid.
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}