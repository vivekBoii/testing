import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";

export class GetDataStrategy implements IPluginStrategy {
  handleEvent(event: UIEventMessage): void {
    const { msg } = event;
    const newdata_obj = JSON.parse(msg);
    const data = figma.root.getPluginData(newdata_obj.key);
    if (!data) { postMessageToUI(event.type, { requestId: event.id }, null); }
    else { postMessageToUI(event.type, { requestId: event.id }, JSON.parse(data)); }
  }
}