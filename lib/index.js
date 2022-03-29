module.exports = [
  {
    id: 'idle-redirector',
    autoStart: true,
    activate: function (app) {
      console.log('JupyterLab extension idle-redirector is activated!');

      var timeoutInMiliseconds = 1800 * 1000;
      var timeoutId;
      var lastTrigeredTime = 0;

      function startTimer() {
        timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
      }

      function resetTimer() {
        if (Date.now() - lastTrigeredTime > 10000) {
          console.log("[idle-redirector] timer reset");
          lastTrigeredTime = Date.now();
          window.clearTimeout(timeoutId);
          startTimer();
        }
      }

      function doInactive() {
        console.log("[idle-redirector] redirect triggered due to user inactivity");
        window.location.href = "/hub/home";
      }

      function setupTimers() {
        document.addEventListener("keypress", resetTimer);
        document.addEventListener("mousedown", resetTimer);
        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("touchmove", resetTimer);

        startTimer();
      }

      setupTimers();
    }
  }
];
