import { Node } from "@tiptap/pm/model";

/**
 * Maximum file size (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Checks if a mark exists in the editor schema
 * @param {string} markName
 * @param {Editor | null} editor
 * @returns {boolean}
 */
export const isMarkInSchema = (markName, editor) => {
  if (!editor?.schema) return false;
  return editor.schema.spec.marks.get(markName) !== undefined;
};

/**
 * Checks if a node exists in the editor schema
 * @param {string} nodeName
 * @param {Editor | null} editor
 * @returns {boolean}
 */
export const isNodeInSchema = (nodeName, editor) => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== undefined;
};

/**
 * Gets the active attributes of a specific mark in the current editor selection.
 * @param {Editor | null} editor
 * @param {string} markName
 * @returns {object | null}
 */
export function getActiveMarkAttrs(editor, markName) {
  if (!editor) return null;
  const { state } = editor;
  const marks = state.storedMarks || state.selection.$from.marks();
  const mark = marks.find((mark) => mark.type.name === markName);

  return mark?.attrs ?? null;
}

/**
 * Checks if a node is empty
 * @param {Node | null} node
 * @returns {boolean}
 */
export function isEmptyNode(node) {
  return !!node && node.content.size === 0;
}

/**
 * Utility function to conditionally join class names into a single string.
 * @param {...(string | boolean | undefined | null)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Finds the position and instance of a node in the document
 * @param {object} props
 * @param {Editor | null} props.editor
 * @param {Node | null} [props.node]
 * @param {number | null} [props.nodePos]
 * @returns {{ pos: number, node: Node } | null}
 */
export function findNodePosition(props) {
  const { editor, node, nodePos } = props;

  if (!editor || !editor.state?.doc) return null;

  const hasValidNode = node !== undefined && node !== null;
  const hasValidPos = nodePos !== undefined && nodePos !== null;

  if (!hasValidNode && !hasValidPos) {
    return null;
  }

  if (hasValidPos) {
    try {
      const nodeAtPos = editor.state.doc.nodeAt(nodePos);
      if (nodeAtPos) {
        return { pos: nodePos, node: nodeAtPos };
      }
    } catch (error) {
      console.error("Error checking node at position:", error);
      return null;
    }
  }

  let foundPos = -1;
  let foundNode = null;

  editor.state.doc.descendants((currentNode, pos) => {
    if (currentNode === node) {
      foundPos = pos;
      foundNode = currentNode;
      return false;
    }
    return true;
  });

  return foundPos !== -1 && foundNode !== null
    ? { pos: foundPos, node: foundNode }
    : null;
}

/**
 * Handles image upload with progress tracking and abort capability
 * @param {File} file
 * @param {function} [onProgress]
 * @param {AbortSignal} [abortSignal]
 * @returns {Promise<string>}
 */
export const handleImageUpload = async (file, onProgress, abortSignal) => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
  }

  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error("Upload cancelled");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    onProgress?.({ progress });
  }

  return "/images/placeholder-image.png";

  // Uncomment for production use:
  // return convertFileToBase64(file, abortSignal);
};

/**
 * Converts a File to base64 string
 * @param {File} file
 * @param {AbortSignal} [abortSignal]
 * @returns {Promise<string>}
 */
export const convertFileToBase64 = (file, abortSignal) => {
  if (!file) {
    return Promise.reject(new Error("No file provided"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const abortHandler = () => {
      reader.abort();
      reject(new Error("Upload cancelled"));
    };

    if (abortSignal) {
      abortSignal.addEventListener("abort", abortHandler);
    }

    reader.onloadend = () => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", abortHandler);
      }

      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert File to base64"));
      }
    };

    reader.onerror = (error) => reject(new Error(`File reading error: ${error}`));
    reader.readAsDataURL(file);
  });
};
