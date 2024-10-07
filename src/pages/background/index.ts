import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { getYoutubeVideoId } from '@root/src/shared/tab';
import { CaptionsYoutube, CaptionsUrl } from '@root/src/shared/interfaces';
import { languageCode, optionsRequstCaptionsYoutube, optionsXmlParserYoutube, youtubeCaptionsUrl } from '@root/src/shared/constants';
import { parserCaptions } from '@root/src/utils/parserCaptions';
import { initCaptionsOptions } from '@root/src/utils/initCaptionsOptions';

reloadOnUpdate('pages/background');
reloadOnUpdate('pages/content/style.scss');

/*------------------------------- Get Player Data and send it to content ------------------------------- */
const getPlayerData = async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  
  const videoId: string = await getYoutubeVideoId();
  let defaultCaption: CaptionsYoutube[];

  try {
    const url: string = youtubeCaptionsUrl(videoId);
    const response = await fetch(url, optionsRequstCaptionsYoutube);
    if (response.status === 200) {
      const data: CaptionsUrl[] = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error(`${videoId}`);
      }

      // const choosedLang: CaptionsUrl = data.find((e) => e.languageCode.includes(languageCode.EN));
      const choosedLang: CaptionsUrl = data[0]
      if (choosedLang) {
        const requestCaptions = await fetch(choosedLang.baseUrl);
        const text: string = await requestCaptions.text();
        defaultCaption = parserCaptions(text, optionsXmlParserYoutube);
        initCaptionsOptions(defaultCaption);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
  return { tabId: tab.id, tabUrl: tab.url, playerData: defaultCaption } ;

  
  // return new Promise(resolve => {
  //   chrome.scripting.executeScript(
  //     {
  //       world: 'MAIN',
  //       injectImmediately: false,
  //       target: { tabId: tab.id },
  //       func: async url => {
  //         const data = await fetch(url)
  //           .then(res => res.text())
  //           .then(t => new window.DOMParser().parseFromString(t, 'text/html'))
  //           .then(t =>
  //             [...t.body.querySelectorAll(':scope > script')].find(t =>
  //               t.textContent.includes('captionTracks'),
  //             ),
  //           )
  //           .then(n => {
  //             if (!n) {
  //               return null;
  //             }
  //             eval(
  //               n.textContent +
  //                 `const data = {
  //                   captions: ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks,
  //                   translationLanguages: ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.translationLanguages,
  //                   videoDetails: ytInitialPlayerResponse.videoDetails,
  //                 };
  //                 localStorage.setItem("ytPlayerData",JSON.stringify(data));`,
  //             );
  //             const res = JSON.parse(localStorage.getItem('ytPlayerData'));
  //             localStorage.removeItem('ytPlayerData');
  //             return res;
  //           });

  //         return data;
  //       },
  //       args: [tab.url],
  //     },
  //     res => {
  //       if (res && res.length >= 0) {
  //         resolve({
  //           tabId: tab.id,
  //           tabUrl: tab.url,
  //           playerData: res[0].result,
  //         });
  //       } else {
  //         resolve({ tabId: tab.id, tabUrl: tab.url, playerData: null });
  //       }
  //     },
  //   );
  // });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab) {
    chrome.tabs.sendMessage(tabId, {
      action: 'tabUpdate',
      isDesktop: !tab.url.includes('m.youtube.com'),
      isVideoPage: tab.url.includes('watch'),
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getPlayerData') {
    (async () => {
      const result = await getPlayerData();
      sendResponse(result);
    })();

    return true;
  }
});
