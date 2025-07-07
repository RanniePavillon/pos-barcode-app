import { Menu, MenuItem, Box, Divider, Button, Skeleton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { domain } from '../../../../../core/Env';
import { avatarstylesx } from '../../../../../core/styling/global';
import LimitText from "react-show-more-text"
import PSLLogo from '../../../../../assets/images/logos/logo_v1.png'

export const UserMenu = ({UMAnchor, setUMAnchor, install_state, display, __SESSION }) => {
    const logoutHandler = async () => {
        if (install_state.prompt.data !== null && !('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches) ) {
            install_state.ip.set({stat: true, prompt_type: 'logout'})
        } else {
            localStorage.removeItem('your_psl_session')
            window.location.href = '/psl'
        }
    }

    const closeMenuHandler = () => {
        setUMAnchor(null)
    }
    
    return ( 
        <Menu
            onClose={closeMenuHandler}
            onClick={closeMenuHandler}
            anchorEl={UMAnchor}
            open={Boolean(UMAnchor)}
            autoFocus={false}
            PaperProps={{
                elevation: 1,
                sx: {
                    minWidth:"358px",
                    minHeight:'193px',
                    bgcolor:"#FFFFFF",
                    mt:"31px",
                    padding:"16px 0px 16px 0px",
                    borderRadius: '6px',
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Link to="/profile">
                <MenuItem sx={{height:'81px', px:'24px !important', py:'0px !important'}}>
                    <Box display="flex" alignItems="center" gap="16px">
                        <Avatar variant='circle' src={display} sx={{height:'56px', width:'56px'}} />
                        <Box display="flex" flexDirection="column" gap="8px" color="#283745">
                            {__SESSION.data.pinfo.length === 0 ?
                                <Box fontWeight={600} fontSize={14} lineHeight="23px">Hero User</Box>
                            :
                                <Box fontWeight={600} fontSize={14} lineHeight="23px">{__SESSION.data.pinfo[0].first_name} {__SESSION.data.pinfo[0].last_name}</Box>
                            }
                            {/* <Box fontWeight={400} fontSize={14} lineHeight="23px">{__SESSION.data.ainfo.email}</Box> */}
                            <Box fontWeight={400} fontSize={12} lineHeight="19px" color="#3D77E9">{'Personal account'}</Box>
                        </Box>
                    </Box>
                </MenuItem>
            </Link>
            <Divider sx={{bgcolor:'#E9F0FB', my:'16px !important', mx:'24px !important'}} />
            <MenuItem sx={{height:'32px', px:'24px !important', py:'0px !important'}} onClick={(e)=>logoutHandler(e)}>
                <Box fontWeight={400} fontSize={14} lineHeight="16px" color="#283745">Logout</Box>
            </MenuItem>
        </Menu>
    );
}

export const LinkAccountsMenu = ({LAMAnchor, setLAMAnchor, switchForm, setSwitchForm, navstyle }) => {
    const linkedSwitchHandler = (sf) => {
        let ainfo = {
            aid: sf.id,
            email: sf.email,
            mobile_num: sf.mobile_num,
            account_type: sf.account_type,
            username: sf.username
        }
        window.location.href = `${domain('biz').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(ainfo))}`
    }

    const closeMenuHandler = () => {
        setLAMAnchor(null)
    }

    const Loader = () => {
        return (
            <Box width="100%" borderRadius={3} mb={1.5}>
                <Skeleton variant="rect" width="100%" height="4rem" sx={{borderRadius: '12px', backgroundColor: '#bababa'}} />
            </Box>
        )
    }
    
    const Data = ({ sf }) => {
        if (sf.company_name === '') {
            return (
                <Box display="flex" alignItems="center" justifyContent="left" color="#000" width="100%" p={1} borderRadius={3} className={navstyle.la_button} onClick={()=>linkedSwitchHandler(sf)} mb={1.5}>
                    <Box sx={avatarstylesx(sf.profile_logo !== null ? JSON.parse(sf.profile_logo).profile : PSLLogo, '3rem', '3rem')} mr={1} borderRadius={3} />
                    <Box width="80%">
                        <Box fontSize={14}><b><LimitText lines={1} more="" less="" expanded={false} truncatedEndingComponent={"..."} className="text-justify">{sf.email}</LimitText></b></Box>
                        <Box fontSize={12}>No company yet.</Box>
                    </Box>
                </Box>
            )
        } else {
            return (
                <Box display="flex" alignItems="center" justifyContent="left" color="#000" width="100%" p={1} borderRadius={3} className={navstyle.la_button} onClick={()=>linkedSwitchHandler(sf)} mb={1.5}>
                    <Box sx={avatarstylesx(sf.company_logo !== null ? JSON.parse(sf.company_logo).file_content : PSLLogo, '3rem', '3rem')} mr={1} borderRadius={3} />
                    <Box width="80%">
                        <Box fontSize={14}><b><LimitText lines={1} more="" less="" expanded={false} truncatedEndingComponent={"..."} className="text-justify">{sf.company_name}</LimitText></b></Box>
                        <Box fontSize={12}><LimitText lines={1} more="" less="" expanded={false} truncatedEndingComponent={"..."} className="text-justify">{sf.company_email}</LimitText></Box>
                    </Box>
                </Box>
            )
        }
    }
    
    return ( 
        <Box>
            <Menu
                onClose={closeMenuHandler}
                anchorEl={LAMAnchor}
                open={Boolean(LAMAnchor)}
                autoFocus={false}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.8,
                        minWidth: '294px',
                        maxWidth: '294px',
                        borderRadius: '10px',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 60,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box py={1}>
                    <Box fontSize={16} px={2}><b>Linked accounts</b></Box>
                    <Box my={2} px={2}><Divider /></Box>
                    <Box height={390} maxHeight={390} sx={{overflowY: 'auto'}} px={2}>
                        {
                            switchForm.links!==null ? (
                                switchForm.links.map((sf, k) => <Data sf={sf} key={k} />)
                            ) : (
                                ['', '', '', '', ''].map((v, k) => <Loader key={k} />)
                            )
                        }
                    </Box>
                    <Box px={2} mt={2}>
                        <Button variant="contained" size="large" sx={{borderRadius: '8px'}} fullWidth onClick={()=>setSwitchForm({...switchForm, stat: true})}>Link other account</Button>
                    </Box>
                </Box>
            </Menu>
        </Box>
    );
}