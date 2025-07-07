import { makeStyles } from '@mui/styles'

export const avatarstyle = (bg, w=30, h=30, radius="10%") => {
    let s = makeStyles(theme => ({
        avatar: {
            // border: '3px solid #fff',
            background: `url(${bg})`,
            borderRadius: '10%',
            backgroundColor: '#fff',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            width: w,
            maxWidth: w,
            minWidth: w,
            height: h,
            maxHeight: h,
            minHeight: h,
        },
    }))

    return s().avatar
}

export const avatarstylesx = (bg, w=30, h=30, radius="10%") => {
    return {
        // border: '3px solid #fff',
        background: `url(${bg})`,
        borderRadius: radius,
        // backgroundColor: '#fff',
        backgroundSize: 'contain ',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: w,
        maxWidth: w,
        minWidth: w,
        height: h,
        maxHeight: h,
        minHeight: h,
    }
}
export const avatarstylesy = (bg, w=30, h=30, ) => {
    return {
        background: `url(${bg})`,
        // backgroundColor: '#fff',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: w,
        maxWidth: w,
        minWidth: w,
        height: h,
        maxHeight: h,
        minHeight: h,
    }
}

export const FrontPageStyles = () => {
    let s = makeStyles(theme => ({
        btnReg: {
            backgroundColor: '#FFCC00',
            color: '#FF0000',
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#FFCC00',
            }
        }
    }))
    return s()
}

export const TopNavStyles = () => {
    let s = makeStyles(theme => ({
        btnLogin: {
            border: '1px solid #ffffff',
            color: '#ffffff',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
                border: '1px solid #ffffff',
            }
        },
        btnReg: {
            backgroundColor: '#FFCC00',
            color: '#333333',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
                backgroundColor: '#FFCC00',
            }
        }
    }))
    return s()
}

export const HomeSlider = () => {
    let s = makeStyles(theme => ({
        numberslide1: {
            border: '1px solid #ffffff',
            color: '#ffffff',
            borderRadius: 4,
            backgroundColor: 'blue',
          
        
        },
        numberslide: {
            backgroundColor: 'red',
            color: '#333333',
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
          
        }
    }))
    return s()
}

