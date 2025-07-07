import { Avatar, Box, Divider } from '@mui/material';
import { env } from '../../../../../core/Env';
import { rqx } from '../../../../../core/request/API';
import { NoToolsIcons } from '../../../../../core/global/Icons';
import { Index as SuggestTool } from '../suggest/Index';
import { SubscribeLoader } from '../../Loader';

export const Index = ({tool_state, tcs, match}) => {
   
    const redirectHandler = async(tid, logo) =>{
        tool_state.preload.set({loader:true, logo:JSON.parse(logo)})
        let res = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/toolcb`, {tid: tid, env:env() !== 'prod' ? 'sandbox' : 'production'});
        if (res.msg === 'success') {
            if (res.tu.length > 0) {
                window.open(`${res.tu[0].value}?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}`, '_blank').focus()
            }
            setTimeout(() => {
                tool_state.preload.set({...tool_state.preload.data, loader:false})
            }, 2000);
            return
        }
    }
    
    return (
        tcs.toolCategories.data.length === 0 ? 
            <SubscribeLoader/>
        :
            <Box height="100%" width="100%" display="flex" flexDirection="column">
                <Box px="40px" display="flex" color="#333333" fontWeight={600} fontSize={20} lineHeight="26px">
                    {tool_state.__SESSION.data.uaccess[0].role_id === 0 ?
                        'Subscribed Tools'
                    :
                        'Accessed Tools'
                    }
                    <Box pl="4px" color="#88BB99">({tool_state.toolOwned.data.length})</Box>
                </Box>
                <Box pt="8px"><Divider sx={{color:'#E9ECEF'}}/></Box>
                {tool_state.toolOwned.data.length > 0 ? 
                    <Box height="100%" className="overflowY" mt="24px" px="40px" mr="2px">
                        <Box display="flex" flexWrap="wrap" gap="16px">
                            {tool_state.toolOwned.data.map((v,k) => (
                                <Box key={k} className="c-pointer" onClick={()=>redirectHandler(v.tid, v.logo)} minHeight="80px" bgcolor="#FFFFFF" borderRadius="6px" width="395px">
                                    <Box p="12px" display="flex" alignItems="center" gap="12px">
                                        <Avatar src={JSON.parse(v.logo)} alt={v.name} variant="rounded" sx={{height:'56px', width:'56px'}} />
                                        <Box>
                                            <Box color="#333333" fontWeight={600} fontSize={16} lineHeight="16px" >{v.name}</Box>
                                            <Box pt="8px" color="#8B96A2" fontWeight={400} fontSize={14} lineHeight="16px">
                                                {tcs.toolCategories.data.filter(f => { return f.id === JSON.parse(v.tool_category_id).personal.tcid})[0].name }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                :
                    <>
                        <Box pt="120px" pb="50px" display="flex" alignItems="center" justifyContent="center">
                            <Box textAlign="center">
                                <NoToolsIcons/>
                                <Box color="#333333" fontWeight={400} fontSize={14} lineHeight="16px">No availed tools yet</Box>
                            </Box>
                        </Box>
                        <SuggestTool tcs={tcs} tool_state={tool_state} match={match}/>    
                    </>
                }
            </Box>
    )
}