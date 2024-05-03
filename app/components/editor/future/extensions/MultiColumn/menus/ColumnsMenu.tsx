import { BubbleMenu as BaseBubbleMenu, Editor } from "@tiptap/react";
import { useCallback } from "react";
import { sticky } from "tippy.js";
import { createId as cuid } from "@paralleldrive/cuid2";

import { getRenderContainer } from "~/components/editor/future/hooks/utils";
import { Toolbar } from "~/components/editor/future/components/Toolbar";
import { ColumnLayout } from "../Columns";
import { EditorIcon } from "~/components/icons";

interface ColumnsMenuProps {
  editor: Editor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appendTo?: React.RefObject<any>;
}

export const ColumnsMenu = ({ editor, appendTo }: ColumnsMenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${cuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button
          tooltip="Sidebar left"
          active={editor.isActive("columns", {
            layout: ColumnLayout.SidebarLeft,
          })}
          onClick={onColumnLeft}
        >
          <EditorIcon name="PanelLeft" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Two columns"
          active={editor.isActive("columns", {
            layout: ColumnLayout.TwoColumn,
          })}
          onClick={onColumnTwo}
        >
          <EditorIcon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Sidebar right"
          active={editor.isActive("columns", {
            layout: ColumnLayout.SidebarRight,
          })}
          onClick={onColumnRight}
        >
          <EditorIcon name="PanelRight" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
