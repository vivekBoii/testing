import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { FileNaming, Framework, Language, Styling, TagStatuses, UILibraries } from "./types/settings";
import { ConfigData, Project, TagStyles, TagProperties, TagActions, Tag, UILibrary } from "./types/types";

import { v4 as uuidv4 } from "uuid";
import { BACKEND_BASE_URL } from "../../../misc/strings";
import { postJson } from "../../controller/BaseTemplate";
import { MediaQueries } from "./TagProperties/Custom/tagStylingEnums";


export const initialProjectSettings: Project = {
  // name: uuidv4(),
  id:null,
  name: "Demo",
  framework: Framework.react,
  language: Language.javascript,
  styleGuide: null,
  styling: Styling.CSS,
  naming: FileNaming.PascalCase,
};

export const initialStyling: TagStyles = {
  mediaQuery: MediaQueries.Default,
  selectionState: "normal",
  preBuiltEffect: null,
  properties: [
    {
      name: "",
      value: "",
    },
  ],
  fills: [
    {
      color: "#000000",
      opacity: 100,
      effect: "Pass through",
    },
  ],
  dspState: {
    W: {
      W: "Auto px",
      H: "Auto px",
    },
    minW: {
      W: "Auto px",
      H: "Auto px",
    },
    maxW: {
      W: "Auto px",
      H: "Auto px",
    },
  },
};

const initialState: ConfigData = {
  tagging: {
    tag: null, 
    properties: {},
    styling: initialStyling,
    actions: null,
    uiLibrary: UILibraries.None,
    status: TagStatuses.Reset,
  },
  selection: null,
  settings: initialProjectSettings,
};

export const confSlice = createSlice({
  name: "conf",
  initialState,
  reducers: {
    updateSelection: (state, action) => {
      state.selection = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Project>) => {
      state.settings = action.payload;
    },
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
    updateTagSelection: (state, action: PayloadAction<Tag>) => {
      // update only the tag name
      state.tagging.tag = action.payload;
    },
    updateConfigProperties: (state, action: PayloadAction<TagProperties>) => {
      state.tagging.properties = action.payload;
      state.tagging.status = TagStatuses.Updated;
    },
    updateStylingProperties: (state, action: PayloadAction<TagStyles>) => {
      state.tagging.styling = action.payload;
    },
    updateActionProperties: (state, action: PayloadAction<TagActions>) => {
      state.tagging.actions = action.payload;
    },
    updateUILibrary: (state, action: PayloadAction<UILibrary>) => {
      state.tagging.uiLibrary = action.payload;
    },
    resetConfigProperties: (state) => {
      state.tagging.properties = {};
      state.tagging.status = TagStatuses.Reset;
    },
  },
});

export const {
  updateSelection,
  updateSettings,
  resetSettings,
  updateConfigProperties,
  resetConfigProperties,
  updateStylingProperties,
  updateActionProperties,
  updateTagSelection,
  updateUILibrary
} = confSlice.actions;

export const selectPropertiesConfig = (state: RootState) => state.conf.tagging;
export const selectCurrentNodeId = (state: RootState) =>state.conf.selection[0]?.id;
export const selectCurrentNode = (state: RootState) =>state.conf.selection;
export const selectTag = (state: RootState) => state.conf.tagging.tag;
export const selectProjectStyling = (state:RootState) => state.conf.tagging.styling;
export const selectSettings = (state: RootState) => state.conf.settings;
export const selectUILibrary = (state: RootState) => state.conf.tagging.uiLibrary;
export const selectProjectName = (state: RootState) => state.conf.settings.name;

export default confSlice.reducer;
