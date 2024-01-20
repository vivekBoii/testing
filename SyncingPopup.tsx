import React from "react";
import "./Popup.css";


const SyncingPopup = () => {
  return (
    <div className="popup__container warn">
      <div className="popup">
        <div className="popup__content">
          <h2>Syncing code to Builder</h2>
          <div className="popup__logoBox">

            <img className="logoImg" src={require("../../../assests/popup/necleo.svg")} alt="" />
          </div>
          <p className="bold">Do you want to tag them?</p>

          <div className="popup__actions">
            <button type="button" className="action" >Review before tagging</button>
            <button type="button" className="action link">
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

export default SyncingPopup;