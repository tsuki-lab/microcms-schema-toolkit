import * as path from 'path';
import { MicroCMSApiSchemaBuilder } from '../src';

new MicroCMSApiSchemaBuilder().json({
  outputFilePath: path.resolve(__dirname, './output/schema.json'),
});

new MicroCMSApiSchemaBuilder().json({ logLevel: 'info' });
