import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-expand-selection extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-expand-selection:plugin',
  description: 'A JupyterLab extension that introduces expand/shrink selection commands',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-expand-selection is activated!');
  }
};

export default plugin;
