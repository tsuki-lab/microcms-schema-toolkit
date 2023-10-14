/** 拡張フィールド */
export type MicroCMSIframeField = {
  fieldId: string;
  name: string;
  kind: "iframe";
  description?: string;
  required?: boolean;
  iframeUrl?: string;
};