import { useHistory } from "react-router-dom";
import { Box, Container, useMediaQuery } from "@mui/material"

export const Index = () => {
    const xl = useMediaQuery('(min-width:1921px)');
    const nav = useHistory()
    
    const __showFeature = () => {
        return nav.push('/admin/dashboard')
    }

    return (
        <Box height="100%" width="100%" className="overflowY noScrollcss" component={xl ? Container : ''} p={3}>
            {__showFeature()}
        </Box>
    )
}