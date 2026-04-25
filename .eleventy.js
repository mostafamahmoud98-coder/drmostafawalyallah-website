// Eleventy config — bilingual static site for Dr. Mostafa Walyallah.
// Source files live in src/. Templates and partials in _includes/.
// Data files in _data/. Build outputs to _site/ which Netlify serves.

module.exports = function (eleventyConfig) {
  // Pass through all static files unchanged (CSS, JS, images, favicon, robots, sitemap, admin).
  // Paths are relative to project root; output path strips the "src/" prefix automatically
  // since src/ is configured as the input directory below.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xml": "sitemap.xml" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  // Allow .html files in src/ to use Nunjucks templating ({{ }} and {% %} tags)
  eleventyConfig.setTemplateFormats(["html", "njk", "md", "11ty.js"]);

  // Date helpers for the footer year stamp
  eleventyConfig.addShortcode("currentYear", () => new Date().getFullYear());

  // Bilingual helper: pick the field for the current page's language
  // Usage in templates: {{ item | i18n(lang) }} where item = { ar: "...", en: "..." }
  eleventyConfig.addFilter("i18n", function (item, lang) {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item[lang] || item.ar || item.en || "";
  });

  // Preserve the original URL structure (about.html, services/cataract.html, etc.)
  // is handled by the directory data file at src/src.json which sets a default permalink.

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "11ty.js"],
  };
};
