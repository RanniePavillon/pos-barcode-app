import { Box, Button, Divider } from "@mui/material"
import { useContext } from "react"
import { ToolContext } from '../../../../core/context/ToolContext'
import { Subscribe } from "./subscribed/Index"
import { useHistory, useLocation } from "react-router-dom"
import { useState } from "react"
import { TcModal } from "./tcModal/Index"
import { useEffect } from "react"
import { NothingToSee } from "../../empty/Index"
import { TCNameLoader } from "../Loader"

export const MIndex = ({match}) => {
    const { tool_state, tool_category_state, install_state } = useContext(ToolContext)
    const tcs = tool_category_state
    const __LOCATION = useLocation().pathname
    const nav = useHistory()
    const [tcShow, setTcShow] = useState(false)

    const validateBase64String = () =>{
        try {
            window.atob(encodedString);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    const encodedString = match.params.params;
    const isValid = validateBase64String(encodedString);
    const data = isValid && ( tcs.toolCategories.data.filter((v) => v.id === parseInt(window.atob(match.params.params))) )
    
    const redirectHandler = (id, type) => {
        if (type === 'open') {
            if (__LOCATION.split('/', 3)[2] !== id) {
                setTcShow(true)
                nav.push(`/biz/tool-categories/${id}`)
            }
        }else{
            setTcShow(false)
            nav.push(`/biz/tool-categories/subscribed`)
        }
    }

    useEffect(() => {
        let subscribe = true
        if (subscribe) {
            if (isValid) {
                if (match.params.params !== 'subscribed') {
                    setTcShow(true)
                }
            }
        }
        return () => subscribe = false
        // nav.push(`/tool-categories/subscribed`)
        // eslint-disable-next-line
    }, [])

    return (
        !isValid ? 
            <Box p="40px" height="100%" width="100%">
                <NothingToSee/>
            </Box>
        :
            <Box width="100%" height="100%" bgcolor="#F6F7F8" display="flex" flexDirection="column" className="overflowY" >
                <Subscribe tool_state={tool_state} tcs={tcs} match={match.params.params} />
                <Divider />
                <Box py={4} px={3} display="flex" flexDirection="column">
                    <Box fontSize={14} fontWeight={700} color="#107038" mb={4}>Tool Categories</Box>
                    {
                        tcs.toolCategories.data.length === 0 || !isValid ? 
                            <Box display="flex" justifyContent="center">
                                <TCNameLoader/>
                            </Box>
                        :
                            tcs.toolCategories.data.map((v, k) => (
                                <Button key={k} onClick={() => redirectHandler(window.btoa(v.id), 'open')}
                                    sx={{p: '16px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', bgcolor: '#ffffff', mb: "12px", borderRadius: '6px', '&:hover': { bgcolor: '#ffffff' } }}
                                >
                                    <Box fontSize={14} fontWeight={600} color="#333333">{v.name}</Box>
                                </Button>
                            ))
                    }
                </Box>
                {install_state.prompt.data !== null && (
                    <Box minHeight="64px"></Box>
                )}
                {
                    match.params.params !== 'subscribed'  && (
                        (tcShow && data.length > 0) &&  
                            <TcModal tcShow={tcShow} redirectHandler={redirectHandler} data={data} match={match.params.params} tool_state={tool_state} tcs={tcs} />
                    ) 
                }
            </Box>
    )
}