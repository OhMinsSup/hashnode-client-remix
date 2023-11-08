import type { EditorState, Transaction } from "@tiptap/pm/state";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
// import fileService from "services/file.service";

const deleteKey = new PluginKey("delete-image");
const IMAGE_NODE_TYPE = "image";

interface ImageNode extends ProseMirrorNode {
  attrs: {
    src: string;
    id: string;
  };
}

const TrackImageDeletionPlugin = (): Plugin =>
  new Plugin({
    key: deleteKey,
    appendTransaction: (
      transactions: readonly Transaction[],
      oldState: EditorState,
      newState: EditorState
    ) => {
      const newImageSources = new Set();
      newState.doc.descendants((node) => {
        if (node.type.name === IMAGE_NODE_TYPE) {
          newImageSources.add(node.attrs.src);
        }
      });

      transactions.forEach((transaction) => {
        if (!transaction.docChanged) return;

        const removedImages: ImageNode[] = [];

        oldState.doc.descendants((oldNode, oldPos) => {
          if (oldNode.type.name !== IMAGE_NODE_TYPE) return;
          if (oldPos < 0 || oldPos > newState.doc.content.size) return;
          if (!newState.doc.resolve(oldPos).parent) return;

          const newNode = newState.doc.nodeAt(oldPos);

          // Check if the node has been deleted or replaced
          if (!newNode || newNode.type.name !== IMAGE_NODE_TYPE) {
            if (!newImageSources.has(oldNode.attrs.src)) {
              removedImages.push(oldNode as ImageNode);
            }
          }
        });

        removedImages.forEach(async (node) => {
          const src = node.attrs.src;
          await onNodeDeleted(src);
        });
      });

      return null;
    },
  });

export default TrackImageDeletionPlugin;

async function onNodeDeleted(src: string): Promise<void> {
  try {
    const assetUrlWithWorkspaceId = new URL(src).pathname.substring(1);
    console.log("assetUrlWithWorkspaceId: ", assetUrlWithWorkspaceId);
    // const resStatus = await fileService.deleteImage(assetUrlWithWorkspaceId);
    // if (resStatus === 204) {
    //   console.log("Image deleted successfully");
    // }
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
}
