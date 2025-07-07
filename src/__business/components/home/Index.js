import { useContext } from "react"
import { Box, Container } from "@mui/material"
import { ToolContext } from "../../../core/context/ToolContext";

const Home = () => { 
    const { tool_state, } = useContext(ToolContext)
    const { __SESSION: {data: {ainfo, pinfo}} } = {...tool_state}
   
    return (
        <Container sx={{height: '100%', display: 'flex', flexDirection: 'column', p:'56px !important'}} maxWidth="xl">
            <Box height="100%" width="100%">
                <Box fontSize={20} fontWeight={700} mt={1}>Dashboard Business</Box>
                <Box display="flex" my={1}>
                    <Box fontSize={16} fontWeight={400}>Extraordinary day,</Box>
                    <Box pl={0.5} mr={2} fontSize={16}> { pinfo.length > 0 ? `${pinfo[0].first_name}!` : `${ainfo[ainfo.email!==null?"email":"mobile_num"]}!`}</Box>
                </Box>
            </Box>
        </Container>
    )
}
export default Home