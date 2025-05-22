import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'rick_morty_remote',
      remotes: {
        rick_morty_host: 'http://localhost:5173/assets/hostEntry.js',
      },
      filename: 'remoteEntry.js',
      exposes: {
        './CharacterCard': './src/components/CharacterCard',
        './CharacterSearcher': './src/components/CharacterSearcher',
        './CharactersFilters': './src/components/CharactersFilters',
        './CharacterDetails': './src/components/CharacterDetails',
        './Characters': './src/interfaces/Characters.ts',
      },
      shared: [
        'react',
        'react-dom',
        'zustand',
        'bootstrap',
        'axios',
        'react-bootstrap',
        'react-paginate',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  // Silence Sass deprecation warnings.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
})
