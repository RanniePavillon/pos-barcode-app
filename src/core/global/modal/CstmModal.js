import { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { SuccessIcons } from '../Icons';

export const SuccessAlert = (props) => {
    const { successOpen, setSuccessOpen, text } = props;
 
    const [alrt] = useState({vertical:'top', horizontal:'center'}) 
    const { vertical, horizontal } = alrt;
    
    return (
        <Snackbar key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={successOpen} 
    autoHideDuration={2000} 
    onClose={() => setSuccessOpen(false)} >
            <Box m={3} mt={10} borderRadius={3} bgcolor={"#00BE81"} fontSize={14} display="flex" justifyContent="center" alignItems="center" minHeight="44px" color={ "#ffffff"} px={2}>
                <Box display="flex" justifyContent="center" alignItems="center"> 
                    <SuccessIcons fill={'#FFF'}/>
                    <Box px={1}>{text}</Box>
                </Box>   
            </Box>
        </Snackbar>
    )
}
