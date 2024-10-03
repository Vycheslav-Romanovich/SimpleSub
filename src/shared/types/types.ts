import { LangCodeType } from '../data/LANGS_ARRAY';
import { CaptionsYoutube } from '../interfaces';

export enum CaptionKey {
  Timings = '$',
  Text = '_',
}

export type CaptionsResponse = {
  transcript: {
    text: Caption[];
  };
};

export type Caption = {
  [CaptionKey.Timings]: { start: string; dur: string };
  [CaptionKey.Text]: string;
};

export type Subtitle = {
  start: string;
  dur: string;
  text: string;
  translate?: string;
};

export type YTCaption = {
  baseUrl: string;
  isTranslatable: boolean;
  languageCode: string;
  name: { simpleText: string };
  vssId: string;
};

export type TranslationLanguage = {
  languageCode: LangCodeType;
  languageName: {
    runs: { text: string }[];
  };
};

export type YtPlayerData = {
  captions: YTCaption[];
  translationLanguages: TranslationLanguage[];
  videoDetails: {
    author: string;
    title: string;
    videoId: string;
  };
};

export type PlayerDataResponse = {
  action: 'tabUpdate' | 'noVideo';
  isMobile: boolean;
  tabId: number;
  tabUrl: string;
  playerData: CaptionsYoutube[] | null;
};

export type YtCaptionOption = {
  languageCode: string;
  name: string;
  vssId: string;
  baseUrl: string;
};

//____________________________
export type CaptionStyles = 'default' | 'translate' | 'double';
export type CaptionScales = 16 | 14 | 20;
export type AutoscrollVariant = 'on' | 'off';

export type ToggleSettingsType = CaptionStyles | CaptionScales | AutoscrollVariant;
