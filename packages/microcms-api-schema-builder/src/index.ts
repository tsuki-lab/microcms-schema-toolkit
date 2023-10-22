import {
  CustomClassItem,
  MicroCMSApiFieldTypes,
  MicroCMSBooleanField,
  MicroCMSCustomField,
  MicroCMSDateField,
  MicroCMSFileField,
  MicroCMSIframeField,
  MicroCMSMediaField,
  MicroCMSMediaListField,
  MicroCMSNumberField,
  MicroCMSRelationField,
  MicroCMSRelationListField,
  MicroCMSRepeaterField,
  MicroCMSRichEditorV2Field,
  MicroCMSSelectField,
  MicroCMSTextAreaField,
  MicroCMSTextFiled,
  RichEditorV2Option,
} from 'microcms-field-types';

/**
 * 10桁のランダムな英数字を生成する。
 * @returns
 */
function generateId(number: number = 10) {
  return Math.random()
    .toString(36)
    .slice(number * -1);
}

type MicroCMSFieldParams<T extends MicroCMSApiFieldTypes> = Pick<
  T,
  'name' | 'description'
>;
type MicroCMSFieldDef<T extends MicroCMSApiFieldTypes> = Omit<T, 'fieldId'> & {
  idValue?: string;
};

//////////////////////////
// createApiSchema
//////////////////////////
type CreateApiSchemaParams = {
  [Key in string]:
    | _MicroCMSTextField
    | _MicroCMSTextAreaField
    | _MicroCMSRichEditorV2Field
    | _MicroCMSMediaField
    | _MicroCMSMediaListField
    | _MicroCMSDateField
    | _MicroCMSBooleanField
    | _MicroCMSSelectField
    | _MicroCMSFileField
    | _MicroCMSNumberField
    | _MicroCMSRelationField
    | _MicroCMSRelationListField
    | _MicroCMSIframeField
    | _MicroCMSRepeaterField
    | _MicroCMSCustomField;
};

class _MicroCMSApiSchema {
  private apiFields: CreateApiSchemaParams;
  private customFields: _MicroCMSCustomFieldDetail[];

  constructor(apiFields: CreateApiSchemaParams) {
    this.apiFields = apiFields;

    const customFields: [string, _MicroCMSCustomFieldDetail][] = [];
    Object.values(apiFields).forEach((apiField) => {
      switch (apiField._def.kind) {
        case 'custom':
          customFields.push([
            (apiField as _MicroCMSCustomField).customField.customFieldCreatedAt,
            (apiField as _MicroCMSCustomField).customField,
          ]);
          break;
        case 'repeater':
          (apiField as _MicroCMSRepeaterField).customFields.forEach((field) => {
            customFields.push([field.customFieldCreatedAt, field]);
          });
          break;
        default:
          break;
      }
    });
    this.customFields = Array.from(new Map(customFields).values());
  }

  static create(apiFields: CreateApiSchemaParams) {
    return new _MicroCMSApiSchema(apiFields);
  }

  json() {
    return JSON.stringify({
      apiFields: Object.entries(this.apiFields).map(([fieldId, apiField]) => {
        return {
          ...apiField._def,
          fieldId,
        };
      }),
      customFields: this.customFields.map((customField) => {
        return {
          ...customField._def,
          fields: Object.entries(customField._def.fields).map(
            ([fieldId, apiField]) => {
              return {
                ...apiField._def,
                fieldId,
              };
            },
          ),
        };
      }),
    });
  }
}

//////////////////////////
// createCustomField
//////////////////////////
type CustomFieldDef = {
  createdAt: string;
  fieldId: string;
  name: string;
  fields: {
    [Key in string]:
      | _MicroCMSTextField
      | _MicroCMSTextAreaField
      | _MicroCMSRichEditorV2Field
      | _MicroCMSMediaField
      | _MicroCMSMediaListField
      | _MicroCMSDateField
      | _MicroCMSBooleanField
      | _MicroCMSSelectField
      | _MicroCMSFileField
      | _MicroCMSNumberField
      | _MicroCMSRelationField
      | _MicroCMSRelationListField
      | _MicroCMSIframeField
      | _MicroCMSRepeaterField;
  };
  position: [string[], string[]] | [string[]];
  updatedAt: string;
  viewerGroup: string;
};
type CustomFieldParams = Omit<
  CustomFieldDef,
  'createdAt' | 'updatedAt' | 'viewerGroup' | 'position'
>;

class _MicroCMSCustomFieldDetail {
  _def: CustomFieldDef;
  constructor(params: CustomFieldParams) {
    Object.values(params.fields).forEach((field) => {
      field._def.idValue = generateId();
    });
    const random = Math.floor(Math.random() * 1000);
    const date = new Date();
    date.setMilliseconds(random);
    const at = date.toISOString();
    this._def = {
      ...params,
      createdAt: at,
      updatedAt: at,
      viewerGroup: generateId(3),
      position: [
        Object.values(params.fields).map((field) => field._def.idValue!),
      ],
    };
  }

  get customFieldCreatedAt() {
    return this._def.createdAt;
  }

  static create(params: CustomFieldParams) {
    return new _MicroCMSCustomFieldDetail(params);
  }
}

//////////////////////////
// テキストフィールド
//////////////////////////
type MicroCMSTextFieldParams = MicroCMSFieldParams<MicroCMSTextFiled>;
type MicroCMSTextFieldDef = MicroCMSFieldDef<MicroCMSTextFiled>;

class _MicroCMSTextField {
  _def: MicroCMSTextFieldDef;

  constructor(params: MicroCMSTextFieldParams, def?: MicroCMSTextFieldDef) {
    this._def = def || {
      idValue: generateId(),
      kind: 'text',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 重複を許可しない（ユニーク）。
   * @description 他のコンテンツで同じ値がある場合にはコンテンツを保存できなくなります。1つのAPIに対して最大で5つのフィールドに設定が可能です。
   */
  unique() {
    this._def.isUnique = true;
    return this._create();
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  textSizeLimitValidation(textSize: { min: number; max: number }) {
    this._def.textSizeLimitValidation = { textSize };
    return this._create();
  }

  /**
   * 特定のパターンのみ入力を許可する。
   * @description 正規表現にマッチした入力のみに制限します。
   */
  patternMatchValidation(pattern: string, flags: string | null = null) {
    this._def.patternMatchValidation = { regexp: { pattern, flags } };
    return this._create();
  }

  private _create() {
    return new _MicroCMSTextField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSTextFieldParams) {
    return new _MicroCMSTextField(params);
  }
}

//////////////////////////
// テキストエリア
//////////////////////////
type MicroCMSTextAreaFieldParams = MicroCMSFieldParams<MicroCMSTextAreaField>;
type MicroCMSTextAreaFieldDef = MicroCMSFieldDef<MicroCMSTextAreaField>;

class _MicroCMSTextAreaField {
  _def: MicroCMSTextAreaFieldDef;

  constructor(
    params: MicroCMSTextAreaFieldParams,
    def?: MicroCMSTextAreaFieldDef,
  ) {
    this._def = def || {
      kind: 'textArea',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  textSizeLimitValidation(textSize: { min: number; max: number }) {
    this._def.textSizeLimitValidation = { textSize };
    return this._create();
  }

  /**
   * 特定のパターンのみ入力を許可する
   * @description 正規表現にマッチした入力のみに制限します。
   */
  patternMatchValidation(pattern: string, flags: string | null = null) {
    this._def.patternMatchValidation = { regexp: { pattern, flags } };
    return this._create();
  }

  private _create() {
    return new _MicroCMSTextAreaField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSTextAreaFieldParams) {
    return new _MicroCMSTextAreaField(params);
  }
}

//////////////////////////
// リッチエディタ
//////////////////////////
type MicroCMSRichEditorV2FieldParams =
  MicroCMSFieldParams<MicroCMSRichEditorV2Field>;
type MicroCMSRichEditorV2FieldDef = MicroCMSFieldDef<MicroCMSRichEditorV2Field>;

class _MicroCMSRichEditorV2Field {
  _def: MicroCMSRichEditorV2FieldDef;

  constructor(
    params: MicroCMSRichEditorV2FieldParams,
    def?: MicroCMSRichEditorV2FieldDef,
  ) {
    this._def = def || {
      kind: 'richEditorV2',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * ツールバーの編集
   * @description 使用可能なツールバーのボタンを制限することができます。
   */
  richEditorV2Options(options: RichEditorV2Option[]) {
    this._def.richEditorV2Options = options;
    return this._create();
  }

  /**
   * カスタムclass
   * @description 登録したclass名を特定のテキスト要素に付与できます。
   */
  customClassList(customClassList: CustomClassItem[]) {
    this._def.customClassList = customClassList;
    return this._create();
  }

  private _create() {
    return new _MicroCMSRichEditorV2Field(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSRichEditorV2FieldParams) {
    return new _MicroCMSRichEditorV2Field(params);
  }
}

//////////////////////////
// 画像
//////////////////////////
type MicroCMSMediaFieldParams = MicroCMSFieldParams<MicroCMSMediaField>;
type MicroCMSMediaFieldDef = MicroCMSFieldDef<MicroCMSMediaField>;
class _MicroCMSMediaField {
  _def: MicroCMSMediaFieldDef;

  constructor(params: MicroCMSMediaFieldParams, def?: MicroCMSMediaFieldDef) {
    this._def = def || {
      kind: 'media',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  imageSizeValidation(imageSize: { width: number; height: number }) {
    this._def.imageSizeValidation = { imageSize };
    return this._create();
  }

  private _create() {
    return new _MicroCMSMediaField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSMediaFieldParams) {
    return new _MicroCMSMediaField(params);
  }
}

//////////////////////////
// 複数画像
//////////////////////////
type MicroCMSMediaListFieldParams = MicroCMSFieldParams<MicroCMSMediaListField>;
type MicroCMSMediaListFieldDef = MicroCMSFieldDef<MicroCMSMediaListField>;
class _MicroCMSMediaListField {
  _def: MicroCMSMediaListFieldDef;

  constructor(
    params: MicroCMSMediaListFieldParams,
    def?: MicroCMSMediaListFieldDef,
  ) {
    this._def = def || {
      kind: 'mediaList',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  imageSizeValidation(imageSize: { width: number; height: number }) {
    this._def.imageSizeValidation = { imageSize };
    return this._create();
  }

  /**
   * レイアウト
   * @description 管理画面での表示をカスタマイズできます。
   */
  mediaListLayout(layout: MicroCMSMediaListField['mediaListLayout']) {
    this._def.mediaListLayout = layout;
    return this._create();
  }

  private _create() {
    return new _MicroCMSMediaListField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSMediaListFieldParams) {
    return new _MicroCMSMediaListField(params);
  }
}

//////////////////////////
// 日時
//////////////////////////
type MicroCMSDateFieldParams = MicroCMSFieldParams<MicroCMSDateField>;
type MicroCMSDateFieldDef = MicroCMSFieldDef<MicroCMSDateField>;
class _MicroCMSDateField {
  _def: MicroCMSDateFieldDef;

  constructor(params: MicroCMSDateFieldParams, def?: MicroCMSDateFieldDef) {
    this._def = def || {
      kind: 'date',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 日付指定のみ
   * @description 設定をONにすると時間の指定はできなくなります。
   */
  dateFormat(value: boolean) {
    this._def.dateFormat = value;
    return this._create();
  }

  private _create() {
    return new _MicroCMSDateField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSDateFieldParams) {
    return new _MicroCMSDateField(params);
  }
}

//////////////////////////
// 真偽値
//////////////////////////
type MicroCMSBooleanFieldParams = MicroCMSFieldParams<MicroCMSBooleanField>;
type MicroCMSBooleanFieldDef = MicroCMSFieldDef<MicroCMSBooleanField>;
class _MicroCMSBooleanField {
  _def: MicroCMSBooleanFieldDef;

  constructor(
    params: MicroCMSBooleanFieldParams,
    def?: MicroCMSBooleanFieldDef,
  ) {
    this._def = def || {
      kind: 'boolean',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /** 初期値
   * @description 入稿時の初期値を設定できます。
   */
  booleanInitialValue(value: boolean) {
    this._def.booleanInitialValue = value;
    return this._create();
  }

  private _create() {
    return new _MicroCMSBooleanField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSBooleanFieldParams) {
    return new _MicroCMSBooleanField(params);
  }
}

//////////////////////////
// セレクトフィールド
//////////////////////////
type MicroCMSSelectFieldParams = MicroCMSFieldParams<MicroCMSSelectField>;
type MicroCMSSelectFieldDef = MicroCMSFieldDef<MicroCMSSelectField>;
class _MicroCMSSelectField {
  _def: MicroCMSSelectFieldDef;

  constructor(params: MicroCMSSelectFieldParams, def?: MicroCMSSelectFieldDef) {
    this._def = def || {
      kind: 'select',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /** 選択肢 */
  selectItems(items: MicroCMSSelectField['selectItems']) {
    this._def.selectItems = items;
    return this._create();
  }

  /**
   * 初期値
   * @description 入稿時の初期値を設定できます。
   */
  selectInitialValue(value: string[]) {
    this._def.selectInitialValue = value;
    return this._create();
  }

  /** 複数選択
   * @description 設定をONにすると複数選択ができるようになります。
   */
  multipleSelect() {
    this._def.multipleSelect = true;
    return this._create();
  }

  private _create() {
    return new _MicroCMSSelectField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSSelectFieldParams) {
    return new _MicroCMSSelectField(params);
  }
}

//////////////////////////
// ファイル
//////////////////////////
type MicroCMSFileFieldParams = MicroCMSFieldParams<MicroCMSFileField>;
type MicroCMSFileFieldDef = MicroCMSFieldDef<MicroCMSFileField>;
class _MicroCMSFileField {
  _def: MicroCMSFileFieldDef;

  constructor(params: MicroCMSFileFieldParams, def?: MicroCMSFileFieldDef) {
    this._def = def || {
      kind: 'file',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  private _create() {
    return new _MicroCMSFileField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSFileFieldParams) {
    return new _MicroCMSFileField(params);
  }
}

//////////////////////////
// 数字
//////////////////////////
type MicroCMSNumberFieldParams = MicroCMSFieldParams<MicroCMSNumberField>;
type MicroCMSNumberFieldDef = MicroCMSFieldDef<MicroCMSNumberField>;
class _MicroCMSNumberField {
  _def: MicroCMSNumberFieldDef;

  constructor(params: MicroCMSNumberFieldParams, def?: MicroCMSNumberFieldDef) {
    this._def = def || {
      kind: 'number',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 数値を制限する
   * @description フィールドに入力する数値の最小値、最大値を制限します。
   */
  numberSizeLimitValidation(numberSize: { min: number; max: number }) {
    this._def.numberSizeLimitValidation = { numberSize };
    return this._create();
  }

  private _create() {
    return new _MicroCMSNumberField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSNumberFieldParams) {
    return new _MicroCMSNumberField(params);
  }
}

//////////////////////////
// コンテンツ参照
//////////////////////////
type MicroCMSRelationFieldParams = MicroCMSFieldParams<MicroCMSRelationField>;
type MicroCMSRelationFieldDef = MicroCMSFieldDef<MicroCMSRelationField>;
class _MicroCMSRelationField {
  _def: MicroCMSRelationFieldDef;

  constructor(
    params: MicroCMSRelationFieldParams,
    def?: MicroCMSRelationFieldDef,
  ) {
    this._def = def || {
      kind: 'relation',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 一覧画面に表示する項目
   * @description コンテンツID、またはテキストフィールドの項目から選択できます。指定した項目が存在しない場合は、コンテンツIDが代わりに表示されます。
   */
  referenceDisplayItem(
    displayItem: MicroCMSRelationField['referenceDisplayItem'],
  ) {
    this._def.referenceDisplayItem = displayItem;
    return this._create();
  }

  private _create() {
    return new _MicroCMSRelationField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSRelationFieldParams) {
    return new _MicroCMSRelationField(params);
  }
}

//////////////////////////
// 複数コンテンツ参照
//////////////////////////
type MicroCMSRelationListFieldParams =
  MicroCMSFieldParams<MicroCMSRelationListField>;
type MicroCMSRelationListFieldDef = MicroCMSFieldDef<MicroCMSRelationListField>;
class _MicroCMSRelationListField {
  _def: MicroCMSRelationListFieldDef;

  constructor(
    params: MicroCMSRelationListFieldParams,
    def?: MicroCMSRelationListFieldDef,
  ) {
    this._def = def || {
      kind: 'relationList',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  private _create() {
    return new _MicroCMSRelationListField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSRelationListFieldParams) {
    return new _MicroCMSRelationListField(params);
  }
}

//////////////////////////
// 拡張フィールド
//////////////////////////
type MicroCMSIframeFieldParams = MicroCMSFieldParams<MicroCMSIframeField>;
type MicroCMSIframeFieldDef = MicroCMSFieldDef<MicroCMSIframeField>;
class _MicroCMSIframeField {
  _def: MicroCMSIframeFieldDef;

  constructor(params: MicroCMSIframeFieldParams, def?: MicroCMSIframeFieldDef) {
    this._def = def || {
      kind: 'iframe',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 拡張フィールド URL
   */
  iframeUrl(url: string) {
    this._def.iframeUrl = url;
    return this._create();
  }

  private _create() {
    return new _MicroCMSIframeField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSIframeFieldParams) {
    return new _MicroCMSIframeField(params);
  }
}

//////////////////////////
// 繰り返し
//////////////////////////
type MicroCMSRepeatFieldParams = MicroCMSFieldParams<MicroCMSRepeaterField> & {
  fields: _MicroCMSCustomFieldDetail[];
};
type MicroCMSRepeatFieldDef = MicroCMSFieldDef<MicroCMSRepeaterField>;
class _MicroCMSRepeaterField {
  _def: MicroCMSRepeatFieldDef;
  customFields: _MicroCMSCustomFieldDetail[];

  constructor(params: MicroCMSRepeatFieldParams, def?: MicroCMSRepeatFieldDef) {
    this.customFields = params.fields;
    this._def = def || {
      kind: 'repeater',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
      /**
       * 繰り返しフィールド・並び順
       */
      customFieldCreatedAtList: params.fields.map(
        (field) => field.customFieldCreatedAt,
      ),
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 繰り返しフィールドの数を制限する
   * @description 繰り返しフィールドの最小数と最大数を設定します。
   */
  repeaterCountLimitValidation(repeatCount: { min: number; max: number }) {
    this._def.repeaterCountLimitValidation = { repeatCount };
    return this._create();
  }

  private _create() {
    return new _MicroCMSRepeaterField(
      {
        name: this._def.name,
        description: this._def.description,
        fields: this.customFields,
      },
      this._def,
    );
  }

  static create(params: MicroCMSRepeatFieldParams) {
    return new _MicroCMSRepeaterField(params);
  }
}

//////////////////////////
// カスタム
//////////////////////////
type MicroCMSCustomFieldParams = MicroCMSFieldParams<MicroCMSCustomField> & {
  field: _MicroCMSCustomFieldDetail;
};
type MicroCMSCustomFieldDef = MicroCMSFieldDef<MicroCMSCustomField>;
class _MicroCMSCustomField {
  _def: MicroCMSCustomFieldDef;
  customField: _MicroCMSCustomFieldDetail;

  constructor(params: MicroCMSCustomFieldParams, def?: MicroCMSCustomFieldDef) {
    this.customField = params.field;
    this._def = def || {
      kind: 'custom',
      /**
       * 表示名
       * @description コンテンツを入力する際に表示されます。
       */
      name: params.name,
      /**
       * 説明文
       * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
       */
      description: params.description,
      /**
       * カスタムフィールド
       * @example "2023-10-13T13:50:38.504Z"
       */
      customFieldCreatedAt: params.field.customFieldCreatedAt,
    };
  }

  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required() {
    this._def.required = true;
    return this._create();
  }

  /**
   * 一覧画面に表示する項目
   * @description デフォルト（値が設定されたフィールドの件数）、またはテキストフィールドの項目から選択できます。指定した項目が存在しない場合は、デフォルトの表示となります。
   */
  customFieldDisplayItem(
    displayItem: MicroCMSCustomField['customFieldDisplayItem'],
  ) {
    this._def.customFieldDisplayItem = displayItem;
    return this._create();
  }

  private _create() {
    return new _MicroCMSCustomField(
      {
        name: this._def.name,
        description: this._def.description,
        field: this.customField,
      },
      this._def,
    );
  }

  static create(params: MicroCMSCustomFieldParams) {
    return new _MicroCMSCustomField(params);
  }
}

//////////////////////////
// Export
//////////////////////////

export const microcms = {
  /**
   * APIスキーマ
   * @description APIスキーマを定義します。
   */
  apiSchema: _MicroCMSApiSchema.create,
  createCustomField: _MicroCMSCustomFieldDetail.create,
  /**
   * テキストフィールド
   * @description 自由入力の1行テキストです。タイトル等に適しています。
   */
  textField: _MicroCMSTextField.create,
  /**
   * テキストエリア
   * @description 自由入力の複数行テキストです。プレーンテキストによる入力となります。
   */
  textAreaField: _MicroCMSTextAreaField.create,
  /**
   * リッチエディタ
   * @description 自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。
   */
  richEditorV2Field: _MicroCMSRichEditorV2Field.create,
  /**
   * 画像
   * @description 画像用のフィールドです。APIからは画像URLが返却されます。
   */
  mediaField: _MicroCMSMediaField.create,
  /**
   * 複数画像
   * @description 複数の画像用のフィールドです。APIからは画像URLの配列が返却されます。
   */
  mediaListField: _MicroCMSMediaListField.create,
  /**
   * 日時
   * @description Date型のフィールドです。カレンダーから日時を選択することができます。
   */
  dateField: _MicroCMSDateField.create,
  /**
   * 真偽値
   * @description Boolean型のフィールドです。スイッチでオン/オフを切り替えることができます。
   */
  booleanField: _MicroCMSBooleanField.create,
  /**
   * セレクトフィールド
   * @description 定義したリストの中から値を選択するフィールドです。設定により複数選択も可能です。
   */
  selectField: _MicroCMSSelectField.create,
  /**
   * ファイル
   * @description ファイル用のフィールドです。APIからはファイルURLが返却されます。
   */
  fileField: _MicroCMSFileField.create,
  /**
   * 数字
   * @description Number型のフィールドです。入力時は数値型のキーボードが開きます。
   */
  numberField: _MicroCMSNumberField.create,
  /**
   * コンテンツ参照
   * @description 他コンテンツのレスポンスを含むことができます。参照先がリスト型の場合は選択式となります。
   */
  relationField: _MicroCMSRelationField.create,
  /**
   * 複数コンテンツ参照
   * @description 他コンテンツを複数参照することができます。レスポンスは配列形式となります。
   */
  relationListField: _MicroCMSRelationListField.create,
  /**
   * 拡張フィールド
   * @description 拡張フィールドを用いて、外部データの読み込みを行うことができます
   */
  iframeField: _MicroCMSIframeField.create,
  /**
   * 繰り返し
   * @description 作成済みのカスタムフィールドを複数選択し、繰り返し入力が可能です
   */
  repeaterField: _MicroCMSRepeaterField.create,
  /**
   * カスタム
   * @description カスタムフィールドです。設定済みのカスタムフィールドを用いて入力ができます。
   */
  customField: _MicroCMSCustomField.create,
};
