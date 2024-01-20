import { PropertiesObject } from "../../../extract/types/PropertiesObject";

/* Post Message to the UI */
export const postMessageToUI = (type: string, headers?: { requestId: string; }, data?: PropertiesObject) => {

  figma.ui.postMessage({
    type,
    id: headers?.requestId,
    data: data,
  });
};