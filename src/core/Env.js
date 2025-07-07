export const env = () => ('local')

export const domain = (key) => {
    const list = {
        tool: {
            url: "http://localhost:3000",
            ws: ""
        },
        pm: {
            url: "https://dev-pofsis.pofsis.com",
            ws: ""
        },
        psl: {
            url: "http://dev-personal.pofsis.com",
            ws: "https://dev-personal-main.pofsis.com"
        },
        biz: {
            url: "https://dev-business.pofsis.com",
            ws: "https://dev-business-main.pofsis.com"
        },
        mp: {
            url: "https://dev-market.pofsis.com",
            ws: ""
        },
        api: {
            tool: "https://1lomg33wzl.execute-api.ap-southeast-1.amazonaws.com",
            global: "https://tpdjwm06fj.execute-api.ap-southeast-1.amazonaws.com/api/global/rqx",
        }
    }

    return list[key]
}

export const key = (key) => {
    const list = {
        gapi_key: "tJ1ROscurb83mqyY4B0To5WTb4ekFzMa8LgGKoZh",
        tapi_key: "yMwfgKpzqdsI88vee7gI2ABfIU4XRt976fgL3rdg",
        aui_key: "U1JPOFJYbDZzK0dJMG1ZYzl3MHJYSzgvcUI5OXBHcGI4SkJ1eWlwbkl5NG4=",
        tsa_key: "WEIrd1cyTnR2L2FZeFhBZDRCc3NWbnN2VUVGN2dGbWg=",
        tid: "630"
    }

    return list[key]
}