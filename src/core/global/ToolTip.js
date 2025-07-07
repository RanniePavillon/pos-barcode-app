
import { withStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";

export const ToolTip = withStyles({
    tooltip: {
        color: "#ffffff",
        backgroundColor: "#030D1F",
        padding:'10px',
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
    },
    arrow: {
        color: "#030D1F",
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
    },
})(Tooltip);    

export const LightToolTip = withStyles({
    tooltip: {
        color: "#030D1F",
        backgroundColor: "#ffffff",
        padding:'10px',
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
        marginTop:'5px !important'
    },
})(Tooltip);    

export const BizToolTip = withStyles({
    tooltip: {
        color: "#FFFFFF",
        backgroundColor: "#165320",
        padding:'8px 12px',
        marginTop:'15px !important',
        borderRadius:'8px',
        width:'219px',
        textAlign:'center',
    },
    arrow:{
        color:'#165320'
    },
    popper: {
        '&[data-popper-reference-hidden]': {
            visibility: 'hidden',
            pointerEvents: 'none',
        },
    },
})(Tooltip);    