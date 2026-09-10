/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_META_CAPI_ENDPOINT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	dataLayer: Array<Record<string, unknown>>;
}
