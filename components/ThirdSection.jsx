'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

const HoverSection = ({ post, users, category, boxid, id }) => {
  const sec_img = post.post_fr_img;
  const sec_title = post.post_title;
  const sec_cate = post.category.category;
  const sec_author = users.map((u, index) => (
    <span key={u.id}>
      <Link href={`/author/${u.id}`} style={{ color: 'white' }}>
        {u.name}
      </Link>
      {index < users.length - 1 ? ', ' : ''}
    </span>
  ));
  const sec_date = post.date;
  const sec_url = `/${post.post_slug}`;
  const sec_cat_id = post.category.slug;

  return (
    <div
      className={`hoversec ${boxid}`}
      id={id}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%), url(${sec_img})`,
      }}
    >
      <Link
        href={sec_url}
      
      >
        <div className="inner-box">
          <h3>{sec_title}</h3>
          <div>
            <Link
              href={`/category/${sec_cat_id}`}
              style={{
                textDecoration: 'none',
                '--category-color': post.category.color,
              }}
            >
              <button className="dark-tag-category">{sec_cate}</button>
            </Link>
          </div>
          <div>
            <span className="homepage-third-author">By {sec_author}</span>
            <span style={{ marginLeft: '8px' }}>{sec_date}</span>
          </div>
          <div className="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ThirdSection = ({ ads }) => {
  useEffect(() => {
    const overlay = document.getElementById('overlay');

    if (window.innerWidth > 800) {
      const handleMouseEnter = (index) => {
        overlay.style.backgroundImage = `url(${ads[index].post.post_fr_img})`;
        overlay.style.opacity = 1;

        ads.forEach((ad, i) => {
          document.getElementById(`box${i + 1}`).style.backgroundImage = 'none';
        });
      };

      const handleMouseLeave = () => {
        ads.forEach((ad, i) => {
          const box = document.getElementById(`box${i + 1}`);
          if (box) {
            box.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%), url(${ad.post.post_fr_img})`;
          }
        });
      };

      ads.forEach((ad, index) => {
        const box = document.getElementById(`box${index + 1}`);
        if (box) {
          box.addEventListener('mouseenter', () => handleMouseEnter(index));
          box.addEventListener('mouseleave', handleMouseLeave);
        }
      });

      return () => {
        ads.forEach((ad, index) => {
          const box = document.getElementById(`box${index + 1}`);
          if (box) {
            box.removeEventListener('mouseenter', () => handleMouseEnter(index));
            box.removeEventListener('mouseleave', handleMouseLeave);
          }
        });
      };
    }
  }, [ads]);

  return (
    <div className="third-section" id="third-section">
      <div className="overlay" id="overlay"></div>

      {Object.values(ads).map((ad, index) => (
        <HoverSection
          key={ad.post.id}
          post={ad.post}
          users={ad.users}
          category={ad.post.category}
          boxid={`box${index + 1} box-${index + 1} hoversec${index + 1}`}
          id={`box${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ThirdSection;
