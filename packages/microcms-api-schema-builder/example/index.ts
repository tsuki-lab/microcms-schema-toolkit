import { microcms } from '../src';

const customHtml = microcms.createCustomField({
  fieldId: 'html',
  name: 'HTML',
  fields: {
    html: microcms.textAreaField({
      name: 'HTML',
    }),
  },
});

const customRichEditor = microcms.createCustomField({
  fieldId: 'richEditor',
  name: 'リッチエディタ',
  fields: {
    html: microcms.richEditorV2Field({
      name: 'リッチエディタ',
    }),
  },
});

const apiSchema = microcms.apiSchema({
  title: microcms
    .textField({
      name: 'タイトル',
    })
    .required(),
  category: microcms
    .relationField({
      name: 'カテゴリー',
    })
    .required(),
  contents: microcms.repeaterField({
    name: '本文',
    fields: [customHtml, customRichEditor],
  }),
});

console.log(apiSchema.json());
