/** microCMS API Schema JSON Type */
export type MicroCMSApiSchema = {
  apiFields: MicroCMSApiFieldType[];
  customFields: MicroCMSApiSchemaCustomFieldType[];
};

export type MicroCMSApiSchemaCustomFieldType = {
  createdAt: string;
  fieldId: string;
  name: string;
  fields: MicroCMSCustomFieldType[];
  position: [string[], string[]] | [string[]];
  updatedAt: string;
  viewerGroup: string;
};

/** Selectable field types for CustomField */
export type MicroCMSCustomFieldType = Exclude<
  MicroCMSApiFieldType,
  MicroCMSCustomField
> & {
  idValue: string;
};

/** Selectable field types for ApiField */
export type MicroCMSApiFieldType =
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

/**
 * テキストフィールド
 * @description 自由入力の1行テキストです。タイトル等に適しています。
 */
export type MicroCMSTextFiled = {
  kind: 'text';
  idValue: string;
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  textSizeLimitValidation?: {
    textSize: {
      min: number;
      max: number;
    };
  };
  /**
   * 特定のパターンのみ入力を許可する。
   * @description 正規表現にマッチした入力のみに制限します。
   */
  patternMatchValidation?: {
    regexp: {
      pattern: string;
      flags: string | null;
    };
  };
  /**
   * 重複を許可しない（ユニーク）。
   * @description 他のコンテンツで同じ値がある場合にはコンテンツを保存できなくなります。1つのAPIに対して最大で5つのフィールドに設定が可能です。
   */
  isUnique?: boolean;
};

/**
 * テキストエリア
 * @description 自由入力の複数行テキストです。プレーンテキストによる入力となります。
 */
export type MicroCMSTextAreaField = {
  kind: 'textArea';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 文字数を制限する
   * @description フィールドに入力する文字数の最小文字数、最大文字数を制限します。
   */
  textSizeLimitValidation?: {
    textSize: {
      min: number;
      max: number;
    };
  };
  /**
   * 特定のパターンのみ入力を許可する
   * @description 正規表現にマッチした入力のみに制限します。
   */
  patternMatchValidation?: {
    regexp: {
      pattern: string;
      flags: string | null;
    };
  };
};

/**
 * リッチエディタ
 * @description 自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。
 */
export type MicroCMSRichEditorV2Field = {
  kind: 'richEditorV2';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * ツールバーの編集
   * @description 使用可能なツールバーのボタンを制限することができます。
   */
  richEditorV2Options?: RichEditorV2Option[];
  /**
   * カスタムclass
   * @description 登録したclass名を特定のテキスト要素に付与できます。
   */
  customClassList?: CustomClassItem[];
};

export type CustomClassItem = {
  id: string;
  name: string;
  value: string;
};

export type RichEditorV2Option =
  | 'undo'
  | 'redo'
  | 'clean'
  | 'customClass'
  | 'link'
  | 'image'
  | 'oembedly'
  | 'listOrdered'
  | 'listBullet'
  | 'horizontalRule'
  | 'bold'
  | 'headerOne'
  | 'headerTwo'
  | 'italic'
  | 'blockquote'
  | 'codeBlock'
  | 'underline'
  | 'strike'
  | 'table'
  | 'code'
  | 'textAlign'
  | 'headerThree'
  | 'headerFour'
  | 'headerFive'
  | 'paragraph';

/**
 * 画像
 * @description 画像用のフィールドです。APIからは画像URLが返却されます。
 */
export type MicroCMSMediaField = {
  kind: 'media';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
};

/**
 * 複数画像
 * @description 複数の画像用のフィールドです。APIからは画像URLの配列が返却されます。
 */
export type MicroCMSMediaListField = {
  kind: 'mediaList';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 画像のサイズ制限
   * @description フィールドに入力する画像のwidth、heightの値を制限します。
   */
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
  /**
   * レイアウト
   * @description 管理画面での表示をカスタマイズできます。
   * @default "HORIZONTAL_SCROLL" 横並び（スクロール）
   */
  mediaListLayout?: 'HORIZONTAL_SCROLL' | 'GRID_2' | 'GRID_3' | 'GRID_4';
};

/**
 * 日時
 * @description Date型のフィールドです。カレンダーから日時を選択することができます。
 */
export type MicroCMSDateField = {
  kind: 'date';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 日付指定のみ
   * @description 設定をONにすると時間の指定はできなくなります。
   */
  dateFormat?: boolean;
};

/**
 * 真偽値
 * @description Boolean型のフィールドです。スイッチでオン/オフを切り替えることができます。
 */
export type MicroCMSBooleanField = {
  kind: 'boolean';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /** 初期値
   * @description 入稿時の初期値を設定できます。
   */
  booleanInitialValue?: boolean;
};

/**
 * セレクトフィールド
 * @description 定義したリストの中から値を選択するフィールドです。設定により複数選択も可能です。
 */
export type MicroCMSSelectField = {
  kind: 'select';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /** 選択肢 */
  selectItems: SelectItem[];
  /**
   * 初期値
   * @description 入稿時の初期値を設定できます。
   */
  selectInitialValue?: string[];
  /** 複数選択
   * @description 設定をONにすると複数選択ができるようになります。
   */
  multipleSelect?: boolean;
};

export type SelectItem = {
  id: string;
  value: string;
};

/**
 * ファイル
 * @description ファイル用のフィールドです。APIからはファイルURLが返却されます。
 */
export type MicroCMSFileField = {
  kind: 'file';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
};

/**
 * 数字
 * @description Number型のフィールドです。入力時は数値型のキーボードが開きます。
 */
export type MicroCMSNumberField = {
  kind: 'number';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 数値を制限する
   * @description フィールドに入力する数値の最小値、最大値を制限します。
   */
  numberSizeLimitValidation?: {
    numberSize: {
      min: number;
      max: number;
    };
  };
};

/**
 * コンテンツ参照
 * @description 他コンテンツのレスポンスを含むことができます。参照先がリスト型の場合は選択式となります。
 */
export type MicroCMSRelationField = {
  kind: 'relation';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 一覧画面に表示する項目
   * @description コンテンツID、またはテキストフィールドの項目から選択できます。指定した項目が存在しない場合は、コンテンツIDが代わりに表示されます。
   */
  referenceDisplayItem?: string; // is idValue
};

/**
 * 複数コンテンツ参照
 * @description 他コンテンツを複数参照することができます。レスポンスは配列形式となります。
 */
export type MicroCMSRelationListField = {
  kind: 'relationList';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 一覧画面に表示する項目
   * @description コンテンツID、またはテキストフィールドの項目から選択できます。指定した項目が存在しない場合は、コンテンツIDが代わりに表示されます。
   */
  referenceDisplayItem?: string; // is idValue
  /**
   * 複数コンテンツ参照の数を制限する
   * @description 複数コンテンツ参照の最小数と最大数を設定します。
   */
  relationListCountLimitValidation?: {
    relationListCount: {
      min: number;
      max: number;
    };
  };
};

/**
 * 拡張フィールド
 * @description 拡張フィールドを用いて、外部データの読み込みを行うことができます
 */
export type MicroCMSIframeField = {
  kind: 'iframe';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 拡張フィールド URL
   */
  iframeUrl?: string;
};

/**
 * 繰り返し
 * @description 作成済みのカスタムフィールドを複数選択し、繰り返し入力が可能です
 */
export type MicroCMSRepeaterField = {
  kind: 'repeater';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * 繰り返しフィールド・並び順
   */
  customFieldCreatedAtList?: string[]; // is customField createdAt
  /**
   * 繰り返しフィールドの数を制限する
   * @description 繰り返しフィールドの最小数と最大数を設定します。
   */
  repeaterCountLimitValidation?: {
    repeatCount: {
      min: number;
      max: number;
    };
  };
};

/**
 * カスタム
 * @description カスタムフィールドです。設定済みのカスタムフィールドを用いて入力ができます。
 */
export type MicroCMSCustomField = {
  kind: 'custom';
  /**
   * フィールドID
   * @description APIレスポンスのプロパティ名です。
   */
  fieldId: string;
  /**
   * 表示名
   * @description コンテンツを入力する際に表示されます。
   */
  name: string;
  /**
   * 説明文
   * @description 入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。
   */
  description?: string;
  /**
   * 必須項目
   * @description 設定をONにすると入稿時の入力が必須となります。
   */
  required?: boolean;
  /**
   * カスタムフィールド
   * @example "2023-10-13T13:50:38.504Z"
   */
  customFieldCreatedAt: string;
  /**
   * 一覧画面に表示する項目
   * @description デフォルト（値が設定されたフィールドの件数）、またはテキストフィールドの項目から選択できます。指定した項目が存在しない場合は、デフォルトの表示となります。
   */
  customFieldDisplayItem?: string; // is customField idValue
};
