import { createContext } from 'react';
import { InstallState } from './InstallState';
import { Context as BizContext} from './biz/Context'
import { Context as PslContext} from './psl/Context'

export const ToolContext = createContext();

export const ToolProvider = ({ children, platform }) => {
    let states = {
        default: {
            install_state: InstallState(),
        },
        business: {...BizContext()},
        personal: {...PslContext()},
    }

    return (
        <ToolContext.Provider value={{...states.default, ...states[platform]}}>
            {children}
        </ToolContext.Provider>
    )
}