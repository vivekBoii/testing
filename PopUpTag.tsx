import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";

const PopUpPropertiesTab = () => {
  const [color, setColor] = React.useState("#000000");
  return (
    <div className="propertiesTab popupProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="properties">
          <div className="checkoptions">
            <input type="checkbox" name="addbg" id="addbg" />
            <label htmlFor="addbg">
							Add background behind overlay
            </label>
          </div>

          <div>
            <h5>Overlay Color</h5>

            <div className="fillsContainer">
              <h5>Fill</h5>

              <div className="fill">
                <div
                  className="fillRect"
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="color"
                    name=""
                    id=""
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  />
                </div>
                <span className="hex">{color}</span>
                <span className="opacity">100%</span>
              </div>
            </div>
          </div>
          <div>
            <h5>Embed HTML</h5>

            <div>
              <input
                type="text"
                placeholder="Paste your HTML code snippet here"
              />
            </div>
          </div>

          <div className="checkoptions">
            <input type="checkbox" name="closeout" id="closeout" />
            <label htmlFor="closeout">
							Close when clicking outside of pop-up
            </label>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>
    </div>
  );
};

export default PopUpPropertiesTab;
