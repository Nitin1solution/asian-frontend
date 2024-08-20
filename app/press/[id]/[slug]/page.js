'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import '../../../../public/css/single.css';
import { Suspense } from 'react';
import Loading from '../../../loading';
import useAdjustImg from '../../../../hooks/useAdjustImg';

const page = () => {
  const { id, slug } = useParams(); // Use useParams to access dynamic route parameters

  const [post, setPost] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.asiandispatch.net/api/press/${id}/${slug}`);
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


  useAdjustImg(post);
  if (!post) {
    return <Loading />;
  }



  return (
    <>
    <Head>
      <title>{post.meta_title || 'Asian Dispatch'}</title>
     
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="csrf-token" content={process.env.CSRF_TOKEN} />
      <meta property="og:title" content={post.post_title} />
      <meta property="og:description" content={post.post_subtitle} />
      <meta property="og:image" content={post.post_fr_img} />
 
    </Head>

    <section className="single-pageno-sidebar padding-bottom pt50">
      <Suspense fallback={<Loading />}>
        <div
          className="container"
          id="container"
        
        >
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <header className="entry-header">
                <h2 className="post-title-single">{post.post_title}</h2>
                <p className="short-description open-sans">{post.post_subtitle}</p>
               
                <div className="top-author color-line-category">
                  <div className="open-sans">
                  
                    <span className="date-author">
                      {new Date(post.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
               <div>
               <ul className="single-category-section">
                  
                  <li className="social-share">
                    <span className="open-sans">Share :</span>
                    <Link
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        window.location.href
                      )}&title=${encodeURIComponent(post.post_title)}`}
                      target="_blank"
                      className="tag-category-single hover-a-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link
                      href={`https://twitter.com/share?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(post.post_title)}`}
                      target="_blank"
                      className="tag-category-single hover-a-color"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      className="tag-category-single hover-a-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook-f"></i>
                    </Link>
                    <Link
                      href={`whatsapp://send?text=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      className="tag-category-single hover-a-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-whatsapp"></i>
                    </Link>
                  </li>
                </ul>
               </div>
                </div>
              </header>
              <div className="single-container">
                <div
                  className="single-post-content"
                  dangerouslySetInnerHTML={{ __html: post.post_content }}
                />
            
              </div>
            </div>
          </div>
        </div>
      
      </Suspense>
    </section>
  </>
  );
};

export default dynamic(() => Promise.resolve(page), {
    ssr: false,
  });



