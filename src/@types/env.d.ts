/* eslint-disable no-unused-vars */
interface ImportMetaEnv {
  readonly VITE_API_TOKEN: string
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_API_IMAGE_URL: string
  readonly VITE_BASE_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
