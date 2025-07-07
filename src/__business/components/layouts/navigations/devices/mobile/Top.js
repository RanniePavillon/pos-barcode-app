import { AppBar, Toolbar, Box, Container, Avatar, IconButton, Badge } from '@mui/material';
import { Logo, MyToolIcons, NotificationIcons, SearchIcons } from '../../../../../../core/global/Icons';
import { BizToolTip, ToolTip } from '../../../../../../core/global/ToolTip';
import { ToolContext } from '../../../../../../core/context/ToolContext';
import { useContext } from 'react';
import { Platform } from '../../top/Platform';
import { NotifMenu } from '../../../../notification/devices/mobile/Index';
import { Index as MyTools } from '../../../../mytools/devices/mobile/Index'
import ChatIcon from '../../../../../../assets/images/logos/chat.png'
import { useLocation } from 'react-router-dom';
import { buttonstyle } from '../../../../../../core/global/forms/Buttons';

const Top = () => {
    const classes = buttonstyle('mobile');
    const { tool_state, navigation_state} = useContext(ToolContext)
    const { __SESSION } = tool_state
    const { notif, myTool, myToolPzl } = navigation_state
    const location = useLocation().pathname;
    
    const clickFeature = async(name) =>{
        if (name === 'MyTools') {
            myTool.set(!myTool.data)
        }else if (name === 'Notifications'){
            notif.set(true)
        }
    }


    // const redirectTest = () => {
    //     // window.open('https://example.com', 'example');
    //     const url = 'http://localhost:3000/biz';
    //     const windowName = 'myWindow';
    
    //     const existingWindow = window.open('', windowName);
    //     if (existingWindow) {
    //         console.log('asdasdasd')
    //         existingWindow.location.href = url;
    //     } else {
    //         console.log('qweqweqw')
    //         window.open(url, windowName);
    //     }
    // }

    const handleButtonClick = (targetUrl, windowName) => {
        const existingWindow = window.open('', windowName);
        if (existingWindow) {
            // existingWindow.focus();
            existingWindow.location.href = targetUrl;
        } else {
            window.open(targetUrl, windowName);
        }
    };

    return (
        <AppBar position="fixed" elevation={0} sx={{height: location === '/biz' ? 92:40, width:'100%', bgcolor:location !== '/biz' && '#FFFFFF'}}>
            <Toolbar sx={{p:"0px !important", height:'100%', width:'100%', flexDirection:'column'}}>
                <Box minHeight="40px" width="100%" display="flex" alignItems="center" justifyContent="space-between" px="16px" py="8px">
                    <Box display="flex" alignItems="center" gap="16px" onClick={() => handleButtonClick('http://localhost:3000/biz/more', 'bizWindow')}>
                        <Logo size={24} />
                        <Box fontSize={16} fontWeight={600} lineHeight="24px" color={location === '/biz' ? "#FFFFFF": "#283745"}>POFSIS</Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap="16px">
                        <Box onClick={() => handleButtonClick('http://localhost:3000/biz', 'pslWindow')}>
                            <SearchIcons size={24} stroke={location === '/biz' ? "#FFFFFF": "#333333"}/>
                        </Box>
                        <ToolTip title={'Chat'} arrow sx={{margin: '0 14px 0 14px'}} onClick={() => clickFeature('Chat')}>
                            <Avatar variant='rounded' src={ChatIcon} sx={{height:24, width:24}} className="c-pointer" />
                        </ToolTip>
                        {navigation_state.tabs.data.mtop.map((v,k) => (
                            <BizToolTip key={k} arrow title="Take a look at the tools you have." open={v.name === 'MyTools' && myToolPzl.data && !myTool.data} placement='bottom-start' sx={{fontSize:'12px', lineHeight:'20px'}}>
                                <IconButton 
                                    className={`${(v.name === 'MyTools' && myToolPzl.data && !myTool.data) && classes.btnbizfocus}`}
                                    sx={{p: '0px !important',}} 
                                    onClick={() => clickFeature(v.name)}
                                > 
                                    <Badge badgeContent={0} sx={{ "& .MuiBadge-badge": { color: "#ffffff", backgroundColor: "#FF0000"} }}>
                                        {v.name === 'Notifications' ? 
                                            <NotificationIcons fill={location === '/biz' ? "#FFFFFF": "#333333"}/>
                                        :
                                            <MyToolIcons fill={location === '/biz' ? "#FFFFFF": "#333333"} />
                                        }
                                    </Badge>
                                </IconButton>
                            </BizToolTip>
                        ))}
                    </Box>
                </Box>
                {location === '/biz' && (
                    <Container sx={{height:'52px', py:'8px'}}>
                        <Platform __SESSION={__SESSION.data} />
                    </Container>
                )}
            </Toolbar>
            <NotifMenu notif={notif} />
            <MyTools/>
        </AppBar>        
    );
}    


export default Top;

