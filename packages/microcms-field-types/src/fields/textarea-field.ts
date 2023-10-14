/** テキストエリア */
export type MicroCMSTextAreaField = {
  fieldId: string;
  name: string;
  kind: "textArea";
  description?: string;
  required?: boolean;
  textSizeLimitValidation?: {
    textSize: {
      min: number;
      max: number;
    };
  };
  patternMatchValidation?: {
    regexp: {
      pattern: string;
      flags: string | null;
    };
  };
};