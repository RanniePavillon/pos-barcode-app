import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Waypoint } from 'react-waypoint';

export const SnakeLoader = ({ bg, size, distance, length = 3 }) => {
    const loaderContainer = {
        start: {
            transition: {
                staggerChildren: 0.1,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    
    const cVariants = {
        start: {
            y: '0%',
            // opacity: 0,
            // scale: 1
        },
        end: {
            y: [`-100%`, '0%', '0%', '0%', '0%'],
            // opacity: 1,
            // scale: 1.5,
        },
    }
    
    const cTransition = {
        duration: 0.7,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
    }
    
    const circle = {
        width: size,
        height: size,
        backgroundColor: bg,
        borderRadius: '50%',
        fontWeight: 700,
        margin: `0 ${distance} 0 ${distance}`
    }

    const lengthHandler = () => {
        let l = []
        for (let i = 0; i < length; i++) {
            l.push(motion.div)
        }

        // console.log(l);
        return l
    }
    
    return (
        
        <motion.div variants={loaderContainer} initial="start" animate="end" style={{display: 'flex'}}>
            { lengthHandler().map((L, k)=> <L key={k} style={circle} variants={cVariants} transition={cTransition} />) }
        </motion.div>
    )
}

//params margin
export const Animation = (m, l, r) =>{
    const animate = {
        marginRight:[m, r],
        marginLeft:[-m, l],
    }
    return animate 
}
//params key 
export const Transition = (k) =>{
    const transition = {
        duration:`0.${k}`
    }
    return transition 
}

// INFINITE SCROLL LOADER
export const InfiniteScrollLoader = ({onEnter}) => {
    return(
        <Waypoint onEnter={onEnter}>
            <Box mt={3} display="flex" justifyContent="center"><SnakeLoader bg="#009E6A" size="5px" distance="8px"/></Box>
        </Waypoint>
    )
}