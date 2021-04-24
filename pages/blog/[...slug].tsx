import Image from "next/image";
import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useHydrate } from "next-mdx/client";
import { components } from "@reflexjs/mdx";
import readingTime from "reading-time";
import { ArticleJsonLd } from "next-seo";

import { Post } from "types";
import { Layout } from "@/components/layout";
import { PostMeta } from "@/components/post-meta";
import { LayoutGrid } from "@/components/layout-grid";

export interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const content = useHydrate(post, {
    components,
  });

  return (
    <Layout
      meta={{
        title: post.frontMatter.title,
        description: post.frontMatter.excerpt,
        image: post.frontMatter.image,
        date: new Date(post.frontMatter.date).toISOString(),
        path: post.url,
        type: "article",
      }}
    >
      <ArticleJsonLd
        url={post.url}
        title={post.frontMatter.title}
        images={post.frontMatter.image}
        datePublished={new Date(post.frontMatter.date).toISOString()}
        authorName={["Mohamed Hedeya"]}
        publisherName="Mohamed Hedeya"
        publisherLogo="https://www.mohamedhedeya.com/images/Logo.png"
        description={post.frontMatter.excerpt}
      />

      <LayoutGrid>
        <h1 variant="heading.h1">{post.frontMatter.title}</h1>
        {post.frontMatter.excerpt && (
          <p variant="text.lead" my="4">
            {post.frontMatter.excerpt}
          </p>
        )}
        <PostMeta post={post} />
        {post.frontMatter.image && (
          <div py="10" gridColumn="full-start/full-end|wide-start/wide-end">
            <figure position="relative" rounded="sm" overflow="hidden">
              <Image
                src={post.frontMatter.image}
                alt={post.frontMatter.caption || post.frontMatter.title}
                layout="intrinsic"
                width={1650}
                height={1000}
              />
            </figure>
            {post.frontMatter.caption && (
              <figcaption variant="text.caption">
                {post.frontMatter.caption}
              </figcaption>
            )}
          </div>
        )}
        {content}

        <hr style={{ marginTop: "80px", marginBottom: "80px" }} />
      </LayoutGrid>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode<Post>("post", context, {
    components,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        ...post,
        readingTime: readingTime(post.content),
      },
    },
  };
}
