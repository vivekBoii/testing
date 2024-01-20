import axios from "axios";
import { BACKEND_BASE_URL } from "../../misc/strings";
import { register, registerAsync } from "../handlers/PluginEventHandler";
import { postJson } from "./BaseTemplate";
import customHashUint8Array from "./Hashunit8Array";
function getImageFormat(byteArray: Uint8Array): { ext: string; mime: string } | null {
  const fileSignatures = [
    { signature: [0xFF, 0xD8, 0xFF], ext: "jpg", mime: "image/jpeg" },
    { signature: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A], ext: "png", mime: "image/png" },
    { signature: [0x47, 0x49, 0x46, 0x38], ext: "gif", mime: "image/gif" },
    { signature: [0x49, 0x49, 0x2A, 0x00], ext: "tif", mime: "image/tiff" },
    { signature: [0x42, 0x4D], ext: "bmp", mime: "image/bmp" },
    // Add other image formats if needed
  ];

  for (const fileType of fileSignatures) {
    let match = true;
    for (let i = 0; i < fileType.signature.length; i++) {
      if (byteArray[i] !== fileType.signature[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      return { ext: fileType.ext, mime: fileType.mime };
    }
  }

  return null;
}

export const uploadAssests = async (ExportData, project_id: string) => {
  const nodeTree: SceneNode[] = ExportData.selection;
  const axiosPromises = [];
  const uploadedhash = (await axios.get(BACKEND_BASE_URL + `/plugin/project/${project_id}/assets/image_hashes`)).data.data;
  // recursively upload all assets
  const uploadAsset = async (node) => {
    if (!node) {
      return;
    }
    //Adding tagdata to nodetree
    if (node.id) {
      const getid = { key: project_id + ":tagNameData:" + node.id };
      const tagData = await registerAsync("getdata", JSON.stringify(getid));
      node["tagData"] = tagData;
    }


    if (node.children) {
      for (const child of node.children) {
        await uploadAsset(child);
      }
    }

    if (node.type === "VECTOR") {
      const imgBytes: Uint8Array = await registerAsync("extractimage", node.id);
      const formData = new FormData();
      const vectorHash = customHashUint8Array(imgBytes);
      node["vectorHash"] = vectorHash;
      const blob = new Blob([imgBytes], { type: "image/svg+xml" });
      formData.append("asset", blob);
      if (!uploadedhash.includes(vectorHash)) {
        axiosPromises.push(axios.post(BACKEND_BASE_URL + `/plugin/asset/${project_id}/${vectorHash}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
        ));
      }
      return;
    }

    // if the node has background image, or is a vector

    if (node?.fills?.length > 0) {
      for (const fill of node.fills) {
        if (fill.type === "IMAGE") {
          const paint: ImagePaint = fill;
          const imgBytes: Uint8Array = await registerAsync("getImage", paint.imageHash);

          const imageFormat = getImageFormat(imgBytes); // function to determine image format
          const blob = new Blob([imgBytes], { type: `${imageFormat.mime}` }); // create blob with correct image format
          const formData = new FormData();
          formData.append("asset", blob);
          if (!uploadedhash.includes(paint.imageHash)) {
            axiosPromises.push(axios.post(BACKEND_BASE_URL + `/plugin/asset/${project_id}/${paint.imageHash}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
            ));
          }
        }
      }
    }
  };
  nodeTree.map(async (node: SceneNode) => uploadAsset(node));
  await Promise.all(axiosPromises);
  //Adding localCollections
  ExportData.getcollection = await registerAsync("getcollection");
  return;
};

export const publishScreen = (projectId, body, callback: (res: Response, err: Error) => void) => {
  // post the body to uri and then call the callback
  postJson(BACKEND_BASE_URL + "/plugin/publish/screen", {}, {
    project_id: projectId,
    screen: body?.length > 0 ? body : [body],
  }, callback);
};

