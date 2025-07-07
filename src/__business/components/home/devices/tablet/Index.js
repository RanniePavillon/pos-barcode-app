import { useContext } from 'react';
import { Box, Container } from '@mui/material';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { WaveIcons } from '../../../../../core/global/Icons'
const Home = () => { 
    const { tool_state } = useContext(ToolContext)
    const { __SESSION } = tool_state

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
            <Container sx={{height:'100%', width:'100%', bgcolor:'#FFFFFF', borderRadius:"12px 12px 0px 0px", p:'16px'}}>
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