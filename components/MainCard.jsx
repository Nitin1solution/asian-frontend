import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MainCard = ({ post, users, colors, date }) => {
    const color1 = colors && colors[1] ? colors[1] : '';
    const color2 = colors && colors[2] ? colors[2] : '';
    const color3 = colors && colors[3] ? colors[3] : '';
    const color0 = colors && colors[0] ? colors[0] : '';

    return (
        <article className={`post-layout-item img-hover-move h350-d ${color1}`}>
            <Link href={`/post/${post.id}/${post.post_id}/${post.post_slug}`}  className="post-thumb media">
                    <Image src={post.post_fr_img} alt="thumb" className="hero-post-image"  objectFit="cover" width={200} height={300}  unoptimized/>
              
            </Link>
            <div className="post-content">
                <h3>
                    <Link href={`/post/${post.id}/${post.post_id}/${post.post_slug}`} className={`${color3} prata`}>
                            {post.post_title.split(' ').slice(0, 8).join(' ')}
                        
                    </Link>
                </h3>
                <ul className="post-meta mt-20">
                    <li>
                        <Link href={`/category/${post.category.id}`} className={color2}>
                                {post.category.category}
                         
                        </Link>
                    </li>
                </ul>
                <ul className="author-info mt-20">
                    <li>
                        <div className={color0} style={{ display: 'flex' }}>
                            {users.map((user, index) => (
                                <Link key={user.id} href={`/author/${user.id}`} className={colors[0]} style={{ margin: '0px 5px 0px 0px' }}>
                                        {user.name}{index !== users.length - 1 ? ', ' : ''}
                             
                                </Link>
                            ))}
                        </div>
                        <span className="font-date">{date}</span>
                    </li>
                </ul>
            </div>
        </article>
    );
};

export default MainCard;
