import { makeStyles } from '@mui/styles'

export const navstyle = (platform) => {
    let s = makeStyles(theme => ({
        psl_button: {
            backgroundColor: platform==='psl'?'#00B0FF':'#11783C', 
            borderRadius: '10px',
            fontSize: '14px',
            color: '#fff',
            shadow: 'none',
            boxShadow: 'none',
            transition: '0.3s',
            '&:hover': {
                // background: platform==='psl'?'linear-gradient(90deg,  0%, rgba(255,75,0,1) 100%)':'linear-gradient(90deg, rgba(255,75,0,1) 0%, #17CE64 100%)'
                backgroundColor: platform==='psl'?'#0c59b0':'#0d4a27',
            }
        },
        biz_button: {
            backgroundColor: platform==='psl'?'#0070EF':'#17CE64', 
            borderRadius: '10px',
            fontSize: '14px',
            color: '#fff',
            shadow: 'none',
            boxShadow: 'none',
            transition: '0.3s',
            '&:hover': {
                // background: platform==='psl'?'linear-gradient(90deg,  0%, rgba(255,75,0,1) 100%)':'linear-gradient(90deg, rgba(255,75,0,1) 0%, #17CE64 100%)'
                backgroundColor: platform==='psl'?'#0c59b0':'#0d4a27',
            }
        },
        la_button: {
            cursor: 'pointer',
            boxShadow: '0 .2rem 0.5rem rgba(0, 0, 0, .20)',
            transition: '0.3s',
            '&:hover': {
                backgroundColor: '#ffe8de',
            }
        },

        prm_button: {
            backgroundColor: platform==='psl'?'#00B0FF':'#11783C', 
            borderRadius: '10px',
            fontSize: '14px',
            color: '#fff',
            shadow: 'none',
            boxShadow: 'none',
            transition: '0.3s',
            '&:hover': {
                // background: platform==='psl'?'linear-gradient(90deg,  0%, rgba(255,75,0,1) 100%)':'linear-gradient(90deg, rgba(255,75,0,1) 0%, #17CE64 100%)'
                backgroundColor: platform==='psl'?'red':'#003539',
            }
        },
    }));

    return s()
}