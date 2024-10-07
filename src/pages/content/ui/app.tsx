import { useEffect, useState } from 'react';
import { PlayerDataResponse } from '@root/src/shared/types/types';
import { DesktopAppInjector } from '../components/desktop-app-Injector';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';

export default function App() {
  const { lastVideoId } =
    useStorage(userSettingsStore);
  const [playerData, setPlayerData] = useState<PlayerDataResponse>();
  const [hasPageVideo, setHasPageVideo] = useState(false);
  const [videoId, setVideoId] = useState('');

  const getPlayerData = () => {
    chrome.runtime.sendMessage('getPlayerData', (res: PlayerDataResponse) => {
      setPlayerData(res);
    });
  };

  useEffect(() => {
    if(videoId != '') {
        getPlayerData();
        setHasPageVideo(true);
    }
  }, [videoId]); 

  useEffect(()=>{
    const timerId = setInterval(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const videoParams = searchParams.get('v');
      if (videoId != videoParams) {
        setVideoId(videoParams);
        setHasPageVideo(true);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    }
  },[]);

  return (
    <>
      <DesktopAppInjector playerData={playerData?.playerData} hasPageVideo={hasPageVideo} />
    </>
  );
}
