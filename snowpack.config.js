// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  env: {
    API_KEY: "AIzaSyDrxy80A6IKjzj0n7UJ1sRomf1vthFFBSk",
    AUTH_DOMAIN: "pwa-docs-755e0.firebaseapp.com",
    DATABASE_URL: "https://pwa-docs-755e0-default-rtdb.europe-west1.firebasedatabase.app",
    PROJECT_ID: "pwa-docs-755e0",
    STORAGE_BUCKET: "pwa-docs-755e0.appspot.com",
    MESSAGING_SENDER_ID: "557636904068",
    APP_ID: "1:557636904068:web:b6aeaaa9ff56ff8de28ed1"
  },
  mount: {
    'src' : '/'
  },
  routes: [
    { "match": "routes", "src": ".*", "dest": "index.html"}
  ],
  plugins: [
    '@snowpack/plugin-postcss',
    '@jadex/snowpack-plugin-tailwindcss-jit'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    tailwindConfig: './tailwind.config.js'
  },
  buildOptions: {
    /* ... */
  },
};
