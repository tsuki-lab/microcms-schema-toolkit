/** ファイル */
export type MicroCMSFileField = {
  fieldId: string;
  name: string;
  kind: "file";
  description?: string;
  required?: boolean;
};
