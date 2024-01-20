import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";

export class GetTokenHandlingStrategy implements IPluginStrategy {
  handleEvent(event: UIEventMessage): void {
    (async()=>{
      const token = await figma.clientStorage.getAsync("token");
      postMessageToUI(event.type,{requestId:event.id}, token );
    })();
  }
}
