import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CstmTextField = styled(TextField)({
    "& .css-vyjyf0-MuiFormLabel-root-MuiInputLabel-root": {
        color: "#0059BE !important",
    },
    // "& .MuiOutlinedInput-root": {
    //     color: "#0059BE !important",
    // },
    '&:hover fieldset': {
        borderColor: '#11783C !important',
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: "#F3284B !important"
    },
    '& input:valid + fieldset': {
        borderRadius: '12px !important',
    },
    '& .Mui-disabled': {
        borderRadius: '12px !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '12px !important',
    }, 
    '.css-1ewifw0-MuiButtonBase-root-MuiChip-root':{
        backgroundColor:'#558AC7 !important',
        borderRadius:'10px'
    }
}); 