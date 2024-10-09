import Image from "next/image";
import Link from "next/link";
import MainCard from "./MainCard";

export async function getData() {
    try {
        const res = await fetch('https://asiandispatch.net/api/member', {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default async function MemberDispatch() {
    const data = await getData();

    if (!data) {
        return <div>Loading...</div>;
    }

    const { post_1, post_2, post_3, post_4, post_5 } = data.memberPosts;
    // console.log(post_1.color);


    return (
        <>
            <div class="post-layout bg-light-red padding-bottom">
                <div class="section-heading text-center p50">
                    <h2>MEMBERS' DISPATCH</h2>
                </div>
                <div class="container ">

                    <div class="post-layout-1">


                        {/* member 2 */}
                        <MainCard post={post_2.post} users={post_2.users}  date={post_2.date} />
                        {/* member 4  */}
                        <MainCard post={post_4.post} users={post_4.users}  date={post_4.date} />

                        {/* member 1  */}
                      
                        <article className={`post-layout-item img-hover-move  color-category`} style={{ '--category-color': post_1.post.category.color }}>
                            <Link href={`/post/${post_1.post.id}/${post_1.post.post_id}/${post_1.post.post_slug}`}  className="post-thumb media">
                                    <Image
                                        src={post_1.post.post_fr_img}
                                        alt="thumb"
                                        className="hero-post-image"
                                       width={500}
                                       height={300}
                                       unoptimized
                                        objectFit="cover"
                                    />
                          
                            </Link>
                            <div className="post-content">
                                <h3>
                                    <Link href={`/${post_1.post.post_slug}`}  className={`text-hover-category prata fw-6`} >{post_1.post.post_title}
                                    </Link>
                                    <ul className="post-meta">
                                        <li>
                                            <Link href={`/category/${post_1.post.category.slug}`} className="tag-category hover-a-b-color">{post_1.post.category.category}
                                            </Link>
                                        </li>
                                    </ul>
                                </h3>
                                <p className="mt-20">
                                    {post_1.post.post_subtitle.split(' ').slice(0, 40).join(' ')}
                                </p>
                                <ul className="author-info-name ">
                                    <li>
                                        <div className="text-category" style={{ display: 'flex' }}>
                                            {post_1.users.map((user, index) => (
                                                <Link key={user.id} href={`/author/${user.id}/${user.name}`}
                                                        className="text-category"
                                                        style={{ margin: '0px 5px 0px 0px' }}
                                                    >
                                                        {user.name}
                                                        {index !== post_1.users.length - 1 ? ', ' : ''}
                                                   
                                                </Link>
                                            ))}
                                        </div>
                                        <span className="font-date">
                                           {post_1.date}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </article>

                        {/* member 3  */}
                        <MainCard post={post_3.post} users={post_3.users}  date={post_3.date} />
                        {/* member 5 */}
                        <MainCard post={post_5.post} users={post_5.users}  date={post_5.date} />

                    </div >
                </div >
            </div >
        </>
    );
}
