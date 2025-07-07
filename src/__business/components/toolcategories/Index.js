import {  useContext, useEffect } from "react"
import { ToolContext } from "../../../core/context/ToolContext"
import { domain, env } from "../../../core/Env"
import { rqx } from "../../../core/request/API"
import { VM } from "../../../core/VM"
import { Index as DIndex } from './desktop/Index';
import { MIndex } from "./devices/Index";
let view = VM()

export const Index = ({ match }) => {
    const { tool_category_state, tool_state } =  useContext(ToolContext)
   
    const gotoMarket = () =>{
        window.location.href = `${domain('mp').url}/sso/account/auth?ainfo=${encodeURIComponent(JSON.stringify(tool_state.__SESSION.data.ainfo))}`
    }

    useEffect(() => {
        const __init = async() => {
            let t_category = await rqx.get(`<<global>>/${env()==='local'?'dev':env()}/tools/categories`, {filter: 2});
            tool_category_state.toolCategories.set(t_category)
        }
        let subscribe = true
        if (subscribe) {
            __init()
        }
        return () => subscribe = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
        view === '' ? 
            <DIndex match={match} gotoMarket={gotoMarket}/>
        :  
            <MIndex match={match} gotoMarket={gotoMarket}/>
    )
}