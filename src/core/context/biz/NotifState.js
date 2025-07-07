import { useState } from "react"

export const NotifState = () => {
    const [openNotif, setOpenNotif] = useState(!("Notification" in window) ? false:true)
    const [allowNotif, setAllowNotif] = useState(false)
   
    return {
        openNotif: {data: openNotif, set: setOpenNotif},
        allowNotif: {data: allowNotif, set: setAllowNotif}
    }
}