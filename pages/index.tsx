import * as React from "react";
import { getAllNodes } from "next-mdx/server";
import readingTime from "reading-time";
import { BlogJsonLd } from "next-seo";

import { Post } from "types";
import { useSearch } from "@/hooks/use-search";
import { Layout } from "@/components/layout";
import { PostTeaser } from "@/components/post-teaser";
import { LayoutGrid } from "@/components/layout-grid";
import { SearchForm } from "@/components/search-form";
import AdBanner from "@/components/AdBanner";

export interface IndexPageProps {
  posts: Post[];
}

export default function IndexPage({ posts }: IndexPageProps) {
  const { hits, search, query } = useSearch<Post>(posts, {
    useExtendedSearch: true,
    keys: ["frontMatter.title", "frontMatter.excerpt"],
  });

  return (
    <Layout>
      <BlogJsonLd
        url="https://www.mohamedhedeya.com/"
        title="mohamed hedeya blog"
        images={["https://www.mohamedhedeya.com/images/Logo.png"]}
        datePublished="2021-04-23T08:00:00+08:00"
        dateModified="2021-04-25T08:00:00+08:00"
        authorName="Mohamed Hedeya"
        description="writing about reactjs, wordpress, design, tech solutions and more."
      />
      <LayoutGrid>
        <div gridColumn="wide-start/wide-end">
          <AdBanner slotId="test" />

          <div
            display="grid"
            col="1|2"
            row="2|1"
            gap="6"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1 variant="heading.h1">All Posts.</h1>
            <SearchForm
              onChange={(event) => search(event.target.value.trim())}
            />
          </div>
          {hits.length ? (
            hits.map((hit) => <PostTeaser key={hit.slug} post={hit} />)
          ) : (
            <p py="10|16">
              No posts found
              {query && (
                <>
                  {" "}
                  for <strong>{query}</strong>
                </>
              )}
              .
            </p>
          )}
        </div>
      </LayoutGrid>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllNodes<Post>("post");

  return {
    props: {
      posts: posts.map<Post>((post) => ({
        ...post,
        readingTime: readingTime(post.content),
      })),
    },
  };
}
