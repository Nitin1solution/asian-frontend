'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import '../../public/css/single.css';
import { Suspense } from 'react';
import Loading from '../loading';
import useAdjustImg from '../../hooks/useAdjustImg';
import Modal from '@/components/Modal';

// function Loading() {
//   return <div className="main-loader"><Image src={LoadImage} /></div>;
// }

const PostPage = ({ params }) => {

  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('user');

 
  
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://admin.asiandispatch.net/api/${slug}`);
        const data = await res.json();
        setPost(data.post);
        setKeywords(data.meta_keywords);
        setLanguage(data.languages || []);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [slug]);



  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch('https://admin.asiandispatch.net/api/user', {
          credentials: 'include', // Important: This ensures cookies are sent
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserRole(data.role);
        } else {
          console.error('Failed to fetch role');
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchRole();
  });



  useAdjustImg(post, isModalOpen);



  if (!post) {
    return <Loading />;
  }

  // useAdjustImg(post);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <Head>
        <title>{post.meta_title || 'Asian Dispatch'}</title>
        {post.meta_description && (
          <meta name="description" content={post.meta_description} />
        )}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="csrf-token" content={process.env.CSRF_TOKEN} />
        <meta property="og:title" content={post.post_title} />
        <meta property="og:description" content={post.post_subtitle} />
        <meta property="og:image" content={post.post_fr_img} />
        {post.canonical && <link rel="canonical" href={post.canonical} />}
      </Head>

      <section className="single-pageno-sidebar padding-bottom pt50">
        <Suspense fallback={<Loading />}>
          <div
            className="container"
            id="container"
            style={{ '--category-color': post.category.color }}
          >
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <header className="entry-header">
                  <h2 className="post-title-single">{post.post_title}</h2>
                  <p className="short-description open-sans">{post.post_subtitle}</p>
                  <ul className="single-category-section">
                    <li>
                      <ul className="dlex10">
                        {post.category?.category && (
                          <li className="h0">
                            <Link
                              href={`/category/${post.category.slug}`}
                              className="tag-category-single hover-a-b-color"
                            >
                              {post.category.category}
                            </Link>
                          </li>
                        )}
                        {post.post_brand_image && (
                          <li className="h0">
                            <img
                              src={post.post_brand_image}
                              className="brand_image"
                              alt="Brand"
                            />
                          </li>
                        )}

                      </ul>
                    </li>
                    <li className="social-share">
                      <span className="open-sans">Share :</span>
                      <Link
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          window.location.href
                        )}&title=${encodeURIComponent(post.post_title)}`}
                        target="_blank"
                        className="tag-category-single hover-a-b-color"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-linkedin"></i>
                      </Link>
                      <Link
                        href={`https://twitter.com/share?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(post.post_title)}`}
                        target="_blank"
                        className="tag-category-single hover-a-b-color"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-twitter-x"></i>
                      </Link>
                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        className="tag-category-single hover-a-b-color"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook-f"></i>
                      </Link>
                      <Link
                        href={`whatsapp://send?text=${encodeURIComponent(
                          window.location.href
                        )}`}
                        target="_blank"
                        className="tag-category-single hover-a-b-color"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-whatsapp"></i>
                      </Link>
                    </li>
                  </ul>
                  <div className="top-author color-line-category">
                    <div className="open-sans">
                      {post.users.map((user, index) => (
                        <Link
                          key={user.id}
                          href={`/author/${user.id}/${user.name}`}
                        >
                          {user.name}
                          {index < post.users.length - 1 && ','}
                        </Link>
                      ))}
                      {post.user_id_name && (
                        <Link href="#" style={{ textTransform: 'capitalize' }}>
                          {post.user_id_name}
                        </Link>
                      )}
                      &nbsp;|&nbsp;
                      <span className="date-author">
                        {new Date(post.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="d-flex">

                      {userRole === 'member' && (

                        <button id="republish-btn" className="tag-category-single" onClick={openModal}>
                          Republish
                        </button>
                      )}
                      <Modal isOpen={isModalOpen} onClose={closeModal} />


                      <div id="language" className="language tag-category-single">
                        <div
                          onClick={handleToggle}
                          style={{ cursor: 'pointer' }}
                        >
                          {post.language}&nbsp;
                          <i
                            className="fa fa-chevron-circle-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                        {isVisible && language.length > 1 && (
                          <ul>
                            {language.map((lang) =>
                              lang.language !== post.language ? (
                                <Link
                                  key={lang.language}
                                  href={`/${lang.post_slug}`}
                                  passHref
                                >
                                  <li>{lang.language}</li>
                                </Link>
                              ) : null
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </header>
                <div className="single-container">
                  <div
                    className="single-post-content"
                    dangerouslySetInnerHTML={{ __html: post.post_content }}
                  />
                  <div className="tags">
                    {post.tags &&
                      JSON.parse(post.tags).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tag/${tag}`}
                          className="tag-category-single hover-a-b-color"
                        >
                          {tag}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {post.disclaimer && (
            <div className="disclaimer">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1920 63.52"
                style={{ enableBackground: 'new 0 0 1920 63.52' }}
                xmlSpace="preserve"
              >
                <style type="text/css">
                  {`.st0 { fill: none; stroke: #000000; stroke-miterlimit: 10; }`}
                </style>
                <polyline
                  className="st0"
                  points="0.5,10.64 483.3,52.87 1920,10.64 "
                />
              </svg>

              <div class="disclaimer-container">

                <p
                  className="single-post-content"
                  dangerouslySetInnerHTML={{ __html: post.disclaimer }}
                />
              </div>
            </div>
          )}

        </Suspense>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(PostPage), {
  ssr: false,
});
