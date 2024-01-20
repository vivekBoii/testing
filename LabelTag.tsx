import * as React from "react";
import { GoPlus } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { updateConfigProperties } from "../../../../features/conf/confSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const LabelPropertiesTab = () => {
  const confStateProps = useAppSelector(
    (state) => state.conf.tagging.properties
  );

  const [state, setState] = React.useState(confStateProps);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const dispatch = useAppDispatch();
  const handleSave = () => {
    dispatch(updateConfigProperties(state));
  };

  return (
    <div className="propertiesTab label">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Advanced Attributes"
      >
        <div>
          <div className="properties">
            <div className="advProperty">
              <div>
                <label htmlFor="typeid">For</label>
                <input
                  type="text"
                  name="typeId"
                  placeholder="Type ID here"
                  value={state.typeId}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="typeid">Tab Index</label>
                <input
                  type="number"
                  name="tabIndex"
                  placeholder="Type number here"
                  value={state.tabIndex}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <h5>Select additional attributes</h5>
              <div className="advProperty">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={state.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={state.value}
                  onChange={handleInputChange}
                />
                <button className="iconButton">
                  <VscChromeClose />
                </button>
              </div>
              <button className="link">
                <GoPlus /> Add more
              </button>
            </div>
            <div className="propertiesList">
              <div className="propertiesHeader">
                <h5>Custom Attributes</h5>
                <h5>Page</h5>
              </div>
              <div className="propertiesList__property">
                <input
                  type="text"
                  name="customName"
                  placeholder="Name"
                  value={state.customName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="page"
                  placeholder="Value"
                  value={state.page}
                  onChange={handleInputChange}
                />
                <button className="iconButton">
                  <VscChromeClose />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default LabelPropertiesTab;
