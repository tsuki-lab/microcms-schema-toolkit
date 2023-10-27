import * as fs from 'fs';
import * as path from 'path';
import { schema, field } from '../src';

const richEditor = schema.custom({
  name: '本文：リッチエディター',
  fieldId: 'richEditor',
  fields: {
    html: field.richEditorV2({
      displayName: '本文：リッチエディター',
      description: 'リッチエディターで記事の本文を入力できます。',
      required: true,
    }),
  },
});

const html = schema.custom({
  name: '本文：HTML',
  fieldId: 'html',
  fields: {
    html: field.textArea({
      displayName: '本文：HTML',
      description: 'HTMLで記事の本文を入力できます。',
      required: true,
    }),
  },
});

const gallery = schema.custom({
  name: 'ギャラリー',
  fieldId: 'gallery',
  fields: {
    images: field.mediaList({
      displayName: 'ギャラリー',
      description: '複数の画像をアップロードできます。',
      required: true,
    }),
  },
});

const json = schema.api({
  title: field.text({
    displayName: '記事のタイトル',
    description: '100文字以内で記事のタイトルを入力してください。',
    required: true,
    length: { min: 1, max: 100 },
  }),
  contents: field.repeater({
    displayName: '記事の本文',
    description: 'フィールドを追加することで、記事の本文を入力できます。',
    required: true,
    fields: [html, richEditor, gallery],
  }),
  thumbnail: field.media({
    displayName: 'サムネイル',
    description:
      '記事のサムネイル画像をアップロードできます。1200×630pxの画像を推奨します。',
    required: true,
  }),
});

// Export schema.json
fs.writeFileSync(
  path.join(__dirname, 'schema.json'),
  JSON.stringify(json, null, 2),
);
