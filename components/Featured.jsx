import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';

export async function getData() {
  try {
    const res = await fetch("https://admin.asiandispatch.net/api/featured", {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Featured() {
  const data = await getData();

  if (!data) {
    return <Loading />;
  }

  const { categories, featuredPosts } = data || {};

  if (!featuredPosts) {
    return <div>Error loading featured posts</div>;
  }

  const { post_1, post_2, post_3, post_4 } = featuredPosts || {};

  if (!post_1 || !post_1.post) {
    return <div>Error loading featured post 1</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <section
        className="banner-new"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%), url(${post_1.post.post_fr_img || ""})`,
          backgroundColor: `#000`,
        }}
      >
        <div className="container">
          <Link href={`/${post_1.post.post_slug || ""}`} style={{ textDecoration: "none" }}>
            <div className="maindiv">
              <h1 className="line-effect">
                {(post_1.post.post_title || "").split(" ").slice(0, 15).join(" ")}
              </h1>
              <p className="open-sans fs-18">{(post_1.post.post_subtitle || "").split(" ").slice(0, 40).join(" ")}</p>
              <h6 className="mt10">
                {post_1.users && post_1.users.map((user, index) => (
                  <span key={user.id}>
                    <Link href={`/author/${user.id}/${user.name.toLowerCase().replace(/\s+/g, '-')}`} className="author-dark">
                      {user.name}
                    </Link>
                    {index < post_1.users.length - 1 ? ", " : ""}
                  </span>
                ))}
              </h6>
            </div>
          </Link>
          <div className="divider-new"></div>
          <div className="bannergrid">
            {[post_2, post_3, post_4].map((postObj, index) => (
              postObj && postObj.post ? (
                <div className="grid-item" key={index}>
                  <div style={{ '--category-color': postObj.post.category?.color || "#000" }}>
                    <Link href={`/${postObj.post.post_slug || ""}`} style={{ textDecoration: "none" }}>
                      <h6>{(postObj.post.post_title || "").split(" ").slice(0, 15).join(" ")}</h6>
                    </Link>
                    <Link href={`/category/${postObj.post.category?.slug || ""}`} style={{ textDecoration: "none" }}>
                      <p className="dark-tag-category">
                        {postObj.post.category?.category || "Unknown Category"}
                      </p>
                    </Link>
                  </div>
                  <Link href={`/${postObj.post.post_slug || ""}`} style={{ textDecoration: "none" }}>
                    <div className="banner-small-image">
                      <Image
                        src={postObj.post.post_fr_img || ""}
                        alt={postObj.post.post_title || "Image"}
                        width={100}
                        height={75}
                        objectFit="cover"
                        unoptimized
                      />
                    </div>
                  </Link>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
}
