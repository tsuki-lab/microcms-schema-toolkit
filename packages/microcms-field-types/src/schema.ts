import { MicroCMSBooleanField } from './fields/boolean-field';
import { MicroCMSCustomField } from './fields/custom-field';
import { MicroCMSDateField } from './fields/date-field';
import { MicroCMSFileField } from './fields/file-field';
import { MicroCMSIframeField } from './fields/iframe-field';
import { MicroCMSMediaField } from './fields/media-field';
import { MicroCMSMediaListField } from './fields/media-list-field';
import { MicroCMSNumberField } from './fields/number-field';
import { MicroCMSRelationField } from './fields/relation-field';
import { MicroCMSRelationListField } from './fields/relation-list-field';
import { MicroCMSRepeaterField } from './fields/repeater-field';
import { MicroCMSRichEditorV2Field } from './fields/rich-editor-v2-field';
import { MicroCMSSelectField } from './fields/select-field';
import { MicroCMSTextFiled } from './fields/text-field';
import { MicroCMSTextAreaField } from './fields/textarea-field';

export type MicroCMSApiSchema = {
  apiFields: MicroCMSField[];
  customFields: {
    createdAt: string;
    fieldId: string;
    name: string;
    fields: MicroCMSCustomFieldsField[];
    position: [string[], string[]] | [string[]];
    updatedAt: string;
    viewerGroup: string;
  }[];
};

export type MicroCMSCustomFieldsField = Exclude<
  MicroCMSField,
  MicroCMSCustomField
>;

export type MicroCMSField =
  | MicroCMSTextFiled
  | MicroCMSTextAreaField
  | MicroCMSRichEditorV2Field
  | MicroCMSMediaField
  | MicroCMSMediaListField
  | MicroCMSDateField
  | MicroCMSBooleanField
  | MicroCMSSelectField
  | MicroCMSRelationField
  | MicroCMSRelationListField
  | MicroCMSNumberField
  | MicroCMSFileField
  | MicroCMSIframeField
  | MicroCMSCustomField
  | MicroCMSRepeaterField;
