import { useContext } from 'react';
import { Box } from '@mui/material';
import { ToolContext } from '../../../../../core/context/ToolContext';
import { LessThanIcons, GreaterThanIcons } from '../../../../../core/global/Icons';
import { NavList } from './NavList';

export const Left = () => {
    const { navigation_state, install_state } = useContext(ToolContext)
    const { tc, leftBar } = navigation_state

    const handleClickSB = () => {
        leftBar.set(!leftBar.data)
    }
   
    return (
        <Box display="flex" position="relative">
            <NavList leftBar={leftBar} install_state={install_state} tc={tc} navigation_state={navigation_state}/>
            <Box height="44px" width="16px" position="absolute" top={97} left={ leftBar.data ? 231 : 72} bgcolor="#FFFFFF" borderRadius="0px 8px 8px 0px" boxShadow="2px 0px 4px rgba(51, 51, 51, 0.12)" className='c-pointer' onClick={handleClickSB}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" >
                    {
                        leftBar.data ?
                            <LessThanIcons />
                        :
                            <GreaterThanIcons />
                    } 
                </Box>
            </Box>
        </Box>
    );
}