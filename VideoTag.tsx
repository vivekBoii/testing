import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import CollapsibleSection from "../../../../components/CollapsibleSection";
import { updateConfigProperties } from "../../../../features/conf/confSlice";

const VideoPropertiesTab = () => {
  const dispatch = useAppDispatch();
  const confStateProps = useAppSelector(
    (state) => state.conf.tagging.properties
  );

  const [state, setState] = React.useState(confStateProps);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveClick = () => {
    // Dispatch an action to save the state to the reducer
    dispatch(updateConfigProperties(state));
  };

  const linkTypes = [
    { id: "url", label: "URL" },
    { id: "upload", label: "Upload" },
  ];

  const linkTypeOptions = linkTypes.map((linkType) => (
    <li key={linkType.id}>
      <input
        type="radio"
        name="linkType"
        id={linkType.id}
        value={linkType.id}
        checked={state.linkType === linkType.id}
        onChange={handleInputChange}
      />
      <label htmlFor={linkType.id}>{linkType.label}</label>
    </li>
  ));

  return (
    <div className="propertiesTab videoTab">
      <CollapsibleSection
        heading="Basic Attributes"
        icon={false}
        open={true}
      >
        <div className="attributes">
          <div>
            <h6>Link Type</h6>
            <ul className="linkTypes">{linkTypeOptions}</ul>
          </div>
          <div>
            <h6>URL</h6>
            <input
              type="text"
              name="url"
              placeholder="e.g. https://sample-video.com/video123.mp4"
              value={state.url}
              onChange={handleInputChange}
            />
            <p>
							Please use a public URL and ensure that your audio
							file is not moew tha 100MB
            </p>
          </div>
          <div className="checkOptionsContainer">
            <div className="checkoptions">
              <input
                type="checkbox"
                name="showControls"
                id="showControls"
                checked={state.showControls}
                onChange={handleInputChange}
              />
              <label htmlFor="showControls">Show Controls</label>
            </div>
            <div className="checkoptions">
              <input
                type="checkbox"
                name="loop"
                id="loop"
                checked={state.loop}
                onChange={handleInputChange}
              />
              <label htmlFor="loop">Loop</label>
            </div>
          </div>
          <div className="slider volume">
            <h6>Volume</h6>
            <input
              type="range"
              name="volume"
              id="volume"
              value={state.volume}
              onChange={handleInputChange}
            />
            <p>100%</p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>

      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default VideoPropertiesTab;
