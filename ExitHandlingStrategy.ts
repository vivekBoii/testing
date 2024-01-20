import { EXIT_MESSAGE } from "../../../../misc/strings";
import { IPluginStrategy } from "../iPluginStrategy";

/* Close the plugin */
export class ExitHandlingStrategy implements IPluginStrategy {
  handleEvent(): void {
    figma.notify(EXIT_MESSAGE);
    figma.closePlugin();
  }
}
