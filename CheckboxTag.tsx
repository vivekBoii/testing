import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import CollapsibleSection from "../../../../components/CollapsibleSection";
import { updateConfigProperties } from "../../../../features/conf/confSlice";

const CheckboxPropertiesTab = () => {
  const confStateProps = useAppSelector(
    (state) => state.conf.tagging.properties
  );

  const [state, setState] = React.useState(confStateProps);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setState({ ...state, [name]: checked });
  };

  const dispatch = useAppDispatch();
  const handleSave = () => {
    dispatch(updateConfigProperties(state));
  };

  return (
    <div className="propertiesTab checkboxProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div>
          <div className="properties">
            <div>
              <h5>Link Type</h5>
              <div className="checks">
                <div className="check">
                  <input
                    type="checkbox"
                    name="required"
                    id="required"
                    checked={state.required}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="required">Required</label>
                </div>
                <div className="check">
                  <input
                    type="checkbox"
                    name="autofocus"
                    id="autofocus"
                    checked={state.autofocus}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="autofocus">Autofocus</label>
                </div>
                <div className="check">
                  <input
                    type="checkbox"
                    name="checked"
                    id="checked"
                    checked={state.checked}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="checked">Checked</label>
                </div>
                <div className="check">
                  <input
                    type="checkbox"
                    name="disabled"
                    id="disabled"
                    checked={state.disabled}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="disabled">Disabled</label>
                </div>
                <div className="check">
                  <input
                    type="checkbox"
                    name="readOnly"
                    id="readOnly"
                    checked={state.readOnly}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="readOnly">Read only</label>
                </div>
              </div>
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
export default CheckboxPropertiesTab;
