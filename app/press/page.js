import MainCard from '@/components/MainCard';
import '../../public/css/aboutUs/press.css';
import Loading from '../loading';
import Link from 'next/link';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

export async function getData() {
    try {
        const res = await fetch(`https://asiandispatch.net/api/press`, {
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

export default async function Page() {

    const post = await getData();

    if (!post) {
        return <Loading />;
    }
    // console.log(post.data);

    return (
        <>
            <section className="container">

                <div className="heading-div section-heading">
                    <h2 className="short-line">Press</h2>
                </div>
                <div className="sub-heading-press">
                    <p>For press inquiries, contact us <strong> <Link href="mailto:hello@asiandispatch.net">hello@asiandispatch.net</Link></strong></p>
                </div>
                <div className='articles'>
                    {post.data && post.data.length > 0 ? (
                        post.data.map((article) => (
                            <div className="article pressec" key={article.id}>
                                <Link href={`/press/${article.id}/${article.post_slug}`}>
                                    <img src="/frontend/images/about/icon.png" alt="" className="quoteicon" />
                                    <img src={article.post_fr_img} className="press-thumbnail" alt={article.post_title} />
                                </Link>
                                <div className="press-title-body">
                                    <span className="press-date lora">Published on {formatDate(article.created_at)}</span>
                                    <Link href={`/press/${article.id}/${article.post_slug}`}>
                                        <h2 className="open-sans ">{article.post_title}</h2>
                                    </Link>
                                    <Link href={`/press/${article.id}/${article.post_slug}`}>
                                        {/* {`${article.post_content.slice(0, 150)}...`} */}
                                        <div className='subtitle'
                                            dangerouslySetInnerHTML={{
                                                __html: `${article.post_content.slice(0, 150)}...`
                                            }}
                                        />
                                    </Link>
                                    <p>
                                        <Link href={`/press/${article.id}/${article.post_slug}`} className="read-article">Read More</Link>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </section>
        </>
    );
}
