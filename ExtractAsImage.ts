import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";

export class ExtractAsImage implements IPluginStrategy {
  private async ExtractAsImage(node: VectorNode): Promise<Uint8Array> {
    if (node && node.type) {
      const svgbytes = await node.exportAsync({
        format: "SVG",
      });
      return svgbytes;
    }
  }
  async handleEvent(event: UIEventMessage): Promise<any> {
    const extractor = new ExtractAsImage();
    const Node = figma.getNodeById(event.msg) as VectorNode;
    const svgbytes = await extractor.ExtractAsImage(Node);
    postMessageToUI(event.type, { requestId: event.id }, svgbytes);
  }
}

