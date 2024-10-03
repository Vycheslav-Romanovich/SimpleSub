import { SubTubeLogo } from '@root/src/assets/icons';
import { environment } from '@root/src/utils/environment';
import styled from 'styled-components';

export const AuthNavigationButtons = () => {
  const onSignIn = () => {
    window.open(`${environment.website}/dev_summify/sign-in`, '_blank');
  };
  const onSignUp = () => {
    window.open(`${environment.website}/dev_summify/sign-up`, '_blank');
  };

  return (
    <AuthNavigationButtonsContainer>
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>
        Welcome to <SubTubeLogo isDarkTheme={true} width={100} height={30} />{' '}
      </h1>

      <ActionsStyled>
        <Button onClick={onSignIn}>Sign In</Button>
        <Divider>
          <Line></Line>
          <OrText>OR</OrText>
          <Line></Line>
        </Divider>
        <Button onClick={onSignUp}>Sign Up</Button>
      </ActionsStyled>
    </AuthNavigationButtonsContainer>
  );
};

const AuthNavigationButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 220px;
  height: 315px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  line-height: 1;
  border-radius: 4px;
  box-shadow: 0 2px 5px #ffffff50;
  padding: 8px 12px;
  background-color: #ffffff50;
  color: #ffffff;
  outline: none;
  text-align: center;
  transition: all 0.2s ease-in-out;
  scale: 1;
  font-weight: bold;
  user-select: none;
  width: -webkit-fill-available;

  &:hover {
    background-color: rgb(157, 182, 218);
  }

  &:active {
    scale: 0.98;
  }
`;

const ActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  width: 90%;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 10px;
`;

const Line = styled.div`
  width: 50px;
  height: 1px;
  background-color: #ffffff88;
`;

const OrText = styled.span`
  margin: 0 18px;
  font-size: 14px;
  color: #ffffff88;
`;
