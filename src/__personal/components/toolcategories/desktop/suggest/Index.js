import { useState, useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import { rqx } from '../../../../../core/request/API';
import { env } from '../../../../../core/Env';
import { TDetailsModal } from './TDetailsModal';
import { SuggestLoader } from '../../Loader';

export const Index = ({tcs, tool_state, match}) => {
    const [dscpmodal, setDscpmodal] = useState({value:'', show:false})
    const [allTools, setAllTools] = useState([])
    const [loader, setLoader] = useState(false)

    const toolDescHandler = (val) => {
        setDscpmodal({value:val, show:true})
    }

    useEffect(() => {
        const __init = async() => {
            setLoader(true)
            let ids = match === 'subscribed' ? 'all' : [parseInt(window.atob(match))]
            let tools = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/read`, {filter: 'category', platform:'personal', tcid:ids});
            if (tools) {
                setAllTools(tools.filter(g => !tool_state.toolOwned.data.find(n => (n.tid === g.tid) )))
            }
            setTimeout(() => {
                setLoader(false)
            }, 1000);
        }
        let subscribe = true
        if (subscribe) {
            __init()
        }
        return () => subscribe = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])
    

    return (
        loader ? 
            <Box pt="16px" display="flex" justifyContent="center">
                <SuggestLoader/>
            </Box>
        :
            allTools.length > 0 && (
                <>  
                    <Box px="40px">
                        <Box pb="24px" color="#8B96A2" fontWeight={600} fontSize={14} lineHeight="16px">
                            Suggested Tools
                        </Box>
                    </Box>
                    <Box px="40px" className="overflowY"> 
                        <Box display="flex" flexWrap="wrap" gap="10px">
                            {allTools.map((v,k) => (
                                <Box key={k} onClick={()=>toolDescHandler(v)} className="c-pointer" sx={{':hover':{backgroundColor:'#EFEFEF'}}} minHeight="80px" bgcolor="#FFFFFF" borderRadius="6px" width="395px">
                                    <Box p="12px" display="flex" alignItems="center" gap="12px">
                                        <Avatar src={JSON.parse(v.logo)} variant="rounded" sx={{width:'56px', height:'56px'}}/>
                                        <Box>
                                            <Box color="#333333" fontWeight={600} fontSize={16} lineHeight="16px">{v.name}</Box>
                                            <Box pt="8px" color="#8B96A2" fontWeight={400} fontSize={14} lineHeight="16px">
                                                {tcs.toolCategories.data.filter(f => { return f.id === JSON.parse(v.tool_category_id).personal.tcid})[0].name }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {dscpmodal.show && (
                        <TDetailsModal dscpmodal={dscpmodal} setDscpmodal={setDscpmodal} tool_state={tool_state}/>
                    )}
                </>    
            ) 
    )
}