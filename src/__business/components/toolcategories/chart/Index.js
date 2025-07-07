import { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { env } from '../../../../core/Env';
import { rqx } from '../../../../core/request/API';
import { NoToolsIcons } from '../../../../core/global/Icons';
import { ChartLoader } from '../Loader';

export const Index = ({data, match}) => {
    const [trdata, setTrdata] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const __init = async() => {
            setLoader(true)
            let res = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/reports/tcatreport`, {category_id:parseInt(window.atob(match))});
            if (res) {
                let f = res.total_tools_reg.map((v) => { 
                    const red = Math.floor(Math.random() * 256);
                    const green = Math.floor(Math.random() * 256);
                    const blue = Math.floor(Math.random() * 256);
                    let rgba = `rgba(${red}, ${green}, ${blue})`
                    return {...v, color:rgba, count:parseFloat((v.count/res.total_biz_count) * 100).toFixed(2) } 
                } )
                setTrdata(f)
            }
            setTimeout(() => {
                setLoader(false)
            }, 1000);
        }
        let subscribe = true
        if (subscribe) {
            __init()
        }
        return () => subscribe = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])
    
    return (
        <Box pt={{md: "16px"}}>
            {
                loader ? 
                    <ChartLoader/>
                :
                    <Box pt={{md: "16px"}} px={{md: "24px"}} minHeight="380px" bgcolor="#FFFFFF" borderRadius="6px" display="flex" alignItems={{xs: "flex-start", md: "center"}} flexDirection="column">
                        <Box display="flex" justifyContent="center" width="100%" >
                            <Box color="#313131" fontWeight={{xs: 600, md: 400}} fontSize={12} lineHeight="16px">{ (!loader && trdata.length > 0) && `${data[0].name} Analytics`}</Box>
                        </Box>
                        <Box height="380px" width="100%" position="relative">
                            {
                                (trdata.length === 0 ?
                                    <Box position="absolute" width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                                        <Box textAlign="center">
                                            <NoToolsIcons/>
                                            <Box color="#333333" fontWeight={400} fontSize={14} lineHeight="16px">No Graphical Report Found</Box>
                                        </Box>
                                    </Box>
                                :
                                    <>
                                        <Box position="relative" display="flex" height="100%" width="100%">
                                            <Box pt="13px" display="flex" flexDirection="column" gap="43px" height="100%" width={{xs: "26px", md: "32px"}}>
                                                {['100%','80%','60%','40%','20%','0%'].map((v,k) => (
                                                    <Box key={k} sx={{opacity:0.56, color:'#313131', fontSize: {xs: '10px', md: '12px'}, lineHeight:"16px"}}>{v}</Box>
                                                ))}
                                            </Box>
                                            <Box height="100%" width="100%" position="relative" pl="8px">
                                                <Box position="absolute" pt="20px" display="flex" flexDirection="column" gap="57px" height="100%" width="100%">
                                                    {['','','','','',''].map((v,k) => (
                                                        <Box key={k} border="1px solid #000000" sx={{opacity:0.05}}></Box>
                                                    ))}
                                                </Box>
                                                <Box position="absolute" pt="20px" display="flex" justifyContent="space-between" minHeight="315px" width="100%">
                                                    {['','','','','','','',''].map((v,k) => (
                                                        <Box key={k} border="1px solid #000000" sx={{opacity:0.05}}></Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                            <Box position="absolute" display="flex" width="100%" height="100%">
                                                {trdata.map((v,k) =>(
                                                    <Box key={k} mt={-3.5} display="flex" flexDirection="column-reverse" alignItems="center" width="100%" height="100%">
                                                        <Box display="flex" alignItems="center" gap="8px">
                                                            <Box width="12px" height="12px" borderRadius="50%" border={`1px solid ${v.name === 'POFTeambond' ? "#0FB5AE" : v.color}`} display="flex" justifyContent="center" alignItems="center">
                                                                <Box width="6px" height="6px" borderRadius="50%" bgcolor={v.name === 'POFTeambond' ? "#0FB5AE" : v.color} />
                                                            </Box>
                                                            <Box color="#333333" fontWeight={400} fontSize={12} lineHeight="16px">{v.name}</Box>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box position="absolute" display="flex" justifyContent="center" width="100%" height="100%" pt="20px" pb="64px">
                                                {trdata.map((v,k) => (    
                                                    <Box key={k} display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" width="100%" height="100%">
                                                        <Tooltip title={`${v.count}%`} placement="top" arrow>
                                                            <Box className='c-pointer' component={motion.div} animate={{ y: [10, 0], opacity: [0, 2], scale:[0,1]}} whileHover={{ backgroundColor:'#F0F6F3'}} width={{xs:'56px', lg:'80px'}} height={`${v.count}%`} bgcolor={v.name === 'POFTeambond' ? "#0FB5AE" : v.color} borderRadius="2px"/>
                                                        </Tooltip>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </>
                                )
                            }
                        </Box>
                    </Box>
            }
        </Box>
    )
}