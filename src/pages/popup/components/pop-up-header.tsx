import { SubTubeLogo } from '@root/src/assets/icons';
import styled from 'styled-components';

export const PopUpHeader = () => {
  return (
    <PopUpHeaderContainer>
      <PopupInner>
        <SubTubeLogo isDarkTheme={true} width={80} height={30} />
      </PopupInner>
    </PopUpHeaderContainer>
  );
};

const PopUpHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 305px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff50;
`;

const PopupInner = styled.div`
  display: flex;
  justify-content: center; 
  padding-inline: 30px;
  width: 100%;
}`;
