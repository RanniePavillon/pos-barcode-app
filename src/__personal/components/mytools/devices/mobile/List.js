import { useState } from 'react';
import { Box, Button, Avatar } from '@mui/material/';
import { env } from '../../../../../core/Env';
import { rqx } from '../../../../../core/request/API';
import { ToolProfile } from './ToolProfile';

export const List  = ({__SESSION, toolCategories, classes}) => {
    const [tp, setTP] = useState({data:[], stat:false})
    let _env = env();

    const handleClick = async(tid, v, category) =>{
        if (parseInt(630) !== tid) {
            if (v.owned) {
                let res = await rqx.get(`<<global>>/${env() === 'local' ? 'dev' : env()}/tools/toolcb`, {tid: tid, env:_env !== 'prod' ? 'sandbox' : 'production'});
                if (res.msg === 'success') {
                    if (res.tu.length > 0) {
                        window.open(`${res.tu[0].value}?ainfo=${encodeURIComponent(JSON.stringify(__SESSION.data.ainfo))}`, '_blank').focus()
                    }
                }
            }else{
                const resTool = await rqx.get(`<<global>>/${env() === 'local' ? 'dev' : env()}/tools/toolcount`, { platform:'personal', tid:tid })
                setTP({data:{...v, category_name:category, count:resTool[0].count}, stat:!tp.stat})
            }
        }
    }
    
    return (  
        <Box height="100%" width="100%" display="flex" flexDirection="column" gap="24px">
            {toolCategories.data.map((v,k) => (
                (v.tools.length > 0 || (v.tools !== undefined && v.tools !== null )) && (
                    <Box key={k} display="flex" flexDirection="column" gap="12px">
                        <Box color="#283745" fontSize="14px" fontWeight={400} lineHeight="24px">{v.name}</Box>
                        <Box display="grid" gridTemplateColumns="repeat(auto-fill,minmax(100px,1fr))" gap="12px">
                            {v.tools.map((t,i) => (
                                <Box component={Button} disableFocusRipple={true} className={parseInt(630) !== t.tid && classes.btnpsl} onClick={()=>handleClick(t.tid, t, v.name)} key={i} minWidth="100px" borderRadius="6px" display="flex" flexDirection="column" alignItems="center" gap="12px" py="8px" bgcolor="#F0F5F9"
                                border={parseInt(630) === t.tid && ("2px solid #3D77E9")}
                                >
                                    <Avatar variant="square" src={JSON.parse(t.logo)} sx={{width:40, height:40, mixBlendMode:!t.owned && 'luminosity'}}/>
                                    <Box fontSize={12} fontWeight={400} lineHeight="19px" width="100%" sx={{wordBreak: 'break-word'}} color="#283745">{t.name.length > 10 ? t.abbreviation:t.name}</Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )
            ))}
            <ToolProfile tp={tp} setTP={setTP} __SESSION={__SESSION}/>
            <Box minHeight={"10px"} />
        </Box>
    );
}