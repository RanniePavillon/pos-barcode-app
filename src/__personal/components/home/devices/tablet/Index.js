import { useContext, useState } from 'react';
import { Box, Container, Zoom, Button } from '@mui/material';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { WaveIcons } from '../../../../../core/global/Icons'
import { LightToolTip } from '../../../../../core/global/ToolTip';

const Home = () => { 
    const { tool_state } = useContext(ToolContext)
    const { __SESSION } = tool_state
    const [isOpen, setIsOpen] = useState(false)

    const currentDayStatus = () => {
        const dateToday = new Date()
        const hours = dateToday.getHours()
        let dayStatus;
        if (hours < 12 ) {
            dayStatus = 'Morning'
        }else if (hours < 18) {
            dayStatus = 'Afternoon'
        }else{
            dayStatus = 'Evening'
        }
        return dayStatus;
    }

    return (
        <Box height="100%" width="100%" bgcolor='primary.main'>
            <Container sx={{height:'100%', width:'100%', bgcolor:'#FFFFFF', borderRadius:"12px 12px 0px 0px", px:'0px 16px 16px 16px'}}>
                <Box height="56px" width="100%" display="flex" flexDirection="column" gap="16px" pt="16px" mb="16px">
                    <Box height="auto" width="100%" display="flex" alignItems="center" justifyContent="center">
                        <Box width="80px" height="4px" borderRadius='100px' bgcolor="var(--wireframe_colors-02, #C9D6DF)"/>
                    </Box>
                    <Box height="20px" width="100%" display="flex" alignItems="center" justifyContent="center">
                        <Box height="100%" width="100%" borderRadius="6px" bgcolor="#256EFF" color="#FFFFFF" display="flex" alignItems="center" justifyContent="center" >
                            <Box fontWeight={400} fontSize={12} lineHeight="20px" color="#FFFFFF">Home</Box>
                        </Box>
                        <LightToolTip
                            title="Coming soon"
                            TransitionComponent={Zoom}
                            open={isOpen}
                            onClose={()=>setIsOpen(!isOpen)}
                        >
                            <Box onClick={()=>setIsOpen(!isOpen)} component={Button} height="100%" width="100%" borderRadius="6px" color="#52616B" display="flex" alignItems="center" justifyContent="center" >
                                <Box fontWeight={400} fontSize={12} lineHeight="20px" color="#283745">Pro</Box>
                            </Box>
                        </LightToolTip>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" gap="12px">
                    <Box fontSize="14px" color="#283745">Extraordinary {currentDayStatus()},</Box>
                    <Box fontWeight={400}>{__SESSION.data.pinfo.length === 0 ? 'Hero ' : __SESSION.data.pinfo[0].first_name } </Box>
                    <Box><WaveIcons fill='#FFCB22'/></Box>
                </Box>
            </Container>
        </Box>
    )
}
export default Home