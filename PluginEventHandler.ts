import { ORIGIN_URL } from "../../misc/strings";

import { v4 as uuidv4 } from "uuid";
import { store } from "../app/store";
import { updateSelection } from "../features/conf/confSlice";
import { PropertiesObject } from "../../logic/extract/types/PropertiesObject";

type EventCallback = (any) => void;

const map: Map<string, EventCallback> = new Map<string, EventCallback>();



// register callback function with uid and post message to the plugin
export const register = (type: string, callback: EventCallback, msg?) => {
  const callbackId = uuidv4();
  parent.postMessage(
    { pluginMessage: { id: callbackId, type, msg } },
    ORIGIN_URL
  );
  map.set(callbackId, callback);

};


export const registerAsync = <T>(type: string, msg?: string): Promise<any> => {
  let resolved = false;
  const timeoutPromise = new Promise<T>((_, reject) => {
    setTimeout(() => {
      if (!resolved) {
        reject(new Error("Timeout occurred after 10 seconds"));
      }
    }, 10000);
  });
  const registrationPromise = new Promise<T>((resolve) => {
    register(type, (data: T) => {
      resolved = true;
      resolve(data);
    }, msg);
  });
  return Promise.race([registrationPromise, timeoutPromise]);
};

// toast msg to plugin from ui
export const toast = (msg: string) => {
  const callbackId = uuidv4();
  parent.postMessage(
    { pluginMessage: { id: callbackId, type: "toast", msg } },
    ORIGIN_URL
  );
  map.set(callbackId, null); // no callback
};

// Handles plugin's events to UI
// on message from the plugin invoke the callback from the id
onmessage = (event) => {
  if (event.data.pluginMessage.type === "selectionChange") {
    handleSelectionChange();
    return;
  }
  const callbackId: string = event.data.pluginMessage.id;

  const callback: EventCallback = map.get(callbackId);
  if (callback) {
    callback(event.data.pluginMessage.data);
  }
  // remove the callback from the map after calling
  map.delete(callbackId);

};
const handleSelectionChange = () => {
  register("getProperties", (data: PropertiesObject) => {
    store.dispatch(updateSelection(data));
  });
};

