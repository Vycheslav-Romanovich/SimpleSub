import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ToggleSettingsType } from '@root/src/shared/types/types';

type ToggleGroupSettingsProps = {
  title?: string;
  defaultValue: ToggleSettingsType;
  options: { value: ToggleSettingsType; label: string }[];
  onChangeValue: (value: ToggleSettingsType) => void;
};

export const ToggleGroupSettings = ({
  title,
  defaultValue,
  options,
  onChangeValue,
}: ToggleGroupSettingsProps) => {
  return (
    <div>
      {title && <h2 className="settingsTitle">{title}:</h2>}
      <ToggleGroup.Root
        type="single"
        value={defaultValue as string}
        defaultValue={defaultValue as string}
        className="ToggleGroup">
        {options.map(({ value, label }) => (
          <ToggleGroup.Item
            key={value}
            className="ToggleGroupItem"
            value={value as string}
            onClick={() => onChangeValue(value)}>
            <span>{label}</span>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};
