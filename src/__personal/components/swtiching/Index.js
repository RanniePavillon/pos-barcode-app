import { useContext } from "react"
import { BizOwner } from "./BizOwner"
import { SelectType } from "./SelectType"
import { ToolContext } from "../../../core/context/ToolContext"

export const Switching = ({match}) => {
    const { tool_state  } = useContext(ToolContext)
    const { __SESSION } = tool_state
    
    if (match.params.params === 'select' && __SESSION.data.ainfo.account_type === 1) {
        return <SelectType/>
    }else if(match.params.params === 'owner' && __SESSION.data.ainfo.account_type === 1){
        return <BizOwner/>
    }else{
        return '404 NOT FOUND!'
    }
}