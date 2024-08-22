'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import '../../../../public/css/category.css';

import { Suspense } from 'react';
import Loading from '../../../loading';

const Page = () => {
    const { id, name } = useParams();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://www.asiandispatch.net/api/author/${id}/${name}`, {
                    cache: 'no-store',
                });
                const data = await res.json();
                setPost(data.posts);
                setAuthor(data.author);
                setCategories(data.categories);
                // console.log(data.posts);

            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchData();
    }, [id, name]); // Added id to the dependency array

    if (!post) {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>Author Page</title>
                {/* Add any other meta tags or links you need */}
            </Head>
            <section className="main-post-area padding-bottom padding-top">
                <div className="container">
                    <div className="row gy-5 gy-lg-0 main-area">
                        <div className="col-lg-8">
                            <div className="blog-list row gy-5">
                                {post.map((p) => (
                                    <article
                                        key={p.id}
                                        className="col-lg-12 col-md-6"
                                        style={{ '--category-color': p.category.color }}
                                    >
                                        <div className="post-card horizontal-card img-hover-move">
                                            <div className="post-thumb media color-category">
                                                <Link href={`/${p.post_slug}`}>
                                                    <img src={p.post_fr_img} alt="Post Thumbnail" className="hero-post-image" />
                                                </Link>
                                            </div>
                                            <div className="post-content">
                                                <ul className="post-meta">
                                                    <li>
                                                        <Link href={`/category/${p.category.slug}`} className="tag-category-single hover-a-b-color">
                                                            {p.category.category}
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <h3>
                                                    <Link href={`/${p.post_slug}`} className="text-hover-category prata">
                                                        {p.post_title.split(' ').slice(0, 10).join(' ')}
                                                    </Link>
                                                </h3>
                                                <p className="open-sans">
                                                    {p.post_subtitle.split(' ').slice(0, 15).join(' ')}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-area">
                                <div className="sidebar-widget widget">
                                    <div className="author-widget">
                                        <div className="author-img">
                                            {author.image ? (
                                                <img className="author-thumb" src={author.image} alt="author" />
                                            ) : (
                                                <img src="/img/avtar.png" alt="author" className="author-thumb" />
                                            )}
                                        </div>
                                        <div className="author-content">
                                            <h3>
                                                <a href="#">{author.name}</a>
                                                <span className="pt5 ls0_5">{author.desi}</span>
                                                <p>{author.bio}</p>
                                            </h3>
                                            <a href={author.twitter} target="_blank" className="tag-category hover-a-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                </svg>
                                            </a>
                                            <a href={author.instagram} target="_blank" className="tag-category hover-a-color">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-widget widget">
                                    <div className="widget-heading">
                                        <h3>
                                            {/* Category SVG Icon */}
                                            <span>Categories</span>
                                        </h3>
                                        <ul className="widget-category-list">
                                            {categories.map((cat) => (
                                                <li key={cat.id} className="img-hover-move bgblack">
                                                    <Link href={`/category/${cat.slug}`} className="media wcolor hover-a-color">
                                                        {cat.category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="sidebar-widget widget">
                                    <h3>
                                        <span>Connect with us</span>
                                    </h3>
                                    <div className="card-social">
                                        <ul className="wrapper">
                                            <li className="icon twitter">
                                                <a href="https://twitter.com/asiandispatch_">
                                                    <span className="tooltip">Twitter</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li className="icon instagram">
                                                <a href="https://www.instagram.com/asiandispatch" >
                                                    <span className="tooltip">Instagram</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                        <path
                                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
