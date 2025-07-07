import { Box, IconButton, Modal, Slide } from "@mui/material"
import { LeftArrowTCIcons } from "../../../../../core/global/Icons"
import { Index as Chart } from '../../chart/Index';
import { Index as SuggestTool  } from '../suggest/Index'

export const TcModal = ({tcShow, redirectHandler, data, match, tool_state, tcs}) => {
  
    return (
        <Modal open={tcShow} BackdropProps={{sx: {bgcolor: '#ffffff', width: '100%', height: '100%'}}} className="noutlined">
            <Slide in={tcShow} direction="up" className="noutlined">
                <Box width="100%" height="100%" display="flex" flexDirection="column"> 
                    <Box display="flex" alignItems="center" minHeight={44} borderBottom="1px solid #E2E8ED" px="16px">
                        <IconButton sx={{position: 'absolute'}} onClick={() => redirectHandler('back')}>
                            <LeftArrowTCIcons stroke="#333333" />
                        </IconButton>
                        <Box fontSize={14} fontWeight={600} width="100%" textAlign="center">{data[0].name}</Box>
                    </Box>
                    <Box height="100%" className="overflowY" bgcolor="#F6F7F8">
                        <Box p="24px 16px 16px" bgcolor="#ffffff">
                            <Box fontSize={12} fontWeight={400} mb={3}>{data[0].description}</Box>
                            <Chart data={data} match={match} />
                        </Box>
                        <Box p={3}>
                            <SuggestTool match={match} tool_state={tool_state} tcs={tcs} />
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    )
}