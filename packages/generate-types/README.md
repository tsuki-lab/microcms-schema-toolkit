# microCMS Generate Types

<a href="https://www.npmjs.com/package/microcms-schema-gen" target="_blank"><img src="https://img.shields.io/npm/v/microcms-generate-types" /></a>
<img src="https://img.shields.io/npm/l/microcms-generate-types" />

Convert [MicroCMS](https://microcms.io/) schema to TypeScript type definitions.

This package takes a lot of inspiration from "[SoraKumo001/microcms-typescript](https://github.com/SoraKumo001/microcms-typescript)".

## Install

```shell
npm install -g microcms-generate-types
```

## Usage

```shell
microcms-generate-types src-dir [dist-dir]
```

- Use the file name as the type name.
- If there are multiple schema files with the same type name, the one with the latest date will be used for conversion.

## For output types

api-posts-20221212235947.json -> post.ts

```json
{
  "apiFields": [
    {
      "idValue": "oPRtD72MlX",
      "fieldId": "category",
      "name": "カテゴリー",
      "kind": "relation",
      "required": true,
      "referenceDisplayItem": "1VeK3PU3N_"
    },
    {
      "fieldId": "title",
      "name": "タイトル",
      "kind": "text",
      "required": true,
      "isUnique": false
    },
    {
      "fieldId": "contents",
      "name": "内容",
      "kind": "repeater",
      "required": false,
      "customFieldCreatedAtList": [
        "2022-08-04T10:38:53.943Z",
        "2022-08-04T10:39:29.580Z",
        "2022-08-04T10:39:58.343Z",
        "2022-08-04T10:42:16.565Z"
      ]
    },
    { "fieldId": "coverImage", "name": "カバー画像", "kind": "media" },
    {
      "fieldId": "relatedPosts",
      "name": "関連お知らせ",
      "kind": "relationList",
      "isUnique": false
    }
  ],
  "customFields": [
    {
      "createdAt": "2022-08-04T10:38:53.943Z",
      "fieldId": "richEditor",
      "name": "リッチエディタ",
      "fields": [
        {
          "idValue": "QwamnszSrV",
          "fieldId": "content",
          "name": "リッチエディタ",
          "kind": "richEditor",
          "required": true,
          "richEditorMultiParagraph": true,
          "richEditorOptions": [
            "headerOne",
            "headerTwo",
            "headerThree",
            "headerFour",
            "headerFive",
            "paragraph",
            "bold",
            "italic",
            "underline",
            "strike",
            "code",
            "align",
            "blockquote",
            "codeBlock",
            "listOrdered",
            "listBullet",
            "scriptSub",
            "scriptSuper",
            "link",
            "clean",
            "background",
            "color"
          ]
        }
      ],
      "position": [["QwamnszSrV"]],
      "updatedAt": "2022-12-12T14:57:47.705Z",
      "viewerGroup": "LkR"
    },
    {
      "createdAt": "2022-08-04T10:39:29.580Z",
      "fieldId": "html",
      "name": "HTML",
      "fields": [
        {
          "idValue": "c7v6zV4889",
          "fieldId": "content",
          "name": "HTML",
          "kind": "textArea",
          "required": true
        }
      ],
      "position": [["c7v6zV4889"]],
      "updatedAt": "2022-12-12T14:52:24.500Z",
      "viewerGroup": "LkR"
    },
    {
      "createdAt": "2022-08-04T10:39:58.343Z",
      "fieldId": "markdown",
      "name": "Markdown",
      "fields": [
        {
          "idValue": "btwzYdGABV",
          "fieldId": "content",
          "name": "Markdown",
          "kind": "textArea",
          "required": true
        }
      ],
      "position": [["btwzYdGABV"]],
      "updatedAt": "2022-12-12T14:52:24.502Z",
      "viewerGroup": "LkR"
    },
    {
      "createdAt": "2022-08-04T10:42:16.565Z",
      "fieldId": "image",
      "name": "画像",
      "fields": [
        {
          "idValue": "4I7jyhflyT",
          "fieldId": "alt",
          "name": "代替えテキスト",
          "kind": "text",
          "required": false
        },
        {
          "idValue": "lOJ2zuaOTA",
          "fieldId": "image",
          "name": "画像",
          "kind": "media",
          "required": true
        }
      ],
      "position": [["lOJ2zuaOTA"], [null, null, null, "4I7jyhflyT"]],
      "updatedAt": "2022-12-12T14:55:00.055Z",
      "viewerGroup": "LkR"
    }
  ]
}
```

```ts
import { MicroCMSRelation, MicroCMSImage } from './microcms-schema';

export type Post = {
  /**
   * カテゴリー
   */
  category: MicroCMSRelation<unknown | null>;
  /**
   * タイトル
   */
  title: string;
  /**
   * 内容
   */
  contents?: (
    | PostCustomFieldRichEditor
    | PostCustomFieldHtml
    | PostCustomFieldMarkdown
    | PostCustomFieldImage
  )[];
  /**
   * カバー画像
   */
  coverImage?: MicroCMSImage;
  /**
   * 関連お知らせ
   */
  relatedPosts?: MicroCMSRelation<unknown | null>[];
};

export type PostCustomFieldRichEditor = {
  /**
   * fieldId
   */
  fieldId: 'richEditor';
  /**
   * リッチエディタ
   */
  content: string;
};

export type PostCustomFieldHtml = {
  /**
   * fieldId
   */
  fieldId: 'html';
  /**
   * HTML
   */
  content: string;
};

export type PostCustomFieldMarkdown = {
  /**
   * fieldId
   */
  fieldId: 'markdown';
  /**
   * Markdown
   */
  content: string;
};

export type PostCustomFieldImage = {
  /**
   * fieldId
   */
  fieldId: 'image';
  /**
   * 代替えテキスト
   */
  alt?: string;
  /**
   * 画像
   */
  image: MicroCMSImage;
};
```

## license

MIT
