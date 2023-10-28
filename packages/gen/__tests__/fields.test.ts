import { describe, it, expect } from 'vitest';
import field, {
  CreateCustomFieldParams,
  CreateMediaListFieldParams,
  CreateRepeaterFieldParams,
  CreateRichEditorV2FieldParams,
} from '../src/fields';

describe('field.text', () => {
  it('should return a text field with the correct properties', () => {
    const params = {
      displayName: 'Title',
      description: 'The title of the post',
      required: true,
      isUnique: false,
      length: {
        min: 1,
        max: 100,
      },
      regexp: /^[\w\s]+$/,
    };
    const result = field.text(params);
    expect(result.kind).toEqual('text');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.isUnique).toEqual(params.isUnique);
    expect(result.textSizeLimitValidation).toEqual({
      textSize: {
        min: params.length.min,
        max: params.length.max,
      },
    });
    expect(result.patternMatchValidation).toEqual({
      regexp: {
        pattern: '^[\\w\\s]+$',
        flags: null,
      },
    });
  });

  it('should return a text field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Title',
      regexp: /^[a-zA-Z]+$/g,
    };
    const result = field.text(params);
    expect(result.kind).toEqual('text');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toBeUndefined();
    expect(result.isUnique).toBeUndefined();
    expect(result.textSizeLimitValidation).toBeUndefined();
    expect(result.patternMatchValidation).toEqual({
      regexp: {
        pattern: '^[a-zA-Z]+$',
        flags: 'g',
      },
    });
  });

  it('should return a text field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Title',
      required: false,
    };
    const result = field.text(params);
    expect(result.kind).toEqual('text');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.isUnique).toBeUndefined();
    expect(result.textSizeLimitValidation).toBeUndefined();
    expect(result.patternMatchValidation).toBeUndefined();
  });
});

describe('field.textArea', () => {
  it('should return a textArea field with the correct properties', () => {
    const params = {
      displayName: 'Content',
      description: 'The content of the post',
      required: true,
      length: {
        min: 10,
        max: 5000,
      },
      regexp: /^[\w\s\d.,!?]+$/g,
    };
    const result = field.textArea(params);
    expect(result.kind).toEqual('textArea');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.textSizeLimitValidation).toEqual({
      textSize: {
        min: params.length.min,
        max: params.length.max,
      },
    });
    expect(result.patternMatchValidation).toEqual({
      regexp: {
        pattern: '^[\\w\\s\\d.,!?]+$',
        flags: 'g',
      },
    });
  });
  it('should return a textArea field with the correct properties', () => {
    const params = {
      displayName: 'Content',
      description: 'The content of the post',
      required: true,
      length: {
        min: 10,
        max: 5000,
      },
      regexp: /^[\w\s\d.,!?]+$/,
    };
    const result = field.textArea(params);
    expect(result.kind).toEqual('textArea');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.textSizeLimitValidation).toEqual({
      textSize: {
        min: params.length.min,
        max: params.length.max,
      },
    });
    expect(result.patternMatchValidation).toEqual({
      regexp: {
        pattern: '^[\\w\\s\\d.,!?]+$',
        flags: null,
      },
    });
  });

  it('should return a textArea field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Content',
      required: false,
    };
    const result = field.textArea(params);
    expect(result.kind).toEqual('textArea');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.textSizeLimitValidation).toBeUndefined();
    expect(result.patternMatchValidation).toBeUndefined();
  });
});

describe('field.richEditorV2', () => {
  it('should return a richEditorV2 field with the correct properties', () => {
    const params = {
      displayName: 'Content',
      description: 'The content of the post',
      required: true,
      richEditorV2Options: ['bold', 'italic'],
      customClassList: [
        {
          name: 'Red Text',
          value: 'red-text',
        },
      ],
    } satisfies CreateRichEditorV2FieldParams;
    const result = field.richEditorV2(params);
    expect(result.kind).toEqual('richEditorV2');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.richEditorV2Options).toEqual([
      'undo',
      'redo',
      'clean',
      'bold',
      'italic',
    ]);
    expect(result.customClassList).toEqual([
      {
        id: expect.any(String),
        name: 'Red Text',
        value: 'red-text',
      },
    ]);
  });

  it('should return a richEditorV2 field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Content',
      required: false,
    };
    const result = field.richEditorV2(params);
    expect(result.kind).toEqual('richEditorV2');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.richEditorV2Options).toBeUndefined();
    expect(result.customClassList).toBeUndefined();
  });
});

describe('field.media', () => {
  it('should return a media field with the correct properties when size is provided', () => {
    const params = {
      displayName: 'Image',
      description: 'The image of the post',
      required: true,
      size: {
        width: 800,
        height: 600,
      },
    };
    const result = field.media(params);
    expect(result.kind).toEqual('media');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.imageSizeValidation).toEqual({
      imageSize: {
        width: params.size.width,
        height: params.size.height,
      },
    });
  });

  it('should return a media field with the correct properties when size is not provided', () => {
    const params = {
      displayName: 'Image',
      description: 'The image of the post',
      required: false,
    };
    const result = field.media(params);
    expect(result.kind).toEqual('media');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.imageSizeValidation).toBeUndefined();
  });
});

describe('field.mediaList', () => {
  it('should return a mediaList field with the correct properties when size and layout are provided', () => {
    const params = {
      displayName: 'Images',
      description: 'The images of the post',
      required: true,
      size: {
        width: 800,
        height: 600,
      },
      layout: 'GRID_2',
    } satisfies CreateMediaListFieldParams;
    const result = field.mediaList(params);
    expect(result.kind).toEqual('mediaList');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.imageSizeValidation).toEqual({
      imageSize: {
        width: params.size.width,
        height: params.size.height,
      },
    });
    expect(result.mediaListLayout).toEqual(params.layout);
  });

  it('should return a mediaList field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Images',
      required: false,
    };
    const result = field.mediaList(params);
    expect(result.kind).toEqual('mediaList');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.imageSizeValidation).toBeUndefined();
    expect(result.mediaListLayout).toBeUndefined();
  });
});

describe('field.date', () => {
  it('should return a date field with the correct properties', () => {
    const params = {
      displayName: 'Date',
      description: 'The date of the post',
      required: true,
      dateFormat: true,
    };
    const result = field.date(params);
    expect(result.kind).toEqual('date');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.dateFormat).toEqual(params.dateFormat);
  });

  it('should return a date field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Date',
      required: false,
    };
    const result = field.date(params);
    expect(result.kind).toEqual('date');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.dateFormat).toBeUndefined();
  });
});

describe('field.boolean', () => {
  it('should return a boolean field with the correct properties', () => {
    const params = {
      displayName: 'Is Active',
      description: 'Whether the user is active or not',
      required: true,
      initialValue: true,
    };
    const result = field.boolean(params);
    expect(result.kind).toEqual('boolean');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.booleanInitialValue).toEqual(params.initialValue);
  });

  it('should return a boolean field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Is Active',
      required: false,
      initialValue: false,
    };
    const result = field.boolean(params);
    expect(result.kind).toEqual('boolean');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.booleanInitialValue).toEqual(params.initialValue);
  });
});

describe('field.select', () => {
  it('should return a select field with the correct properties', () => {
    const params = {
      displayName: 'Category',
      description: 'The category of the post',
      required: true,
      selectItems: ['News', 'Opinion', 'Lifestyle'],
      selectInitialValue: ['News'],
      multiple: false,
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([
      { value: 'News', id: expect.any(String) },
      { value: 'Opinion', id: expect.any(String) },
      { value: 'Lifestyle', id: expect.any(String) },
    ]);
    expect(result.selectInitialValue).toEqual([expect.any(String)]);
    expect(result.multipleSelect).toEqual(params.multiple);
  });

  it('should return a select field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Category',
      selectItems: ['News', 'Opinion', 'Lifestyle'],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toBeUndefined();
    expect(result.selectItems).toEqual([
      { value: 'News', id: expect.any(String) },
      { value: 'Opinion', id: expect.any(String) },
      { value: 'Lifestyle', id: expect.any(String) },
    ]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default selectInitialValue when selectInitialValue is not provided', () => {
    const params = {
      displayName: 'Category',
      description: 'The category of the post',
      required: true,
      selectItems: ['News', 'Opinion', 'Lifestyle'],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([
      { value: 'News', id: expect.any(String) },
      { value: 'Opinion', id: expect.any(String) },
      { value: 'Lifestyle', id: expect.any(String) },
    ]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default values when selectItems is not provided', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: [],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default values when both selectItems and selectInitialValue are not provided', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: [],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default values when both selectItems and selectInitialValue are empty', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: [],
      selectInitialValue: [],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default values when selectItems is empty', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: [],
      selectInitialValue: ['News'],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with default values when selectInitialValue is not included in selectItems', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: ['News', 'Opinion', 'Lifestyle'],
      selectInitialValue: ['Sports'],
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([
      { value: 'News', id: expect.any(String) },
      { value: 'Opinion', id: expect.any(String) },
      { value: 'Lifestyle', id: expect.any(String) },
    ]);
    expect(result.selectInitialValue).toEqual([]);
    expect(result.multipleSelect).toBeUndefined();
  });

  it('should return a select field with multipleSelect true when multiple is true', () => {
    const params = {
      displayName: 'Category',
      required: true,
      selectItems: ['News', 'Opinion', 'Lifestyle'],
      selectInitialValue: ['News'],
      multiple: true,
    };
    const result = field.select(params);
    expect(result.kind).toEqual('select');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.selectItems).toEqual([
      { value: 'News', id: expect.any(String) },
      { value: 'Opinion', id: expect.any(String) },
      { value: 'Lifestyle', id: expect.any(String) },
    ]);
    expect(result.selectInitialValue).toEqual([expect.any(String)]);
    expect(result.multipleSelect).toEqual(params.multiple);
  });
});

describe('field.file', () => {
  it('should return a file field with the correct properties', () => {
    const params = {
      displayName: 'File',
      description: 'The file to upload',
      required: true,
    };
    const result = field.file(params);
    expect(result.kind).toEqual('file');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
  });

  it('should return a file field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'File',
      required: false,
    };
    const result = field.file(params);
    expect(result.kind).toEqual('file');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
  });
});

describe('field.number', () => {
  it('should return a number field with the correct properties when range is provided', () => {
    const params = {
      displayName: 'Age',
      description: 'The age of the user',
      required: true,
      range: {
        min: 0,
        max: 120,
      },
    };
    const result = field.number(params);
    expect(result.kind).toEqual('number');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.numberSizeLimitValidation).toEqual({
      numberSize: {
        min: params.range.min,
        max: params.range.max,
      },
    });
  });

  it('should return a number field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Age',
      required: false,
    };
    const result = field.number(params);
    expect(result.kind).toEqual('number');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.numberSizeLimitValidation).toBeUndefined();
  });
});

describe('field.relation', () => {
  it('should return a relation field with the correct properties', () => {
    const params = {
      displayName: 'Author',
      description: 'The author of the post',
      required: true,
    };
    const result = field.relation(params);
    expect(result.kind).toEqual('relation');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
  });

  it('should return a relation field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Author',
      required: false,
    };
    const result = field.relation(params);
    expect(result.kind).toEqual('relation');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
  });
});

describe('field.relationList', () => {
  it('should return a relationList field with the correct properties when limit is provided', () => {
    const params = {
      displayName: 'Related Posts',
      description: 'A list of related posts',
      required: true,
      limit: {
        min: 1,
        max: 5,
      },
    };
    const result = field.relationList(params);
    expect(result.kind).toEqual('relationList');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.relationListCountLimitValidation).toEqual({
      relationListCount: {
        min: params.limit.min,
        max: params.limit.max,
      },
    });
  });

  it('should return a relationList field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Related Posts',
      required: false,
    };
    const result = field.relationList(params);
    expect(result.kind).toEqual('relationList');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.relationListCountLimitValidation).toBeUndefined();
  });
});

describe('field.repeater', () => {
  it('should return a repeater field with the correct properties', () => {
    const params = {
      displayName: 'Images',
      description: 'The images of the post',
      required: true,
      fields: [
        {
          createdAt: '2021-01-01T00:00:00.000Z',
          fieldId: 'customFieldA',
          name: 'foo',
          fields: [],
          position: [['xxxxxxxxxx']],
          updatedAt: '2021-01-01T00:00:00.000Z',
          viewerGroup: 'xxx',
        },
      ],
      limit: {
        min: 1,
        max: 5,
      },
    } satisfies CreateRepeaterFieldParams;
    const result = field.repeater(params);
    expect(result.kind).toEqual('repeater');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.fields).toEqual(params.fields);
    expect(result.repeaterCountLimitValidation).toEqual({
      repeatCount: {
        min: params.limit.min,
        max: params.limit.max,
      },
    });
  });

  it('should return a repeater field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Images',
      required: false,
      fields: [
        {
          createdAt: '2021-01-01T00:00:00.000Z',
          fieldId: 'customFieldA',
          name: 'foo',
          fields: [],
          position: [['xxxxxxxxxx']],
          updatedAt: '2021-01-01T00:00:00.000Z',
          viewerGroup: 'xxx',
        },
      ],
    } satisfies CreateRepeaterFieldParams;
    const result = field.repeater(params);
    expect(result.kind).toEqual('repeater');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.fields).toEqual(params.fields);
    expect(result.repeaterCountLimitValidation).toBeUndefined();
  });
});

describe('field.custom', () => {
  it('should return a custom field with the correct properties', () => {
    const params = {
      displayName: 'Custom Field',
      description: 'A custom field',
      required: true,
      field: [
        {
          createdAt: '2021-01-01T00:00:00.000Z',
          fieldId: 'customFieldA',
          name: 'foo',
          fields: [],
          position: [['xxxxxxxxxx']],
          updatedAt: '2021-01-01T00:00:00.000Z',
          viewerGroup: 'xxx',
        },
      ],
    } satisfies CreateCustomFieldParams;
    const result = field.custom(params);
    expect(result.kind).toEqual('custom');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.field).toEqual(params.field);
  });
});

describe('field.iframe', () => {
  it('should return an iframe field with the correct properties', () => {
    const params = {
      displayName: 'Video',
      description: 'The video of the post',
      required: true,
      iframeUrl: 'https://example.com',
    };
    const result = field.iframe(params);
    expect(result.kind).toEqual('iframe');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toEqual(params.description);
    expect(result.required).toEqual(params.required);
    expect(result.iframeUrl).toEqual(params.iframeUrl);
  });

  it('should return an iframe field with default values when optional parameters are not provided', () => {
    const params = {
      displayName: 'Video',
      required: false,
      iframeUrl: 'https://example.com',
    };
    const result = field.iframe(params);
    expect(result.kind).toEqual('iframe');
    expect(result.name).toEqual(params.displayName);
    expect(result.description).toBeUndefined();
    expect(result.required).toEqual(params.required);
    expect(result.iframeUrl).toEqual(params.iframeUrl);
  });
});
