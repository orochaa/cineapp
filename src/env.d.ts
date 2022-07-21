/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_TOKEN:string
  readonly API_URL:string
 // more env variables...
}

interface ImportMeta {
 readonly env: ImportMetaEnv
}
