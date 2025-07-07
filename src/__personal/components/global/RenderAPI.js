import { useContext, useEffect, useState } from "react"
import { ToolContext } from "../../../core/context/ToolContext";
import { env } from "../../../core/Env";
import { rqx } from "../../../core/request/API";
// import moment from "moment";

export const RenderAPI = () => {
    const { tool_state } = useContext(ToolContext)
    const { __SESSION, globalLoader, toolOwned, validateAccount } = tool_state
    const __init = async() => {
        await globalLoader.set(true)
        // await __runactiveuser()
       
        //GET TOOL OWNED
        let prms = {aid:__SESSION.data.ainfo.aid, platform:'personal' } 
        let resTool = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/owned`, prms)
        toolOwned.set(resTool)

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