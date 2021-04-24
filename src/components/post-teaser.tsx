import Link from "next/link";
import { Post } from "types";
import { PostMeta } from "@/components/post-meta";
import Image from "next/image";

export interface PostTeaserProps {
  post: Post;
}

export function PostTeaser({ post, ...props }: PostTeaserProps) {
  return (
    <article {...props}>
      <hr my="12" />

      <div
        display="grid"
        col="1fr 3fr"
        gap="8"
        justifyContent="space-between"
        alignItems="center"
      >
        <div mt="4">
          <Image
            src={post.frontMatter.image}
            alt={post.frontMatter.title}
            layout="intrinsic"
            width={1650}
            height={1650}
          />
        </div>
        <div>
          <h2 variant="heading.h2" mb="4">
            <Link href={post.url} passHref>
              <a
                color="heading"
                textDecoration="none"
                _hover={{
                  color: "primary",
                }}
              >
                {post.frontMatter.title}
              </a>
            </Link>
          </h2>
          {post.frontMatter.excerpt ? (
            <p variant="text.paragraph" mt="0" mb="4">
              {post.frontMatter.excerpt}
            </p>
          ) : null}
          <PostMeta post={post} fontSize="sm" />
        </div>
      </div>
    </article>
  );
}
