import { useContext, useState } from "react";
import { Box, Button, Zoom } from "@mui/material";
import { rqx } from "../../../../../core/request/API";
import { env, domain } from "../../../../../core/Env";
import { ToolContext } from "../../../../../core/context/ToolContext";
import { VM } from "../../../../../core/VM";
import { LightToolTip } from "../../../../../core/global/ToolTip";

let view = VM()
export const Platform = ({ __SESSION }) => {
    const { tool_state } = useContext(ToolContext)
    const [isOpen, setIsOpen] = useState(false)

    // eslint-disable-next-line 
    const redirect = async (e, name) => {
        if (__SESSION !== null) {
            if (name === 'psl') {
                if (__SESSION.ainfo.account_type !== 2) {
                    tool_state.preload.set({loader:true, logo:'https://pofsis-repo.s3.amazonaws.com/mt/phases/1679031734840.png'})
                    window.open(`${domain('psl').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.ainfo))}`, '_blank').focus()
                    setTimeout(() => {
                        tool_state.preload.set({...tool_state.preload.data, loader:false})
                    }, 2000);
                } else {
                    let res = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/account/getlinkaccount`, {aid: __SESSION.ainfo.aid, mode: 'linkaccount'})
                    if (res.length > 0) {
                        let d = {account_type:res[0].account_type, aid:window.btoa(`account_${res[0].id}`), email:res[0].email, mobile_num:res[0].mobile_num, user_type:res[0].user_type, username:res[0].username}
                        tool_state.preload.set({loader:true, logo:'https://pofsis-repo.s3.amazonaws.com/mt/phases/1679031734840.png'})
                        window.open(`${domain('psl').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(d))}`, '_blank').focus()
                        setTimeout(() => {
                            tool_state.preload.set({...tool_state.preload.data, loader:false})
                        }, 2000);
                    } else {
                        window.open(process.env.REACT_APP_URL_TOOL_PSL+'/switching', '_blank').focus()
                    }
                }
            }else{
                if (__SESSION.ainfo.account_type === 2) {
                    window.location.href = `${domain('biz').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.ainfo))}`
                } else {
                    let gla = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/account/getlinkaccount`, {aid: __SESSION.ainfo.aid})
                    if (gla.length > 0) {
                        let ainfo = {
                            aid: gla[0].id,
                            email: gla[0].email,
                            mobile_num: null,
                            account_type: gla[0].account_type,
                            username: null
                        }

                        window.open(`${domain('biz').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(ainfo))}`, '_blank').focus()
                    } else {
                        window.open(`/psl/switching/select`, '_blank').focus()
                    }
                }
            }
        } else {
            const url = domain('pm').url
            window.open(`${url}/sso/rqx?from=MP_SSO_RQX&callback=${env()==='dev' || env()==='local' ?'development':env()}&platform=${name==='psl'?'personal':'business'}`, '_blank').focus()
        }
    }

    return (
        <>
            {view === '' ?
                <Box minHeight="36px" minWidth="193px" display="flex"  borderRadius="8px" bgcolor="#F0F5F9" p="4px" gap="4px">
                    <Box component={Button} disableTouchRipple={true} className="eighth-step" color="#3D77E9" bgcolor="#FFFFFF" borderRadius="6px" height="28px" display="flex" alignItems="center" fontWeight={400} fontSize={12} lineHeight="20px" px="20px" py="4px"
                    sx={{':hover':{bgcolor:'#FFFFFF', color:'#3D77E9'}, boxShadow:'0px 2px 4px 0px #00000014, 0px 0px 6px 0px #00000005' }}
                    >
                        Personal
                    </Box>
                    <LightToolTip
                        title="Coming soon"
                        TransitionComponent={Zoom}
                    >
                        <Box component={Button} className="ninth-step" color="#165320" borderRadius="6px" height="28px" display="flex" alignItems="center" fontWeight={400} fontSize={12} lineHeight="20px" px="20px" py="4px"
                        sx={{':hover':{bgcolor:'#FFFFFF', color:'#165320'} }}
                        >Business</Box>
                    </LightToolTip>
                </Box>
            :
                <Box width="100%" height="36px" display="flex" justifyContent="center" alignItems="center">
                    <Box width={{xs:'100%', sm:'347px'}} display="flex" justifyContent="space-around" alignItems="center" gap="4px" bgcolor="#F2F7FF29" borderRadius="8px" minHeight="36px" p="4px">
                        <Box component={Button} disableTouchRipple={true} className="sixth-step" minHeight="28px" width="50%" display="flex" alignItems="center" justifyContent="center" bgcolor='#FFFFFF3D' borderRadius="6px"
                            sx={{':hover':{bgcolor:'#FFFFFF3D', fontWeight:600}, color:'#FFFFFF' }}
                        >
                            <Box fontSize={12} fontWeight={600} lineHeight="20px">
                                Personal
                            </Box>
                        </Box>
                        <LightToolTip
                            title="Coming soon"
                            TransitionComponent={Zoom}
                            open={isOpen}
                            onClose={()=>setIsOpen(!isOpen)}
                        >
                            <Box component={Button} className="seventh-step" minHeight="28px" width="50%" display="flex" alignItems="center" justifyContent="center"  borderRadius="6px"
                                sx={{':hover':{bgcolor:'#FFFFFF3D', fontWeight:600}, color:'#FFFFFF' }}
                                onClick={()=>setIsOpen(!isOpen)}
                            >
                                <Box fontSize={12} fontWeight={400} lineHeight="20px">
                                    Business
                                </Box>
                            </Box>
                        </LightToolTip>
                    </Box>
                </Box>
            }
        </>
    )
}