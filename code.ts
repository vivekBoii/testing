import { UIEventStrategyFactory } from "../logic/events/controller/eventHandlingFactory";
import { postMessageToUI } from "../logic/events/controller/impl/PostMessageToUI";
import { IPluginStrategy } from "../logic/events/controller/iPluginStrategy";

figma.showUI(__html__, { themeColors: true, height: 680, width: 362 });

const uiStrategyFactory: UIEventStrategyFactory = new UIEventStrategyFactory();

figma.on("selectionchange", () => {
  postMessageToUI("selectionChange");
});

figma.ui.onmessage = (event) => {
  const uiEventHandler: IPluginStrategy = uiStrategyFactory.getStrategy(event.type);
  uiEventHandler.handleEvent(event);
};

