import { useState } from "react"

export const ToolStates = () => {
    const [prefetch, setPrefetch] = useState(false)
    const [__SESSION, setSession] = useState({ainfo: null, pinfo: null})
    const [userId, setUserId] = useState()

    //PRE LOAD FOR SWITCHING TOOLS
    const [preload, setPreload] = useState({loader:false, logo:''}) 

    //GLOBAL STATE
    const [globalLoader, setGlobalLoader] = useState(true)

    const [toolOwned, setToolOwned] = useState([])

    const [validateAccount, setValidateAccount] = useState({data:'', count:0})

    return {
        prefetch: {data: prefetch, set: setPrefetch},
        __SESSION: {data: __SESSION, set: setSession},
        userId: {data: userId, set: setUserId},

        //PRE LOAD FOR SWITCHING TOOLS
        preload: {data: preload, set: setPreload},

        //GLOBAL STATE
        globalLoader: {data: globalLoader, set: setGlobalLoader},
        toolOwned: {data: toolOwned, set: setToolOwned},

        validateAccount: {data: validateAccount, set: setValidateAccount}
    }
}