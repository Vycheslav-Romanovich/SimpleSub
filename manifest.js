import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const manifest = {
  manifest_version: 3,
  name: 'SimpleSub',
  version: packageJson.version,
  description: packageJson.description,
  default_locale: 'en',
  permissions: [
    'tabs',
    'nativeMessaging',
    'scripting',
    'activeTab',
    'storage',
    'background',
    'alarms',
  ],
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  icons: {
    128: 'icon-128.png',
    256: 'icon-256.png',
    512: 'icon-512.png',
    1024: 'icon-1024.png',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-128.png',
  },
  host_permissions: ['https://www.youtube.com/*', 'https://m.youtube.com/*'],
  content_scripts: [
    {
      run_at: 'document_end',
      matches: ['*://*/*'],
      js: ['src/pages/contentUI/index.js'],
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
