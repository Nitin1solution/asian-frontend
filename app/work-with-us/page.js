import Link from 'next/link';
import '../../public/css/aboutUs/workWithUs.css';
import dynamic from 'next/dynamic';
export  function generateMetadata() {


    return {
        title: 'Work With Us', // Dynamic title based on category name
        
    };
}
async function getData() {
    try {
        const res = await fetch("https://admin.asiandispatch.net/api/workwithus", {
            cache: 'no-store'
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
async function page() {
    const data = await getData();
    const posts = data.data || []; 
    // console.log(posts);
  return (
   <>
     <section className="container">
        <div className="heading-div section-heading">

            <h2 className="short-line">{posts.post_title}</h2>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: posts.post_content }}>
         
     

        </div>

    </section>

   

   </>
  )
}
export default dynamic (() => Promise.resolve(page), {ssr: false})