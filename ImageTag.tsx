import * as React from "react";
import { GoPlus } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { updateConfigProperties } from "../../../../features/conf/confSlice";

const ImagePropertiesTab = () => {
  const confStateProps = useAppSelector(
    (state) => state.conf.tagging.properties
  );
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState(confStateProps);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const save = () => {
    dispatch(updateConfigProperties(state));
  };

  return (
    <div className="propertiesTab imageProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="properties">
          <div>
            <h5>Asset File Name</h5>
            <div className="advProperty">
              <input
                type="text"
                placeholder="image-19"
                name="assetFileName"
                value={state.assetFileName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="advProperty">
              <div>
                <label htmlFor="typeid">Size</label>
                <input
                  type="text"
                  placeholder="2X"
                  name="size"
                  value={state.size}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="typeid">Format</label>
                <input
                  type="text"
                  placeholder="PNG"
                  name="format"
                  value={state.format}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="link">
              <GoPlus /> Add more
            </button>
          </div>
          <div>
            <div className="advProperty">
              <div>
                <label htmlFor="typeid">Alternate Text</label>
                <input
                  type="text"
                  placeholder="e.g. tree"
                  name="alternateText"
                  value={state.alternateText}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="typeid">Loading</label>
                <input
                  type="text"
                  placeholder="Default"
                  name="loading"
                  value={state.loading}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="link">
              <GoPlus /> Add more
            </button>
          </div>
        </div>
      </CollapsibleSection>
      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>
      <button onClick={save}>Save</button>
    </div>
  );
};
export default ImagePropertiesTab;
