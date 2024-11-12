import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MainCard = ({ post, users, date }) => {
  

    return (
        <article className={`post-layout-item img-hover-move  color-category`} style={{ '--category-color': post.category.color }}>
            <Link href={`/${post.post_slug}`}  className="post-thumb media">
                    <Image src={post.post_fr_img} alt="thumb" className="hero-post-image"  objectFit="cover" width={200} height={300}  unoptimized/>
              
            </Link>
            <div className="post-content">
                <h3>
                    <Link href={`/${post.post_slug}`} className={`text-hover-category prata fw-6 fs-20`} >
                            {post.post_title.split(' ').slice(0, 15).join(' ')}
                        
                    </Link>
                </h3>
                <ul className="post-meta mt-20">
                    <li>
                        <Link href={`/category/${post.category.slug}`} className="tag-category hover-a-b-color">
                                {post.category.category}
                         
                        </Link>
                    </li>
                </ul>
                <ul className="author-info-name">
                    <li>
                        <div className="text-category" style={{ display: 'flex' }}>
                            {users.map((user, index) => (
                                <Link key={user.id} href={`/author/${user.id}/${user.name.toLowerCase().replace(/\s+/g, '-')}`}className="text-category "style={{ margin: '0px 5px 0px 0px' }}>
                                        {user.name}{index !== users.length - 1 ? ', ' : ''}
                             
                                </Link>
                            ))}
                        </div>
                        <span className="font-date helvetica">{date}</span>
                    </li>
                </ul>
            </div>
        </article>
    );
};

export default MainCard;
