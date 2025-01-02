import Image from 'next/image';
import Link from 'next/link';
import '../../../public/css/category.css';
import Styles from './category.module.css';
import dynamic from 'next/dynamic';
import RemoveActiveClass from '@/components/RemoveActiveClass';

async function getData(slug) {
    try {
        const res = await fetch(`https://admin.asiandispatch.net/api/category/${slug}`, {
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

// Step 1: Define generateMetadata
export async function generateMetadata({ params }) {
    const slug = params.slug;
    const data = await getData(slug);

    if (!data || !data.category) {
        return {
            title: 'Category Not Found - Asian Dispatch', // Fallback title
        };
    }

    const category = data.category;
// console.log(category);
    return {
        title: `${category.category}`, 
        description: category.description, 
    };
}

async function CategoryPage({ params }) {
    const slug = params.slug;
    const data = await getData(slug);

    if (!data) {
        return <div>Loading...</div>;
    }

    const posts = data.data;
    const category = data.category;

    return (
        <>
            {/* Page Header */}
            <RemoveActiveClass/>
            <section className="page-header">
                <div className="container">
                    <div className="page-content-wrap main-header-category"
                        style={{ backgroundImage: "url('/images/single/images.jpg')", backgroundPosition: 'center' }}>
                        <div className="page-content">
                            <h2 className="white">{category.category}</h2>
                            <p className="white" dangerouslySetInnerHTML={{ __html: category.description }}></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Post Area */}
            <section className="main-post-area padding-bottom">
                <div className="container">
                    <div className="row gy-5 gy-lg-0 main-area">
                        <div className="col-lg-12">
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
                                                <div className="post-thumb media color-category">
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
                                                <div className="post-content">
                                                    <ul className="post-meta"></ul>
                                                    <h3>
                                                        <Link href={`/${post.post_slug}`} className="category-title text-hover-category">
                                                            {post.post_title}
                                                        </Link>
                                                    </h3>
                                                    <p className="open-sans">{result}</p>
                                                    <ul className="post-card-footer">
                                                        <li>
                                                           
                                                                {post.users.map((user, index) => (
                                                                    <span key={user.id}>
                                                                        <Link href={`/author/${user.id}/${user.name.toLowerCase().replace(/\s+/g, '-')}`} className='fs15'>
                                                                            {user.name}
                                                                        </Link>
                                                                        {index < post.users.length - 1 ? ', ' : ''}
                                                                    </span>
                                                                ))}
                                                                <br />
                                                                <span className="font-date">
                                                                    {new Date(post.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                                </span>
                                                          
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default dynamic (() => Promise.resolve(CategoryPage), {ssr: false})