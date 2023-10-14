/** 繰り返し */
export type MicroCMSRepeaterField = {
  fieldId: string;
  name: string;
  kind: "repeater";
  description?: string;
  required?: boolean;
  customFieldCreatedAtList?: string[]; // is customField createdAt
  repeaterCountLimitValidation?: {
    repeatCount: {
      min: number;
      max: number;
    };
  };
};
