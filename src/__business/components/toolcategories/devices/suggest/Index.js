import { useState, useEffect } from "react"
import { Avatar, Box, Button } from "@mui/material"
import { TDetailsModal } from "./TDetailsModal"
import { rqx } from "../../../../../core/request/API"
import { env } from "../../../../../core/Env"
import { SuggestLoader } from "../../Loader"

export const Index = ({match, tool_state, tcs}) => {
    const [loader, setLoader] = useState(false)
    const [allTools, setAllTools] = useState([])
    const [dscpmodal, setDscpmodal] = useState({value:'', show:false, index: 0})

    const toolDescHandler = (val, i) => {
        setDscpmodal({value:val, show:true, index:i})
    }

    useEffect(() => {
        const __init = async() => {
            setLoader(true)
            let ids = match === 'subscribed' ? 'all' : [parseInt(window.atob(match))]
            let tools = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/read`, {filter: 'category', platform:'business', tcid:ids});
            if (tools) {
                setAllTools(tools.filter(f => !tool_state.toolOwned.data.find(n => (n.tid === f.tid))))
            }
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }
        let subscribe = true
        if (subscribe) {
            __init()
        }
        return () => subscribe = false
        // eslint-disable-next-line
    }, [match])
    
    return (
        loader ? 
            <Box pt="16px" display="flex" justifyContent="center">
                <SuggestLoader/>
            </Box>
        :
            allTools.length > 0 && (
                <>
                    <Box fontSize={14} fontWeight={400} color="#107038" lineHeight="16px" mb={2}>Suggested Tools</Box>
                    {
                        allTools.map((v, k) => (
                            <Button key={k} onClick={() => toolDescHandler(v,k)}
                                sx={{p: '12px', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', bgcolor: '#ffffff', mb: "12px", borderRadius: '6px', '&:hover': { bgcolor: '#ffffff' } }}
                            >
                                <Avatar src={JSON.parse(v.logo)} variant="rounded" sx={{height: 40, width: 40}} />
                                <Box display="flex" flexDirection="column" alignItems="flex-start"  ml="12px">
                                    <Box fontSize={12} fontWeight={600}>{v.name}</Box>
                                    <Box fontSize={10} fontWeight={400} color="#8B96A2">
                                        { tcs.toolCategories.data.filter(f => {return f.id === JSON.parse(v.tool_category_id).business.tcid})[0].name }
                                    </Box>
                                </Box>
                            </Button>
                        ))
                    }
                    {
                        dscpmodal.show && (
                            <TDetailsModal dscpmodal={dscpmodal} setDscpmodal={setDscpmodal} tool_state={tool_state} />
                        )
                    }
                </>
            )
    )
}
