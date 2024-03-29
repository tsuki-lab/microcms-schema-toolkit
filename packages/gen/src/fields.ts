import {
  MicroCMSTextFiled,
  MicroCMSTextAreaField,
  MicroCMSRichEditorV2Field,
  MicroCMSMediaField,
  MicroCMSMediaListField,
  MicroCMSDateField,
  MicroCMSBooleanField,
  MicroCMSSelectField,
  MicroCMSFileField,
  MicroCMSNumberField,
  MicroCMSRelationField,
  MicroCMSRelationListField,
  MicroCMSIframeField,
  MicroCMSRepeaterField,
  MicroCMSCustomField,
  MicroCMSApiSchemaCustomFieldType,
  RichEditorV2Option,
  MicroCMSApiFieldType,
} from 'microcms-schema-types';
import { generateId } from './utils';

type CreateFieldParams<
  T extends MicroCMSApiFieldType,
  K extends Exclude<keyof T, 'fieldId' | 'kind' | 'name'> = never,
> = Omit<T, 'fieldId' | 'kind' | 'name' | K> & {
  displayName: string;
};

//////////////////////////
//////////////////////////
// TextField
//////////////////////////
//////////////////////////
export type CreateTextFieldParams = CreateFieldParams<
  MicroCMSTextFiled,
  'idValue' | 'textSizeLimitValidation' | 'patternMatchValidation'
> & {
  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  length?: {
    min: number;
    max: number;
  };
  /**
   * 特定のパターンのみ入力を許可する
   * @description 正規表現にマッチした入力のみに制限します。
   */
  regexp?: RegExp;
};
export type CreateTextFieldResult = Omit<MicroCMSTextFiled, 'fieldId'>;

const createTextField = (
  params: CreateTextFieldParams,
): CreateTextFieldResult => {
  const idValue = generateId();
  const { length, regexp } = params;
  return {
    idValue,
    kind: 'text',
    name: params.displayName,
    description: params.description,
    required: params.required,
    isUnique: params.isUnique,
    textSizeLimitValidation: length
      ? {
          textSize: {
            min: length.min,
            max: length.max,
          },
        }
      : undefined,
    patternMatchValidation: regexp
      ? {
          regexp: {
            pattern: regexp.source,
            flags: regexp.flags ? regexp.flags : null,
          },
        }
      : undefined,
  } satisfies CreateTextFieldResult;
};

//////////////////////////
//////////////////////////
// TextAreaField
//////////////////////////
//////////////////////////
export type CreateTextAreaFieldParams = CreateFieldParams<
  MicroCMSTextAreaField,
  'textSizeLimitValidation' | 'patternMatchValidation'
> & {
  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  length?: {
    min: number;
    max: number;
  };
  /**
   * 特定のパターンのみ入力を許可する
   * @description 正規表現にマッチした入力のみに制限します。
   */
  regexp?: RegExp;
};
export type CreateTextAreaFieldResult = Omit<MicroCMSTextAreaField, 'fieldId'>;

const createTextAreaField = (
  params: CreateTextAreaFieldParams,
): CreateTextAreaFieldResult => {
  const { length, regexp } = params;
  return {
    kind: 'textArea',
    name: params.displayName,
    description: params.description,
    required: params.required,
    textSizeLimitValidation: length
      ? {
          textSize: {
            min: length.min,
            max: length.max,
          },
        }
      : undefined,
    patternMatchValidation: regexp
      ? {
          regexp: {
            pattern: regexp.source,
            flags: regexp.flags ? regexp.flags : null,
          },
        }
      : undefined,
  } satisfies CreateTextAreaFieldResult;
};

//////////////////////////
//////////////////////////
// RichEditorV2Field
//////////////////////////
//////////////////////////

export type CreateRichEditorV2FieldParams = CreateFieldParams<
  MicroCMSRichEditorV2Field,
  'customClassList' | 'richEditorV2Options'
> & {
  /**
   * ツールバーの編集
   * @description 使用可能なツールバーのボタンを制限することができます。空配列を渡すとツールバーのボタンを全て無効にできます。
   */
  richEditorV2Options?: Exclude<
    RichEditorV2Option,
    'undo' | 'redo' | 'clean'
  >[];
  /**
   * カスタムclass
   * @description 登録したclass名を特定のテキスト要素に付与できます。
   */
  customClassList?: {
    name: string;
    value: string;
  }[];
};
export type CreateRichEditorV2FieldResult = Omit<
  MicroCMSRichEditorV2Field,
  'fieldId'
>;

const createRichEditorV2Field = (
  params: CreateRichEditorV2FieldParams,
): CreateRichEditorV2FieldResult => {
  const { customClassList, richEditorV2Options } = params;
  const defaultRichEditorV2Options: RichEditorV2Option[] = [
    'undo',
    'redo',
    'clean',
  ];
  return {
    kind: 'richEditorV2',
    name: params.displayName,
    description: params.description,
    required: params.required,
    richEditorV2Options: richEditorV2Options
      ? defaultRichEditorV2Options.concat(...richEditorV2Options)
      : undefined,
    customClassList: customClassList?.map((customClass) => {
      return {
        id: generateId(),
        ...customClass,
      };
    }),
  } satisfies CreateRichEditorV2FieldResult;
};

//////////////////////////
//////////////////////////
// MediaField
//////////////////////////
//////////////////////////
export type CreateMediaFieldParams = CreateFieldParams<
  MicroCMSMediaField,
  'imageSizeValidation'
> & {
  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  size?: {
    width: number;
    height: number;
  };
};
export type CreateMediaFieldResult = Omit<MicroCMSMediaField, 'fieldId'>;

const createMediaField = (
  params: CreateMediaFieldParams,
): CreateMediaFieldResult => {
  const { size } = params;
  return {
    kind: 'media',
    name: params.displayName,
    description: params.description,
    required: params.required,
    imageSizeValidation: size
      ? {
          imageSize: {
            width: size.width,
            height: size.height,
          },
        }
      : undefined,
  } satisfies CreateMediaFieldResult;
};

//////////////////////////
//////////////////////////
// MediaListField
//////////////////////////
//////////////////////////
export type CreateMediaListFieldParams = CreateFieldParams<
  MicroCMSMediaListField,
  'imageSizeValidation' | 'mediaListLayout'
> & {
  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  size?: {
    width: number;
    height: number;
  };
  /**
   * レイアウト
   * @description 管理画面での表示をカスタマイズできます。
   * @default "HORIZONTAL_SCROLL" 横並び（スクロール）
   */
  layout?: MicroCMSMediaListField['mediaListLayout'];
};
export type CreateMediaListFieldResult = Omit<
  MicroCMSMediaListField,
  'fieldId'
>;

const createMediaListField = (
  params: CreateMediaListFieldParams,
): CreateMediaListFieldResult => {
  const { size, layout } = params;
  return {
    kind: 'mediaList',
    name: params.displayName,
    description: params.description,
    required: params.required,
    imageSizeValidation: size
      ? {
          imageSize: {
            width: size.width,
            height: size.height,
          },
        }
      : undefined,
    mediaListLayout: layout,
  } satisfies CreateMediaListFieldResult;
};

//////////////////////////
//////////////////////////
// DateField
//////////////////////////
//////////////////////////
export type CreateDateFieldParams = CreateFieldParams<MicroCMSDateField>;
export type CreateDateFieldResult = Omit<MicroCMSDateField, 'fieldId'>;

const createDateField = (
  params: CreateDateFieldParams,
): CreateDateFieldResult => {
  return {
    kind: 'date',
    name: params.displayName,
    description: params.description,
    required: params.required,
    dateFormat: params.dateFormat,
  } satisfies CreateDateFieldResult;
};

//////////////////////////
//////////////////////////
// BooleanField
//////////////////////////
//////////////////////////
export type CreateBooleanFieldParams = CreateFieldParams<
  MicroCMSBooleanField,
  'booleanInitialValue'
> & {
  initialValue?: boolean;
};
export type CreateBooleanFieldResult = Omit<MicroCMSBooleanField, 'fieldId'>;

const createBooleanField = (
  params: CreateBooleanFieldParams,
): CreateBooleanFieldResult => {
  const { initialValue } = params;
  return {
    kind: 'boolean',
    name: params.displayName,
    description: params.description,
    required: params.required,
    booleanInitialValue: initialValue,
  } satisfies CreateBooleanFieldResult;
};

//////////////////////////
//////////////////////////
// SelectField
//////////////////////////
//////////////////////////
export type CreateSelectFieldParams<T extends string> = CreateFieldParams<
  MicroCMSSelectField,
  'selectItems' | 'selectInitialValue' | 'multipleSelect'
> & {
  /**
   * セレクトフィールドの選択肢
   * @description セレクトフィールドの選択肢を設定します。
   */
  selectItems: T[];
  selectInitialValue?: T[];
  multiple?: boolean;
};
export type CreateSelectFieldResult = Omit<MicroCMSSelectField, 'fieldId'>;

const createSelectField = <T extends string>(
  params: CreateSelectFieldParams<T>,
): CreateSelectFieldResult => {
  const { selectItems: _selectItems, selectInitialValue } = params;
  const selectItems = _selectItems.map((item) => {
    return {
      value: item,
      id: generateId(),
    };
  });
  return {
    kind: 'select',
    name: params.displayName,
    description: params.description,
    required: params.required,
    selectItems,
    selectInitialValue: selectItems
      .filter((item) => selectInitialValue?.includes(item.value))
      .map((item) => item.id),
    multipleSelect: params.multiple,
  } satisfies CreateSelectFieldResult;
};

//////////////////////////
//////////////////////////
// FileField
//////////////////////////
//////////////////////////
export type CreateFileFieldParams = CreateFieldParams<MicroCMSFileField>;
export type CreateFileFieldResult = Omit<MicroCMSFileField, 'fieldId'>;

const createFileField = (
  params: CreateFileFieldParams,
): CreateFileFieldResult => {
  return {
    kind: 'file',
    name: params.displayName,
    description: params.description,
    required: params.required,
  } satisfies CreateFileFieldResult;
};

//////////////////////////
//////////////////////////
// NumberField
//////////////////////////
//////////////////////////
export type CreateNumberFieldParams = CreateFieldParams<
  MicroCMSNumberField,
  'numberSizeLimitValidation'
> & {
  /**
   * 数値を制限する
   * @description フィールドに入力する数値の最小値、最大値を制限します。
   */
  range?: {
    min: number;
    max: number;
  };
};
export type CreateNumberFieldResult = Omit<MicroCMSNumberField, 'fieldId'>;

const createNumberField = (
  params: CreateNumberFieldParams,
): CreateNumberFieldResult => {
  const { range } = params;
  return {
    kind: 'number',
    name: params.displayName,
    description: params.description,
    required: params.required,
    numberSizeLimitValidation: range
      ? {
          numberSize: {
            min: range.min,
            max: range.max,
          },
        }
      : undefined,
  } satisfies CreateNumberFieldResult;
};

//////////////////////////
//////////////////////////
// RelationField
//////////////////////////
//////////////////////////
export type CreateRelationFieldParams = CreateFieldParams<
  MicroCMSRelationField,
  'referenceDisplayItem'
>;
export type CreateRelationFieldResult = Omit<MicroCMSRelationField, 'fieldId'>;

const createRelationField = (
  params: CreateRelationFieldParams,
): CreateRelationFieldResult => {
  return {
    kind: 'relation',
    name: params.displayName,
    description: params.description,
    required: params.required,
  } satisfies CreateRelationFieldResult;
};

//////////////////////////
//////////////////////////
// RelationListField
//////////////////////////
//////////////////////////
export type CreateRelationListFieldParams = CreateFieldParams<
  MicroCMSRelationListField,
  'referenceDisplayItem' | 'relationListCountLimitValidation'
> & {
  /**
   * 複数コンテンツ参照の数を制限する
   * @description 複数コンテンツ参照の最小数と最大数を設定します。
   */
  limit?: {
    min: number;
    max: number;
  };
};
export type CreateRelationListFieldResult = Omit<
  MicroCMSRelationListField,
  'fieldId'
>;

const createRelationListField = (
  params: CreateRelationListFieldParams,
): CreateRelationListFieldResult => {
  const { limit } = params;
  return {
    kind: 'relationList',
    name: params.displayName,
    description: params.description,
    required: params.required,
    relationListCountLimitValidation: limit
      ? {
          relationListCount: {
            min: limit.min,
            max: limit.max,
          },
        }
      : undefined,
  } satisfies CreateRelationListFieldResult;
};

//////////////////////////
//////////////////////////
// IframeField
//////////////////////////
//////////////////////////
export type CreateIframeFieldParams = CreateFieldParams<MicroCMSIframeField>;
export type CreateIframeFieldResult = Omit<MicroCMSIframeField, 'fieldId'>;

const createIframeField = (
  params: CreateIframeFieldParams,
): CreateIframeFieldResult => {
  return {
    kind: 'iframe',
    name: params.displayName,
    description: params.description,
    required: params.required,
    iframeUrl: params.iframeUrl,
  } satisfies CreateIframeFieldResult;
};

//////////////////////////
//////////////////////////
// RepeaterField
//////////////////////////
//////////////////////////
export type CreateRepeaterFieldParams = CreateFieldParams<
  MicroCMSRepeaterField,
  'customFieldCreatedAtList' | 'repeaterCountLimitValidation'
> & {
  fields: MicroCMSApiSchemaCustomFieldType[];
  /**
   * 繰り返しフィールドの数を制限する
   * @description 繰り返しフィールドの最小数と最大数を設定します。
   */
  limit?: {
    min: number;
    max: number;
  };
};
export type CreateRepeaterFieldResult = Omit<
  MicroCMSRepeaterField,
  'fieldId' | 'customFieldCreatedAtList'
> & {
  fields: MicroCMSApiSchemaCustomFieldType[];
};

const createRepeaterField = (
  params: CreateRepeaterFieldParams,
): CreateRepeaterFieldResult => {
  const { limit } = params;
  return {
    kind: 'repeater',
    name: params.displayName,
    description: params.description,
    required: params.required,
    fields: params.fields,
    repeaterCountLimitValidation: limit
      ? {
          repeatCount: {
            min: limit.min,
            max: limit.max,
          },
        }
      : undefined,
  } satisfies CreateRepeaterFieldResult;
};

//////////////////////////
//////////////////////////
// CustomField
//////////////////////////
//////////////////////////
export type CreateCustomFieldParams = CreateFieldParams<
  MicroCMSCustomField,
  'customFieldCreatedAt' | 'customFieldDisplayItem'
> & {
  field: [MicroCMSApiSchemaCustomFieldType];
};
export type CreateCustomFieldResult = Omit<
  MicroCMSCustomField,
  'fieldId' | 'customFieldCreatedAt' | 'customFieldDisplayItem'
> & {
  field: [MicroCMSApiSchemaCustomFieldType];
};

const crateCustomField = (
  params: CreateCustomFieldParams,
): CreateCustomFieldResult => {
  return {
    kind: 'custom',
    name: params.displayName,
    description: params.description,
    required: params.required,
    field: params.field,
  } satisfies CreateCustomFieldResult;
};

//////////////////////////
//////////////////////////
// Export Field
//////////////////////////
//////////////////////////

export default {
  text: createTextField,
  textArea: createTextAreaField,
  richEditorV2: createRichEditorV2Field,
  media: createMediaField,
  mediaList: createMediaListField,
  date: createDateField,
  boolean: createBooleanField,
  select: createSelectField,
  file: createFileField,
  number: createNumberField,
  relation: createRelationField,
  relationList: createRelationListField,
  iframe: createIframeField,
  repeater: createRepeaterField,
  custom: crateCustomField,
};
