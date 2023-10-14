/** テキストフィールド */
export type MicroCMSTextFiled = {
  idValue: string;
  fieldId: string;
  name: string;
  kind: "text";
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
  isUnique?: boolean;
};