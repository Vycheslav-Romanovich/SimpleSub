export interface CaptionsYoutube {
  text: Text[];
  ':@': Attributes;
  options?: OptionsCaptions;
}

interface Attributes {
  timecodes: Timestamp;
}

interface Timestamp {
  start: string;
  dur: string;
}

interface Text {
  sentence: string;
}

interface OptionsCaptions {
  active: boolean;
  classes: string[];
}
