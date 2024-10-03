import styled from 'styled-components';
const isDarkTheme = document.querySelector('html').hasAttribute('dark');

type NotFoundCaptionsProps = {
  message?: string;
};

export const NotFoundCaptions = ({
  message = 'No available captions for this video',
}: NotFoundCaptionsProps) => {
  return (
    <StyledContainer>
      <h1
        style={{
          color: `${isDarkTheme ? '#ffffff' : '#000000'}`,
          textAlign: 'center',
          fontWeight: 700,
          marginTop: '50px',
        }}>
        {message}
      </h1>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: ${isDarkTheme ? '#212121' : '#ffffff'};
  overflow: clip;
`;
