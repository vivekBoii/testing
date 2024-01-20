import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetConfigProperties,
  selectCurrentNodeId,
  updateConfigProperties,
  updateTagSelection,
} from "../../features/conf/confSlice";
import { useTagNode } from "../../features/conf/tagging";
import { Tag } from "../../features/conf/types/types";
import initialStates from "../TagProperties/Tabs/Properties/initalStates";
import "./Tag.css";

export const TagBox = (props: { selectedTag: any, tag: Tag }) => {
  const { tag, selectedTag } = props;
  const cleanTag = (tag: Tag) => tag.toString().replace(" ", "");

  const tagId = cleanTag(tag);

  const params = useParams();
  const projectId = params.id;
  const currentNodeId = useSelector(selectCurrentNodeId);

  const mutation = useTagNode(projectId, currentNodeId);


  return (
    <div
      className={"tag " + (tag === selectedTag ? "selected" : "")}
      onClick={() => {
        mutation.mutate({
          key: projectId + ":tagNameData:" + currentNodeId,
          value: {
            tagName: tagId
          }
        });
      }}
    >
      <div className="iconBox">
        <img
          src={require(`../../assests/tags/${tagId?.toLowerCase()}.svg`)}
          alt="tag ico"
        />
      </div>
      <p>{tag}</p>
    </div >
  );
};
