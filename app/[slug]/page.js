
import { Suspense } from "react";
import Loading from "../loading";

import dynamic from "next/dynamic";
import SinglePost from "@/components/SinglePost";



async function getData(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { posts: [] }; // Return an empty posts array on error
  }
}
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const data = await getData(slug);
  const post = data.post || [];
  const postDescription = post.meta_description || post.post_subtitle;
  const postImage = post.post_fr_img ; 
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${slug}`;
  const keywords = post.keywords ; 
 
  return {
    title: post.title||post.meta_title,
    description: postDescription,
    keywords: keywords,
    openGraph: {
      images: [postImage],
      url: postUrl,
      title: post.post_title,
      description: postDescription,
      site_name: "Asian Dispatch",
      type: "article",
      
    },
  }
}



async function page({ params }) {
  const slug = params.slug;


  return (
    <>
    
      <section className="single-page no-sidebar padding-bottom pt50">
        <Suspense fallback={<Loading />}>
        <SinglePost post_slug={slug} />
    
        </Suspense>
      </section>
    </>
  );
}

export default dynamic(() => Promise.resolve(page), {
  ssr: true,
});
