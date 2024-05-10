import * as Popover from '@radix-ui/react-popover';

import { LinkEditorPanel } from '~/components/editor/future/components/LinkEditorPanel';
import { Toolbar } from '~/components/editor/future/components/Toolbar';
import { EditorIcon } from '~/components/icons';

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Set Link">
          <EditorIcon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
};
