import { Alert, Box, Snackbar } from '@mui/material'
import { useState } from 'react'
import Check from '../../assets/images/icons/check.png'

export const SuccessMsg = ({open, setOpen, message}) => {
    const [alert] = useState({vertical: 'bottom', horizontal: 'center'})
    const {vertical, horizontal} = alert
    return (
        <Snackbar key={vertical + horizontal} anchorOrigin={{vertical, horizontal}} autoHideDuration={1000} open={open} onClose={() => setOpen(false)} sx={{marginBottom: 9}} >
            <Alert icon={false} sx={{color: '#69717A', m: "auto", borderRadius: 2, px: 2, py: 1 }} className="shadow-sm">
                <Box display="flex" alignItems="center">
                    <img src={Check} alt="check" />
                    <Box sx={{fontSize: {xs: 12, md: 14}}} ml={1}>{message}</Box>
                </Box>
            </Alert>
        </Snackbar>
    )
}
