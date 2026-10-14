// Project descriptions are authored as small HTML snippets (see data/projects.ts).
// These helpers pull plain text out of them without a DOM, so they work both
// when the page is rendered at build time and in the browser.

export interface ParsedDescription {
  intro: string;
  items: string[];
  quote: { text: string; attribution: string } | null;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

const toText = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity])
    .trim();

/** A <p> ends at its closing tag or at the first block element inside it -
    the same place a browser's parser would close it. */
const firstParagraph = (html: string) =>
  html.match(/<p[^>]*>([\s\S]*?)(?=<\/p>|<ul|<ol|<blockquote|$)/)?.[1] ?? "";

/** Splits a description into an intro paragraph, a list of items, and an
    optional testimonial, authored as
    <blockquote>quote text<cite>attribution</cite></blockquote>. */
export function parseDescription(html: string): ParsedDescription {
  const intro = toText(firstParagraph(html));
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => toText(m[1]));

  let quote: ParsedDescription["quote"] = null;
  const blockquote = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/)?.[1];
  if (blockquote) {
    const attribution = toText(blockquote.match(/<cite[^>]*>([\s\S]*?)<\/cite>/)?.[1] ?? "");
    const text = toText(blockquote.replace(/<cite[^>]*>[\s\S]*?<\/cite>/, ""));
    quote = { text, attribution };
  }

  return { intro, items, quote };
}

/** First sentence of the intro, or its first 120 characters if that's longer. */
export function getProjectSummary(html: string) {
  const text = toText(firstParagraph(html));
  const firstSentence = text.split(".")[0];
  return firstSentence.length > 120 ? text.slice(0, 120) + "..." : firstSentence + ".";
}
