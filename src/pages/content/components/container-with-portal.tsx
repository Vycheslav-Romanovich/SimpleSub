import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const isDarkTheme = document.querySelector('html').hasAttribute('dark');

const StyledContainer = styled(motion.div)<{ containerHeight: number }>`
  height: ${props => props.containerHeight}px;
  background-color: ${isDarkTheme ? '#212121' : '#ffffff'};
  border-radius: 12px;
  border: 1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${isDarkTheme ? 'white' : '#0f0f0f'};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  svg {
    cursor: pointer;
  }
`;

type ContainerWithPortalProps = {
  children: ReactNode;
  isOpen: boolean;
};

const MAX_HEIGHT_BASE = 50;

export const ContainerWithPortal = ({ children, isOpen }: ContainerWithPortalProps) => {
  const [injectContainer, setInjectContainer] = useState<HTMLElement>();
  const [maxHeightContainer, setMaxHeight] = useState(50);

  const createInjectedContainer = () => {
    const injected = document.createElement('div');
    const below = document.getElementById('below');
    injected.id = 'injected';
    injected.style.marginBottom = '20px';
    const columns = document.getElementById('columns');
    const secondary = columns.querySelector('#secondary');

    if (secondary.querySelector('#secondary-inner').children.length > 0) {
      secondary.prepend(injected);
    } else if (below) {
      below.prepend(injected);
    }
    setInjectContainer(injected);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const player = document.querySelector('.html5-main-video');
      setMaxHeight(player.clientHeight);
    });

    const interval = setInterval(() => {
      const secondary = document.getElementById('secondary');
      const video = document.querySelector('.html5-main-video');

      if (secondary && video && window.location.href.includes('watch')) {
        createInjectedContainer();
        resizeObserver.observe(video);
        clearInterval(interval);
      }
    }, 777);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {injectContainer &&
        createPortal(
          <StyledContainer
            containerHeight={isOpen ? maxHeightContainer : MAX_HEIGHT_BASE}
            initial={{ height: MAX_HEIGHT_BASE }}
            animate={{ height: isOpen ? maxHeightContainer : MAX_HEIGHT_BASE }}
            transition={{ duration: 0.3 }}>
            {children}
          </StyledContainer>,
          injectContainer,
          'injection',
        )}
    </>
  );
};
