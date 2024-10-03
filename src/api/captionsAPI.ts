import he from 'he';
import striptags from 'striptags';
import { Subtitle, YTCaption } from '../shared/types/types';
import { CaptionsYoutube } from '../shared/interfaces';

type GetCaptionsArgs = {
  captions: Array<CaptionsYoutube>;
  defaultLang: string;
  translateLang: string;
};

type GetCaptionsResponse = {
  captionsData: Array<Subtitle>;
};

const transcriptCaptions = captionsRes => {
  const startRegex = /start="([\d.]+)"/;
  const durRegex = /dur="([\d.]+)"/;
  return captionsRes
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace('</transcript>', '')
    .split('</text>')
    .filter((line: string) => line && line.trim())
    .reduce((acc: Array<Subtitle>, line: string) => {
      const startResult = startRegex.exec(line);
      const durResult = durRegex.exec(line);

      if (!startResult || !durResult) {
        console.warn(`Failed to extract start or duration from line: ${line}`);
        return acc;
      }

      const [, start] = startResult;
      const [, dur] = durResult;

      const htmlText = line
        .replace(/<text.+>/, '')
        .replace(/&amp;/gi, '&')
        .replace(/<\/?[^>]+(>|$)/g, '');
      const decodedText = he.decode(htmlText);
      const text = striptags(decodedText);

      acc.push({
        start,
        dur,
        text,
      });

      return acc;
    }, []);
};

export const getCaptions = async ({
  captions,
  defaultLang,
  translateLang,
}: GetCaptionsArgs): Promise<GetCaptionsResponse> => {
 
  if (!captions || captions.length === 0) {
    return { captionsData: null };
  }
  console.log('captions', captions);
  // const url = captions[0].baseUrl;
  // const regex = /lang=([a-zA-Z]{2})/g;
  // const translateUrl = url.replace(regex, `lang=${translateLang}`);
  // let defaultUrl = '';
  // const isCaptionsExistsForDefaultLang = captions.some(
  //   caption => caption.languageCode === defaultLang,
  // );

  // if (isCaptionsExistsForDefaultLang) {
  //   defaultUrl = url.replace(regex, `lang=${defaultLang}`);
  // } else {
  //   let urlForDefaultLang = url;

  //   if (url.includes('&lang=en') && captions.length > 1 && defaultLang === 'en') {
  //     urlForDefaultLang = urlForDefaultLang.replace('&lang=en', '&lang=de');
  //   } else {
  //     urlForDefaultLang = captions[0].baseUrl;
  //   }
  //   defaultUrl = urlForDefaultLang + `&tlang=${defaultLang}`;
  // }

  // let captionsData: Array<Subtitle> 
  //   .then(res => res.text())
  //   .then(t => transcriptCaptions(t));

  // if (captionsData.length === 0) {
  //   captionsData = await fetch(url + `&tlang=${translateLang}`)
  //     .then(res => res.text())
  //     .then(t => transcriptCaptions(t));
  // }

  // const defaultData: Array<Subtitle> = await fetch(defaultUrl)
  //   .then(res => res.text())
  //   .then(t => transcriptCaptions(t));

  const captionsData: Array<Subtitle> = captions.map((value)=> ({start:value[':@'].timecodes.start ,dur: value[':@'].timecodes.dur, text:value.text[0].sentence})) 
  return { captionsData };
};
