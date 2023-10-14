/** カスタム */
export type MicroCMSCustomField = {
  fieldId: string;
  name: string;
  kind: "custom";
  description?: string;
  required?: boolean;
  /**
   * カスタムフィールドの作成日時
   * @example "2023-10-13T13:50:38.504Z"
   */
  customFieldCreatedAt: string;
  customFieldDisplayItem?: string; // is customField idValue
};