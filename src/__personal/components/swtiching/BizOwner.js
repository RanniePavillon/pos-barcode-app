import { useState, useContext } from 'react';
import { Box, Divider, Button, useMediaQuery, Avatar, IconButton } from '@mui/material';
import { ToolContext } from "../../../core/context/ToolContext"
import { domain } from '../../../core/Env';
import { ArrowHeadLeft, SwitchingAcctIcons, SwitchingArrowIcons } from './style/Icons';
import { switchstyle } from './style/Switch';
import { useHistory } from 'react-router-dom';
import PSLLogo from '../../../assets/images/logos/logo_v1.png'
import BIZLogo from '../../../assets/images/logos/biz_logo.png'

export const BizOwner = () => {
    const { tool_state } = useContext(ToolContext)
    const __SESSION  = tool_state.__SESSION.data
    const xsm = useMediaQuery('(max-width:350px)');
    const nav = useHistory()

    const [opt1form, setOpt1form] = useState({ stat: false, step: '1', valid_otp: '', inputs: {account:{value: '', stat: false, msg: ''}, otp:{value: '', stat: false, msg: '', toggle: false}} });
    const classes = switchstyle(xsm);

    const redirectHandler = (type) => {
        let aid = __SESSION.ainfo.aid;
        if (type === 'op1') {
            if (__SESSION.ainfo.email !== null || __SESSION.ainfo.mobile_num !== null ) {
                let sainfo = {
                    account: window.btoa(`unauth_${__SESSION.ainfo.email}`),
                    va: 'email',
                    step: 2,
                    srf: '!default',
                    ref: 'business_owner'
                }
                window.location.href = `${domain('pm').url}/biz/switching/option1?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
            } else {
                setOpt1form({...opt1form, stat: true})
            }
        }else if(type === 'op2'){
            let sainfo = {
                aid: aid,
                va: 'email',
                ref: 'business_owner'
            }
            window.location.href = `${domain('pm').url}/biz/switching/option2?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
        }else{
            let sainfo = {
                aid: aid,
                va: 'email',
                ref: 'business_owner'
            }
            window.location.href = `${domain('pm').url}/biz/switching/option3?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
        }
    }

    return (
        __SESSION !== null && (
            <Box height={{xs:'462px', sm:'100%'}} width="100%" bgcolor="#F0F5F9" display="flex" flexDirection="column" justifyContent="center" alignItems="center"
            padding={xsm ? "56px 16px 0px 16px" : "56px 24px 0px 24px"}>
                <Box width={{xs:'100%', sm:'400px'}} height={{xs:'100%', sm:'480px'}} display="flex" flexDirection="column" gap={{xs:"24px", sm:"32px"}}>
                    <IconButton sx={{width:'20px', padding:'0px !important', borderRadius:'8px'}} onClick={()=>nav.push('/psl/switching/select')}>
                        <ArrowHeadLeft/>
                    </IconButton>
                    <Box height="40px" display="flex" justifyContent="center" alignItems="center" gap="12px">
                        <Avatar variant='square' src={PSLLogo} alt={PSLLogo} sx={{width:'40px', height:'40px'}} />
                        <SwitchingArrowIcons/>
                        <Avatar variant='square' src={BIZLogo} alt={BIZLogo} sx={{width:'40px', height:'40px'}} />
                    </Box>
                    <Box height={{xs:'72px', sm:'83px'}} display="flex" flexDirection="column" gap={{xs:'8px', sm:'12px'}} >
                        <Box fontSize={{xs:16, sm:20}} fontWeight={600} color="#283745" lineHeight={{xs:'26px', sm:'32px'}}>Select Your Business Account</Box>
                        <Box fontSize={{xs:12, sm:14}} fontWeight={400} color="#283745" lineHeight={{xs:'19px', sm:'20px'}} letterSpacing="-0.2px">
                            <Box component="span" fontWeight={600}>You select Business owner.</Box> Register a new business account or link an existing one.
                        </Box>
                    </Box>
                    <Box height={xsm ? '202px':'241px'} display="flex" flexDirection="column" gap="16px" color="#283745">
                        {(__SESSION.ainfo.user_type === 1 && (__SESSION.ainfo.account_type === 1 || __SESSION.ainfo.account_type === 2)) && (
                            <Box height={xsm ? '82px' : '101px'}>
                                <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'19px', sm:'23px'}} color="#283745" pb="12px">Use Personal Account</Box>
                                <Box display="flex" flexDirection="column" gap="16px">
                                    <Button onClick={()=>redirectHandler('op1')} className={classes.opt1}>
                                        <Box display="flex" flexDirection="column" gap={{xs:'0px', sm:"4px"}}>
                                            <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'20px', sm:'23px'}} letterSpacing="-0.2px"  sx={{width:'100%', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{__SESSION.ainfo.email !== null ? __SESSION.ainfo.email : __SESSION.ainfo.mobile_num}</Box>
                                            <Box fontSize={{xs:11, sm:12}} fontWeight={400} lineHeight={{xs:'15px', sm:"19px"}} letterSpacing="-0.2px">Personal account</Box>
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        )}
                        <Box height="142px">
                            <Box display="flex" flexDirection="column" gap="16px">
                                <Button onClick={()=>redirectHandler('op2')} className={classes.opt2}>
                                    <Box display="flex" alignItems="center" gap="10px">
                                        <SwitchingAcctIcons/>
                                        <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'20px', sm:"16px"}} color="#283745">Link existing business account</Box>
                                    </Box>
                                </Button>
                                <Divider sx={{bgcolor:'#C9D6DF'}} />
                                <Button onClick={()=>redirectHandler('op3')} className={classes.opt3}>
                                    <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'20px', sm:"16px"}} color="#283745">Create new account</Box>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    )
}