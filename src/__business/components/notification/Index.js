import { Box, Modal, Slide } from "@mui/material"

export const NotifMenu = ({notif}) => {
    return (    
        <Modal 
            open={notif.data} 
            onClose={()=>notif.set(false)} 
            sx={{ pt:'80px', pb:'10px', pr:'16px',  display:"flex", alignItems: 'flex-start', justifyContent: 'flex-end'}} 
            BackdropProps={{ style: { backgroundColor: "transparent", borderRadius: 20 } }}
            className="noutlined"
        >
            <Slide direction="left" in={notif.data} className="noutlined">
                <Box height="80%"  display="flex" flexDirection="column" className="shadow" borderRadius={2} >
                    <Box height="20%" width="449px" py={2} borderRadius="15px" bgcolor="#fff" display="flex" flexDirection="column" alignItems="center" justifyContent="center" className='shadow-sm'>
                        <Box minHeight="20px" display='flex' justifyContent='space-between' alignItems='center' px={3}>
                            <Box fontSize='14px' fontWeight={600}>Please Allow first your notification or reset permission in your browser.</Box>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    )
}
