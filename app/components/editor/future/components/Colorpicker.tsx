import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { ColorButton } from '~/components/editor/future/components/ColorButton';
import { Toolbar } from '~/components/editor/future/components/Toolbar';
import { EditorIcon } from '~/components/icons';

export const themeColors = [
  '#fb7185',
  '#fdba74',
  '#d9f99d',
  '#a7f3d0',
  '#a5f3fc',
  '#a5b4fc',
];

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '');

  const handleColorUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColorInputValue(event.target.value);
    },
    [],
  );

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange('');
      }

      return;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker
        className="w-full"
        color={color || ''}
        onChange={onChange}
      />
      <input
        type="text"
        className="w-full rounded border border-neutral-200 bg-white p-2 text-black focus:outline-1 focus:outline-neutral-300 focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-white dark:focus:outline-neutral-700"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex max-w-[15rem] flex-wrap items-center gap-1">
        {themeColors.map((currentColor) => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <EditorIcon name="Undo" />
        </Toolbar.Button>
      </div>
    </div>
  );
};
