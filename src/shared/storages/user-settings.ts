import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { LangCodeType } from '../data/LANGS_ARRAY';
import {
  AutoscrollVariant,
  CaptionScales,
  CaptionStyles,
  YtCaptionOption,
} from '@src/shared/types/types';

type UserSettings = {
  sourceLangCode: LangCodeType;
  targetLangCode: LangCodeType;
  availableCaptionsList: YtCaptionOption[] | null;
  captionsStyle: CaptionStyles;
  captionsScale: CaptionScales;
  autoscroll: AutoscrollVariant;
  lastVideoId: string;
};

type UserStorageType = BaseStorage<UserSettings> & {
  setSourceLangCode: (langCode: LangCodeType) => void;
  setTargetLangCode: (langCode: LangCodeType) => void;
  setAvailableCaptionsList: (options: YtCaptionOption[]) => void;
  setCaptionsStyle: (style: CaptionStyles) => void;
  setCaptionsScale: (scale: CaptionScales) => void;
  toggleAutoscroll: (autoscroll: AutoscrollVariant) => void;
  setLastVideoId: (lastVideoId: string) => void;
};

const userStorage = createStorage<UserSettings>(
  'user_storage',
  {
    sourceLangCode: 'en',
    targetLangCode: 'en',
    availableCaptionsList: null,
    captionsStyle: 'translate',
    captionsScale: 16,
    autoscroll: 'on',
    lastVideoId: '',
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

export const userSettingsStore: UserStorageType = {
  ...userStorage,
  setSourceLangCode: async (langCode: LangCodeType) => {
    await userStorage.set(storage => {
      return { ...storage, sourceLangCode: langCode };
    });
  },
  setTargetLangCode: async (langCode: LangCodeType) => {
    await userStorage.set(storage => {
      return { ...storage, targetLangCode: langCode };
    });
  },
  setAvailableCaptionsList: async (options: YtCaptionOption[]) => {
    await userStorage.set(storage => {
      return { ...storage, availableCaptionsList: [...options] };
    });
  },
  setCaptionsStyle: async (style: CaptionStyles) => {
    await userStorage.set(storage => {
      return { ...storage, captionsStyle: style };
    });
  },
  setCaptionsScale: async (scale: CaptionScales) => {
    await userStorage.set(storage => {
      return { ...storage, captionsScale: scale };
    });
  },
  toggleAutoscroll: async (autoscroll: AutoscrollVariant) => {
    await userStorage.set(storage => {
      return { ...storage, autoscroll };
    });
  },
  setLastVideoId: async (lastVideoId: string) => {
    await userStorage.set(storage => {
      return { ...storage, lastVideoId: lastVideoId };
    });
  },
};
