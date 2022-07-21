/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_TOKEN:string
 // more env variables...
}

interface ImportMeta {
 readonly env: ImportMetaEnv
}
