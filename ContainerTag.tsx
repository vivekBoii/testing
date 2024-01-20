import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";

const Tag = (props: { tag: string; selected: boolean; onclk: ()=>void }) => {
  const { tag, selected, onclk } = props;
  return (
    <div
      onClick={() => onclk()}
      className={"tagBox " + (selected ? "selected" : "")}
    >
      <p>{tag}</p>
    </div>
  );
};

const ContainerPropertiesTab = () => {
  const [stag, setSTag] = React.useState("");
  const btags = [
    "div",
    "article",
    "header",
    "footer",
    "main",
    "section",
    "nav",
  ];

  const otags = ["address", "aside", "canvas", "fieldset"];
  return (
    <div className="propertiesTab">
      <CollapsibleSection
        open={true}
        icon={false}
        heading="Basic Attributes"
      >
        <div className="attributes">
          <div>
            <h5>Tag Type</h5>
            <div className="manualtags">
              <div>
                <h6>Common</h6>
                <div className="tagsList">
                  {btags.map((tag) => (
                    <Tag
                      selected={tag === stag}
                      tag={tag}
                      key={tag}
                      onclk={() => setSTag(tag)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h6>others</h6>
                <div className="tagsList">
                  {otags.map((tag) => (
                    <Tag
                      selected={tag === stag}
                      tag={tag}
                      key={tag}
                      onclk={() => setSTag(tag)}
                    />
                  ))}
                </div>
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

export default ContainerPropertiesTab;
