import { Box, Button, Dialog } from "@mui/material"
import { Logo } from "../../../../core/global/Icons"
import InstallLogo from '../../../../assets/images/core/install_app.gif'
import { makeStyles } from "@mui/styles"
import { VM } from '../../../../core/VM'
import { domain, env, key } from "../../../../core/Env"

let view = VM()

const custom = makeStyles(theme => ({
    bg1: {
        backgroundPosition: view === '' ? 'right' : 'center', 
        backgroundSize:'61%',
        backgroundColor: '#fbfbfb',
        backgroundImage: `url(${InstallLogo})`,
        backgroundRepeat: 'no-repeat',
    }
}))

export const InstallPromotion = ({ install_state }) => {
    const classes = custom()

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

    const logoutHandler = () => {
        install_state.ip.set({stat: false, prompt_type: null})
        localStorage.removeItem('your_psl_session')
        window.location.href = `${domain('pm').url}/sso/rqx?from=${key('tsa_key')}&callback=${env()==='dev' || env()==='local'?'development':env()==='sb'?'sandbox':env()}&platform=personal`
    }

    return (
        <Dialog open={install_state.ip.data.stat} keepMounted fullWidth={true} maxWidth={'md'} onClose={() => install_state.ip.set({stat: false, prompt_type: null})} PaperProps={{
            style: {
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }
        }}>
            {view === '' ? 
                <Box display="flex" justifyContent="center" height="400px">
                    <Box borderRadius={4} p="16px 16px 0 0" bgcolor="secondary.light" width="100%" className={classes.bg1}>
                        <Box p={3} pt={5} pl={10} width="53%">
                            <HeaderLogo/>
                            <Box fontSize={18} mb={1}><b>Before you proceed!</b></Box>
                            <Box textAlign="left" fontSize={14} mb={4}>
                                Let's make your extraordinary journey in POFSIS easier by installing POFYour Tool in your device.
                            </Box>
                            <Installbtn install_state={install_state} logoutHandler={logoutHandler} installHandler={installHandler}/>
                        </Box>
                    </Box>
                </Box>
            :
                <Box display="flex" justifyContent="center" height="400px" width="100%">
                    <Box borderRadius={4} p={2} bgcolor="secondary.light" width="100%" >
                        <HeaderLogo/>
                        <Box textAlign="center" fontSize={18} my={1}><b>Before you proceed!</b></Box>
                        <Box textAlign="center" fontSize={14}>
                            Let's make your extraordinary journey in POFSIS easier by installing POFYour Tool in your device.
                        </Box>
                        <Box my={install_state.ip.data.prompt_type === 'logout' ? 1 : 2} borderRadius={4} bgcolor="secondary.light" width="100%" height="100px" className={classes.bg1}/>
                        <Installbtn install_state={install_state} logoutHandler={logoutHandler} installHandler={installHandler}/>
                    </Box>
                </Box>
            }
        </Dialog>
    )
}

const HeaderLogo = () => {
    return (
        <Box display="flex" justifyContent={view === '' ? 'flex-start' : 'center'} alignItems="center" mb={view === '' ? 2 : 0 }>
            <Box animate={{ x: [100, 0], rotate: [30, -30, 0], opacity: [0, 1]}} transition={{ duration: 0.8 }} mt={0.5} zIndex={2}>
                <Logo size={view === '' ? 60 : 40}/>
            </Box>
            <Box animate={{ x: [-80, 0], opacity: [0, 1]}} transition={{ duration: 0.8, delay: 0.8 }} ml={1} zIndex={1}>
                <Box  fontSize={view === '' ? 19 : 14} >POF<strong>Your Tool</strong></Box>
                <Box fontSize={12}>
                    Powered by: POFSIS
                </Box>
            </Box>
        </Box>
    )
}

const Installbtn = ({install_state, logoutHandler, installHandler}) => {
    return (
        <Box textAlign="center">
            {/* <Box component="p" color="#000" fontSize={9}>{JSON.stringify(install_state.prompt.data)}</Box> */}
            {install_state.prompt.data === null ? 
                <Box fontWeight={500} py={1} bgcolor="rgba(0, 0, 0, 0.12)" sx={{borderRadius: '8px', width: '100%'}} >INSTALLED</Box>
            :
                <Button variant="contained" color="primary" sx={{borderRadius: '8px', boxShadow: 'none', width: '100%'}} onClick={installHandler}> {install_state.prompt.data !== null ? 'INSTALL NOW' : 'INSTALLED'} </Button>
            }
            {
                install_state.ip.data.prompt_type === 'first_prompt' ? (
                    <Box mt={3} fontSize={14}>Click outside to exit</Box>
                ) : install_state.ip.data.prompt_type === 'logout' ? (
                    <Box mt={view === '' ? 3 : 2} fontSize={14} onClick={logoutHandler} className="c-pointer">Proceed to logout</Box>
                ) : (
                        
                    <Box mt={3} fontSize={14} className="c-pointer"></Box>
                )
            }
        </Box>
    )
}