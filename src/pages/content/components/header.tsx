import { SubTubeLogo, TargetIcon } from '@root/src/assets/icons';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';
import styled from 'styled-components';
import { scrollToElement } from '@src/shared/helpers/scroll-to-element';
import { Dispatch, SetStateAction } from 'react';
const isDarkTheme = document.querySelector('html').hasAttribute('dark');

type HeaderProps = {
  isOpen: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ isOpen, onOpen }: HeaderProps) => {
  const { autoscroll } = useStorage(userSettingsStore);

  function onTargetClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (autoscroll === 'off') {
      const activeCaption = document.querySelector('.caption-active');
      scrollToElement({ element: activeCaption, boundary: document.getElementById('injected') });
    }
  }

  return (
    <Head>
      <StyledLogoButton type="button" onClick={() => onOpen(prev => !prev)}>
        <SubTubeLogo isDarkTheme={isDarkTheme} />
      </StyledLogoButton>
      {isOpen && autoscroll === 'off' && (
        <StyledTargetButton onClick={onTargetClick}>
          <TargetIcon isDarkTheme={isDarkTheme} />
        </StyledTargetButton>
      )}
    </Head>
  );
};

const Head = styled.header`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  background-color: ${isDarkTheme ? '#212121' : '#ffffff'};
  border-radius: 12px;
  position: relative;
`;

const StyledTargetButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 15px;
`;

const StyledLogoButton = styled.button`
  all: unset;
  cursor: pointer;
  height: 50px;
`;
