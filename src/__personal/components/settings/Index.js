import { useHistory, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItemButton } from '@mui/material';
import { useContext } from 'react';
import { ToolContext } from '../../../core/context/ToolContext';
import { SupportIcons, LogoutIcons } from '../../../core/global/Icons';
import PSLLogo from '../../../assets/images/core/avatar2.png'

export const Settings = () => {
    const __LOCATION = useLocation().pathname
    const nav = useHistory()
    const { tool_state, install_state, navigation_state } = useContext(ToolContext)
    const { __SESSION } = tool_state
    const display = __SESSION.data.pinfo.length > 0 ? __SESSION.data.pinfo[0].profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile : PSLLogo : PSLLogo : PSLLogo
    const pinfo = tool_state.__SESSION.data.pinfo[0]
    
    const handleClick = async(e, name) => {
        if (name === 'Get App for Desktop' || name === 'Get App for Mobile') {
            install_state.ip.set({stat: true, prompt_type: 'install'})
        }else if(name === 'Support'){
            window.chaport.open();
        }else if(name === 'Tool Categories'){
            nav.push('/psl/tool-categories')
        }
    }

    const logoutHandler = async () => {
        if (install_state.prompt.data !== null && !('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches)) {
            install_state.ip.set({stat: true, prompt_type: 'logout'})
        } else {
            localStorage.removeItem('your_psl_session')
            window.location.href = '/psl'
        }
    }

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" gap="37px" bgcolor="#FFFFFF">
            <Box component={Button} onClick={()=>nav.push('/psl/profile')} width="100%" height="91px" py="12px" px="16px" display="flex" justifyContent="flex-start" alignItems="center" gap="16px">
                <Avatar src={display} sx={{width:'56px', height:'56px'}}/>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" color="#283745">
                    {__SESSION.data.pinfo.length === 0 ?
                        <Box fontSize="14px" fontWeight={600} lineHeight="23px">Hero User</Box>
                    :
                        <Box fontSize="14px" fontWeight={600} lineHeight="23px">{pinfo.first_name} {pinfo.last_name}</Box>
                    }
                    {/* <Box fontSize="11px" fontWeight={400} lineHeight="19px">{tool_state.__SESSION.data.ainfo.email}</Box> */}
                    <Box fontSize="11px" fontWeight={400} lineHeight="19px" color="#3D77E9">{'Personal Account'}</Box>
                </Box>
            </Box>
            <Box height="100%" className="overflowY cstmscroll">
                <List>
                        {
                            navigation_state.tabs.data.msetting.map((t, k) => (
                                <Box key={k} height="48px" fontSize="14px" fontWeight={400} color="#283745" lineHeight="23px">
                                    <ListItemButton onClick={(e)=>handleClick(e, t.name)}  sx={{px:'16px !important', display:'flex', justifyContent:"space-between", alignItems:'center', gap:'12px'}} >
                                        <Box display="flex" alignItems="center" gap="12px">
                                            {__LOCATION.split('/')[2] === t.ref ? t.active : t.not_active}
                                            <Box color={t.name === 'Refer a Hero Users' ? '#A2A3A9' : "#283745"}>{t.name}</Box>
                                        </Box>
                                    </ListItemButton>
                                </Box>
                            ))
                        }
                    </List>
            </Box>
            <Box px="16px">
                <Divider sx={{height:'1px', bgcolor:'#C9D6DF', p:'0px !important'}} />
            </Box>
            <Box height="96px" >
                <Box height="48px" fontSize="14px" fontWeight={400} color="#283745" lineHeight="23px">
                    <ListItemButton onClick={(e)=>handleClick(e, 'Support')} sx={{px:'16px !important', display:'flex', alignItems:'center', gap:'12px'}} >
                        <SupportIcons fill={'#89A594' } width="20" height="20"/>
                        Support
                    </ListItemButton>
                </Box>
                <Box height="48px" fontSize="14px" fontWeight={400} color="#283745" lineHeight="23px">
                    <ListItemButton onClick={(e)=>logoutHandler(e)} sx={{px:'16px !important', display:'flex', alignItems:'center', gap:'12px'}} >
                        <LogoutIcons/>
                        Logout
                    </ListItemButton>
                </Box>
            </Box>
            {install_state.prompt.data !== null && (
                <Box minHeight="64px"></Box>
            )}
        </Box>
    )
}