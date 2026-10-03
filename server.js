const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let top50Database = [
    { id: 1, kundi: "Football", jinaSwa: "Yanga vs Simba Magoli Yote", jinaEng: "Yanga vs Simba All Goals", mwenendo: "up", nafasi: 1, videoUrl: "http://link-ya-video1.mp4", sizeHigh: 45.2, sizeMid: 22.4, sizeLow: 12.1 },
    { id: 2, kundi: "Boxing", jinaSwa: "Mike Tyson vs Jake Paul Highlights", jinaEng: "Mike Tyson vs Jake Paul Highlights", mwenendo: "up", nafasi: 2, videoUrl: "http://link-ya-video2.mp4", sizeHigh: 50.1, sizeMid: 25.3, sizeLow: 14.2 },
    { id: 3, kundi: "Music", jinaSwa: "Diamond Platnumz - New Hit", jinaEng: "Diamond Platnumz - New Hit", mwenendo: "down", nafasi: 3, videoUrl: "http://link-ya-video3.mp4", sizeHigh: 30.5, sizeMid: 15.2, sizeLow: 8.5 }
];

function tengenezaDirisha() {
    const win = new BrowserWindow({
        width: 1050,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Washa daraja la preload hapa
            nodeIntegration: false,                      // Zima kwa usalama wa PWA baadae
            contextIsolation: true                       // Washa ulinzi rasmi
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    // Sukuma data mbele kiotomatiki ukurasa ukimaliza kupakia
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('pokea-data-za-video', top50Database);
    });
}

app.whenReady().then(tengenezaDirisha);

ipcMain.on('omba-data-za-video', (event) => {
    event.reply('pokea-data-za-video', top50Database);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
