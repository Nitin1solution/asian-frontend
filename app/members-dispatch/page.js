// Import necessary modules
import Image from 'next/image';
import Link from 'next/link';
import '../../public/css/category.css'
import Styles from './member.module.css'
import dynamic from 'next/dynamic';

async function getData() {
    try {
        const res = await fetch("https://admin.asiandispatch.net/api/members-reporting", {
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
export  function generateMetadata() {


    return {
        title: `Members' Dispatch Reporting`, // Dynamic title based on category name
        
    };
}

 async function Page() {
    const data = await getData();
    const posts = data.posts || []; // Ensure posts is always an array
    // console.log(posts);
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <div className="page-content-wrap main-header-category"
                        style={{ backgroundImage: "url('/images/single/images.jpg')", backgroundPosition: 'center' }}>
                        <div className="page-content">
                            <h2 className="white">Asian Dispatch Reporting</h2>
                            <p className="white">Stories from across Asia by our member newsrooms, republished on Asian Dispatch</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Post Area */}
            <section className="main-post-area padding-bottom">
                <div className="container">
                    <div className="row gy-5 gy-lg-0 main-area">
                        <div className="col-lg-12">
                            <div className="blog-list row gy-5 ">
                                <div className="blog-list row gy-5">
                                    {posts.map((post) => {
                                        // Truncate subtitle if it's too long
                                        const words = post.post_subtitle.split(' ');
                                        const slicedWords = words.slice(0, 24);
                                        let result = slicedWords.join(' ');
                                        if (words.length > 24) {
                                            result += '...';
                                        }

                                        return (
                                            <article key={post.id} className="col-lg-12 col-md-6" style={{ '--category-color': post.category.color }}>
                                                <div className="post-card horizontal-card img-hover-move category-card">
                                                    <div className="post-thumb media color-category ">
                                                        <Link href={`/${post.post_slug}`}>

                                                            <Image
                                                                src={post.post_fr_img}
                                                                alt={post.post_title}
                                                              
                                                                width={494.4}
                                                                height={393.4}
                                                                unoptimized
                                                                objectFit="cover"
                                                                className={`hero-post-image ${Styles['image-post']}`}
                                                            />


                                                        </Link>
                                                    </div>
                                                    <div class="post-content">
                                                        <ul class="post-meta">



                                                        </ul>
                                                        <h3>
                                                            <Link href={`/${post.post_slug}`} className="category-title text-hover-category">
                                                                {post.post_title}

                                                            </Link>
                                                        </h3>
                                                        <p className="open-sans">{result}</p>
                                                        <ul className="post-card-footer">
                                                            <li>
                                                                <Link href={`/category/${post.category.slug}`} style={{ textDecoration: 'none' }}>
                                                                    <h6 className="tag-category-single">{post.category.category}</h6>
                                                                    <br/>
                                                                    {post.users.map((user, index) => (
                                                                        <span key={user.id}>
                                                                            <Link href={`/author/${user.id}/${encodeURIComponent(user.name)}`}>

                                                                                {user.name}

                                                                            </Link>
                                                                            {index < post.users.length - 1 ? ', ' : ''}
                                                                        </span>
                                                                    ))}
                                                                    <br />
                                                                    <span className="font-date">
                                                                        {new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                                    </span>

                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                                {/* Pagination (if needed) */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default dynamic (() => Promise.resolve(Page), {ssr: false})