import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";

export class ResizerStrategy implements IPluginStrategy {
    handleEvent(event: UIEventMessage): void {
        if (event.msg === 'resizeUI_small') figma.ui.resize(40, 40);
        else figma.ui.resize(362, 680);
    }
}
