import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { convertToRaw, EditorState, Editor as EditorType } from "draft-js";

type Props = {
  content: string;
  onChange: Function;
};

const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "link",
    "history",
  ],
  inline: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough", "monospace"],
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    icon: "fontSize",
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: true,
    className: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered", "indent", "outdent"],
  },
  textAlign: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    className: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["undo", "redo"],
    undo: { className: undefined },
    redo: { className: undefined },
  },
};

// @ts-ignore
const DraftJSEditor: typeof EditorType = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const Editor: FC<Props> = ({ onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>();

  const handleEditorChange = (newEditorState: EditorState) => {
    onChange(JSON.stringify(convertToRaw(newEditorState.getCurrentContent())));
    setEditorState(newEditorState);
  };

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  if (!editorState) return null;

  return (
    <DraftJSEditor
      editorState={editorState as EditorState}
      // @ts-ignore
      onEditorStateChange={handleEditorChange}
      toolbarClassName="draftjs-toolbar"
      editorClassName="draftjs-editor"
      wrapperClassName="draftjs-wrapper"
      toolbar={toolbarOptions}
    />
  );
};

export default Editor;
