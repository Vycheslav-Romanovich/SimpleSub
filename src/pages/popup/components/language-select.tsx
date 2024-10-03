import styled from 'styled-components';
import { ComponentPropsWithRef } from 'react';
import { LANGS } from '@root/src/shared/data/LANGS_ARRAY';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: 16px;
  line-height: 1;
  border-radius: 4px;
  box-shadow: 0 2px 5px #ffffff50;
  padding: 8px 12px;
  background-color: #ffffff50;
  color: #ffffff;
  position: relative;
  width: 100%;
  outline: none;
`;

const StyledOption = styled.option`
  background: #000000;
  color: #ffffff;
`;

const StyledLabel = styled.label`
  text-align: start;
  margin: 0;
  font-size: 24px;
  color: white;
  padding-bottom: 12px;
  font-weight: 700;
`;

type LanguageSelectProps = {
  label?: string;
  options: typeof LANGS;
} & ComponentPropsWithRef<'select'>;

export const LanguageSelect = ({ label, options, ...props }: LanguageSelectProps) => {
  return (
    <StyledContainer>
      {label && <StyledLabel htmlFor={props.id}>{label}</StyledLabel>}
      <StyledSelect {...props}>
        {options.map(({ lang, languageName }) => (
          <StyledOption key={lang} value={lang}>
            {languageName}
          </StyledOption>
        ))}
      </StyledSelect>
    </StyledContainer>
  );
};
