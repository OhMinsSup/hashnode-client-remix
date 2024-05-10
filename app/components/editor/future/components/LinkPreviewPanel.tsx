import { Surface } from '~/components/editor/future/components/Surface';
import { Toolbar } from '~/components/editor/future/components/Toolbar';
import { Tooltip } from '~/components/editor/future/components/Tooltip';
import { EditorIcon } from '~/components/icons';

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
  url,
}: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm underline"
      >
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <EditorIcon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <EditorIcon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
