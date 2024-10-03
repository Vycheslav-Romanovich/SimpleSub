export interface OptionsParserYoutube {
  ignoreAttributes: boolean,
  attributeNamePrefix: string,
  format: boolean,
  preserveOrder: boolean,
  allowBooleanAttributes: boolean,
  attributesGroupName: string,
  ignoreDeclaration: boolean,
  textNodeName: string,
  tagValueProcessor: (_tagName: string, tagValue: string) => string,
}
