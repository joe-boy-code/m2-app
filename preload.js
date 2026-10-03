const { contextBridge, ipcRenderer } = require('electron');

// Hapa tunatengeneza daraja salama la kupitisha data kwenda kwenye index.html
contextBridge.exposeInMainWorld('stavifaAPI', {
    ombaData: () => ipcRenderer.send('omba-data-za-video'),
    pokyaData: (callback) => ipcRenderer.on('pokea-data-za-video', (event, data) => callback(data))
});
