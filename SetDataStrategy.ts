import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";
export class SetDataStrategy implements IPluginStrategy {
  handleEvent(event: UIEventMessage): void {
    const { msg } = event;
    const newdata_obj = JSON.parse(msg);
    //we can save only string value to plugin
    figma.root.setPluginData(newdata_obj.key, JSON.stringify(newdata_obj.value));
    postMessageToUI(event.type, { requestId: event.id }, { message: "OK" });

  }
}
