import { Subtitle } from '@root/src/shared/types/types';
import { ContainerWithPortal } from './container-with-portal';
import { Header } from './header';
import styled from 'styled-components';
import { CaptionsList } from './captions-list';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';
import { useEffect, memo, useState } from 'react';
import { Loader } from '@pages/content/components/loader';
import { NotFoundCaptions } from './no-found-captions';
import { motion } from 'framer-motion';
import { getCaptions } from '@root/src/api/captionsAPI';
import { CaptionsYoutube } from '@root/src/shared/interfaces';

type DesktopAppInjectorProps = {
  playerData: CaptionsYoutube[];
  hasPageVideo: boolean;
};

export const DesktopAppInjector = memo(({ playerData, hasPageVideo }: DesktopAppInjectorProps) => {
  const { sourceLangCode, targetLangCode } = useStorage(userSettingsStore);
  const [isOpen, setIsOpen] = useState(false);
  const [captions, setCaptions] = useState<Subtitle[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [noCaptions, setNoCaptions] = useState(false);

  // console.log('playerData---->>>', playerData);

  useEffect(() => {
    setIsLoading(true);
    if (playerData !== null && hasPageVideo && playerData !== undefined) {
      getCaptions({
        captions: playerData,
        defaultLang: sourceLangCode,
        translateLang: targetLangCode,
      })
        .then(captions => {
          setCaptions(captions?.captionsData);
          setIsLoading(false);
        })
        .catch(e => {
          console.error('getCaptions error:', e);
        });
        // .finally(() => {
        //   setIsLoading(false);
        // });
      setNoCaptions(false);
    } else {
      // setCaptions(null);
      setIsLoading(false);
      // if (hasPageVideo) {
        setNoCaptions(true);
      // }
    }

    return () => {
      setCaptions([]);
    };
  }, [playerData, sourceLangCode, targetLangCode]);

  return (
    <ContainerWithPortal isOpen={isOpen}>
      <Header isOpen={isOpen} onOpen={setIsOpen} />
      <StyledMain
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        isOpen={isOpen}>
        {(playerData === undefined || isLoading) && (
          <Loader color={isDarkTheme ? '#ffffff' : '#CCCCCC'} />
        )}
        {captions && captions.length > 0 && <CaptionsList captions={captions} />}
        {noCaptions && <NotFoundCaptions />}
      </StyledMain>
    </ContainerWithPortal>
  );
});

DesktopAppInjector.displayName = 'DesktopAppInjector';

const isDarkTheme = document.querySelector('html').hasAttribute('dark');

const StyledMain = styled(motion.div)<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  height: calc(100% - 50px);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  border-color: ${isDarkTheme ? '#212121' : '#ffffff'};
  border-width: 0 25px 10px 25px;
  border-style: solid;
  border-radius: 12px;
  position: relative;
`;
