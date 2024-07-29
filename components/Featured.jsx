import Image from "next/image";
import Link from "next/link";

export async function getData() {
  try {
    const res = await fetch("https://asiandispatch.net/api/featured", {
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
    return <div>Loading...</div>;
  }

  const { categories, featuredPosts } = data;

  if (!featuredPosts) {
    return <div>Error loading featured posts</div>;
  }

  const { post_1, post_2, post_3, post_4 } = featuredPosts;

  return (
    <section
      className="banner-new"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%), url(${post_1.post.post_fr_img})`,
      }}
    >
      <div className="container">
        <Link
          href={`/story/${post_1.post.post_slug}`}
          style={{ textDecoration: "none" }}
        >
          <div className="maindiv">
            <h1 className="line-effect">
              {post_1.post.post_title.split(" ").slice(0, 15).join(" ")}
            </h1>
            <p>{post_1.post.post_subtitle.split(" ").slice(0, 40).join(" ")}</p>
            <h6 className="mt10">
              {post_1.users.map((user, index) => (
                <span key={user.id}>
                  <Link href={`/author/${user.id}`} className="author-dark">
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
            <div
              className="grid-item"
              key={index}
             
            >
              <div  style={{ '--category-color': postObj.post.category.color }}>
                <Link
                  href={`/story/${postObj.post.post_slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <h6>
                    {postObj.post.post_title.split(" ").slice(0, 15).join(" ")}
                  </h6>
                </Link>
                <Link
                  href={`/category/${postObj.post.category.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="dark-tag-category">
                    {postObj.post.category.category}
                  </p>
                </Link>
              </div>
              <Link
                href={`/story/${postObj.post.post_slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="banner-small-image">
                  <Image
                    src={postObj.post.post_fr_img}
                    alt={postObj.post.post_title}
                    width={500}
                    height={300}
                    unoptimized
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
