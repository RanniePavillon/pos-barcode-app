import { Modal, Box, IconButton, Button, Avatar, Fade, Skeleton, useMediaQuery } from '@mui/material/';
import { Close as CloseIcon, Add } from '@mui/icons-material';
import { useContext } from 'react';
import { domain } from '../../../core/Env';
import { ToolContext } from '../../../core/context/ToolContext';

export const ToolProfile = ({ tp, setTP, __SESSION }) => {
    const xsmHeight = useMediaQuery('(max-height:800px)');
    const { tool_state } = useContext(ToolContext)

    const redirectHandler = async() => {
        window.open(`${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}&market_preview=${tp.data.tid}&platform=business`, '_blank').focus()
    }
    
    return (
        <Modal
            open={tp.stat} 
            onClose={() => setTP({data:[], stat:false})}
            sx={{height:'100%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            className="noutlined"
        >
            <Fade in={tp.stat} direction="left" className="noutlined">
                <Box height="100%" width="100%" display='flex' alignItems='center' justifyContent='center' >
                    {tp.stat && (
                        <Box height={xsmHeight ? "700px" : "793px"} width="718px" bgcolor="#FFFFFF" boxShadow=" : 0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A" py="32px" borderRadius="12px"> 
                            <Box height="100%" width="100%" display="flex" flexDirection="column" gap="40px">
                                <Box minHeight="148px" display="flex" flexDirection="column" gap="24px" px="32px">
                                    <Box display="flex" alignItems="center" gap="24px">
                                        <Avatar variant="square" src={JSON.parse(tp.data.logo)} sx={{width:80, height:80}}/>
                                        <Box display="flex" alignItems="flex-start">
                                            <Box width="526px" display="flex" flexDirection="column" gap="8px" color="#283745">
                                                <Box fontSize={20} fontWeight={600} lineHeight="20px">{tp.data.name}</Box>
                                                <Box fontSize={14} fontWeight={400} lineHeight="16px" color="text.main">{tp.data.category_name}</Box>
                                                {tp.data.tool_status === "Accredited" && (
                                                    <Box fontSize={12} fontWeight={400} lineHeight="20px">{tp.data.count} Users</Box>
                                                )}
                                            </Box>
                                            <IconButton onClick={()=>setTP({data:[], stat:false})} sx={{padding:'0px !important'}}>
                                                <CloseIcon sx={{width:24, height:24, color:'#283745'}} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    {tp.data.tool_status === "Accredited" ? 
                                        <Button onClick={()=>redirectHandler()} variant='contained' sx={{width:'212px', height:'44px', borderRadius:'6px', display:'flex', gap:'8px', boxShadow:'none !important'}}>
                                            {__SESSION.data.uaccess[0].role_id === 0 ? 
                                                <>
                                                    <Add sx={{color:'#FFFFFF', height:24, width:24}}/>
                                                    Add to my Business
                                                </>
                                            :
                                                'Recommend'
                                            }
                                        </Button>
                                    :
                                        <Box sx={{width:'138px', height:'44px', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center'}} bgcolor="#E3ECEA" color="#107038" fontSize={14} fontWeight={500} lineHeight="24px">
                                            <Box>Coming Soon</Box>
                                        </Box>
                                    }
                                </Box>
                                <Box height="100%" width="100%" className="overflowY" display="flex" flexDirection="column" justifyContent="space-between" gap="16px" px="32px">
                                    <Box minHeight={xsmHeight ?  "380px" : "465px"} width="100%" display="flex" gap="16px" className="overflowX" sx={{whiteSpace:'nowrap !important'}}>
                                        {['','','',''].map((v,k) => (
                                            <Box key={k} minWidth="261px" height="100%" borderRadius="6px">
                                                <Skeleton variant='rectangular' sx={{width:'100%', height:'100%', borderRadius:'6px'}}/>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box height="100%" fontSize={14} fontWeight={600} color="#6A6A6A">
                                        <Box pb="8px">Description</Box>
                                        <Box fontSize={12} fontWeight={400} color="#283745">
                                            {tp.data.description}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
}