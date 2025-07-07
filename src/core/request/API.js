import { key, domain } from "../Env";

const get = (url, qsp = {}, headers = {}) => {
    return new Promise(resolve => {
        // GENERATE API url
        const api = rqxto(url)

        // ASSIGN HEADERS
        let h = new Headers();
        Object.keys(headers).map(k => h.append(k, headers[k]));
        if (api.rqx_type !== 'custom') {
            h.append('Content-Type', 'application/json');
            h.append('x-api-key', api.rqx_type==='global'?key('gapi_key'):key('tapi_key'));
        }

        // SET REQUEST
        let subqsp = []
        Object.keys(qsp).map(k => subqsp.push(`${k}=${qsp[k]}`));
        qsp = `${subqsp.join('&')}`

        // SET PARAMETERS
        let params = {
            method: 'GET',
            headers: h,
            redirect: 'follow'
        };

        // SEND REQUEST
        fetch(`${api.url}?${qsp}`, params).then(result => {
            return resolve(result.json())
        }).catch(error => console.log('error', error));
    })
}

const post = (url, body = {}, headers = {}) => {
    return new Promise(resolve => {
        // GENERATE API url
        const api = rqxto(url)

        // ASSIGN HEADERS
        let h = new Headers();
        Object.keys(headers).map(k => h.append(k, headers[k]));
        if (api.rqx_type !== 'custom') {
            h.append('Content-Type', 'application/json');
            h.append('x-api-key', api.rqx_type==='global' ? key('gapi_key') : key('tapi_key'));
        }

        // SET PARAMETERS
        let params = {
            method: 'POST',
            headers: h,
            body: JSON.stringify(body),
            redirect: 'follow'
        };

        // SEND REQUEST
        fetch(`${api.url}`, params).then(result => {
            return resolve(result.json())
        }).catch(error => console.log('error', error));
    })
}

const rqxto = (url) => {
    let type = 'custom'
    let d = url
    let subdir = ''
    if (url.includes('<<')) {
        url.split('<<').map(v => {
            if (v.includes('>>')) {
                type = v.split('>>').shift()
                d = domain('api')[v.split('>>').shift()]
                subdir = v.split('>>').pop()
            }
    
            return v
        })
    }

    return {
        rqx_type: type,
        url: `${d}${subdir}`
    }
}


export const rqx = { get, post }