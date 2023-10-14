/** 日時 */
export type MicroCMSDateField = {
  fieldId: string;
  name: string;
  kind: "date";
  description?: string;
  required?: boolean;
  dateFormat?: boolean;
};