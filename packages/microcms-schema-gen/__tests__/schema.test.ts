import { describe, it, expect } from 'vitest';
import schema, { CreateFieldResult } from '../src/schema';

describe('schema.api', () => {
  it('should return an object with apiFields and customFields properties', () => {
    const result = schema.api({});
    expect(result).toHaveProperty('apiFields');
    expect(result).toHaveProperty('customFields');
  });

  it('should return an object with apiFields containing all fields passed in', () => {
    const fields = {
      title: { kind: 'text', name: 'タイトル', idValue: 'xxxxxxxxxx' },
      body: { kind: 'textArea', name: '本文' },
    } satisfies Record<string, CreateFieldResult>;
    const result = schema.api(fields);
    expect(result.apiFields).toHaveLength(2);
    expect(result.apiFields).toContainEqual({
      fieldId: 'title',
      kind: 'text',
      name: 'タイトル',
      idValue: 'xxxxxxxxxx',
    });
    expect(result.apiFields).toContainEqual({
      fieldId: 'body',
      kind: 'textArea',
      name: '本文',
    });
  });

  it('should return an object with apiFields containing custom fields', () => {
    const fields = {
      title: { kind: 'text', name: 'タイトル', idValue: 'xxxxxxxxxx' },
      customField: {
        name: 'foo',
        kind: 'custom',
        field: [
          {
            createdAt: '2022-01-01T00:00:00.000Z',
            fieldId: 'customField',
            name: 'foo',
            fields: [],
            position: [['xxxxxxxxxx']],
            updatedAt: '2022-01-01T00:00:00.000Z',
            viewerGroup: 'xxx',
          },
        ],
      },
    } satisfies Record<string, CreateFieldResult>;
    const result = schema.api(fields);
    expect(result.apiFields).toHaveLength(2);
    expect(result.apiFields).toContainEqual({
      fieldId: 'title',
      idValue: 'xxxxxxxxxx',
      kind: 'text',
      name: 'タイトル',
    });
    expect(result.apiFields).toContainEqual({
      fieldId: 'customField',
      kind: 'custom',
      customFieldCreatedAt: '2022-01-01T00:00:00.000Z',
      name: 'foo',
    });
  });

  it('should return an object with apiFields containing repeater fields', () => {
    const fields = {
      title: { kind: 'text', name: 'タイトル', idValue: 'xxxxxxxxxx' },
      repeaterField: {
        kind: 'repeater',
        name: 'bar',
        fields: [],
      },
    } satisfies Record<string, CreateFieldResult>;
    const result = schema.api(fields);
    expect(result.apiFields).toHaveLength(2);
    expect(result.apiFields).toContainEqual({
      fieldId: 'title',
      kind: 'text',
      name: 'タイトル',
      idValue: 'xxxxxxxxxx',
    });
    expect(result.apiFields).toContainEqual({
      fieldId: 'repeaterField',
      kind: 'repeater',
      name: 'bar',
      customFieldCreatedAtList: [],
    });
  });

  it('should return an object with customFields containing all custom fields', () => {
    const fields = {
      title: { kind: 'text', name: 'タイトル', idValue: 'xxxxxxxxxx' },
      customField: {
        name: 'foo',
        kind: 'custom',
        field: [
          {
            createdAt: '2022-01-01T00:00:00.000Z',
            fieldId: 'customFieldA',
            name: 'foo',
            fields: [],
            position: [['xxxxxxxxxx']],
            updatedAt: '2022-01-01T00:00:00.000Z',
            viewerGroup: 'xxx',
          },
        ],
      },
      repeaterField: {
        kind: 'repeater',
        name: 'bar',
        fields: [
          {
            createdAt: '2022-01-02T00:00:00.000Z',
            fieldId: 'customFieldB',
            name: 'foo',
            fields: [],
            position: [['xxxxxxxxxx']],
            updatedAt: '2022-01-02T00:00:00.000Z',
            viewerGroup: 'xxx',
          },
          {
            createdAt: '2022-01-03T00:00:00.000Z',
            fieldId: 'customFieldC',
            name: 'foo',
            fields: [],
            position: [['xxxxxxxxxx']],
            updatedAt: '2022-01-03T00:00:00.000Z',
            viewerGroup: 'xxx',
          },
        ],
      },
    } satisfies Record<string, CreateFieldResult>;
    const result = schema.api(fields);
    expect(result.customFields).toHaveLength(3);
    expect(result.customFields).toContainEqual({
      createdAt: '2022-01-01T00:00:00.000Z',
      fieldId: 'customFieldA',
      name: 'foo',
      fields: [],
      position: [['xxxxxxxxxx']],
      updatedAt: '2022-01-01T00:00:00.000Z',
      viewerGroup: 'xxx',
    });
    expect(result.customFields).toContainEqual({
      createdAt: '2022-01-02T00:00:00.000Z',
      fieldId: 'customFieldB',
      name: 'foo',
      fields: [],
      position: [['xxxxxxxxxx']],
      updatedAt: '2022-01-02T00:00:00.000Z',
      viewerGroup: 'xxx',
    });
    expect(result.customFields).toContainEqual({
      createdAt: '2022-01-03T00:00:00.000Z',
      fieldId: 'customFieldC',
      name: 'foo',
      fields: [],
      position: [['xxxxxxxxxx']],
      updatedAt: '2022-01-03T00:00:00.000Z',
      viewerGroup: 'xxx',
    });
  });
});

describe('schema.custom', () => {
  it('should return a MicroCMSApiSchemaCustomFieldType object', () => {
    const result = schema.custom({
      fieldId: 'customField',
      name: 'Custom Field',
      fields: {
        field1: {
          kind: 'text',
          name: 'Field 1',
          idValue: 'xxxxxxxxxx',
        },
        field2: {
          kind: 'text',
          name: 'Field 2',
          idValue: 'yyyyyyyyyy',
        },
      },
    });

    expect(result).toMatchObject({
      fieldId: 'customField',
      name: 'Custom Field',
      viewerGroup: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      fields: expect.any(Array),
      position: expect.any(Array),
    });
  });

  it('should generate unique idValues for each field', () => {
    const result = schema.custom({
      fieldId: 'customField',
      name: 'Custom Field',
      fields: {
        field1: {
          kind: 'text',
          name: 'Field 1',
          idValue: 'xxxxxxxxxx',
        },
        field2: {
          kind: 'text',
          name: 'Field 2',
          idValue: 'yyyyyyyyyy',
        },
      },
    });

    const idValues = result.fields.map((field) => field.idValue);
    expect(new Set(idValues)).toHaveLength(idValues.length);
  });

  it('should set createdAt and updatedAt to the same value', () => {
    const result = schema.custom({
      fieldId: 'customField',
      name: 'Custom Field',
      fields: {
        field1: {
          kind: 'text',
          name: 'Field 1',
          idValue: 'xxxxxxxxxx',
        },
        field2: {
          kind: 'text',
          name: 'Field 2',
          idValue: 'yyyyyyyyyy',
        },
      },
    });

    expect(result.createdAt).toEqual(result.updatedAt);
  });

  it('should set position to an array of arrays of idValues', () => {
    const result = schema.custom({
      fieldId: 'customField',
      name: 'Custom Field',
      fields: {
        field1: {
          kind: 'text',
          name: 'Field 1',
          idValue: 'xxxxxxxxxx',
        },
        field2: {
          kind: 'text',
          name: 'Field 2',
          idValue: 'yyyyyyyyyy',
        },
      },
    });

    expect(result.position).toEqual([[expect.any(String), expect.any(String)]]);
  });
});
