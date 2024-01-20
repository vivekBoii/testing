import { IPluginStrategy } from "../iPluginStrategy";
import { UIEventMessage } from "../../types/UIEventMessage";
import { postMessageToUI } from "./PostMessageToUI";
import { Queue } from "../../../../data_structure/Ds_queue";
import { getStyledTextSegmentsFields, propertiesToExclude } from "../../../../constant/Constant";


/* get Properties of the UI Component */
export class GetPropertyHandlingStrategy implements IPluginStrategy {

  private extractProps(node: any) {
    const newObject = {};
    for (const key in node) {
      if (key === "parent" && node[key]) {
        const value = node[key];
        newObject["parent"] = {
          "id": value.id,
          "type": value.type,
          "name": value.name
        };

      }
      if (!propertiesToExclude.includes(key)) {
        const value = node[key];
        // we do lint then it will not  it to double quotes so adding ignore comment
        // eslint-disable-next-line
        if (typeof value === 'symbol') {
          newObject[key] = "symbol-" + (value as symbol).description;
        }
        else {
          newObject[key] = value;
        }
      }
    }
    return newObject;
  }

  /* Get the user selected node */
  private getCurrentSelectedNodes(): readonly SceneNode[] {
    const selectedElements = figma.currentPage.selection;
    if (selectedElements.length === 0) {
      return null;
    }
    return selectedElements;
  }
  private enqueId = (destinationId: string, visitedSet: Set<string>, q: Queue<string>) => {
    if (destinationId !== null && destinationId && !visitedSet.has(destinationId)) {
      q.enqueue(destinationId);
      visitedSet.add(destinationId);
    }
  };
  /* extracts properties of the node and recursively of it's children */
  private extractPropertiesRecursively(node: any, q: Queue<string>, visitedSet: Set<string>, level: number) {
    const ast = this.extractProps(node);
    ast["isSelected"] = (level === 0);

    if (node.type === "COMPONENT" && node?.parent?.type !== "PAGE") {
      this.enqueId(node.parent?.id, visitedSet, q);
    }

    if (node.type === "TEXT") {
      ast["getStyledTextSegments"] = node.getStyledTextSegments(getStyledTextSegmentsFields);
    }

    if (node?.reactions?.length > 0) {
      for (let i = 0; i < node.reactions.length; i++) {
        this.enqueId(node.reactions[i].action?.destinationId, visitedSet, q);
      }
    }

    if (node?.children?.length > 0) {
      ast["children"] = [];
      for (let i = 0; i < node.children.length; i++) {
        const childNode = node.children[i];
        ast["children"].push(this.extractPropertiesRecursively(childNode, q, visitedSet, level));
      }
    }

    if (node?.mainComponent) {
      ast["mainComponent"] = {
        "id": node.mainComponent.id,
        "type": node.mainComponent.type,
        "name": node.mainComponent.name,
        "parentId": node.mainComponent.parent?.id,
        "parentType": node.mainComponent.parent?.type,
        "parentName": node.mainComponent.parent?.name
      };
      node.mainComponent.parent?.type === "COMPONENT_SET" ?
        this.enqueId(node.mainComponent.parent.id, visitedSet, q) : this.enqueId(node.mainComponent.id, visitedSet, q);
    }
    return ast;

  }
  /* handle the getProperties event, getting properties of the selected node */
  handleEvent(event: UIEventMessage): void {
    const currentSelectedElements = this.getCurrentSelectedNodes();

    const headers: { requestId: string; } = { requestId: event.id };
    if (!currentSelectedElements) {
      postMessageToUI(event.type, headers, null);
      return;
    }
    // abstract syntex tree :ast 
    // extract properties from the current selected element nodes
    const ast = this.extractAst(currentSelectedElements);
    postMessageToUI(event.type, headers, ast);
  }

  private extractAst(currentSelectedElements: readonly SceneNode[]) {
    const queue = new Queue<string>();
    const visitedSet: Set<string> = new Set();
    for (const node of currentSelectedElements) {
      queue.enqueue(node.id);
      visitedSet.add(node.id);
    }
    const ast = [];
    let level = 0;
    while (!queue.isEmpty()) {
      let size = queue.size();
      while (size-- > 0) {
        const id = queue.peek();
        ast.push(this.extractPropertiesRecursively(figma.getNodeById(id), queue, visitedSet, level));
        queue.dequeue();
      }
      level += 1;
    }
    console.log(ast);
    return ast;
  }
}
