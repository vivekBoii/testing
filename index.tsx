import * as React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import "./CollapsibleSection.css";

const CollapsibleSection = (props: {
	heading: string;
	children: JSX.Element;
	icon?: boolean;
	open?: boolean;
	noCollapse?:boolean;
}) => {
  const {
    heading,
    icon = true,
    open = false,
    noCollapse = false,
    children,
  } = props;
  const [collapsed, setCollapsed] = React.useState(!open);
  React.useEffect(() => {
    setCollapsed(!open);
  }, [open]);
  return (
    <div className="collapse">
      <div
        className="collapseHeader"
        onClick={() => {
          if (noCollapse) {
            return;
          }
          setCollapsed((prev) => !prev);
        }}
      >
        <h5>{heading}</h5>
        {icon ? (
          <p>{collapsed ? <BsChevronDown /> : <BsChevronUp />}</p>
        ) : (
          <p></p>
        )}
      </div>

      <div className={"collapsible " + (collapsed ? "collapsed" : "")}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
