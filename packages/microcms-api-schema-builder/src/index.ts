import * as fs from 'fs';
import { MicroCMSApiSchema } from 'microcms-field-types';

type LogLevel = 'info' | 'silent';

export class MicroCMSApiSchemaBuilder {
  constructor() {}

  /**
   * JSON形式のAPIスキーマを生成する。
   * @param params - 出力ファイルパスとログレベルを指定するオブジェクト
   * @param params.outputFilePath - スキーマを出力するファイルパス
   * @param params.logLevel - ログレベル。'silent'または'info'を指定する。デフォルトは'silent'
   * @returns 生成されたAPIスキーマ
   */
  public json(params?: { outputFilePath?: string; logLevel?: LogLevel }) {
    const { outputFilePath, logLevel = 'silent' } = params || {};

    const schema: MicroCMSApiSchema = {
      apiFields: [],
      customFields: [],
    };

    if (outputFilePath) {
      fs.writeFileSync(outputFilePath, JSON.stringify(schema, null, 2));
      return;
    }

    if (logLevel === 'info') {
      console.log(JSON.stringify(schema, null, 2));
    }

    return schema;
  }
}
