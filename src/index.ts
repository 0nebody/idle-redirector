import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the idle-redirector extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'idle-redirector:plugin',
  description:
    'A JupyterLab extension to redirect idle JupyterHub users to the JupyterHub server home.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension idle-redirector is activated!');

    const timeoutInMilliseconds: number = 1800 * 1000;
    let timeoutId: number;
    let lastTriggeredTime: number = 0;

    function startTimer() {
      timeoutId = window.setTimeout(doInactive, timeoutInMilliseconds);
    }

    function resetTimer() {
      if (Date.now() - lastTriggeredTime > 10000) {
        lastTriggeredTime = Date.now();
        window.clearTimeout(timeoutId);
        startTimer();
      }
    }

    function doInactive() {
      console.log(
        '[idle-redirector] redirect triggered due to user inactivity'
      );
      window.location.href = '/hub/home';
    }

    function setupTimers() {
      document.addEventListener('keypress', resetTimer);
      document.addEventListener('mousedown', resetTimer);
      document.addEventListener('mousemove', resetTimer);
      document.addEventListener('touchmove', resetTimer);

      startTimer();
    }

    setupTimers();
  }
};

export default plugin;
