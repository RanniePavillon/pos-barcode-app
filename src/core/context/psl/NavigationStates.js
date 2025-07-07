import { useState } from "react"
import { HomeIcons, NotificationIcons, TcIcons, MyToolIcons, ReferUserIcons, RenewIcons } from '../../global/Icons';

export const NavigationStates = () => {
    const [tabs, setTabs] = useState({
        top: [
            {name:'Notifications', className:'', subdir:'/notification', ref: '/notification', not_active: <NotificationIcons fill="#333333" />, active: <NotificationIcons  fill="#3D77E9" />},
            {name:'MyTools', className:'tenth-step', subdir:'#', ref: '__mytools', not_active:<MyToolIcons fill="#292D32" />, active:<MyToolIcons fill="#3D77E9" stroke="#3D77E9" />},
        ],
        mtop: [
            {name:'Notifications', className:'', subdir:'/notification', ref: '/notification', not_active: <NotificationIcons fill="#fff" />, active: <NotificationIcons fill="#3D77E9" />},
            {name:'MyTools', className:'tenth-step', subdir:'#', ref: '__mytools', not_active:<MyToolIcons fill="#FFFFFF" stroke="#FFFFFF" />, active:<MyToolIcons fill="#3D77E9" stroke="#3D77E9"/>},
        ],
        left: [
            {name:'Dashboard', className:'first-step',  subdir:'/psl', ref: undefined, not_active:<HomeIcons stroke="#89A594" />, active:<HomeIcons fill="#3D77E9" stroke="#fff"/>},
            {name:'Feature 1', className:'second-step', subdir:'/psl/feature1', ref: 'feature1', not_active:<HomeIcons stroke="#89A594" />, active:<HomeIcons fill="#3D77E9" stroke="#fff"/>},
            {name:'Tool Categories', className:'third-step', subdir:'/psl/tool-categories/subscribed', ref: 'tool-categories', not_active:<TcIcons stroke={'#89A594'}  fill={'#fff'} />, active:<TcIcons fill="#3D77E9" stroke="#3D77E9"/>},
        ],
        msetting: [
            {name:'Refer a Hero Users', subdir:'/psl', ref: 'psl', steps: 'sixth-step', not_active:<ReferUserIcons fill="#fff" stroke="#A2A3A9"/>, active:<ReferUserIcons fill="#333333" stroke="#333333"/>},
            {name:'System Updates', subdir:'/psl', ref: 'psl', steps: 'seventh-step', not_active:<RenewIcons fill="none" stroke="#89A594"/>, active:<RenewIcons fill="#333333" stroke="#333333"/>},
        ],
        mobile: [
            {name:'Dashboard', sub_name:'', subdir:'/psl', ref: undefined, steps:'first-step', not_active:<HomeIcons stroke="#89A594" />, active:<HomeIcons fill="#3D77E9" stroke="#FFFFFF"/>},
            {name:'Feature 1', sub_name:'', subdir:'/psl/feature1', ref: 'feature1', steps:'second-step', not_active:<HomeIcons stroke="#687B75"/>, active:<HomeIcons fill="#3D77E9" stroke="#fff"/>},
            {name:'Feature 2', sub_name:'', steps:'third-step', subdir:'/psl/feature2', ref: 'feature2',not_active:<HomeIcons stroke="#687B75"/>, active:<HomeIcons fill="#3D77E9" stroke="#fff"/>},
            {name:'Tool Categories', sub_name:'', steps:'fourth-step', subdir:'/psl/tool-categories/subscribed', ref: 'tool-categories', not_active:<TcIcons stroke="#89A594" fill='#fff' />, active:<TcIcons fill="#3D77E9" stroke="#3D77E9"/>},
        ]
    })
    const [tc, setTc] = useState({open: true, list: false})
    const [leftBar, setLeftbar] = useState(true)
    const [notif,  setNotif] = useState(false)
    const [myTool, setMyTool] = useState(false)

    return {
        tabs: {data: tabs, set: setTabs},
        tc: {data: tc, set: setTc},
        leftBar: {data: leftBar, set: setLeftbar},
        notif: {data: notif, set: setNotif},
        myTool: {data: myTool, set: setMyTool},
    }
}