import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Badge, IconButton, Avatar } from '@mui/material';
import { Logo, SearchIcons } from '../../../../../core/global/Icons';
import { ToolTip } from '../../../../../core/global/ToolTip';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { Platform } from './Platform';
import { NotifMenu } from '../../../notification/Index'
import { UserMenu } from './Menu';
import { Index as MyTools } from '../../../mytools/Index';

import PSLLogo from '../../../../../assets/images/core/avatar2.png'
import ChatIcon from '../../../../../assets/images/logos/chat.png'
import { env } from '../../../../../core/Env';

export const Top = () => {
    const { navigation_state, tool_state, install_state } = useContext(ToolContext)
    const { __SESSION } = tool_state
    const { notif, myTool } = navigation_state
    const [UMAnchor, setUMAnchor] = useState(null);

    const __LOCATION = useLocation().pathname
    const display = __SESSION.data.pinfo.length > 0 ? __SESSION.data.pinfo[0].profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile !== null ? JSON.parse(__SESSION.data.pinfo[0].profile).profile : PSLLogo : PSLLogo : PSLLogo

    const UMHandler = (e) => {
        e.preventDefault()
        setUMAnchor(e.currentTarget);
    }

    // const showMT = Boolean(tool_state.showMyTool.data)
    const NavHandler = async(e, name) => {
        if (name === 'Notifications' && __LOCATION !== '/notification') {
            notif.set(true)
        }else if(name === 'MyTools'){
            myTool.set(!myTool.data)
        }else if (name === 'Chat'){
            let link = `https://${env()==='prod'?'': env() === 'sb' ?'sb-':'dev-'}chat.pofsis.com`
            window.open(`${link}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(__SESSION.data.ainfo))}`, '_blank').focus()
        }
    }


    const [tabActive, setTabActive] = useState('')
    const mouseHover = (name) => {
        setTabActive(name)
    }

    return (
        <Box sx={{height: '64px !important', py: '12px !important', px: '16px !important', backgroundColor: '#FFFFFF'}}>
            <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                {__LOCATION !==  '/psl/profiling' ? (
                        <>
                            <Platform __SESSION={__SESSION.data} install_state={install_state} />
                            <Box display="flex" alignItems="center" gap="24px">
                                <Box minWidth={{xs:'256px', lg:'456px'}}>
                                    <Box height="40px" width="100%" bgcolor="#F0F6F3" borderRadius="6px" px="12px" py="8px" display="flex" alignItems="center" gap="12px">
                                        <SearchIcons/>
                                        <Box fontWeight={400} fontSize={14} lineHeight="16px">Search</Box>
                                    </Box>
                                </Box>
                                <Box minWidth='128px' display="flex" alignItems="center" gap="24px">
                                    <ToolTip onClick={(e)=>NavHandler(e, 'Chat')} bgcolor='primary.main' title={'Chat'} sx={{margin: '0 14px 0 14px'}}>
                                        <Avatar variant='rounded' src={ChatIcon} sx={{height:24, width:24}} className="c-pointer" />
                                    </ToolTip>
                                    {
                                        navigation_state.tabs.data.top.map((v,k) => {
                                            return (
                                                <Box key={k} display="flex" alignItems="center" height="100%" className='c-pointer'>
                                                    <ToolTip title={v.name} onClick={(e)=>NavHandler(e, v.name)}>
                                                        <Badge color="error" badgeContent={0}>
                                                            <IconButton 
                                                                className={v.className}
                                                                sx={{padding:'4px !important', bgcolor: tabActive === v.name || __LOCATION === v.ref || (v.name === 'MyTools' && myTool.data) || (v.name === 'Notifications' && notif.data) ? '#F0F5F9' : '#FFFFFF', borderRadius:'8px'}}
                                                                onMouseEnter={()=>mouseHover(v.name)} onMouseLeave={()=>setTabActive('')}
                                                            >
                                                                {tabActive === v.name || __LOCATION === v.ref || (v.name === 'MyTools' && myTool.data) || (v.name === 'Notifications' && notif.data) ?
                                                                    v.active 
                                                                : 
                                                                    v.not_active 
                                                                }
                                                            </IconButton>
                                                        </Badge>
                                                    </ToolTip>
                                                </Box>
                                            )
                                        })
                                    }
                                    <ToolTip title={'Profile'} sx={{margin: '0 14px 0 14px'}}>
                                        <IconButton onClick={(e)=>UMHandler(e)} sx={{padding:'4px !important', bgcolor: UMAnchor === null ? '#FFFFFF' : '#F0F5F9', borderRadius:'8px'}}>
                                            <Avatar variant='circle' src={display} sx={{width:24 , height: 24}} />
                                        </IconButton>
                                    </ToolTip>
                                </Box>
                            </Box>
                        </>
                    )
                :
                    <Box display="flex" alignItems="center" sx={{justifyContent: 'flex-start' }} className="c-pointer" gap="16px">
                        <Logo size={32} br="6px" />
                        <Box color="#313131" fontSize={20} fontWeight={600} lineHeight="16px">POFYourTool</Box>
                    </Box>
                }
            </Box>
            <NotifMenu notif={notif} />
            <UserMenu UMAnchor={UMAnchor} setUMAnchor={setUMAnchor} install_state={install_state} display={display} __SESSION={__SESSION} />
            <MyTools myTool={myTool}/>
        </Box>
    )
}