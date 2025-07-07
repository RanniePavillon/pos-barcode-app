import { Box, Skeleton } from '@mui/material';

export const Loader = () => {
    return (  
        <Box height="100%" width="100%">
            {['',''].map((v,k) => (
                <Box key={k} display="flex" flexDirection="column" gap="12px">
                    <Skeleton variant="text" sx={{width:'120px', height:'20px'}}/>
                    <Box display="flex" alignItems="center" gap="12px" >
                        {['', '', ''].map((t,i) => (
                            <Box key={i} className="c-pointer" width="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px">
                                <Skeleton variant='rectangular' sx={{width:'40px', height:'40px', borderRadius:'8px'}}/>
                                <Skeleton variant="text" sx={{width:'50px', height:'20px'}}/>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}