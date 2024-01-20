import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";


/* get Image from image hash and send bytes to ui */
export class GetImageHandlingStrategy implements IPluginStrategy {

  handleEvent(event: UIEventMessage): void {
    console.info("Get Properties ", event);

    const headers: { requestId: string; } = { requestId: event.id };
    if (!event.msg) {
      console.warn("Invalid call to plugin for image extraction");
      return;
    }
    (async () => {

      try {
        const img = figma.getImageByHash(event.msg);
        const bytes = await img.getBytesAsync();
        postMessageToUI(event.type, headers, bytes);
      } catch (err) {
        console.error("Error in image byte extraction ", err);
        postMessageToUI(event.type, headers, null);
      }

    })();
  }
}
