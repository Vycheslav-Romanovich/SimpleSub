import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import styled from 'styled-components';
import { Settings } from './components/settings';
import { PopUpHeader } from './components/pop-up-header';

const Popup = () => {
  return (
    <PopupContainer>
      <PopUpHeader />
      <Settings />
    </PopupContainer>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);

const PopupContainer = styled.div`
  background-color: #343434;
}`;
