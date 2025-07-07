import { Avatar, Box, Button, Modal, Skeleton, Slide, Typography } from "@mui/material"
import { domain } from "../../../../../core/Env"
import { Add } from "@mui/icons-material"

export const TDetailsModal = ({dscpmodal, setDscpmodal, tool_state}) => {
    const redirectHandler = async(val) => {
        tool_state.preload.set({loader: true, logo: JSON.parse(val.logo)})
        window.open(`${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}&market_preview=${val.tid}&platform=business`, '_blank').focus()
        setTimeout(() => {
            tool_state.preload.set({...tool_state.preload.data, loader:false})
        }, 2000);
    }
    
    const toolDescClose = () => {
        setDscpmodal({...dscpmodal, value: '', show : false, index: 0})
    }
    return (
        <Modal open={dscpmodal.show} onClose={() => toolDescClose()}
            sx={{width: '100%', height:'100%'}}
        >
            <Slide in={dscpmodal.show} direction="up" >
                <Box height="100%" width="100%" display="flex" flexDirection="column" >
                    <Box height="100%" onClick={toolDescClose}></Box>
                    <Box minHeight="570px" display="flex" flexDirection="column" bgcolor="#ffffff" width="100%"  p="20px" borderRadius="16px 16px 0px 0px">
                        <Box minHeight="72px">
                            <Box display="flex" alignItems="center">
                                <Avatar src={JSON.parse(dscpmodal.value.logo)} variant="rounded" sx={{width: 72, height: 72}} />
                                <Box display="flex" flexDirection="column" ml="12px">
                                    <Box fontSize={14} fontWeight={600} color="#333333">{dscpmodal.value.name}</Box>
                                    <Box fontSize={12} fontWeight={400} color="#107038">Run My HR & Admin</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box minHeight="221px" mt="40px">
                            <Box width="100%" className="c-pointer overflowX noScrollcss" display="flex" alignItems="center" gap="8px"> 
                                {['','','',''].map((v,k) => (
                                    <Skeleton key={k} variant="rectangular" sx={{borderRadius:'6px', minWidth:'144px', minHeight:'221px'}}/>
                                ))}
                            </Box>
                        </Box>
                        <Box minHeight="10px" mt="39px">
                            <Box fontSize={14} fontWeight={600} color="#8B96A2" mb="20px">Description</Box>
                        </Box>
                        <Box height="100%" className="overflowY" my="20px">
                            <Typography fontSize={14} fontWeight={400}>
                                {dscpmodal.value.description}
                            </Typography>
                        </Box>
                        <Box minHeight="36px">
                            <Button variant="contained" sx={{width: '100%', borderRadius: '6px'}} onClick={() => redirectHandler(dscpmodal.value)}>
                                <Add sx={{color:'#FFFFFF'}}/>  Add to My Business
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    )
}
