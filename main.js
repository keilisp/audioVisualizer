const {
	app,
	BrowserWindow,
	electron
} = require('electron')

let win

app.on('ready', () => {
	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		show: false
	})
	win.loadFile('index.html')

	win.on('closed', () => {
		win = null
	})

	win.on('ready-to-show', () => {
		win.show()
	})
})