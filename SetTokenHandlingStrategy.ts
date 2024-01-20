import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";

export class SetTokenHandlingStrategy implements IPluginStrategy {
  handleEvent(event: UIEventMessage): void {
    figma.clientStorage.setAsync("token",event.msg);
    postMessageToUI(event.type,{requestId:event.id} );
  }
}
