import { useState } from "react"

export const InstallState = () => {
    const [install, setInstall] = useState(null)
    const [ip, setIp] = useState({stat: false, prompt_type: null})

    return {
        prompt: {data: install, set: setInstall},
        ip: {data: ip, set: setIp}
    }
}