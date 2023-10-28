import {
  MicroCMSApiSchema,
  MicroCMSApiSchemaCustomFieldType,
  MicroCMSCustomFieldType,
} from '../../types/dist';
import {
  CreateBooleanFieldResult,
  CreateCustomFieldResult,
  CreateDateFieldResult,
  CreateFileFieldResult,
  CreateIframeFieldResult,
  CreateMediaFieldResult,
  CreateMediaListFieldResult,
  CreateNumberFieldResult,
  CreateRelationFieldResult,
  CreateRelationListFieldResult,
  CreateRepeaterFieldResult,
  CreateRichEditorV2FieldResult,
  CreateSelectFieldResult,
  CreateTextAreaFieldResult,
  CreateTextFieldResult,
} from './fields';
import { generateId } from './utils';

export type CreateFieldResult =
  | CreateTextFieldResult
  | CreateTextAreaFieldResult
  | CreateRichEditorV2FieldResult
  | CreateMediaFieldResult
  | CreateMediaListFieldResult
  | CreateDateFieldResult
  | CreateBooleanFieldResult
  | CreateSelectFieldResult
  | CreateFileFieldResult
  | CreateNumberFieldResult
  | CreateRelationFieldResult
  | CreateRelationListFieldResult
  | CreateIframeFieldResult
  | CreateRepeaterFieldResult
  | CreateCustomFieldResult;

//////////////////////////
//////////////////////////
// ApiSchema
//////////////////////////
//////////////////////////
type CreateApiSchemaFields = {
  [FieldId in string]: CreateFieldResult;
};

const createApiSchema = (
  apiFields: CreateApiSchemaFields,
): MicroCMSApiSchema => {
  const customFieldsIterable: [string, MicroCMSApiSchemaCustomFieldType][] = [];

  return {
    apiFields: Object.entries(apiFields).map(([fieldId, apiField]) => {
      switch (apiField.kind) {
        case 'custom': {
          const { field, ...rest } = apiField;
          customFieldsIterable.push([field[0].createdAt, field[0]]);
          return {
            fieldId,
            customFieldCreatedAt: apiField.field[0].createdAt,
            ...rest,
          };
        }
        case 'repeater': {
          const { fields, ...rest } = apiField;
          fields.forEach((field) => {
            customFieldsIterable.push([field.createdAt, field]);
          });
          return {
            fieldId,
            customFieldCreatedAtList: fields.map((field) => field.createdAt),
            ...rest,
          };
        }
        default: {
          return {
            fieldId,
            ...apiField,
          };
        }
      }
    }),
    customFields: Array.from(new Map(customFieldsIterable).values()),
  };
};

//////////////////////////
//////////////////////////
// CustomFieldSchema
//////////////////////////
//////////////////////////
type CreateCustomFieldParams = Omit<
  MicroCMSApiSchemaCustomFieldType,
  'createdAt' | 'updatedAt' | 'position' | 'viewerGroup' | 'fields'
> & {
  fields: {
    [FieldId in string]: Exclude<CreateFieldResult, CreateCustomFieldResult>;
  };
};

const createCustomField = (
  params: CreateCustomFieldParams,
): MicroCMSApiSchemaCustomFieldType => {
  const random = Math.floor(Math.random() * 1000);
  const date = new Date();
  date.setMilliseconds(random);
  const at = date.toISOString();

  const fields: MicroCMSCustomFieldType[] = Object.entries(params.fields).map(
    ([fieldId, field]) => {
      return {
        idValue: generateId(),
        fieldId,
        ...field,
      };
    },
  );

  return {
    fieldId: params.fieldId,
    name: params.name,
    createdAt: at,
    updatedAt: at,
    viewerGroup: generateId(3),
    fields,
    position: [fields.map((field) => field.idValue)],
  };
};

export default {
  api: createApiSchema,
  custom: createCustomField,
};
