import { useContext, useEffect, useState } from "react"
import { ToolContext } from "../../../core/context/ToolContext";
import { env } from "../../../core/Env";
import { rqx } from "../../../core/request/API";
// import moment from "moment";

export const RenderAPI = () => {
    const { tool_state, navigation_state } = useContext(ToolContext)
    const { __SESSION, globalLoader, toolOwned, validateAccount } = tool_state
    const { myToolPzl } = navigation_state
    const __init = async() => {
        await globalLoader.set(true)
        // await __runactiveuser()
       
        //GET TOOL OWNED
        let prms = __SESSION.data.uaccess[0].role_id === 0 ? {aid:__SESSION.data.ainfo.aid, platform:'business' } : {aid:__SESSION.data.ainfo.aid, platform:'business', ref:0, owner_id:__SESSION.data.uaccess[0].owner_id }
        let resTool = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/owned`, prms)
        toolOwned.set(resTool)


        // PERSONALIZATION FOR BUSINESS
        const tool_id = env()==='prod'?'103':'13'
        const user_id = atob(__SESSION.data.ainfo.aid).split('_', 2)[1];
		const prsnl = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/personalization/read`, {user_id:user_id, tool_id:tool_id, ref:'dashboard'})
        if (prsnl && prsnl.length === 0) {
            myToolPzl.set(true)
        }

        await globalLoader.set(false)
    }

    const [subscribe, setSubscribe] = useState(true)

    useEffect(() => {
        if (subscribe) {
            if (globalLoader.data) {
                __init()
            }
        }
        return () => setSubscribe(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validateAccount.data])
    
    return (
        <></>
    )
}