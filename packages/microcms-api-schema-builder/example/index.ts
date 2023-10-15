import { microcms } from '../src';

const schema = {
  title: microcms
    .textField({
      name: 'タイトル',
      description: '40文字以内でで入力してください。',
    })
    .required()
    .textSizeLimitValidation(1, 40)
    .unique(),
};

console.log(schema);
