import { Box, Divider, Skeleton } from "@mui/material"

export const TCNameLoader = () => {

    return (
        <Box height="100%" width="100%">
            <Box display="flex" flexDirection="column" gap="16px">   
                {['','','',''].map((v,k) => (
                    <Box key={k} display="flex" justifyContent="space-between" alignItems="center">
                        <Skeleton variant="rectangular" width='100% ' height="50px" sx={{borderRadius:'4px'}}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export const SubscribeLoader = () => {
    return (
        <Box height="100%" width="100%" px="40px">
            <Box display="flex" color="#333333" fontWeight={600} fontSize={20} lineHeight="26px">
                <Skeleton variant="text" width="200px" height="25px" />
            </Box>
            <Box pt="8px"><Divider sx={{color:'#E9ECEF'}}/></Box>
            <Box pt="12px" display="flex" gap="24px">
                {['',''].map((v,k) => (
                    <Skeleton key={k} variant="text" width="395px" height="120px" />
                ))}
            </Box>
        </Box>
    )
}

export const SuggestLoader = () => {
    return (
        <Box display="flex" flexWrap="wrap" gap="10px" px={{xs:'0px', sm:'40px'}}>
            {['','',''].map((v,k) => (
                <Box key={k} className="c-pointer" sx={{':hover':{backgroundColor:'#EFEFEF'}}} minHeight="80px" bgcolor="#FFFFFF" borderRadius="6px" width={{xs:'100%', sm:'395px'}}>
                    <Box p="12px" display="flex" alignItems="center" gap="12px">
                        <Skeleton variant="text" width="56px" height="80px" />
                        <Box>
                            <Skeleton variant="text" width="150px" height="20px" />
                            <Box color="#333333" fontWeight={600} fontSize={16} lineHeight="16px">{v.name}</Box>
                            <Box pt="8px" color="#8B96A2" fontWeight={400} fontSize={14} lineHeight="16px">
                                <Skeleton variant="text" width="75px" height="20px" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export const ChartLoader = () => {
    return (
        <Box pt={{md: "16px"}} px={{md: "24px"}} minHeight="380px" bgcolor="#FFFFFF" borderRadius="6px" display="flex" alignItems={{xs: "flex-start", md: "center"}} flexDirection="column">
            <Box display="flex" justifyContent="center" width="100%" >
                <Skeleton variant="text" width="150px" height="20px" />
            </Box>
            <Box height="380px" width="100%" position="relative" pt="12px">
                <Skeleton variant="rectangular" width="100%" height="350px" sx={{borderRadius:'6px'}} />
            </Box>
        </Box>
    )
}