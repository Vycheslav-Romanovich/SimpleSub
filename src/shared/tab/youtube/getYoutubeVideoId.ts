import { getCurrentTab } from '../getCurrentTab';

export const getYoutubeVideoId = async (): Promise<string> => {
  const dataCurrentTab: chrome.tabs.Tab = await getCurrentTab();
  const videoId: string = dataCurrentTab.url.split('v=')[1] ?? 'notFound';
  return videoId;
};
