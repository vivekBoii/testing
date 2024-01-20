import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";

const iFramePropertiesTab = () => {
  return (
    <div className="propertiesTab iframeProps">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="properties">
          <div>
            <h5>URL</h5>

            <div className="advProperty">
              <input
                type="text"
                placeholder="e.g. https://sample-video.com/video123.mp4"
              />
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

export default iFramePropertiesTab;
