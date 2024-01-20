import { UIEventMessage } from "../types/UIEventMessage";

/* handle events coming to plugin from ui*/
export interface IPluginStrategy {
	handleEvent(eventMessage: UIEventMessage): void;
}
