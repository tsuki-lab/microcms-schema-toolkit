# microCMS Schema Gen

<a href="https://www.npmjs.com/package/microcms-schema-gen" target="_blank"><img src="https://img.shields.io/npm/v/microcms-schema-gen" /></a>
<img src="https://tsuki-lab.github.io/microcms-schema-toolkit/badges.svg" />
<img src="https://img.shields.io/npm/l/microcms-schema-gen" />

# Getting Started

## Install

```bash
npm i -D microcms-schema-gen
```

## Usage

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { schema, field } from 'microcms-schema-gen';

const json = schema.api({
  title: field.text({
    name: '記事のタイトル',
    description: '100文字以内で記事のタイトルを入力してください。',
    required: true,
    length: { min: 1, max: 100 },
  }),
});

// Export schema.json
fs.writeFileSync(
  path.join(__dirname, 'schema.json'),
  JSON.stringify(json, null, 2),
);
```

Export to `schema.json`:

```json
{
  "apiFields": [
    {
      "fieldId": "title",
      "idValue": "cbi3d4ngqt",
      "kind": "text",
      "name": "記事のタイトル",
      "description": "100文字以内で記事のタイトルを入力してください。",
      "required": true,
      "textSizeLimitValidation": {
        "textSize": {
          "min": 1,
          "max": 100
        }
      }
    }
  ],
  "customFields": []
}
```

# API

## schema

### `schema.api()`

#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| fields | object | フィールド  |

### `schema.custom()`

#### Parameters

| Name    | Type   | Description  |
| ------- | ------ | ------------ |
| name    | string | 表示名       |
| fieldId | string | フィールドID |
| fields  | object | フィールド   |

## field

| method name  | description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| text         | 自由入力の1行テキストです。タイトル等に適しています。                                         |
| textArea     | 自由入力の複数行テキストです。プレーンテキストによる入力となります。                          |
| richEditorV2 | 自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。 |
| media        | 画像用のフィールドです。APIからは画像URLが返却されます。                                      |
| mediaList    | 複数の画像用のフィールドです。APIからは画像URLの配列が返却されます。                          |
| date         | Date型のフィールドです。カレンダーから日時を選択することができます。                          |
| boolean      | Boolean型のフィールドです。スイッチでオン/オフを切り替えることができます。                    |
| select       | 定義したリストの中から値を選択するフィールドです。設定により複数選択も可能です。              |
| file         | ファイル用のフィールドです。APIからはファイルURLが返却されます。                              |
| number       | Number型のフィールドです。入力時は数値型のキーボードが開きます。                              |
| relation     | 他コンテンツのレスポンスを含むことができます。参照先がリスト型の場合は選択式となります。      |
| relationList | 他コンテンツを複数参照することができます。レスポンスは配列形式となります。                    |
| iframe       | 拡張フィールドを用いて、外部データの読み込みを行うことができます                              |
| repeater     | 作成済みのカスタムフィールドを複数選択し、繰り返し入力が可能です                              |
| custom       | カスタムフィールドです。設定済みのカスタムフィールドを用いて入力ができます。                  |

### `field.text()`

#### Parameters

| Name        | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| displayName | string   | 表示名                             |
| description | ?string  | 説明文                             |
| required    | ?boolean | 必須項目                           |
| isUnique    | ?boolean | 重複を許可しない                   |
| length      | ?object  | 文字数を制限する                   |
| length.min  | number   | 最小文字数                         |
| length.max  | number   | 最大文字数                         |
| regexp      | ?RegExp  | 特定のパターンのみ入力を許可する。 |

### `field.textArea()`

#### Parameters

| Name        | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| displayName | string   | 表示名                             |
| description | ?string  | 説明文                             |
| required    | ?boolean | 必須項目                           |
| length      | ?object  | 文字数を制限する                   |
| length.min  | number   | 最小文字数                         |
| length.max  | number   | 最大文字数                         |
| regexp      | ?RegExp  | 特定のパターンのみ入力を許可する。 |

### `field.richEditorV2()`

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                        | Description      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| displayName         | string                                                                                                                                                                                                                                                                                                                                                      | 表示名           |
| description         | ?string                                                                                                                                                                                                                                                                                                                                                     | 説明文           |
| required            | ?boolean                                                                                                                                                                                                                                                                                                                                                    | 必須項目         |
| richEditorV2Options | ?('undo' \| 'redo' \| 'clean' \| 'customClass' \| 'link' \| 'image' \| 'oembedly' \| 'listOrdered' \| 'listBullet' \| 'horizontalRule' \| 'bold' \| 'headerOne' \| 'headerTwo' \| 'italic' \| 'blockquote' \| 'codeBlock' \| 'underline' \| 'strike' \| 'table' \| 'code' \| 'textAlign' \| 'headerThree' \| 'headerFour' \| 'headerFive' \| 'paragraph')[] | ツールバーの編集 |
| customClassList     | { name: string; value: string; }[]                                                                                                                                                                                                                                                                                                                          | カスタムclass    |

### `field.media()`

#### Parameters

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| displayName | string   | 表示名               |
| description | ?string  | 説明文               |
| required    | ?boolean | 必須項目             |
| size        | ?object  | 画像サイズを制限する |
| size.width  | number   | 横幅                 |
| size.height | number   | 縦幅                 |

### `field.mediaList()`

#### Parameters

| Name        | Type                                                       | Description          |
| ----------- | ---------------------------------------------------------- | -------------------- |
| displayName | string                                                     | 表示名               |
| description | ?string                                                    | 説明文               |
| required    | ?boolean                                                   | 必須項目             |
| size        | ?object                                                    | 画像サイズを制限する |
| size.width  | number                                                     | 横幅                 |
| size.height | number                                                     | 縦幅                 |
| layout      | ?('HORIZONTAL_SCROLL' \| 'GRID_2' \| 'GRID_3' \| 'GRID_4') | レイアウト           |

### `field.date()`

#### Parameters

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| displayName | string   | 表示名               |
| description | ?string  | 説明文               |
| required    | ?boolean | 必須項目             |
| dateFormat  | ?boolean | 日付のみを選択するか |

### `field.boolean()`

#### Parameters

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| displayName  | string   | 表示名      |
| description  | ?string  | 説明文      |
| required     | ?string  | 必須項目    |
| initialValue | ?boolean | 初期値      |

### `field.select()`

#### Parameters

| Name               | Type      | Description          |
| ------------------ | --------- | -------------------- |
| displayName        | string    | 表示名               |
| description        | ?string   | 説明文               |
| required           | ?boolean  | 必須項目             |
| selectItems        | string[]  | 選択肢               |
| selectInitialValue | ?string[] | 初期値               |
| multiple           | ?boolean  | 複数選択を許可するか |

### `field.file()`

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| displayName | string   | 表示名      |
| description | ?string  | 説明文      |
| required    | ?boolean | 必須項目    |

### `field.number()`

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| displayName | string   | 表示名      |
| description | ?string  | 説明文      |
| required    | ?boolean | 必須項目    |
| range       | ?object  | 数値の範囲  |
| range.min   | number   | 最小値      |
| range.max   | number   | 最大値      |

### `field.relation()`

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| displayName | string   | 表示名      |
| description | ?string  | 説明文      |
| required    | ?boolean | 必須項目    |

### `field.relationList()`

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| displayName | string   | 表示名      |
| description | ?string  | 説明文      |
| required    | ?boolean | 必須項目    |
| limit       | ?object  | 最大数      |
| limit.max   | number   | 最大数      |
| limit.min   | number   | 最小数      |

### `field.iframe()`

#### Parameters

| Name        | Type     | Description        |
| ----------- | -------- | ------------------ |
| displayName | string   | 表示名             |
| description | ?string  | 説明文             |
| required    | ?boolean | 必須項目           |
| iframeUrl   | string   | 拡張フィールド URL |

### `field.repeater()`

#### Parameters

| Name        | Type                               | Description |
| ----------- | ---------------------------------- | ----------- |
| displayName | string                             | 表示名      |
| description | ?string                            | 説明文      |
| required    | ?boolean                           | 必須項目    |
| fields      | MicroCMSApiSchemaCustomFieldType[] | 選択肢      |
| limit       | ?object                            | 最大数      |
| limit.max   | number                             | 最大数      |
| limit.min   | number                             | 最小数      |

### `field.custom()`

#### Parameters

| Name        | Type                               | Description        |
| ----------- | ---------------------------------- | ------------------ |
| displayName | string                             | 表示名             |
| description | ?string                            | 説明文             |
| required    | ?boolean                           | 必須項目           |
| field       | [MicroCMSApiSchemaCustomFieldType] | カスタムフィールド |
