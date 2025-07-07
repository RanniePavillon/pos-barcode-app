import { useState, useContext } from 'react';
import { Box, Divider, Button, useMediaQuery } from '@mui/material';
import { ToolContext } from "../../../core/context/ToolContext"
import { domain } from '../../../core/Env';
import { SwitchingAcctIcons, SwitchingArrowIcons } from './style/Icons';
import { switchstyle } from './style/Switch';
import PSLLogo from '../../../assets/images/logos/logo_v1.png'
import BIZLogo from '../../../assets/images/logos/biz_logo.png'

export const Switching = () => {
    const { tool_state } = useContext(ToolContext)
    const __SESSION  = tool_state.__SESSION.data
    const xsm = useMediaQuery('(max-width:350px)');

    const [opt1form, setOpt1form] = useState({ stat: false, step: '1', valid_otp: '', inputs: {account:{value: '', stat: false, msg: ''}, otp:{value: '', stat: false, msg: '', toggle: false}} });
    const classes = switchstyle(xsm);

    const redirectHandler = (type) => {
        let aid = __SESSION.ainfo.aid;
        if (type === 'op1') {
            if (__SESSION.ainfo.email !== null) {
                let sainfo = {
                    account: window.btoa(`unauth_${__SESSION.ainfo.email}`),
                    va: 'email',
                    step: 2,
                    srf: '!default'
                }
                window.location.href = `${domain('pm').url}/psl/switching/option1?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
            } else {
                setOpt1form({...opt1form, stat: true})
            }
        }else if(type === 'op2'){
            let sainfo = {
                aid: aid,
                va: 'email'
            }
            window.location.href = `${domain('pm').url}/psl/switching/option2?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
        }else{
            let sainfo = {
                aid: aid,
                va: 'email'
            }
            window.location.href = `${domain('pm').url}/psl/switching/option3?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
        }
    }

    return (
        __SESSION !== null && (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={{xs:'418px', sm:'100%'}} width="100%">
                <Box pt={{xs:'56px', sm:'0px'}} height={{xs:'418px', sm:'435px'}} width={{xs:'327px', sm:'400px'}} display="flex" flexDirection="column" gap="32px">
                    <Box height="40px" display="flex" justifyContent="center" alignItems="center" gap="12px">
                        <img src={BIZLogo} alt={BIZLogo} width={40} height={40} />
                        <SwitchingArrowIcons/>
                        <img src={PSLLogo} alt={PSLLogo} width={40} height={40} />
                    </Box>
                    <Box height="90px" display="flex" flexDirection="column" gap="12px" px={xsm ? 3 : 0}>
                        <Box fontSize={{xs:16, sm:20}} fontWeight={600} color="#283745" lineHeight={{xs:'26px', sm:'32px'}}>Link Account Options</Box>
                        <Box fontSize={{xs:12, sm:14}} fontWeight={400} color="#283745" lineHeight={{xs:'19px', sm:'23px'}}>
                            By linking your account, you can seamlessly switch between your business and personal account.
                        </Box>
                    </Box>
                    <Box height={xsm ? '202px':'243px'} display="flex" flexDirection="column" gap="16px" px={xsm ? 3 : 0}>
                        {(__SESSION.ainfo.user_type === 1 && (__SESSION.ainfo.account_type === 1 || __SESSION.ainfo.account_type === 2)) && (
                            <Box height={xsm ? '82px' : '101px'}>
                                <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'19px', sm:'23px'}} color="#283745" pb="8px">Use Business Account</Box>
                                <Box display="flex" flexDirection="column" gap="16px">
                                    <Button onClick={()=>redirectHandler('op1')} className={classes.opt1}>
                                        <Box display="flex" flexDirection="column" gap={{xs:'0px', sm:"4px"}}>
                                            <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'20px', sm:'23px'}}  sx={{width:'100%', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{__SESSION.ainfo.email !== null ? __SESSION.ainfo.email : __SESSION.ainfo.mobile_num}</Box>
                                            <Box fontSize={{xs:11, sm:12}} fontWeight={400} lineHeight={{xs:'15px', sm:"19px"}}>Business account</Box>
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
                                        <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight={{xs:'20px', sm:"16px"}} color="#283745">Link existing personal account</Box>
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