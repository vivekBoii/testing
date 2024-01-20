import React from "react";
import "./Popup.css";


const TaggingWarning = () => {
  return (
    <div className="popup__container warn">
      <div className="popup">
        <div className="popup__content">
          <h2>Found some untagged layers!</h2>
          <img src={require("../../../assests/popup/untagged.svg")} alt="" />
          <p className="bold">Do you want to tag them?</p>

          <div className="popup__actions">
            <button className="action">Review before tagging</button>
            <button className="action link">
              Ignore recommendation
            </button>
            <button className="action link">
              Ignore and dont remind me again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaggingWarning;