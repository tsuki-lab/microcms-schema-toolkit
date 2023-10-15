# microCMS Field Types

[microCMS](https://microcms.io/) のAPIスキーマのフィールドの型定義パッケージです。

## Install

```shell
npm i --save-dev microcms-field-types
```

## Schema Types

### MicroCMSApiSchema

```ts
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
```

### MicroCMSField

```ts
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
```

### MicroCMSCustomField

```ts
export type MicroCMSCustomFieldsField = Exclude<
  MicroCMSField,
  MicroCMSCustomField
>;
```

## Field Types

### テキストフィールド

```ts
export type MicroCMSTextFiled = {
  idValue: string;
  fieldId: string;
  name: string;
  kind: 'text';
  description?: string;
  required?: boolean;
  textSizeLimitValidation?: {
    textSize: {
      min: number;
      max: number;
    };
  };
  patternMatchValidation?: {
    regexp: {
      pattern: string;
      flags: string | null;
    };
  };
  isUnique?: boolean;
};
```

### テキストエリアフィールド

```ts
export type MicroCMSTextAreaField = {
  fieldId: string;
  name: string;
  kind: 'textArea';
  description?: string;
  required?: boolean;
  textSizeLimitValidation?: {
    textSize: {
      min: number;
      max: number;
    };
  };
  patternMatchValidation?: {
    regexp: {
      pattern: string;
      flags: string | null;
    };
  };
};
```

### リッチエディタフィールド

```ts
export type MicroCMSRichEditorV2Field = {
  fieldId: string;
  name: string;
  kind: 'richEditorV2';
  description?: string;
  required?: boolean;
  richEditorV2Options?: RichEditorV2Option[];
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
```

### 画像フィールド

```ts
export type MicroCMSMediaField = {
  fieldId: string;
  name: string;
  kind: 'media';
  description?: string;
  required?: boolean;
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
};
```

### 画像リストフィールド

```ts
export type MicroCMSMediaListField = {
  fieldId: string;
  name: string;
  kind: 'mediaList';
  description?: string;
  required?: boolean;
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
  /**
   * レイアウト
   * @default "HORIZONTAL_SCROLL"
   */
  mediaListLayout?: 'HORIZONTAL_SCROLL' | 'GRID_2' | 'GRID_3' | 'GRID_4';
};
```

### 日付フィールド

```ts
export type MicroCMSDateField = {
  fieldId: string;
  name: string;
  kind: 'date';
  description?: string;
  required?: boolean;
  dateFormat?: boolean;
};
```

### 真偽値フィールド

```ts
export type MicroCMSBooleanField = {
  fieldId: string;
  name: string;
  kind: 'boolean';
  description?: string;
  required?: boolean;
  booleanInitialValue?: boolean;
};
```

### セレクトフィールド

```ts
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
```

### コンテンツ参照フィールド

```ts
export type MicroCMSRelationField = {
  fieldId: string;
  name: string;
  kind: 'relation';
  description?: string;
  required?: boolean;
  referenceDisplayItem?: string;
};
```

### 複数コンテンツ参照フィールド

```ts
export type MicroCMSRelationListField = {
  fieldId: string;
  name: string;
  kind: 'relationList';
  description?: string;
  required?: boolean;
  referenceDisplayItem?: string;
  relationListCountLimitValidation?: {
    relationListCount: {
      min: number;
      max: number;
    };
  };
};
```

### 数字フィールド

```ts
export type MicroCMSNumberField = {
  fieldId: string;
  name: string;
  kind: 'number';
  description?: string;
  required?: boolean;
  numberSizeLimitValidation?: {
    numberSize: {
      min: number;
      max: number;
    };
  };
};
```

### ファイルフィールド

```ts
export type MicroCMSFileField = {
  fieldId: string;
  name: string;
  kind: 'file';
  description?: string;
  required?: boolean;
};
```

### 拡張フィールド

```ts
export type MicroCMSIframeField = {
  fieldId: string;
  name: string;
  kind: 'iframe';
  description?: string;
  required?: boolean;
  iframeUrl?: string;
};
```

### カスタムフィールド

```ts
export type MicroCMSCustomField = {
  fieldId: string;
  name: string;
  kind: 'custom';
  description?: string;
  required?: boolean;
  customFieldCreatedAt: string;
  customFieldDisplayItem?: string;
};
```

### 繰り返しフィールド

```ts
export type MicroCMSRepeaterField = {
  fieldId: string;
  name: string;
  kind: 'repeater';
  description?: string;
  required?: boolean;
  customFieldCreatedAtList?: string[];
  repeaterCountLimitValidation?: {
    repeatCount: {
      min: number;
      max: number;
    };
  };
};
```
