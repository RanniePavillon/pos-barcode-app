import {  useContext, useEffect, useState  } from 'react';
import { Modal, Slide, Box, IconButton, Button, Avatar, Divider } from '@mui/material/';
import { Close as CloseIcon } from '@mui/icons-material';
import { ToolContext } from '../../../core/context/ToolContext';
import { Loader } from './Loader';
import { List } from './List';
import { domain, env } from '../../../core/Env';
import { rqx } from '../../../core/request/API';
import { ArrowRightIcons } from '../../../core/global/Icons';
import PSLLogo from '../../../assets/images/logos/logo_v1.png'
import BIZLogo from '../../../assets/images/logos/biz_logo.png'
import NTF from '../../../assets/images/logos/ntf.png'
import { buttonstyle } from '../../../core/global/forms/Buttons';
import { BizToolTip } from '../../../core/global/ToolTip';

export const Index = ({ myTool }) => {
    const classes = buttonstyle();
    const { tool_state, tool_category_state, navigation_state } = useContext(ToolContext)
    const { __SESSION, toolOwned } = tool_state
    const { toolCategories } = tool_category_state
    const { myToolPzl } = navigation_state
    const [loader, setLoader] = useState(false) 
    const [tools, setTools] = useState([])
    
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
                            window.open('https://dev-pos.pofsis.com/biz/switching', '_blank').focus()
                        }
                    }
                }else{
                    // window.open(`${domain('biz').url}/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.data.ainfo))}`, '_blank').focus()
                    const existingWindow = window.open('', 'bizWindowName');
                    if (existingWindow) {
                        existingWindow.location.href = 'http://localhost:3000';
                    } else {
                        window.open(`http://localhost:3000/sso/account/auth?ainfo=${encodeURI(JSON.stringify(__SESSION.data.ainfo))}`, 'bizWindowName');
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
            let all_tools = await rqx.get(`<<global>>/${env()==='local'? 'dev' : env()}/tools/read`, {filter: 'category', platform: 'business', tcid: 'all', ref:'all'})
            const mergeArr = all_tools.map((at) => {
                const td = toolOwned.data.find((td) => at.tid === td.tid);
                return {...at, owned:td !== undefined };
            });
            setTools(mergeArr.sort((a, b) => (a.owned === b.owned ? 0 : a.owned ? -1 : 1)))

            let t_category = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/categories`, {filter: 2});
            let tool_cat = t_category.map(tc => {
                return {...tc, tools: []}
            });
        
            await mergeArr.filter(r => {
                t_category.map(v => {
                    let tcid = JSON.parse(r.tool_category_id).business.tcid;
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
            sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', mt: '64px' }} 
            BackdropProps={{ style: { backgroundColor: "transparent", borderRadius: 20 } }}
            className="noutlined"
        >
            <Slide in={myTool.data} direction="left" className="noutlined">
                <Box height="100%" width="374px" bgcolor="#FFFFFF" boxShadow=" 0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A" py="24px"> 
                    <Box height="100%" display="flex" flexDirection="column" gap="24px">
                        <Box minHeight="24px" display="flex" justifyContent="space-between" alignItems="center" px="24px">
                            <Box display="flex" alignItems="center" gap="20px">
                                <IconButton onClick={()=>myTool.set(false)} sx={{padding:'0px !important'}}>
                                    <CloseIcon sx={{width:20, height:20, color:'#283745'}} />
                                </IconButton>
                                <Box fontSize={14} fontWeight={600} lineHeight="23px">My Tools</Box>
                            </Box>
                            <Box component={Button} disableFocusRipple={true} display="flex" alignItems="center" gap="8px" onClick={()=>RedirectMP('mp')}>
                                <Box fontSize={12} fontWeight={400} lineHeight="15px" color="#165320">Market Place</Box>
                                <ArrowRightIcons fill="#165320" width={20} height={20}/>
                            </Box>
                        </Box>
                        <Box height="100%" display="flex" flexDirection="column" gap="24px" className="overflowY" px="24px" pt="8px" sx={{zIndex:"1501 !important"}}>
                            <Box display="grid" gridTemplateColumns="repeat(auto-fill,minmax(80px,1fr))" gap="4px">
                                <Box component={Button} disableFocusRipple={true} className={classes.btnpsl} width="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px" bgcolor="#F8F9FA" border={"2px solid #165320"}
                                    sx={{':hover':{bgcolor:"#F8F9FA", border:"2px solid #3D77E9"} }}
                                    onClick={()=>RedirectMP('psl')}
                                >
                                    <Avatar variant="square" src={PSLLogo} sx={{width:40, height:40}}/>
                                    <Box fontSize={12} fontWeight={400} lineHeight="19px" color="#333333">Personal</Box>
                                </Box>
                                <BizToolTip  
                                    open={myToolPzl.data}
                                    arrow title="Discover more extraordinary benefits by exploring more of business tools!" placement='bottom-end' sx={{fontSize:'12px', lineHeight:'20px', zIndex:'0 !important'}}>
                                    <Box component={Button} disableFocusRipple={true} 
                                    className={myToolPzl.data ? classes.btnbizfocus : classes.btnbiz} 
                                    width="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px" bgcolor="#F8F9FA"
                                        sx={{':hover':{bgcolor:"#F8F9FA", border:"2px solid #165320"} }}
                                        onClick={()=>RedirectMP('biz')}
                                    >
                                        <Avatar variant="square" src={BIZLogo} sx={{width:40, height:40}}/>
                                        <Box fontSize={12} fontWeight={400} lineHeight="19px" color="#283745">Business</Box>
                                    </Box>
                                </BizToolTip>
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
                            <Box minHeight="50px"/>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}