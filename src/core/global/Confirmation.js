import { Box, Button, Dialog, } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SnakeLoader } from "../loader/SnakeLoader";
import { VM } from '../VM'
import { MActionIcons } from "./Icons";

export const Confirmation = ({isOpen, cancel, send, disabled, text, btnText="Save"}) => {
    let view = VM()
    const styles = makeStyles(() => ({
        cancel: {
            backgroundColor: '#FFFFFF',
            color: '#1B1B1B',
            borderRadius: view === '/devices/mobile'|| view === '/devices/tablet' ? 4 : 12,
            border: '1px solid #7B7F82',
            height: view === '/devices/mobile'|| view === '/devices/tablet' ? 36 : 44,
            width: view === '/devices/mobile'|| view === '/devices/tablet'? 113 : 132,
            '&:hover':{
                backgroundColor: '#FFFFFF'
            }
        },
        send:{
            backgroundColor: '#ff0000',
            color: '#FFFFFF',
            borderRadius: view === '/devices/mobile'|| view === '/devices/tablet' ? 4 : 12,
            height: view === '/devices/mobile'|| view === '/devices/tablet' ? 36 : 44,
            width: view === '/devices/mobile'|| view === '/devices/tablet'? 113 : 132,
            '&:hover':{
                backgroundColor: '#ff0000'
            }
        }
    }))
    
    return (
        <Dialog open={isOpen} PaperProps={{ sx:{borderRadius: {xs: '8px !important', md: '14px !important'} } }}>
            <Box display="flex" alignItems="center" flexDirection="column" sx={{py: {xs: 3, md: 4}, px: {xs: 3, md:2,}, width: {md: 432}}}>
                <MActionIcons fill="#FD9797" />
                <Box py="32px" fontWeight="bold" fontSize={20}>{text}</Box>
                <Box display="flex">
                    <Button variant="contained" className={styles().cancel} sx={{mr: '12px'}} disableElevation={true} onClick={cancel} disabled={disabled}>Cancel</Button>
                    <Button variant="contained" className={styles().send} disableElevation={true} onClick={send} disabled={disabled}> { disabled  ? <SnakeLoader bg= "white" size= "10px" distance= "10px" /> : btnText } </Button>
                </Box>
            </Box>
        </Dialog>
    )
}