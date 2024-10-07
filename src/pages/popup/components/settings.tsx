import React from 'react';
import { LANGS, type LangCodeType } from '@root/src/shared/data/LANGS_ARRAY';
import useStorage from '@root/src/shared/hooks/useStorage';
import { userSettingsStore } from '@root/src/shared/storages/user-settings';
import { captionSettings } from '@root/src/shared/data/caption-settings';
import { AutoscrollVariant, CaptionScales, CaptionStyles } from '@root/src/shared/types/types';
import styled from 'styled-components';
import { ToggleGroupSettings } from './toggle-group-settings';
import { LanguageSelect } from './language-select';
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background-color: #343434;
}
`;

export const Settings = () => {
  const { sourceLangCode, targetLangCode, captionsStyle, captionsScale, autoscroll } =
    useStorage(userSettingsStore);
  return (
    <SettingsContainer>
      {/* <LanguageSelect
        options={LANGS}
        label={'Learning Language'}
        id="target-lang"
        name={'target-lang'}
        defaultValue={targetLangCode}
        onChange={e => userSettingsStore.setTargetLangCode(e.target.value as LangCodeType)}
      />
      <LanguageSelect
        options={LANGS}
        label={'Native Language'}
        id="source-lang"
        name={'source-lang'}
        defaultValue={sourceLangCode}
        onChange={e => userSettingsStore.setSourceLangCode(e.target.value as LangCodeType)}
      /> */}

      {/* <ToggleGroupSettings
        title={'Captions style'}
        defaultValue={captionsStyle}
        options={captionSettings.style}
        onChangeValue={value => userSettingsStore.setCaptionsStyle(value as CaptionStyles)}
      /> */}
      <ToggleGroupSettings
        title={'Captions scale'}
        defaultValue={captionsScale}
        options={captionSettings.scale}
        onChangeValue={value => userSettingsStore.setCaptionsScale(value as CaptionScales)}
      />
      <ToggleGroupSettings
        title={'Autoscroll'}
        defaultValue={autoscroll}
        options={captionSettings.autoscroll}
        onChangeValue={value => userSettingsStore.toggleAutoscroll(value as AutoscrollVariant)}
      />
    </SettingsContainer>
  );
};
