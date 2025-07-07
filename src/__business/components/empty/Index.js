import { Box, Grid, Container } from '@mui/material';
import { NodataIcons } from '../../../core/global/Icons';
import PageError from '../../../assets/images/empty/no_result.gif';
import NotFound from '../../../assets/images/empty/new-empty-box.png';
import NoGraphFound from '../../../assets/images/empty/new-no-graph.png';
import NoToolsCategories from '../../../assets/images/empty/new-empty-tools.png';
import Lock from '../../../assets/images/icons/lock.png'

export const NoResult = ({m=5, text="No Result"}) => {
    return (
        <Grid container direction="row" justifyContent="center" bgcolor="#ffffff" mt={m} borderRadius="10px">
            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center" py={3}>
                <Box component="img" alt="Not Found" src={NotFound} pt={2} />
                <Box py={2}>{text}</Box>
            </Box>
        </Grid>
    );
}

export const NoToolFound = ({m=5, text="No Tool Found"}) => {
    return (
        <Grid container justifyContent="center" alignItems="center" bgcolor="#ffffff" mt={m} borderRadius="10px">
            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                <Box component="img" alt="Not Found" src={NotFound} pt={2} />
                <Box py={2} fontSize={14} fontWeight={600}>{text}</Box>
            </Box>
        </Grid>
    );
}

export const NoGraphicalReportFound = ({m=5, text="No Graphical Report Found", bgcolor="#ffffff"}) => {
    return (
        <Grid container justifyContent="center" alignItems="center" bgcolor={bgcolor} mt={m} borderRadius="10px">
            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center">
                <Box component="img" alt="Not Found" src={NoGraphFound} pt={2} />
                <Box py={2} fontSize={14} fontWeight={600}>{text}</Box>
            </Box>
        </Grid>
    );
}

export const NothingToSee = ({m=5, text="There's nothing to see yet"}) => {
    return (
        <Grid container direction="row" justifyContent="center" bgcolor="#ffffff" mt={m} borderRadius="10px">
            <Box display="flex" flexDirection="column" alignContent="center" alignItems="center" py={3}>
                <Box component="img" alt="Not Found" src={NoToolsCategories} pt={2} />
                <Box py={2}>{text}</Box>
            </Box>
        </Grid>
    );
}

export const NotFoundPage = () => {
    return ( 
        <Box height="100%" width="100%" component={Container}>
            <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
                <Box sx={{backgroundImage: `url(${PageError })`, backgroundSize:"cover", backgroundPosition:"center center", height:'100%', width:'100%', borderRadius:'12px 12px 0px 0px' }} />
            </Box>
        </Box>
    );
}

export const NoDataFound = () => {
    return ( 
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <Box textAlign="center">
                <NodataIcons/>
                <Box color="#011104" fontSize={14}>No Data Found</Box>
            </Box>
        </Box>
    );
}

export const NotShared = () => {
    return (
        <Box height="100%" width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center">
                <img src={Lock} alt={Lock} />
                <Box ml="12px" color="#A2A3A9" fontSize={14} fontWeight={400} lineHeight="22px">Not shared</Box>
            </Box>
        </Box>
    )
}