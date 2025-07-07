import { ToolStates } from './ToolStates';
import { NavigationStates } from './NavigationStates';
import { SwitchingState } from './SwitchingState';
import { ToolCategoryState } from './ToolCategoryState';
import { NotifState } from './NotifState';

export const Context = () => {
    return {
        tool_state: ToolStates(),
        navigation_state: NavigationStates(),
        switching_state: SwitchingState(),
        tool_category_state: ToolCategoryState(),
        notif_state: NotifState(),
    }
}