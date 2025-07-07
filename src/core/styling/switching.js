import { makeStyles } from '@mui/styles'
import TopBG from '../../assets/images/core/option_bg.png'

export const swchstyle = (platform) => {
    let s = makeStyles(theme => ({
        btnHover: {
            '&:hover': {
                backgroundColor: '#EDEDED',
            },
        },
        button: {
            textTransform: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            boxShadow: '0 0.1rem 0.3rem rgba(0, 0, 0, .15)'
        },
        tf: {
            fontSize: '10px',
            '& label.Mui-focused': {
                color: theme.palette.primary.business
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.business
                },
            }
        },
        bgpalette: {
            backgroundColor: theme.palette.primary.business
        },
        top_bg: {
            backgroundPosition: 'top', 
            backgroundSize: '100%',
            backgroundColor: '#ffffff',
            backgroundImage: `url(${TopBG})`,
            backgroundRepeat: 'no-repeat',
            // width: '47%',
            // height: '500px'
        },
    }));

    return s()
}

export const LogoAnimator = () => {
    const loaderContainer = {
        start: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }
    
    const cVariants = {
        start: {
            y: '0%',
            rotate: '-9deg'
            // opacity: 0,
            // scale: 1
        },
        end: {
            y: [`-12%`, '12%'],
            rotate: '9deg'
            // opacity: 1,
            // scale: 1.5,
        },
    }

    const cVariants1 = {
        start: {
            y: '0%',
            rotate: '-15deg'
            // opacity: 0,
            // scale: 1
        },
        end: {
            y: [`-12%`, '12%'],
            rotate: '-9deg'
            // opacity: 1,
            // scale: 1.5,
        },
    }

    const cVariants2 = {
        start: {
            y: '0%',
            rotate: '15deg'
            // opacity: 0,
            // scale: 1
        },
        end: {
            y: [`-12%`, '12%'],
            rotate: '9deg'
            // opacity: 1,
            // scale: 1.5,
        },
    }
    
    const cTransition = {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
    }

    return {loaderContainer, cVariants, cVariants1, cVariants2, cTransition}
}