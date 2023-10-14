/** 複数コンテンツ参照 */
export type MicroCMSRelationListField = {
  fieldId: string;
  name: string;
  kind: "relationList";
  description?: string;
  required?: boolean;
  referenceDisplayItem?: string; // is idValue
  relationListCountLimitValidation?: {
    relationListCount: {
      min: number;
      max: number;
    };
  };
};