#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import path from 'path';
import { isKebabCase, pascalCase } from './utils';
import pluralize from 'pluralize';

type MicroCMSFieldType = {
  fieldId: string;
  name: string;
  kind:
    | 'text'
    | 'textArea'
    | 'number'
    | 'richEditor'
    | 'select'
    | 'custom'
    | 'repeater'
    | 'media'
    | 'file'
    | 'relation'
    | 'relationList'
    | 'date';
  required: boolean;
  selectItems?: { value: string }[];
  multipleSelect?: boolean;
  customFieldCreatedAt?: string;
  customFieldCreatedAtList?: string[];
};

type MicroCMSSchemaType = {
  apiFields: MicroCMSFieldType[];
  customFields: {
    createdAt: string;
    fieldId: string;
    fields: MicroCMSFieldType[];
  }[];
};

export const convertSchema = (name: string, schema: MicroCMSSchemaType) => {
  const { customFields, apiFields } = schema;
  const customs = Object.fromEntries(
    customFields.map(({ fieldId, createdAt }) => [createdAt, fieldId])
  );
  const getKindType = (fields: MicroCMSFieldType) => {
    const { kind } = fields;
    const types = {
      text: () => 'string',
      textArea: () => 'string',
      richEditor: () => 'string',
      richEditorV2: () => 'string',
      number: () => 'number',
      select: () => {
        const { selectItems: list, multipleSelect } = fields;
        const str = list!.reduce((a, rep, index) => `${a}${index ? ' | ' : ''}'${rep.value}'`, '');
        if (multipleSelect) return list!.length > 1 ? `(${str})[]` : `${str}[]`;
        return `[${str}]`;
      },
      relation: () => 'MicroCMSRelation<unknown | null>',
      relationList: () => 'MicroCMSRelation<unknown | null>[]',
      boolean: () => 'boolean',
      date: () => 'string',
      media: () => 'MicroCMSImage',
      file: () => '{ url: string }',
      custom: () => `${name}CustomField${pascalCase(customs[fields.customFieldCreatedAt!])}`,
      repeater: () => {
        const { customFieldCreatedAtList: list } = fields;
        const str = list!.reduce(
          (a, rep, index) =>
            `${a}${index ? ' | ' : ''}${name}CustomField${pascalCase(customs[rep])}`,
          ''
        );
        return list!.length > 1 ? `(${str})[]` : `${str}[]`;
      },
    };
    return types[kind]?.() || 'any';
  };
  const getDoc = (field: { name: string }) => {
    return `/**\n * ${field.name}\n */`;
  };
  const getFields = (fields: MicroCMSFieldType[]) => {
    return fields.map((fields) => {
      const { fieldId, required } = fields;
      const isKebabFieldId = isKebabCase(fieldId);
      return `${getDoc(fields)}\n${isKebabFieldId ? `"${fieldId}"` : fieldId}${
        !required ? '?' : ''
      }: ${getKindType(fields)}`;
    });
  };
  const getCustomFields = (fieldId: string, fields: MicroCMSFieldType[]) => {
    return [`${getDoc({ name: 'fieldId' })}\nfieldId: '${fieldId}'`, ...getFields(fields)];
  };

  const mainSchema = getFields(apiFields);
  const customSchemas = Object.fromEntries(
    customFields.map(({ fieldId, fields }) => [fieldId, getCustomFields(fieldId, fields)])
  );
  return { mainSchema, customSchemas };
};

const outSchema = (
  name: string,
  { mainSchema, customSchemas }: ReturnType<typeof convertSchema>
) => {
  let buffer = `export type ${name} = {\n`;

  mainSchema.forEach((field) => {
    field.split('\n').forEach((s) => (buffer += `  ${s}\n`));
  });
  buffer += '}\n\n';

  Object.entries(customSchemas).forEach(([customName, fields]) => {
    buffer += `export type ${name}CustomField${pascalCase(customName)} = {\n`;
    fields.forEach((field) => {
      field.split('\n').forEach((s) => (buffer += `  ${s}\n`));
    });
    buffer += '}\n\n';
  });
  return buffer;
};

const main = (dir: string, dest?: string) => {
  const files = fs.readdirSync(dir);
  const typeNames = new Map<string, string>();
  Array.from(files)
    .reverse()
    .forEach((file) => {
      const name = file.match(/api-(.*)-.*\.json/)?.[1];
      if (!name || typeNames.has(name)) return false;
      typeNames.set(name, file);
      return true;
    });
  const microcmsTypeOutput = `/** microCMS contentId */
type MicroCMSContentId = {
  id: string;
}

/** microCMS content common date */
type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

/** microCMS image */
export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
}

/** microCMS list content common types */
type MicroCMSListContent = MicroCMSContentId & MicroCMSDate;

/** microCMS relation fields */
export type MicroCMSRelation<T> = T & MicroCMSListContent;\n`;

  typeNames.forEach(async (file, name) => {
    const singleName = pluralize.singular(name);
    const typeName = pascalCase(singleName);
    const apiSchema = fs.readFileSync(path.resolve(dir, file));
    const s = convertSchema(typeName, JSON.parse(apiSchema.toString()) as MicroCMSSchemaType);

    const schema = outSchema(typeName, s);
    const isRelation = /MicroCMSRelation/.test(schema);
    const isImage = /MicroCMSImage/.test(schema);

    const microcmsTypeFileName = 'microcms-schema';

    let output =
      isRelation && isImage
        ? `import { MicroCMSRelation, MicroCMSImage } from './${microcmsTypeFileName}';\n\n`
        : isRelation
        ? `import { MicroCMSRelation } from './${microcmsTypeFileName}';\n\n`
        : isImage
        ? `import { MicroCMSImage } from './${microcmsTypeFileName}';\n\n`
        : '';
    output += schema;

    if (dest) {
      fs.writeFileSync(path.join(dest, `${microcmsTypeFileName}.ts`), microcmsTypeOutput);
      fs.writeFileSync(path.join(dest, `${singleName}.ts`), output);
    } else {
      console.log(output);
    }
  });
};

if (process.argv.length < 3) {
  console.log('microcms-generate-types src-dir [dest-dir]');
} else {
  main(process.argv[2], process.argv[3]);
}
