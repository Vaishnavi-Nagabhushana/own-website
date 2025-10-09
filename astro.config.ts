import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import spectre from './package/src';

// const {
//   GISCUS_REPO,
//   GISCUS_REPO_ID,
//   GISCUS_CATEGORY,
//   GISCUS_CATEGORY_ID,
//   GISCUS_MAPPING,
//   GISCUS_STRICT,
//   GISCUS_REACTIONS_ENABLED,
//   GISCUS_EMIT_METADATA,
//   GISCUS_LANG
// } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://spectre.louisescher.dev',
  output: 'static',
  integrations: [
    spectre({
      name: 'Home',
      openGraph: {
        home: {
          title: 'Vaish\'s space',
          description: 'A personal webpage'
        },
        blog: {
          title: 'Blog',
          description: 'Some interesting papers/topics on Continual Learning.'
        },
        projects: {
          title: 'Projects'
        }
      }
      // giscus: {
      //   repository: GISCUS_REPO,
      //   repositoryId: GISCUS_REPO_ID,
      //   category: GISCUS_CATEGORY,
      //   categoryId: GISCUS_CATEGORY_ID,
      //   mapping: GISCUS_MAPPING as any,
      //   strict: GISCUS_STRICT === "true",
      //   reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
      //   emitMetadata: GISCUS_EMIT_METADATA === "true",
      //   lang: GISCUS_LANG,
      // }
    })
  ],
  // No adapter during dev; add one for deployment as needed
});

export default config;
