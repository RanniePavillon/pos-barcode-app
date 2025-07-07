import {  useContext, useEffect, useState  } from 'react';
import { Modal, Slide, Box, IconButton, Button, Avatar, Divider } from '@mui/material/';
import { Close as CloseIcon } from '@mui/icons-material';
import { Loader } from './Loader';
import { List } from './List';
import { domain, env } from '../../../../../core/Env';
import { rqx } from '../../../../../core/request/API';
import { ArrowRightIcons } from '../../../../../core/global/Icons';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { buttonstyle } from '../../../../../core/global/forms/Buttons';
import PSLLogo from '../../../../../assets/images/logos/logo_v1.png'
import BIZLogo from '../../../../../assets/images/logos/biz_logo.png'
import NTF from '../../../../../assets/images/logos/ntf.png'
import Chat from '../../logo/Chat.png'
import Jobs from '../../logo/Jobs.png'
import Paymeshare from '../../logo/Paymeshare.png'
import Referrals from '../../logo/Referrals.png'
import Shop from '../../logo/Shop.png'

export const Index = () => {
    const classes = buttonstyle();
    const { tool_state, tool_category_state, navigation_state, install_state } = useContext(ToolContext)
    const { __SESSION, toolOwned } = tool_state
    const { toolCategories } = tool_category_state
    const { myTool } = navigation_state
    const [loader, setLoader] = useState(false) 
    const [tools, setTools] = useState([])
    const [dfltTools] = useState([
        {name:'Chat', logo:Chat, link:`https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}chat.pofsis.com/psl`},
        {name:'Jobs', logo:Jobs, link:`https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}job.pofsis.com/psl`},
        {name:'Paymeshare', logo:Paymeshare, link:`https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}paymeshare.pofsis.com/psl`},
        {name:'Referrals', logo:Referrals, link:`https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}referral.pofsis.com`},
        {name:'Shop', logo:Shop, link:`https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}shop.pofsis.com`},
    ])

    const handleClick = (link) => {
        window.open(`${link}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(__SESSION.data.ainfo))}`, '_blank').focus()
    }
    
    const RedirectMP = async(name) => {
        if (name === 'mp') {
            window.open(`${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}`, '_blank').focus()
            return
        }else{
            if (__SESSION !== null) {
                if (name === 'psl') {
                    if (__SESSION.data.ainfo.account_type !== 2) {
                        window.open(`${domain('psl').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.data.ainfo))}`, '_blank').focus()
                    } else {
                        let res = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/account/getlinkaccount`, {aid: __SESSION.data.ainfo.aid, mode: 'linkaccount'})
                        if (res.length > 0) {
                            let d = {account_type:res[0].account_type, aid:window.btoa(`account_${res[0].id}`), email:res[0].email, mobile_num:res[0].mobile_num, user_type:res[0].user_type, username:res[0].username}
                            window.open(`${domain('psl').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(d))}`, '_blank').focus()
                        } else {
                            window.open('https://dev-pos.pofsis.com/psl/switching', '_blank').focus()
                        }
                    }
                }else{
                    if (__SESSION.data.ainfo.account_type === 2) {
                        window.location.href = `${domain('biz').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.data.ainfo))}`
                    } else {
                        let gla = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/account/getlinkaccount`, {aid: __SESSION.data.ainfo.aid})
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
    }

    useEffect(() => {
        const __init = async() => {
            await setLoader(true)
            let all_tools = await rqx.get(`<<global>>/${env()==='local'? 'dev' : env()}/tools/read`, {filter: 'category', platform: 'personal', tcid: 'all', ref:'all'})
            const mergeArr = all_tools.map((at) => {
                const td = toolOwned.data.find((td) => at.tid === td.tid);
                return {...at, owned:td !== undefined };
            });
            setTools(mergeArr.sort((a, b) => (a.owned === b.owned ? 0 : a.owned ? -1 : 1)))

            let t_category = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/categories`, {filter: 1});
            let tool_cat = t_category.map(tc => {
                return {...tc, tools: []}
            });
        
            await mergeArr.filter(r => {
                t_category.map(v => {
                    let tcid = JSON.parse(r.tool_category_id).personal.tcid;
                    if (tcid === v.id) {
                        let f = tool_cat.filter(a => { return a.id === tcid} )
                        f[0].tools = [...f[0].tools, r]
                    }
                    return false
                })
                return false
            })
            await toolCategories.set(tool_cat)
        }
        let subscribe = true
        if (subscribe && myTool.data) {
            __init()
            setTimeout(() => {
                setLoader(false)
            }, 1000);
        }
        return () => subscribe = false
        // eslint-disable-next-line
    }, [myTool.data])

    return (
        <Modal 
            open={myTool.data} 
            onClose={() => myTool.set(false)}
            sx={{ mb: install_state.prompt.data !== null ? '120px' : '54px', zIndex:'1100 !important' }} 
            BackdropProps={{ style: { backgroundColor: "transparent", borderRadius: 20 } }}
            className="noutlined"
        >
            <Slide in={myTool.data} direction="left" className="noutlined">
                <Box height="100%" width="100%" bgcolor="#FFFFFF" boxShadow=" 0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A" py="16px"> 
                    <Box height="100%" display="flex" flexDirection="column" gap="24px" >
                        <Box minHeight="24px" display="flex" justifyContent="space-between" alignItems="center" px="16px">
                            <Box display="flex" alignItems="center" gap="20px">
                                <IconButton onClick={()=>myTool.set(false)} sx={{padding:'0px !important'}}>
                                    <CloseIcon sx={{width:20, height:20, color:'#283745'}} />
                                </IconButton>
                                <Box fontSize={14} fontWeight={600} lineHeight="23px">My Tools</Box>
                            </Box>
                            <Box component={Button} display="flex" alignItems="center" gap="8px" onClick={()=>RedirectMP('mp')}>
                                <Box fontSize={12} fontWeight={400} lineHeight="15px" color="#1E92FD">Market Place</Box>
                                <ArrowRightIcons fill="#1E92FD" width={20} height={20}/>
                            </Box>
                        </Box>
                        <Box height="100%" display="flex" flexDirection="column" gap="24px" className="overflowY" px="16px" pt="8px">
                            <Box display="grid" gridTemplateColumns="repeat(auto-fill,minmax(100px,1fr))" gap="12px">
                                <Box component={Button} disableFocusRipple={true} className={classes.btnpsl} minWidth="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px" bgcolor="#F0F5F9"
                                    sx={{':hover':{bgcolor:"#F0F5F9", border:"2px solid #3D77E9"} }}
                                    onClick={()=>RedirectMP('psl')}
                                >
                                    <Avatar variant="square" src={PSLLogo} sx={{width:40, height:40}}/>
                                    <Box fontSize={12} fontWeight={400} lineHeight="19px" color="#333333">Personal</Box>
                                </Box>
                                <Box component={Button} disableFocusRipple={true} className={classes.btnbiz} minWidth="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px" bgcolor="#F0F5F9"
                                    sx={{':hover':{bgcolor:"#F0F5F9", border:"2px solid #165320"} }}
                                    onClick={()=>RedirectMP('biz')}
                                >
                                    <Avatar variant="square" src={BIZLogo} sx={{width:40, height:40}}/>
                                    <Box fontSize={12} fontWeight={400} lineHeight="19px" color="#283745">Business</Box>
                                </Box>
                            </Box>
                            <Box>
                                <Divider sx={{height:'2px', bgcolor:'#C9D6DF', p:'0px !important'}} />
                            </Box>
                            <Box width="100%" display="flex" flexDirection="column" gap="24px">
                                <Box display="grid" gridTemplateColumns="repeat(auto-fill,minmax(100px,1fr))" gap="12px">
                                    {dfltTools.map((t,i) => (
                                        <Box component={Button} disableFocusRipple={true} className={classes.btnpsl} onClick={()=>handleClick(t.link)} key={i} minWidth="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="4px" py="8px" bgcolor="#F0F5F9">
                                            <Avatar variant="square" src={t.logo} sx={{width:40, height:40}}/>
                                            <Box fontSize={12} fontWeight={400} lineHeight="19px" width="100%" sx={{wordBreak: 'break-word'}} color="#283745">{t.name}</Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Divider sx={{height:'2px', bgcolor:'#C9D6DF', p:'0px !important'}} />
                            </Box>
                            <Box height="100%" width="100%">
                                {loader ? 
                                    <Loader/>
                                :
                                    (tools.length === 0 ? 
                                        <Box width="100%" display="flex" justifyContent="center" py="32px">
                                            <Avatar src={NTF} variant="square" sx={{height:'71px', width:'90px'}}/>
                                        </Box>
                                    : 
                                        <List __SESSION={__SESSION} toolCategories={toolCategories} classes={classes}/>
                                    )
                                }         
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}