import { Box, AppBar, Toolbar, ListItemButton, Avatar, useMediaQuery, IconButton, Button } from "@mui/material"
import { useContext } from "react";
import { ToolContext } from '../../../../../../core/context/ToolContext'
import { useHistory, useLocation } from "react-router-dom";
import PSLLogo from '../../../../../../assets/images/core/avatar2.png'
import { Logo } from "../../../../../../core/global/Icons";
import { domain, env, key } from "../../../../../../core/Env";

const Bottom = () => {
    const { navigation_state, tool_state, install_state } = useContext(ToolContext)
    const { __SESSION } = tool_state
    const { myTool, notif } = navigation_state
    const Loc = useLocation().pathname.split('/')
    const nav = useHistory()
    const xsm = useMediaQuery('(max-width:350px)');

    const handlerNavBtn = (v) => {
        nav.push(v)
        if (myTool.data) {
            myTool.set(false)
        }
        if (notif.data) {
            notif.set(false)
        }
    }

    const installHandler = async () => {
        if (install_state.prompt.data !== null) {
            install_state.prompt.data.prompt();
            const { outcome } = await install_state.prompt.data.userChoice;

            if (outcome === 'accepted') {
                install_state.ip.set({stat: false, prompt_type: null})
                install_state.prompt.set(null)
                if (install_state.ip.data.prompt_type !== 'logout') return
                localStorage.removeItem('your_psl_session')
                window.location.href = `${domain('pm').url}/sso/rqx?from=${key('tsa_key')}&callback=${env()==='dev' || env()==='local'?'development':env()==='sb'?'sandbox':env()}&platform=personal`
            }
        }

    }

    const display = __SESSION.data.pinfo.length > 0 ? __SESSION.data.pinfo[0].profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile : PSLLogo : PSLLogo : PSLLogo
    
    return (
        __SESSION !== null &&
        <>
            {install_state.prompt.data !== null && (
                <AppBar position="fixed" sx={{ top: 'auto', bottom: 54, backgroundColor: '#FFFFFF', color: '#516A7D', height:'68px', zIndex:(myTool.data || notif.data ? 1301 : 'auto'), boxShadow:'0px -8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A' }} elevation={0}>
                <Toolbar sx={{display:'flex', alignItems:'center', height:'68px', p:`0px ${xsm ?'8px':'16px'} !important`}}>
                        <Box height="32px" width="100%" display="flex" justifyContent="center" alignItems="center" color="#283745" gap="12px">
                            <Logo size={35} />
                            <Box fontSize={12} fontWeight={400} lineHeight="19.42px">Don't miss out on the ultimate app experience! </Box>
                            <Box component={Button} onClick={installHandler} sx={{height:'36px', width:'103px', bgcolor:'#256EFF', color:'#FFFFFF', borderRadius:'6px', ':hover':{bgcolor:'#256EFF', color:'#FFFFFF'} }}>
                                <Box fontSize={14} fontWeight={500} lineHeight="24px">Get App</Box>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            )}
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#FFFFFF', color: '#516A7D', height:'54px', zIndex:(myTool.data || notif.data ? 1301 : 'auto') }} elevation={0}>
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems:'center', height:'54px', gap:(xsm ?'8px':'15px'), p:`0px ${xsm ?'8px':'16px'} !important`}}>
                    {
                        navigation_state.tabs.data.mobile.map((v,k) => (
                            <Box height="100%" width="56px" display="flex" alignItems="center" justifyContent="center" key={k} className={v.steps} onClick={() => handlerNavBtn(v.subdir)}>
                                <ListItemButton sx={{display:'flex', flexDirection: 'column', justifyContent:'center', px: '0px !important', color:Loc === v.ref ? '#3D77E9' : '#687B75', fontWeight:600}}>
                                    <IconButton disableFocusRipple={true} disableTouchRipple={true} sx={{padding:'4px !important', bgcolor:Loc[2] === v.ref ? '#F0F5F9':'#FFFFFF', borderRadius:'8px'}}>
                                        {Loc[2] === v.ref ? v.active : v.not_active}
                                    </IconButton>
                                    {(Loc[2] === 'tool-categories' && v.name === 'Tool Categories') ? 
                                        <Box className="marquee" width="50px">
                                            <Box className={Loc[2] === 'tool-categories' ? 'marqueestc' : 'marquees'} fontWeight={Loc[2] === v.ref ? 600 : 400} fontSize={11} color={ Loc[2] === v.ref ? "#11783C" : '#283745'}>{v.name}</Box>
                                        </Box>
                                    :
                                        <Box fontWeight={Loc[2] === v.ref ? 600 : 400} fontSize={11} lineHeight="18px" color={ Loc[2] === v.ref ? "#11783C" : '#283745'} sx={{width:'100%', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{v.name}</Box>
                                    }
                                </ListItemButton>
                            </Box>
                        ))
                    }
                    <Box height="100%" width="56px" display="flex" alignItems="center" justifyContent="center" onClick={()=> nav.push('/psl/more')}>
                        <ListItemButton sx={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', px:'0px !important' }}>
                            <IconButton disableFocusRipple={true} disableTouchRipple={true} sx={{padding:'4px !important', bgcolor:Loc[2] === 'more' ? '#F0F5F9':'#FFFFFF', borderRadius:'8px'}}>
                                <Avatar src={display} variant='circular' sx={{width: 20, height: 20}} />
                            </IconButton>
                            <Box fontWeight={600} fontSize={11} color={'#283745'}>More</Box>
                        </ListItemButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Bottom;