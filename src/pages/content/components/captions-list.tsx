import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CaptionItem } from './caption-item';
import styled from 'styled-components';
import { Caption, CaptionKey, Subtitle } from '@root/src/shared/types/types';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';
import { scrollToElement } from '@src/shared/helpers/scroll-to-element';

const PLAYBACK_SPEED = 0.5;

type CaptionsListProps = {
  captions: Subtitle[];
};

export const CaptionsList = memo(({ captions }: CaptionsListProps) => {
  const { autoscroll } = useStorage(userSettingsStore);
  const videoRef = useRef<HTMLMediaElement>(document.querySelector('.html5-main-video'));
  const listRef = useRef<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number>();

  // console.log('activeIndex----------->', activeIndex);

  const onClickCaptionAndSlowdown = useCallback((timestamp: Caption[CaptionKey.Timings]) => {
    const delay = (+timestamp.dur / (PLAYBACK_SPEED * 100)) * 100 * 1000;
    videoRef.current.currentTime = +timestamp.start + 0.666;
    // videoRef.current.playbackRate = PLAYBACK_SPEED;
    setTimeout(() => (videoRef.current.playbackRate = 1), delay);
  }, []);

  useEffect(() => {
    if (autoscroll === 'on' && listRef && activeIndex) {
      const activeItem = listRef.current.children[activeIndex];
      scrollToElement({ element: activeItem, boundary: document.getElementById('injected') });
    }
  }, [activeIndex, autoscroll]);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const videoListener = () => {
        const time = videoElement.currentTime;

        const activeIndex = captions.findIndex((caption, idx) => {
          const start = +caption.start;
          const nextCaptionStart = +captions[idx + 1]?.start;
          return time >= start && time < nextCaptionStart;
        });

        if (activeIndex !== -1) {
          setActiveIndex(activeIndex);
        }
      };

      videoElement.addEventListener('timeupdate', videoListener);
      return () => {
        videoElement.removeEventListener('timeupdate', videoListener);
      };
    }
  }, [captions]);

  return (
    <StyledList ref={listRef}>
      {captions.map((caption, index) => (
        <CaptionItem
          key={index}
          sourceText={caption.text}
          targetText={caption.translate}
          timestamp={{ start: caption.start, dur: caption.dur }}
          onClickItem={onClickCaptionAndSlowdown}
          isActive={index === activeIndex}
          playbackSpeed={PLAYBACK_SPEED}
        />
      ))}
    </StyledList>
  );
});

CaptionsList.displayName = 'CaptionItem';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  align-items: flex-start;
`;
