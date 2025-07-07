
import { withStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
// My Post Engagements
export const BarTooltip = withStyles({
    tooltip:{
        backgroundColor: '#FFFFFF',
        padding: '8px',
        color: '#313131',
        boxShadow:'0px 0px 12px rgba(0, 0, 0, 0.08) !important',
        borderRadius: '6px'
    },
    arrow:{
        color: '#FFFFFF'
    }
})(Tooltip)

// Navbar
export const NavTooltip = withStyles({
    tooltip: {
        color: "#F2F7FF",
        backgroundColor: "#333333",
        padding:'8px',
        boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.12) !important',
        borderRadius:' 4px 0px 4px 4px !important'
    },
    arrow: {
        color: "#669ede",
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
    },
})(Tooltip);  

// My Cloud
export const ViewTooltip = withStyles({
    tooltip: {
        color: "#F2F7FF",
        backgroundColor: "#333333",
        padding:'8px',
        boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.12) !important',
        borderRadius:' 4px 0px 4px 4px !important'
    },
    arrow: {
        color: "#669ede",
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
    },
})(Tooltip);  

export const LBtnTooltip = withStyles({
    tooltip: {
        color: "#F2F7FF",
        backgroundColor: "#333333",
        padding:'8px',
        boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.12) !important',
        borderRadius:' 4px 0px 4px 4px !important',
        fontSize: 10,
        fontWeight: 100,
        marginTop: "16px"
    },
    arrow: {
        color: "669ede",
        boxShadow:'0 1rem 3rem rgba(0, 0, 0, .175) !important',
        position: "absolute",
        right: 0,
        top: 0
    },
    
})(Tooltip);    