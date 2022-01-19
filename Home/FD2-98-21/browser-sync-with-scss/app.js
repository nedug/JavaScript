const browserSync = require('browser-sync').create();

browserSync.init({
  "files": ["./app/**/*.{html,css,js}"],
  "server": "app",
  "port": 9000,
  "proxy": false,
  "ghostMode": false,
  "reloadDelay": 0,
  "reloadDebounce": 800,
  "injectChanges": false,
  "minify": false,
  "open": true,
  "notify": false
});