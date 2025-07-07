import { Box } from '@mui/material'
import { SnakeLoader } from '../../../core/loader/SnakeLoader'

export const Loader = ({rem = "1rem"}) => {
    return (
        <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <SnakeLoader size={rem} bg="#11783C" distance="0.3rem" />
        </Box>
    )
}

export const MblFetchingLoader = ({mt=2}) => {
    return (
        <Box mt={mt} height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
            <SnakeLoader size="10px" bg="#11783C" distance="0.3rem" />
        </Box>
    )
}