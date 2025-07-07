import { styled } from '@mui/material/styles';
import { VM } from '../../VM';
import TextField from '@mui/material/TextField';

let view = VM()
export const CstmTextField = styled(TextField)({
    "& .MuiFormLabel-root.Mui-error": {
        color: "#F3284B !important"
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: "#F3284B !important"
    },
    '& input:valid + fieldset': {
        borderRadius: view === '' ? '12px !important' : '8px !important',
    },
    '& .Mui-disabled': {
        borderRadius: view === '' ? '12px !important' : '8px !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: view === '' ? '12px !important' : '8px !important',
    }, 
    '.css-1ewifw0-MuiButtonBase-root-MuiChip-root':{
        backgroundColor:'#ECF4EF',
        borderRadius: view === '' ? '10px' : '8px'
    }
}); 