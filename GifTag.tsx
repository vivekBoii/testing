import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";

const GifPropertiesTab = () => {
  return (
    <div className="propertiesTab gifProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="properties">
          <div>
            <h6>Link Type</h6>
            <ul className="linkTypes">
              <li>
                <input
                  type="radio"
                  name="linktype"
                  id="upload"
                />
                <label htmlFor="upload">Upload File</label>
              </li>
              <li>
                <input type="radio" name="linktype" id="url" />
                <label htmlFor="url">URL</label>
              </li>
            </ul>
          </div>
          <div>
            <h6>Upload File</h6>

            <input type="text" placeholder="Choose GIF" />
          </div>

          <div>
            <div className="advProperty">
              <div>
                <label htmlFor="typeid">Alternate Text</label>
                <input type="text" placeholder="e.g. tree" />
              </div>
              <div>
                <label htmlFor="typeid">Loading</label>
                <input type="text" placeholder="Default" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>
    </div>
  );
};

export default GifPropertiesTab;
