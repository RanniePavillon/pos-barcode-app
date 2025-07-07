import { useState } from "react"

export const SwitchingState = () => {
    const [switchForm, setSwitchForm] = useState({stat: false, platform: null, links: null});
    
    return {
        switchForm: {data: switchForm, set: setSwitchForm},
    }
}