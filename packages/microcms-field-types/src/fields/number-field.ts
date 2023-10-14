/** 数字 */
export type MicroCMSNumberField = {
  fieldId: string;
  name: string;
  kind: "number";
  description?: string;
  required?: boolean;
  numberSizeLimitValidation?: {
    numberSize: {
      min: number;
      max: number;
    };
  };
};