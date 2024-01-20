import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";

export class ToastHandlingStrategy implements IPluginStrategy {
  handleEvent(event: UIEventMessage): void {
    figma.notify(event.msg);
  }
}
