import { Box, IconButton, Modal, Slide } from "@mui/material"
import { ArrowLeftIcons } from "../../../../../core/global/Icons"
import { useContext } from "react"
import { ToolContext } from "../../../../../core/context/ToolContext"

export const NotifMenu = ({notif}) => {
    const { install_state } = useContext(ToolContext)

    return (    
        <Modal 
            open={notif.data} 
            onClose={()=>notif.set(false)} 
            sx={{ mb: install_state.prompt.data !== null ? '120px' : '54px'}}
            BackdropProps={{ style: { backgroundColor: "transparent", borderRadius: 20 } }}
            className="noutlined"
        >
            <Slide direction="left" in={notif.data} className="noutlined">
                <Box height="100%" width="100%" display="flex" flexDirection="column" bgcolor="#FFFFFF">
                    <Box display="flex" alignItems="center" minHeight={56} gap="16px">
                        <IconButton onClick={() => notif.set(false)}>
                            <ArrowLeftIcons stroke="#FFFFFF" />
                        </IconButton>
                        <Box fontSize={18} fontWeight={600} >Notification</Box>
                    </Box>    
                    <Box height="100%" display="flex" className="overflowY" p="16px">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus facere laborum dolore aperiam molestiae ipsam officia et alias praesentium hic error, ea laudantium ullam iusto fuga maiores cum cumque aliquid.
                        um hic error, ea laudantium ullam iusto fuga maiores cum cumque aliquid.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus facere laborum dolore aperiam molestiae ipsam officia et alias praesentium hic error, ea laudantium ullam iusto fuga maiores cum cumque aliquid.
                    </Box>    
                </Box>
            </Slide>
        </Modal>
    )
}
