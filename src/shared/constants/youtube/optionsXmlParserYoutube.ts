import he from 'he';

export const optionsXmlParserYoutube = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
  format: true,
  preserveOrder: true,
  allowBooleanAttributes: true,
  attributesGroupName: 'timecodes',
  ignoreDeclaration: true,
  textNodeName: 'sentence',
  tagValueProcessor: (_tagName: string, tagValue: string) => he.decode(tagValue),
};
