interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_API_IMAGE_URL: string
  readonly VITE_BASE_URI: string
  readonly VITE_LOG_ACCESS_URL: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
