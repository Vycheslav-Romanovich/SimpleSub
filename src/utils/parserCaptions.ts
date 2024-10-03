import { XMLParser } from 'fast-xml-parser';
import { CaptionsYoutube } from '../shared/interfaces';
import { OptionsParserYoutube } from '../shared/interfaces/optionsParserYoutube';


export const parserCaptions = (
  xmlString: string,
  options: OptionsParserYoutube,
): CaptionsYoutube[] => {
  const parser = new XMLParser(options);
  const { transcript } = parser.parse(xmlString)[0];
  return transcript;
};
