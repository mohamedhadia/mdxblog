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
        className="block "
        // display="grid"
        // className="grid grid-cols-3"
        // gap="8"
        // justifyContent="space-between"
        // alignItems="center"
      >
        <div mt="4">
          <Image
            className="object-cover object-center rounded-lg"
            src={post.frontMatter.image}
            alt={post.frontMatter.caption || post.frontMatter.title}
            layout="intrinsic"
            width={1650}
            height={650}
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
