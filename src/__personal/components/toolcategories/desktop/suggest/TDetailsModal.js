import { Add } from '@mui/icons-material';
import { Avatar, Box, Dialog, Skeleton } from '@mui/material';
import { domain } from '../../../../../core/Env';

export const TDetailsModal = ({dscpmodal, setDscpmodal, tool_state}) => {

    const redirectHandler = async(val) => {
        tool_state.preload.set({loader:true, logo:JSON.parse(val.logo)})
        window.open(`${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}&market_preview=${val.tid}&platform=personal`, '_blank').focus()
        setTimeout(() => {
            tool_state.preload.set({...tool_state.preload.data, loader:false})
        }, 2000);
    }
    
    return (
        <Dialog 
            keepMounted
            open={dscpmodal.show}  
            onClose={()=>setDscpmodal({...dscpmodal, show:false})}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    minWidth:'632px',
                }
            }}
        >
            <Box minHeight="589px" p="32px" bgcolor="#FFFFFF" boxShadow="0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" borderRadius="6px">
                <Box display="flex" alignItems="center" gap="24px">
                    <Avatar src={JSON.parse(dscpmodal.value.logo)} variant="rounded" sx={{width:'72px', height:'72px'}}/>
                    <Box>
                        <Box color="#333333" fontWeight={600} fontSize={20} lineHeight="16px" >{dscpmodal.value.name}</Box>
                        <Box pt="8px" color="#107038" fontWeight={400} fontSize={14} lineHeight="16px">Run My HR & Admin</Box>
                    </Box>
                </Box>
                <Box pt="24px">
                    {tool_state.__SESSION.data.uaccess[0].role_id === 0 ? 
                        <Box onClick={()=>redirectHandler(dscpmodal.value)} className="c-pointer" display="flex" justifyContent="center" alignItems="center" gap="10px" minHeight="36px" width="219px" bgcolor="#107038" borderRadius="6px">
                            <Add sx={{color:'#FFFFFF'}}/>
                            <Box color="#FFFFFF" fontWeight={600} fontSize={14} lineHeight="16px">Add to My Personal</Box>
                        </Box>
                    :
                        <Box display="flex" justifyContent="center" alignItems="center" gap="10px" minHeight="36px" width="219px" bgcolor="rgba(0, 0, 0, 0.11)" borderRadius="6px">
                            <Box color="#8B96A2" fontWeight={600} fontSize={14} lineHeight="16px">Recommend</Box>
                        </Box>
                    }
                </Box>
                <Box pt="40px">
                    <Box width="100%" className="c-pointer overflowX noScrollcss" display="flex" alignItems="center" gap="8px">
                        {['','','',''].map((v,k) => (
                            <Skeleton key={k} variant="rectangular" sx={{borderRadius:'6px', minWidth:'156px', minHeight:'240px'}}/>
                        ))}
                    </Box>
                </Box>
                <Box pt="40px">
                    <Box color="#8B96A2" fontWeight={600} fontSize={14} lineHeight="20px">Description</Box>
                    <Box pt="20px">
                        <Box color="#333333" fontWeight={400} fontSize={14} lineHeight="20px">
                            {dscpmodal.value.description}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}