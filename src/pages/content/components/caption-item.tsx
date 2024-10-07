import { TranslateIcon } from '@root/src/assets/icons/translate-icon';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';
import { Caption, CaptionKey, CaptionScales } from '@root/src/shared/types/types';
import { useRef, useEffect, useState, memo, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type CaptionItemProps = {
  sourceText: string;
  targetText: string;
  isActive: boolean;
  playbackSpeed: number;
  timestamp: {
    start: string;
    dur: string;
  };
  onClickItem: (timestamp: Caption[CaptionKey.Timings]) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

const CAPTION_NOT_FOUND = 'Caption not found';

export const CaptionItem = memo(
  ({
    sourceText,
    targetText,
    isActive,
    playbackSpeed,
    timestamp,
    onClickItem,
    ...props
  }: CaptionItemProps) => {
    const { captionsStyle, captionsScale } = useStorage(userSettingsStore);
    const [isTranslate, setIsTranslate] = useState(false);
    const containerRef = useRef<HTMLDivElement>();

    function onTranslate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.stopPropagation();
      setIsTranslate(!isTranslate);
    }

    useEffect(() => {
      if (isActive) {
        containerRef.current.classList.add('caption-active');
      } else if (!isActive && containerRef.current.classList.contains('caption-active')) {
        containerRef.current.classList.remove('caption-active');
      }
    }, [isActive]);

    const targetCaption = (targetText?.trim().length > 0 && targetText) || (
      <StyledNotFound>{CAPTION_NOT_FOUND}</StyledNotFound>
    );

    const sourceCaption = (typeof sourceText === 'string' && sourceText) || (
      <StyledNotFound>{CAPTION_NOT_FOUND}</StyledNotFound>
    );

    const startTimeOfSubs = (times: number) => {
      const time = Math.round(times * 1000 / 1000)
      const hours = Math.floor(time / 60 / 60)
      const minutes = Math.floor(time / 60) - hours * 60
      const seconds = time % 60
      const formatted = [hours.toString().padStart(2, '0'), minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')]
  
      formatted[0] === '00' && formatted.shift()
  
      return formatted.join(':')
    }

    return (
      <StyledCaptionContainer
        {...props}
        ref={containerRef}
        captionsScale={captionsScale}
        isActive={isActive}>
        {/*------------------- Playback Speed ----------------------- */}
        {/* <Speed isActive={isActive}>{playbackSpeed}x</Speed> */}

        {/*------------------- Translate Button ----------------------- */}
        {/* {captionsStyle !== 'double' && (
          <StyledTranslateButton onClick={onTranslate} isActive={isActive}>
            <TranslateIcon />
          </StyledTranslateButton>
        )} */}
        <Caption isActive={isActive}>
          {/* ----------------Learning Language (targetText)----------------- */}
          {/* {(captionsStyle === 'default' || captionsStyle === 'double') && (
            <p>{isTranslate ? sourceCaption : targetCaption}</p>
          )}

          {captionsStyle === 'double' && <Divider isActive={isActive} />} */}
          <StyledCaptionTime
            onClick={() => onClickItem(timestamp)}>
            {startTimeOfSubs(+timestamp.start)}
          </StyledCaptionTime>
          {/* ----------------Native Language (sourceText)----------------- */}
          {(captionsStyle === 'translate' || captionsStyle === 'double') && (
            <p>{isTranslate ? targetCaption : sourceCaption}</p>
          )}
        </Caption>
      </StyledCaptionContainer>
    );
  },
);

const isDarkTheme = document.querySelector('html').hasAttribute('dark');

const StyledCaptionContainer = styled.div<{ isActive: boolean; captionsScale: CaptionScales }>`
  border-radius: 8px;
  min-height: 62px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 100%;
  font-size: ${props => props.captionsScale}px;
`;

const Caption = styled.div<{ isActive: boolean }>`
  min-height: inherit;
  background-color: ${props =>
    props.isActive ? (isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(50, 174, 7, 0.20)') : 'transparent'};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-inline: 10px;
  border-radius: 8px;
  scroll-margin: 200px;
`;

const Speed = styled.span<{ isActive: boolean }>`
  font-weight: ${props => (props.isActive ? 700 : 400)};
  color: #3ea6ff;
`;

const dividerBgColor = {
  dark: {
    active: '#ffffff',
    inactive: '#ffffff88',
  },
  light: {
    active: '#0f0f0f',
    inactive: '#0f0f0f88',
  },
};

const Divider = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 1px;
  background-color: ${props =>
    props.isActive
      ? dividerBgColor[isDarkTheme ? 'dark' : 'light'].active
      : dividerBgColor[isDarkTheme ? 'dark' : 'light'].inactive};
`;

const clrTranslateBtn = {
  dark: {
    active: '#ffffff',
    inactive: '#ffffff88',
  },
  light: {
    active: '#0f0f0f',
    inactive: '#0f0f0f88',
  },
};

const StyledTranslateButton = styled.button<{ isActive: boolean }>`
  all: unset;
  cursor: pointer;
  transform: scale(1);
  transition: 0.2s ease-in-out all;
  fill: ${props =>
    props.isActive
      ? clrTranslateBtn[isDarkTheme ? 'dark' : 'light'].active
      : clrTranslateBtn[isDarkTheme ? 'dark' : 'light'].inactive};

  &:hover {
    transform: scale(1.05);
    fill: #3ea6ff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StyledNotFound = styled.span`
  color: ${isDarkTheme ? '#ffffff88' : '#0f0f0f88'};
`;

CaptionItem.displayName = 'CaptionItem';

const StyledCaptionTime = styled.div`
  padding: 2px 4px; 
  border-radius: 4px; 
  background: #41A81D;
  color: white; 
  fontSize: 14px; 
  cursor: pointer;
`;