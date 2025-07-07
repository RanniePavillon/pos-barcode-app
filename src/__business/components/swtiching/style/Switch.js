import { makeStyles } from '@mui/styles'

export const switchstyle = (xsm) => {
    let s = makeStyles(theme => ({
        opt1:{
            textTransform:'none',
            height:xsm ? '51px':'70px',
            backgroundColor:'#FFFFFF',
            padding:xsm ? '8px 12px 8px 12px':'12px 16px 12px 16px',
            textAlign:'left',
            display:'flex',
            justifyContent:'flex-start',
            color:'#283745',
            boxShadow:'0px 2px 4px 0px #28374514, 0px 0px 6px 0px #28374505',
            '&:hover': {
                backgroundColor: '#F5F5F5',
            },
        },
        opt2:{
            textTransform:'none',
            height:xsm ? '36px':'52px',
            backgroundColor:'#FFFFFF',
            padding:xsm ? '8px 12px 8px 12px': '16px',
            textAlign:'left',
            display:'flex',
            justifyContent:'flex-start',
            color:'#283745',
            boxShadow:'0px 2px 4px 0px #28374514, 0px 0px 6px 0px #28374505',
            '&:hover': {
                backgroundColor: '#F5F5F5',
            },
        },
        opt3:{
            textTransform:'none',
            height:xsm ? '36px': '40px',
            backgroundColor:'#FFFFFF',
            padding:'12px 0px 12px 0px',
            color:'#283745',
            boxShadow:'0px 2px 4px 0px #28374514, 0px 0px 6px 0px #28374505',
            '&:hover': {
                backgroundColor: '#F5F5F5',
            },
        },
    }));

    return s()
}