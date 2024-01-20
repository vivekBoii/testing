import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";


const LinkPropertiesTab = () => {
  const [page, setPage] = React.useState("Choose Page");
  const [purl, setPurl] = React.useState("");
  const [newTab, setNewTab] = React.useState(false);
  return (
    <div className="propertiesTab">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="attributes">
          <div>
            <h6>Link Type</h6>
            <ul className="linkTypes">
              <li>
                <input type="radio" name="linktype" id="page" />
                <label htmlFor="page">Page</label>
              </li>
              <li>
                <input type="radio" name="linktype" id="url" />
                <label htmlFor="url">URL</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="linktype"
                  id="email"
                />
                <label htmlFor="email">Email</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="linktype"
                  id="phone"
                />
                <label htmlFor="phone">Phone</label>
              </li>
            </ul>
          </div>

          <div>
            <h6>Page</h6>
            <select
              name="page"
              id="page"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            >
              <option value="Choose Page" disabled>
								Choose Page
              </option>
              <option value="demo">Demo</option>
            </select>
          </div>

          <div>
            <h6>Page URL</h6>
            <input
              type="text"
              placeholder="e.g. / about-us"
              value={purl}
              onChange={(e) => setPurl(e.target.value)}
            />
          </div>

          <div className="checkoptions">
            <input
              type="checkbox"
              name="newtab"
              id="newtab"
              checked={newTab}
              onChange={(e) => setNewTab(e.target.checked)}
            />
            <label htmlFor="newtab">Open in new tab</label>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection heading="Advanced Attributes">
        <p>Coming Soon</p>
      </CollapsibleSection>
    </div>
  );
};

export default LinkPropertiesTab;
