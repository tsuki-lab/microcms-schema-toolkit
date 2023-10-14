/** 真偽値 */
export type MicroCMSBooleanField = {
  fieldId: string;
  name: string;
  kind: "boolean";
  description?: string;
  required?: boolean;
  booleanInitialValue?: boolean;
};