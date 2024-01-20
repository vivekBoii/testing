import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { selectUILibrary, updateUILibrary } from "../../../../features/conf/confSlice";
import { UILibraries } from "../../../../features/conf/types/settings";
import { UILibrary } from "../../../../features/conf/types/types";

const UILibraryList:{id:number, icon:string, name:UILibrary}[] = [
  {
    id: 1,
    icon: require("../../../../assests/tagConf/uilib/materialui.svg"),
    name: UILibraries.MaterialUI,
  },
  {
    id: 2,
    icon: require("../../../../assests/tagConf/uilib/bootstrap.svg"),
    name: UILibraries.Bootstrap,
  },
  {
    id: 3,
    icon: require("../../../../assests/tagConf/uilib/antdesign.svg"),
    name: UILibraries.AntDesign,
  },
  {
    id: 4,
    icon: require("../../../../assests/tagConf/uilib/chakra.svg"),
    name: UILibraries.Chakra,
  },
  {
    id: 5,
    icon: require("../../../../assests/tagConf/uilib/none.svg"),
    name: UILibraries.None,
  },
];

const UILibraryPropertiesTab = () => {
  const selectedUILib = useAppSelector(selectUILibrary);
  const dispatch = useAppDispatch();

  const handleUILibrarySelection = (selectedLib:UILibrary) => {
    dispatch(updateUILibrary(selectedLib));
  };

  return (
    <div className="propertiesTab uilibProps">
      <CollapsibleSection open={true} icon={false} heading="UI Library">
        <div className="properties">
          <div>
            <h5>Select a UI Library</h5>

            <div className="actionsList">
              {UILibraryList.map((uilib) => {
                return (
                  <div
                    key={uilib.id}
                    className={"actionCard " + (selectedUILib === uilib.name?"selected":"") }
                    onClick={() =>
                      handleUILibrarySelection(uilib.name)
                    }
                  >
                    <div className="actionIcon">
                      <img src={uilib.icon}></img>
                    </div>
                    <p>{uilib.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default UILibraryPropertiesTab;
