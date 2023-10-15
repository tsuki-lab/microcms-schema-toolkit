import { MicroCMSFieldTypes } from '../lib/microcms-field-types';
import { generateId } from '../utils';

type MicroCMSTextFieldParams = Pick<
  MicroCMSFieldTypes.MicroCMSTextFiled,
  'name' | 'description'
>;
type MicroCMSTextFieldDef = Omit<
  MicroCMSFieldTypes.MicroCMSTextFiled,
  'fieldId'
>;

export class MicroCMSTextField {
  private _def!: MicroCMSTextFieldDef;

  constructor(params: MicroCMSTextFieldParams, def?: MicroCMSTextFieldDef) {
    this._def = def || {
      idValue: generateId(),
      kind: 'text',
      name: params.name,
      description: params.description,
    };
  }

  unique(): MicroCMSTextField {
    this._def.isUnique = true;
    return this._create();
  }

  required(): MicroCMSTextField {
    this._def.required = true;
    return this._create();
  }

  textSizeLimitValidation(min: number, max: number) {
    this._def.textSizeLimitValidation = { textSize: { min, max } };
    return this._create();
  }

  patternMatchValidation(pattern: string, flags: string | null = null) {
    this._def.patternMatchValidation = { regexp: { pattern, flags } };
    return this._create();
  }

  private _create() {
    return new MicroCMSTextField(
      { name: this._def.name, description: this._def.description },
      this._def,
    );
  }

  static create(params: MicroCMSTextFieldParams) {
    return new MicroCMSTextField(params);
  }
}
