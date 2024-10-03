import { AutoscrollVariant, CaptionScales, CaptionStyles } from '../types/types';

export const captionSettings: CaptionSettingsType = {
  style: [
    {
      value: 'default',
      label: 'Default',
    },
    {
      value: 'translate',
      label: 'Translate',
    },
    {
      value: 'double',
      label: 'Double',
    },
  ],
  scale: [
    {
      value: 16,
      label: 'Default',
    },
    {
      value: 14,
      label: 'Small',
    },
    {
      value: 20,
      label: 'Large',
    },
  ],
  autoscroll: [
    {
      value: 'on',
      label: 'Enabled',
    },
    {
      value: 'off',
      label: 'Disabled',
    },
  ],
};

type CaptionSettingsType = {
  style: {
    value: CaptionStyles;
    label: string;
  }[];
  scale: {
    value: CaptionScales;
    label: string;
  }[];
  autoscroll: {
    value: AutoscrollVariant;
    label: string;
  }[];
};
