import EventStrategyFactory from "../../../utils/EventStrategy/index";
import { ExitHandlingStrategy } from "./impl/ExitHandlingStrategy";
import { GetPropertyHandlingStrategy } from "./impl/GetPropertyHandlingStrategy";
import { GetImageHandlingStrategy } from "./impl/GetImageHandlingStrategy";
import { GetTokenHandlingStrategy } from "./impl/GetTokenHandlingStrategy";
import { SetTokenHandlingStrategy } from "./impl/SetTokenHandlingStrategy";
import { ToastHandlingStrategy } from "./impl/ToastHandlingStrategy";
import { IPluginStrategy } from "./iPluginStrategy";
import { SetDataStrategy } from "./impl/SetDataStrategy";
import { GetDataStrategy } from "./impl/GetDataStrategy";
import { Getcollections } from "./impl/Getcollections";
import { ExtractAsImage } from "./impl/ExtractAsImage";
import { ResizerStrategy } from "./impl/ResizerStrategy";
import { selectAllFrames, selectDevFrames } from "./impl/SelectAllAndDevFrames";
/* Factory for UIEventStrategyFactory, handles events coming from UI to the plugin according to the type of event */
// Enum 
enum StrategyKeys {
  GetProperties = "getProperties",
  GetToken = "getToken",
  SetToken = "setToken",
  GetImage = "getImage",
  Toast = "toast",
  Cancel = "cancel",
  SetData = "setdata",
  GetData = "getdata",
  GetCollection = "getcollection",
  ExtractImage = "extractimage",
  Resize = "resize",
  SelectAllFrames = "selectAllFrames",
  SelectDevFrames = "selectDevFrames"
}

const {
  GetProperties,
  GetToken,
  SetToken,
  GetImage,
  Toast,
  Cancel,
  SetData,
  GetData,
  GetCollection,
  ExtractImage,
  Resize,
  SelectAllFrames,
  SelectDevFrames
} = StrategyKeys;
export class UIEventStrategyFactory extends EventStrategyFactory<IPluginStrategy>{

  constructor() {
    const strategyMap: Record<StrategyKeys, IPluginStrategy> = {
      [GetProperties]: new GetPropertyHandlingStrategy(),
      [GetToken]: new GetTokenHandlingStrategy(),
      [SetToken]: new SetTokenHandlingStrategy(),
      [GetImage]: new GetImageHandlingStrategy(),
      [Toast]: new ToastHandlingStrategy(),
      [Cancel]: new ExitHandlingStrategy(),
      [SetData]: new SetDataStrategy(),
      [GetData]: new GetDataStrategy(),
      [GetCollection]: new Getcollections(),
      [ExtractImage]: new ExtractAsImage(),
      [Resize]: new ResizerStrategy(),
      [SelectAllFrames]: new selectAllFrames(),
      [SelectDevFrames]: new selectDevFrames()
    };
    super(strategyMap);
  }
}
