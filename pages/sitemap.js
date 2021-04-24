const fs = require("fs");
// import fs from "fs";
const { getAllNodes } = require("next-mdx");

(async () => {
  const posts = await getAllNodes("post");

  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <url>
          <loc>https://www.mohamedhedeya.com/</loc>
          <changefreq>always</changefreq>
          <priority>1</priority>
          <lastmod>2021-04-24T21:03:56.418Z</lastmod>
      </url>
  ${posts
    .map((post) => {
      return `
      <url>
        <loc>${`https://mohamedhedeya.com${post.url}`}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      `;
    })
    .join("")}
    </urlset>
    `;

  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
