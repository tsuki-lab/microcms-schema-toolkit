/** セレクトフィールド */
export type MicroCMSSelectField = {
  fieldId: string;
  name: string;
  kind: 'select';
  description?: string;
  required?: boolean;
  selectItems?: SelectItem[];
  selectInitialValue?: string[];
  multipleSelect?: boolean;
};

export type SelectItem = {
  id: string;
  value: string;
};
