import type { AstroIntegration } from "astro";

interface SpectreOpenGraph {
  home?: { title: string; description?: string };
  blog?: { title: string; description?: string };
  projects?: { title: string; description?: string };
}

interface SpectreGiscusConfig {
  repository?: string;
  repositoryId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  strict?: boolean;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  commentsInput?: string;
  theme?: string;
  lang?: string;
}

interface SpectreOptions {
  name: string;
  openGraph?: SpectreOpenGraph;
  themeColor?: string;
  twitterHandle?: string;
  giscus?: SpectreGiscusConfig | null;
}

export default function spectre(options: SpectreOptions): AstroIntegration {
  return {
    name: "spectre",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        const virtualId = "spectre:globals";
        const resolved = "\0" + virtualId;

        updateConfig({
          vite: {
            plugins: [
              {
                name: "spectre-globals-plugin",
                enforce: "pre",
                resolveId(id) {
                  if (id === virtualId) return resolved;
                },
                load(id) {
                  if (id === resolved) {
                    const code = `export const name = ${JSON.stringify(options.name ?? "Site")};
export const openGraph = ${JSON.stringify(options.openGraph ?? {})};
export const themeColor = ${JSON.stringify(options.themeColor ?? "#000000")};
export const twitterHandle = ${JSON.stringify(options.twitterHandle ?? "")};
export const giscus = ${JSON.stringify(options.giscus ?? null)};`;
                    return code;
                  }
                },
              },
            ],
          },
        });
      },
    },
  };
}

