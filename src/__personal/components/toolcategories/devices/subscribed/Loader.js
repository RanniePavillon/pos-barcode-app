import { Box, Skeleton } from '@mui/material'

export const Loader = () => {
    return (
        <>
            <Skeleton variant='text' height="21px" width="200px" sx={{mb: 4}} />
            {
                ['', ''].map((v,k) => (
                    <Box height={64} mb="12px" key={k}>
                        <Skeleton variant='rectangular' height="100%" width="100%" />
                    </Box>
                ))
            }
        </>
    )
}
