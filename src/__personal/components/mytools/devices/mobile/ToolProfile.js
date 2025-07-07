import { Modal, Box, IconButton, Button, Avatar, Skeleton, Slide, useMediaQuery } from '@mui/material/';
import { Close as CloseIcon, Add } from '@mui/icons-material';
import { domain } from '../../../../../core/Env';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { useContext } from 'react';

export const ToolProfile = ({ tp, setTP, __SESSION }) => {
    const { tool_state } = useContext(ToolContext)
    const xsm = useMediaQuery('(max-width:350px)');

    const redirectHandler = async() => {
        window.open(`${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}&market_preview=${tp.data.tid}&platform=business`, '_blank').focus()
    }

    return (
        <Modal
            open={tp.stat} 
            onClose={() => setTP({data:[], stat:false})}
            sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex:'1400 !important'}} 
            className="noutlined"
        >
            <Slide in={tp.stat} direction="up" className="noutlined">
                <Box height="100%" width="100%" display="flex" flexDirection="column"> 
                    <Box onClick={() => setTP({data:[], stat:false})} height="100%"></Box>
                    <Box minHeight="599px" width="100%" display="flex" flexDirection="column" gap="40px" bgcolor="#FFFFFF" borderRadius="12px 12px 0px 0px" boxShadow=" : 0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A">
                    {tp.stat && (
                        <Box height="100%" width="100%" display="flex" flexDirection="column" pt="20px" pb="16px" gap="20px">
                        <Box minHeight="56px" width="100%" display="flex" alignItems="flex-start" gap="12px" px={xsm ? '8px' : '16px'} >
                            <Box width="56px">
                                <Avatar variant="square" src={JSON.parse(tp.data.logo)} sx={{width:56, height:56}}/>
                            </Box>
                            <Box display="flex" flexDirection="column" color="#283745" sx={{width:'100%', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                                <Box fontSize={16} fontWeight={600} lineHeight="26px">{tp.data.name}</Box>
                                <Box fontSize={12} fontWeight={400} lineHeight="16px" color="text.main">{tp.data.category_name}</Box>
                                {tp.data.tool_status === "Accredited" && (
                                    <Box fontSize={11} fontWeight={400} lineHeight="19px">{tp.data.count} Users</Box>
                                )}
                            </Box>
                            <Box width="24px">
                                <IconButton onClick={()=>setTP({data:[], stat:false})} sx={{padding:'0px !important'}}>
                                    <CloseIcon sx={{width:24, height:24, color:'#283745'}} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="100%" width="100%" className="overflowY" display="flex" flexDirection="column" gap="20px" px={xsm ? '8px' : '16px'}>
                            <Box minHeight="285px" width="100%" display="flex" gap="8px" className="overflowX noScrollcss" sx={{whiteSpace:'nowrap !important'}}>
                                {['','','','','','',''].map((v,k) => (
                                    <Box key={k} minWidth="131px" height="285px" borderRadius="6px">
                                        <Skeleton variant='rectangular' sx={{width:'100%', height:'100%', borderRadius:'6px'}}/>
                                    </Box>
                                ))}
                            </Box>
                            <Box fontSize={14} fontWeight={600} color="#6A6A6A">Description</Box>
                            <Box fontSize={12} fontWeight={400} color="#283745">
                                {tp.data.description}
                            </Box>
                        </Box>
                        <Box minHeight="36px" width="100%" display="flex" justifyContent='center' alignItems="center" px={xsm ? '8px' : '16px'}>
                            {tp.data.tool_status === "Accredited" ?
                                <Button onClick={()=>redirectHandler()} variant='contained' sx={{width:'100%', height:'36px', borderRadius:'6px', display:'flex', gap:'8px', boxShadow:'none !important'}}>
                                    <Add sx={{color:'#FFFFFF', height:24, width:24}}/>
                                    Add to my Personal
                                </Button>
                            :
                                <Box sx={{width:'100%', height:'36px', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center'}} bgcolor="#F0F5F9" color="#3D77E9" fontSize={14} fontWeight={500} lineHeight="24px">
                                    <Box>Coming Soon</Box>
                                </Box>
                            }
                        </Box>
                    </Box>
                        // <Box height="100%" display="flex" flexDirection="column" px={xsm ? '8px' : '16px'} pt="20px" pb="16px" gap="20px">
                        //     <Box minHeight="auto" display="flex" alignItems="flex-start" gap="12px">
                        //         <Avatar variant="square" src={JSON.parse(tp.data.logo)} sx={{width:56, height:56}}/>
                        //         <Box width="100%" display="flex" flexDirection="column" color="#283745">
                        //             <Box fontSize={16} fontWeight={600} lineHeight="26px">{tp.data.name}</Box>
                        //             <Box fontSize={12} fontWeight={400} lineHeight="16px" color="text.main">{tp.data.category_name}</Box>
                        //             <Box fontSize={11} fontWeight={400} lineHeight="19px">{tp.data.count} Users</Box>
                        //         </Box>
                        //         <IconButton onClick={()=>setTP({data:[], stat:false})} sx={{padding:'0px !important'}}>
                        //             <CloseIcon sx={{width:24, height:24, color:'#283745'}} />
                        //         </IconButton>
                        //     </Box>
                        //     <Box height="100%" width="100%" className="overflowY" display="flex" flexDirection="column" justifyContent="space-between" gap="20px">
                        //         <Box minHeight="285px" width="100%" display="flex" gap="8px">
                        //             {['','','','','','',''].map((v,k) => (
                        //                 <Box key={k} minWidth="131px" height="285px" borderRadius="6px">
                        //                     <Skeleton variant='rectangular' sx={{width:'100%', height:'100%', borderRadius:'6px'}}/>
                        //                 </Box>
                        //             ))}
                        //         </Box>
                        //         <Box fontSize={14} fontWeight={600} color="#283745">Description</Box>
                        //         <Box fontSize={12} fontWeight={400} color="#283745">
                        //             {tp.data.description}
                        //         </Box>
                        //     </Box>
                        //     <Box minHeight="36px" width="100%" display="flex" justifyContent='center' alignItems="center">
                        //         {tp.data.tool_status === "Accredited" ?
                        //             <Button onClick={()=>redirectHandler()} variant='contained' sx={{width:'100%', height:'36px', borderRadius:'6px', display:'flex', gap:'8px'}}>
                        //                 <Add sx={{color:'#FFFFFF', height:24, width:24}}/>
                        //                 Add to my Personal
                        //             </Button>
                        //         :
                        //             <Box sx={{width:'100%', height:'36px', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center'}} bgcolor="#F0F5F9" color="#3D77E9" fontSize={14} fontWeight={500} lineHeight="24px">
                        //                 <Box>Coming Soon</Box>
                        //             </Box>
                        //         }
                        //     </Box>
                        // </Box>
                    )}
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
}