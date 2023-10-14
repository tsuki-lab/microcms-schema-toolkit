/** コンテンツ参照 */
export type MicroCMSRelationField = {
  fieldId: string;
  name: string;
  kind: "relation";
  description?: string;
  required?: boolean;
  referenceDisplayItem?: string; // is idValue
};
