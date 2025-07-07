import { useContext } from 'react';
import { Box, Divider } from '@mui/material';
import { ToolContext } from '../../../../core/context/ToolContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Index as Subscribe } from './subscribe/Index';
import { Index as Chart } from '../chart/Index';
import { Index as SuggestTool } from './suggest/Index'
import { NothingToSee } from '../../empty/Index';
import { TCNameLoader } from '../Loader';

export const Index = ({ match }) => {
    const { tool_category_state, tool_state } = useContext(ToolContext)
    const tcs = tool_category_state
    const __LOCATION = useLocation().pathname
    const nav = useHistory()

    const validateBase64String = () =>{
        try {
            window.atob(encodedString);
            return true;
        } catch (e) {
            return false;
        }
    }

    const encodedString = match.params.params;
    const isValid = validateBase64String(encodedString);
    const data = isValid && ( tcs.toolCategories.data.filter((v) => v.id === parseInt(window.atob(match.params.params))) )

    const redirectHandler = async(type) => {
        if (__LOCATION.split('/', 3)[2] !== type) {
            nav.push(`/biz/tool-categories/${type}`)
        }
    }   

    return (
        !isValid ? 
            <Box p="40px" height="100%" width="100%">
                <NothingToSee/>
            </Box>
        :
            <Box display="flex" width="100%" height="100%">
                <Box minWidth="272px" bgcolor="#F6F7F8" py="24px" px="16px">
                    <Box onClick={()=>redirectHandler('subscribed')} className="c-pointer" sx={{'&:hover':{backgroundColor:'#FFFFFF'}}} height="44px" py="12px" px="10px" bgcolor={match.params.params === 'subscribed' ? "#FFFFFF": ''} display="flex" alignItems="center" gap="10px" borderRadius="6px" >
                        <Box fontWeight={400} fontSize={14} lineHeight="16px">
                            { tool_state.__SESSION.data.uaccess[0].role_id === 0 ?
                                'Subscribed Tools'
                            :
                                'Accessed Tools'
                            }
                        </Box>
                    </Box>
                    <Box py="24px"><Divider sx={{color:'#E9ECEF'}}/></Box>
                    <Box color="#8B96A2" fontSize={14} fontWeight={600} lineHeight="16px">Tool Categories</Box>
                    {tcs.toolCategories.data.length === 0 || !isValid ? 
                        <Box py="32px" display="flex" justifyContent="center">
                            <TCNameLoader/>
                        </Box>
                    :
                        tcs.toolCategories.data.map((v,k) => (
                            <Box key={k} pt="8px">
                                <Box onClick={()=>redirectHandler(window.btoa(v.id))} className="c-pointer" sx={{'&:hover':{backgroundColor:'#FFFFFF', color:'#107038'}}} minHeight="40px" bgcolor={parseInt(window.atob(match.params.params)) === v.id ? "#FFFFFF" : ''} borderRadius="6px" py="12px" px="10px">
                                    <Box color={parseInt(window.atob(match.params.params)) === v.id ? "#107038" : ''} fontWeight={600} fontSize={14} lineHeight="16px">
                                        {v.name}
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Box width="100%" bgcolor="#F8F9FA" boxShadow="0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" py="24px">
                    {match.params.params === 'subscribed' ? 
                        <Subscribe tool_state={tool_state} tcs={tcs} match={match.params.params}/>
                    :
                        (tcs.toolCategories.data.length > 0 && data.length > 0 ) && (
                            <Box height="100%" width="100%" display="flex" flexDirection="column">
                                <Box px="40px" display="flex" color="#333333" fontWeight={600} fontSize={20} lineHeight="26px">
                                    {data[0].name}
                                </Box>
                                <Box pt="8px"><Divider sx={{color:'#E9ECEF'}}/></Box>
                                <Box height="100%" width="100%" className="overflowY">
                                    <Box px="40px" pb="56px">
                                        <Box pt={2} fontSize={12} fontWeight={400} color="#333333" lineHeight="19px"> 
                                            {data[0].description}
                                        </Box>
                                        <Chart data={data} match={match.params.params}/>
                                    </Box>
                                    <SuggestTool tcs={tcs} tool_state={tool_state} match={match.params.params}/> 
                                    <Box minHeight="50px"></Box>     
                                </Box>  
                            </Box>
                        )
                    }
                </Box>
            </Box>
    );
}