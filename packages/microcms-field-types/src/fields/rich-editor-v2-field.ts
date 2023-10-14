/** リッチエディタ */
export type MicroCMSRichEditorV2Field = {
  fieldId: string;
  name: string;
  kind: "richEditorV2";
  description?: string;
  required?: boolean;
  richEditorV2Options?: RichEditorV2Option[];
  customClassList?: CustomClassItem[];
};

export type CustomClassItem = {
  id: string;
  name: string;
  value: string;
};

export type RichEditorV2Option =
  | "undo"
  | "redo"
  | "clean"
  | "customClass"
  | "link"
  | "image"
  | "oembedly"
  | "listOrdered"
  | "listBullet"
  | "horizontalRule"
  | "bold"
  | "headerOne"
  | "headerTwo"
  | "italic"
  | "blockquote"
  | "codeBlock"
  | "underline"
  | "strike"
  | "table"
  | "code"
  | "textAlign"
  | "headerThree"
  | "headerFour"
  | "headerFive"
  | "paragraph";