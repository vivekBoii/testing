import { UIEventMessage } from "../../types/UIEventMessage";
import { IPluginStrategy } from "../iPluginStrategy";

export class selectAllFrames implements IPluginStrategy{
    handleEvent(event: UIEventMessage): void{
        const currentPage = figma.currentPage;
        const frames = currentPage.children.filter((node) => node.type === "FRAME");
        console.log(frames);
        figma.currentPage.selection = frames;
        figma.viewport.scrollAndZoomIntoView(frames);
    }
}

export class selectDevFrames implements IPluginStrategy{
    handleEvent(event: UIEventMessage): void{
        const currentPage = figma.currentPage;
        const frames = currentPage.children.filter((node) => node.type === "FRAME");
        //@ts-ignore
        const devReadyObjects = frames.filter(obj => obj?.devStatus?.type === "READY_FOR_DEV");
      
        figma.currentPage.selection = devReadyObjects;
        figma.viewport.scrollAndZoomIntoView(devReadyObjects);
    }
}
