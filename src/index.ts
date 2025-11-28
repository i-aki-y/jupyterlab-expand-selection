import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import {
  CodeMirrorEditor,
  IEditorExtensionRegistry,
  EditorExtensionRegistry
} from '@jupyterlab/codemirror';
import { EditorView } from '@codemirror/view';
import {
  expandSelectionExtension,
  expandSelection,
  shrinkSelection,
  swapAnchorHead
} from 'codemirror-expand-selection';

/**
 * Initialization data for the jupyterlab-expand-selection extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-expand-selection:plugin',
  description:
    'A JupyterLab extension that introduces expand/shrink selection commands',
  autoStart: true,
  requires: [INotebookTracker, IEditorExtensionRegistry],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    registry: IEditorExtensionRegistry
  ) => {
    console.log(
      'JupyterLab extension jupyterlab-expand-selection is activated!'
    );
    registry.addExtension(
      Object.freeze({
        name: 'jupyterlab-expand-selection:expand-selection-extension',
        factory: () =>
          EditorExtensionRegistry.createConfigurableExtension(
            () => expandSelectionExtension
          )
      })
    );
    app.commands.addCommand('jupyterlab-expand-selection:expand-selection', {
      label: 'Expand selected region',
      execute: () => {
        const notebook = notebookTracker.currentWidget;
        if (!notebook) {
          console.warn('No active notebook');
          return;
        }
        const activeCell = notebook.content.activeCell;
        if (!activeCell) {
          return;
        }
        const cmEditor = activeCell.editor as CodeMirrorEditor;
        const view = cmEditor.editor as EditorView;
        expandSelection(view);
      }
    });

    app.commands.addCommand('jupyterlab-expand-selection:shrink-selection', {
      label: 'Shrink selected region',
      execute: () => {
        const notebook = notebookTracker.currentWidget;
        if (!notebook) {
          console.warn('No active notebook');
          return;
        }
        const activeCell = notebook.content.activeCell;
        if (!activeCell) {
          return;
        }
        const cmEditor = activeCell.editor as CodeMirrorEditor;
        const view = cmEditor.editor as EditorView;
        shrinkSelection(view);
      }
    });

    app.commands.addCommand('jupyterlab-expand-selection:swap-anchor-head', {
      label: 'Swap anchor and head of the selected region',
      execute: () => {
        const notebook = notebookTracker.currentWidget;
        if (!notebook) {
          console.warn('No active notebook');
          return;
        }
        const activeCell = notebook.content.activeCell;
        if (!activeCell) {
          return;
        }
        const cmEditor = activeCell.editor as CodeMirrorEditor;
        const view = cmEditor.editor as EditorView;
        swapAnchorHead(view);
      }
    });
  }
};

export default plugin;
