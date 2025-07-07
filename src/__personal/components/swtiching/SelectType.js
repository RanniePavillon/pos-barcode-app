import { Avatar, Box, Button, useMediaQuery } from '@mui/material';
import { switchstyle } from './style/Switch';
import { SwitchingArrowIcons, Suitcases, ArrowHeadRight, Bag } from './style/Icons';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { ToolContext } from '../../../core/context/ToolContext';
import { domain } from '../../../core/Env';
import PSLLogo from '../../../assets/images/logos/logo_v1.png'
import BIZLogo from '../../../assets/images/logos/biz_logo.png'

export const SelectType = () => {
    const { tool_state  } = useContext(ToolContext)
    const { __SESSION } = tool_state
    const xsm = useMediaQuery('(max-width:350px)');
    const nav = useHistory()
    const classes = switchstyle(xsm);

    const selectHandler = (acct_type) => {
        if (acct_type === "business_owner") {
            nav.push('/psl/switching/owner')
        }else if (acct_type === "added_user") {
            let sainfo = {
                aid: __SESSION.data.ainfo.aid,
                va: 'email',
                ref: acct_type
            }
            window.location.href = `${domain('pm').url}/biz/switching/option2?sainfo=${encodeURIComponent(JSON.stringify(sainfo))}`
        } 
    }

    return (
        <Box height={{xs:'364px', sm:'100%'}} width="100%" bgcolor="#F0F5F9" display="flex" flexDirection="column" justifyContent="center" alignItems="center"
        padding={xsm ? "56px 16px 0px 16px" : "56px 24px 0px 24px"}>
            <Box width={{xs:'100%', sm:'456px'}} height={{xs:'100%', sm:'359px'}} display="flex" flexDirection="column" gap="32px">
                <Box height="40px" width="100%" display="flex" justifyContent="center" alignItems="center" gap="12px">
                    <Avatar variant='square' src={PSLLogo} alt={PSLLogo} sx={{width:'40px', height:'40px'}} />
                    <SwitchingArrowIcons />
                    <Avatar variant='square' src={BIZLogo} alt={BIZLogo} sx={{width:'40px', height:'40px'}} />
                </Box>
                <Box height={{xs:'72px', sm:'60px'}} width="100%" display="flex" flexDirection="column" gap="8px">
                    <Box fontSize={{xs:16, sm:20}} fontWeight={600} lineHeight={{xs:'26px', sm:'32px'}}>Select Your Business Account</Box>
                    <Box fontSize={{xs:12, sm:14}} fontWeight={400} lineHeight="19px" letterSpacing="-0.2px">You are now switching to Business tools. Choose your account type:</Box>
                </Box>
                <Box height="195px" width="100%" display="flex" flexDirection="column" gap="16px">
                    <Button className={classes.select} onClick={(e) => selectHandler('business_owner')}>
                        <Box height="100%" width="100%" display="flex" alignItems="center" gap="10px">
                            <Box width={{xs:'100%', sm:'402px'}} display="flex" alignItems="center" gap="16px">
                                <Box height="36px" minWidth="36px" bgcolor="#F0F5F9" display="flex" justifyContent="center" alignItems="center" borderRadius="4px">
                                    <Suitcases />
                                </Box>
                                <Box width={{xs:'100%', sm:'342px'}} display="flex" flexDirection="column">
                                    <Box fontSize={{xs:12, sm:14}} fontWeight={600} lineHeight={{xs:'19px', sm:'23px'}} letterSpacing="-0.2px" textAlign="left">I am a Business owner</Box>
                                    <Box fontSize={{xs:9, sm:12}} fontWeight={400} lineHeight={{xs:'15px', sm:'19px'}} letterSpacing="-0.2px" textAlign="left">Access your business tools easily by linking or creating your business account.</Box>
                                </Box>
                            </Box>
                            <Box height="20px" minWidth="20px" display="flex" justifyContent="center" alignItems="center">
                                <ArrowHeadRight />
                            </Box>
                        </Box>
                    </Button>
                    <Button className={classes.select} onClick={(e) => selectHandler('added_user')}>
                        <Box height="100%" width="100%" display="flex" alignItems="center" gap="10px">
                            <Box width={{xs:'100%', sm:'402px'}} display="flex" alignItems="center" gap="16px">
                                <Box height="36px" minWidth="36px" bgcolor="#F0F5F9" display="flex" justifyContent="center" alignItems="center" borderRadius="4px">
                                    <Bag />
                                </Box>
                                <Box width={{xs:'100%', sm:'342px'}} display="flex" flexDirection="column">
                                    <Box fontSize={{xs:12, sm:14}} fontWeight={600} lineHeight={{xs:'19px', sm:'23px'}} letterSpacing="-0.2px" textAlign="left">I am an Employee</Box>
                                    <Box fontSize={{xs:9, sm:12}} fontWeight={400} lineHeight={{xs:'15px', sm:'19px'}} letterSpacing="-0.2px" textAlign="left">Easily access company-owned tools by linking your company provided work account.</Box>
                                </Box>
                            </Box>
                            <Box height="20px" minWidth="20px" display="flex" justifyContent="center" alignItems="center">
                                <ArrowHeadRight />
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
        </Box>
    )    
}