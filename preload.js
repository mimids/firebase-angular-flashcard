const {electron, remote,ipcRenderer, app} = require('electron');

process.once('loaded', () => {
    global.ipcRenderer = ipcRenderer;
    global.app = app;
});

// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     for (const type of ['chrome', 'node', 'electron']) {
//       replaceText(`${type}-version`, process.versions[type])
//     }
//   })