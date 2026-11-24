import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

const rawStars = Number.parseInt(process.env.BRAINCHOMP_GH_STARS || '2', 10)
const GH_STARS = Number.isFinite(rawStars) && rawStars >= 0 ? rawStars : 2

/**
 * Headers required for cross-origin isolation (SharedArrayBuffer -> threaded CPU WASM).
 * Enables CPU WASM fallback during local development, preview, and testing.
 */
const ISOLATION_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin',
}

function brainchompStarsPlugin() {
  return {
    name: 'brainchomp-stars-plugin',
    transformIndexHtml(html) {
      return html.replace(/__BRAINCHOMP_GH_STARS__/g, String(GH_STARS))
    },
  }
}

export default defineConfig({
  root: '.',
  base: './', // Relative assets work at brainchomp.org and locally.
  define: {
    __BRAINCHOMP_GH_STARS__: JSON.stringify(GH_STARS),
  },
  plugins: [
    brainchompStarsPlugin(),
    // Generate gzip compressed files
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Generate brotli compressed files (better compression than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  server: {
    open: 'index.html',
    headers: ISOLATION_HEADERS,
  },
  preview: {
    port: 8088,
    headers: ISOLATION_HEADERS,
  },
  worker: {
    format: 'es',
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000, // Increase limit since medical imaging libs are naturally large
    rollupOptions: {
      output: {
        manualChunks(id) {
          // NiiVue visualization library
          if (id.includes('@niivue/niivue')) {
            return 'vendor-niivue'
          }
          // 3D math utilities
          if (id.includes('gl-matrix')) {
            return 'vendor-math'
          }
          // Compression libraries (loaded dynamically when needed)
          if (id.includes('blosc') || id.includes('lz4') || id.includes('zstd')) {
            return 'vendor-compression'
          }
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  esbuild: {
    treeShaking: true,
    drop: ['debugger'],
  },
})
