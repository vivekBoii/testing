import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { updateConfigProperties } from "../../../../features/conf/confSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const FramePropertiesTab = () => {
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
    <div className="propertiesTab frameProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="properties">
          <div>
            <h5>Embed HTML</h5>

            <div>
              <input
                type="text"
                placeholder="Paste your HTML code snippet here"
                name="html"
                value={state.html}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default FramePropertiesTab;
