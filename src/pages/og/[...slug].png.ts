import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { categoryColors, defaultAccent } from "@/lib/categoryColors";

const outfitThin = readFileSync(
  join(process.cwd(), "public/fonts/Outfit/Outfit-Thin.ttf"),
);
const outfitRegular = readFileSync(
  join(process.cwd(), "public/fonts/Outfit/Outfit-Regular.ttf"),
);

function resolveColor(cssVar: string): string {
  const map: Record<string, string> = {
    "var(--orange)": "#f8ba88",
    "var(--orange-light)": "#f7caa6",
    "var(--red)": "#ea8686",
    "var(--red-light)": "#edabab",
    "var(--green)": "#66c384",
    "var(--green-light)": "#a4dfb8",
    "var(--pink)": "#f68dab",
    "var(--pink-light)": "#f8a4c0",
    "var(--purple)": "#9c85d3",
    "var(--purple-light)": "#b09ee0",
    "var(--blue)": "#7eb8f7",
    "var(--blue-light)": "#a0ccfa",
  };
  return map[cssVar] || "#f8ba88";
}

function getAccentColor(category?: string): string {
  const accent = (category && categoryColors[category]) || defaultAccent;
  return resolveColor(accent.bright);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection("articles");
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { article } = props;
  const { title, subtitle, category, tags } = article.data;
  const accent = getAccentColor(category);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          backgroundColor: "#181927",
          fontFamily: "Outfit",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
                justifyContent: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 56,
                      fontWeight: 100,
                      color: "#f6f5f7",
                      lineHeight: 1.1,
                      textWrap: "balance",
                    },
                    children: title,
                  },
                },
                ...(subtitle
                  ? [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 24,
                            fontWeight: 400,
                            color: "#7b8fad",
                            lineHeight: 1.4,
                          },
                          children: subtitle,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              },
              children: [
                tags.length > 0
                  ? {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        },
                        children: tags.slice(0, 5).map((tag: string) => ({
                          type: "div",
                          props: {
                            style: {
                              fontSize: 16,
                              fontWeight: 400,
                              color: accent,
                              border: `1px solid ${accent}33`,
                              borderRadius: "6px",
                              padding: "4px 12px",
                            },
                            children: tag,
                          },
                        })),
                      },
                    }
                  : { type: "div", props: { children: "" } },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 22,
                      fontWeight: 100,
                      color: accent,
                    },
                    children: "kinoo.dev",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Outfit", data: outfitThin, weight: 100, style: "normal" },
        { name: "Outfit", data: outfitRegular, weight: 400, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
