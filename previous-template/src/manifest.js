module.exports = {
  name: 'coding is love',
  version: '0.0.1',
  description: 'a vue powered new tab for chrome',
  author: 'craigp@codehq.co.za',
  manifest_version: 2,
  icons: { 16: 'icons/16.png', 128: 'icons/128.png' },
  permissions: [
    //   '<all_urls>',
    //   '*://*/*',
    'https://www.bing.com/*',
    'https://app.asana.com/*',
    //   'activeTab',
    //   'tabs',
    //   'cookies',
    // 'background',
    //   'contextMenus',
    //   'unlimitedStorage',
    // 'storage',
    // 'notifications',
    'identity',
    'identity.email',
  ],
  oauth2: {
    client_id: '505809764072-dl1cqtfuggraum9n7tb5kba656j20e6a.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive',
    ],
  },
  // browser_action: {
  //   default_title: 'title',
  //   default_popup: 'pages/popup.html'
  // },
  background: {
    persistent: false,
    page: 'pages/background.html',
  },
  devtools_page: 'pages/devtools.html',
  // options_page: 'pages/options.html',
  // content_scripts: [{
  //   js: [ 'js/inject.js' ],
  //   run_at: 'document_end',
  //   matches: ['<all_urls>'],
  //   all_frames: true
  // }],
  chrome_url_overrides: {
    newtab: 'pages/app.html',
  },
  content_security_policy: 'script-src \'self\' \'unsafe-eval\'; object-src \'self\'',
};
