import { useState } from "react"
import { Avatar, Box, Button } from "@mui/material"
import { Loader } from "./Loader"
import { Index as SuggestTool  } from '../suggest/Index'
import { NoToolsIcons } from "../../../../../core/global/Icons"
import { rqx } from "../../../../../core/request/API"
import { env } from "../../../../../core/Env"

export const Subscribe = ({tool_state, tcs, match}) => {
    const [hover, setHover] = useState({value: false, index: 0})

    const redirectHandler = async(tid, logo, i) => {
        setHover({...hover, value : true , index : i})
        tool_state.preload.set({loader:true, logo: JSON.parse(logo)})
        let res = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/toolcb`, {tid: tid, env: env() !== 'prod' ? 'sandbox' : 'production'})
        if (res.msg === 'success') {
            if (res.tu.length > 0) {
                window.open(`${res.tu[0].value}?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}`, '_blank').focus()
            }
            setTimeout(() => {
                tool_state.preload.set({...tool_state.preload.data, loader:false})
                setHover({...hover, value : false , index : 0})
            }, 2000);
            return
        }
    }
    
    return (
        <Box py={4} px={3} display="flex" flexDirection="column">
            {
                tcs.toolCategories.data.length === 0 ? 
                    <Loader />
                :
                    <>
                        <Box display="flex" alignItems="center" fontSize={14} fontWeight={700} mb={4}>
                            {tool_state.__SESSION.data.uaccess[0].role_id === 0 ?
                                'Subscribed Tools'
                            :
                                'Accessed Tools'
                            }
                            <Box pl="4px" color="#88BB99">({tool_state.toolOwned.data.length})</Box>
                        </Box>
                        {
                            tool_state.toolOwned.data.length > 0  ?
                                tool_state.toolOwned.data.map((v, k) => (
                                    <Button key={k} onClick={() => redirectHandler(v.tid, v.logo, k)}
                                        sx={{p: '12px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', bgcolor: '#ffffff', mb: "12px", borderRadius: '6px', '&:hover': { bgcolor: '#ffffff' } }}
                                    >
                                        <Avatar src={JSON.parse(v.logo)} variant="rounded" sx={{height: 40, width: 40}} />
                                        <Box display="flex" flexDirection="column" alignItems="flex-start" ml="12px">
                                            <Box fontSize={12} fontWeight={600} lineHeight="16px">{v.name}</Box>
                                            <Box fontSize={10} fontWeight={400} color="#8B96A2" lineHeight="16px">
                                                { tcs.toolCategories.data.filter(f => {return f.id === JSON.parse(v.tool_category_id).business.tcid})[0].name }
                                            </Box>
                                        </Box>
                                    </Button>
                                ))
                            :
                                <>
                                    <Box textAlign="center">
                                        <NoToolsIcons />
                                        <Box color="#333333" fontWeight={400} fontSize={14} lineHeight="16px" mb="27px">No availed tools yet</Box>
                                    </Box> 
                                    <SuggestTool match={match} tool_state={tool_state} tcs={tcs} />
                                </>
                        }
                    </>
            }
        </Box>
    )
}
