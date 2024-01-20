import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";
import { postMessageToUI } from "./PostMessageToUI";

export class Getcollections implements IPluginStrategy {
  private extractProps(node: any) {
    const newObject = {};
    for (const key in node) {
      const value = node[key];
      newObject[key] = value;
    }
    return newObject;
  }
  handleEvent(event: UIEventMessage): void {
    const localCollections = figma.variables.getLocalVariableCollections();
    const ast_collection = [];
    for (let i = 0; i < localCollections.length; i++) {
      ast_collection.push(this.extractProps(localCollections[i]));
    }
    if (!localCollections) { postMessageToUI(event.type, { requestId: event.id }, null); }
    else { postMessageToUI(event.type, { requestId: event.id }, ast_collection); }
  }
}