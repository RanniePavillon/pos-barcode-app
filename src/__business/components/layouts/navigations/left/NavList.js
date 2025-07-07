import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { DownloadIcons, Logo, SupportIcons } from '../../../../../core/global/Icons';
import { Box, Drawer, ListItemButton, Typography } from '@mui/material';
import { useHistory, useLocation } from "react-router-dom";

export const NavList = ({leftBar, install_state, tc, navigation_state}) => {
    const useStyles = makeStyles((theme) => ({
        drawer_paper: {
            width: leftBar.data ? 231 : 72,
            borderRight: '0px !important'
        },
        drawerToggle: {
            width: leftBar.data ? 232 : 72,
            overflow: "hidden",
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration[leftBar.data ? 'leavingScreen' : 'enteringScreen'],
            }),
        },
        btn_txt: {
            fontSize: 14, marginLeft: "14px"
        }
    }))
    const dsg = useStyles()
    const nav = useHistory()
    const __LOCATION = useLocation().pathname
    const [tabactive, setTabsactive] = useState('')

    const _clickBtn = async(name, link) => {
        if (name === 'tc') {
            await tc.set({...tc.data, open: !tc.data.open, list: false})
            if (__LOCATION.split('/', 2)[1] === 'tool-categories') {
                nav.push(__LOCATION)
            }else{
                nav.push('biz/tool-categories/subscribed')
            }
        }else if (name === 'install') {
            install_state.ip.set({stat: true, prompt_type: 'install'})
        }else if (name === 'support') {
            window.chaport.open();
        }else{
            nav.push(link)
        }
    }
    
    return (
        <Drawer variant="permanent" className={dsg.drawerToggle} classes={{paper: `${dsg.drawerToggle} ${dsg.drawer_paper}`}}>
            <Box height="100%" mx="16px" mt="12px" mb="24px"> 
                <Box height="100%" display="flex" flexDirection="column"> 
                    <Box height="100%" display="flex" flexDirection="column" gap="24px">
                        <Box height="32px" display="flex" alignItems="center" gap="16px">
                            <Logo size={32} br="6px" />
                            {leftBar.data && <Box color="#313131" fontSize={20} fontWeight={600} lineHeight="16px">POS</Box>}
                        </Box>
                        <Box height="204px" display="flex" flexDirection="column" gap="4px">
                            {navigation_state.tabs.data.left.map((t, k) => (
                                <ListItemButton key={k} 
                                    sx={{
                                        maxHeight:'48px',
                                        px:'8px', 
                                        py:'12px',
                                        borderRadius: '6px',
                                        bgcolor: __LOCATION.split('/')[2] === t.ref ? '#E2EDE7': '#FFFFFF',
                                        '&:hover':{ bgcolor: '#E2EDE7' },
                                    }}
                                    onClick={() => _clickBtn(t.name, t.subdir)} 
                                    onMouseEnter={()=>setTabsactive(t.name)} onMouseLeave={()=>setTabsactive('')}
                                >
                                    <Box display="flex" alignItems="center" justifyContent={ leftBar.data ? 'flex-start' : 'center'} width="100%" gap="12px">
                                        {__LOCATION.split('/')[2] === t.ref || tabactive === t.name ? t.active: t.not_active}
                                        {leftBar.data && 
                                            <Typography  
                                                fontWeight={__LOCATION.split('/')[2] === t.ref || tabactive === t.name ? 700 : 400} 
                                                fontSize={14}
                                                lineHeight='23px'
                                                color={__LOCATION.split('/')[2] === t.ref || tabactive === t.name ? "#165320" : "#313131"}
                                            >
                                                {t.name}
                                            </Typography>
                                        }
                                    </Box>
                                </ListItemButton>
                            ))}
                        </Box>
                    </Box>
                    <Box height="92px" display="flex" flexDirection="column" gap="4px">
                        <ListItemButton 
                            sx={{px:'8px', py:'12px', height:'44px'}}
                            onClick={() => _clickBtn('support')}
                            onMouseEnter={()=>setTabsactive('support')} onMouseLeave={()=>setTabsactive('')}
                        >
                            <Box display="flex" alignItems="center" justifyContent={ leftBar.data ? 'flex-start' : 'center'} width="100%" gap="8px">
                                <SupportIcons fill={tabactive === 'support' ? '#11783C': '#89A594' }/>
                                {leftBar.data &&
                                    <Box color="#283745" fontSize={12} fontWeight={400} lineHeight="22px">Support</Box>
                                }
                            </Box>
                        </ListItemButton>
                        <ListItemButton 
                            sx={{
                                px:'8px', py:'12px', height:'44px', 
                                borderRadius:'6px', 
                                bgcolor:install_state.prompt.data === null ?  '#E2EDE7' : 'secondary.main',
                                '&:hover':{bgcolor:install_state.prompt.data === null ?  '#E2EDE7' : 'primary.main',} 
                            }} 
                            onClick={() => _clickBtn('install')}
                            onMouseEnter={()=>setTabsactive('download-app')} onMouseLeave={()=>setTabsactive('')}
                        >
                            <Box display="flex" justifyContent="center" alignItems="center" gap="8px" width="100%">
                                <DownloadIcons fill="#FFFFFF" stroke="#11783C"/>
                                {leftBar.data && 
                                    <Box color={install_state.prompt.data === null ?"#283745":"#FFFFFF"} fontSize={12} fontWeight={400} lineHeight="22px">Download</Box>
                                }
                            </Box>
                        </ListItemButton>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}
