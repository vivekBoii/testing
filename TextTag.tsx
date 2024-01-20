import * as React from "react";
import CollapsibleSection from "../../../../components/CollapsibleSection";

// import './NoTag.css';

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

const TextPropertiesTab = () => {
  const [stag, setSTag] = React.useState("");
  const btags = [
    "a",
    "b",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "i",
    "label",
    "p",
    "span",
    "strong",
    "u",
  ];

  const otags = [
    "blockquote",
    "code",
    "legend",
    "pre",
    "q",
    "s",
    "small",
    "sub",
    "summary",
    "sup",
  ];
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
                <h6>Basic Tags</h6>
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

export default TextPropertiesTab;
