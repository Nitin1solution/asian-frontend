
import '../../public/css/aboutUs/press.css';
import Loading from '../loading';
import Link from 'next/link';
import dynamic from 'next/dynamic';
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
export async function generateMetadata() {
   
    return {
        title: "Press", 
      
    };
}
export async function getData() {
    try {
        const res = await fetch(`https://admin.asiandispatch.net/api/press`, {
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

 async function Page() {

    const post = await getData();

    if (!post) {
        return <Loading />;
    }
    // console.log(post.data);

    return (
        <>
            <section className="container">

                <div className="heading-div section-heading">
                    <h2 className="short-line open-sans fboldi">Press</h2>
                </div>
                <div className="sub-heading-press">
                    <p className='helvetica'>For press inquiries, contact us <strong> <Link href="mailto:hello@asiandispatch.net" class="open-sans fboldi">hello@asiandispatch.net</Link></strong></p>
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
                                    <span className="press-date open-sans lh32">Published on {formatDate(article.created_at)}</span>
                                    <Link href={`/press/${article.id}/${article.post_slug}`}>
                                        <h2 className="open-sans fs24i fboldi">{article.post_title}</h2>
                                    </Link>
                                    <Link href={`/press/${article.id}/${article.post_slug}`} className='helvetica lh25i fs18i'>
                                        {/* {`${article.post_content.slice(0, 150)}...`} */}
                                        <span style={{fontWeight:'500'}}
                                            dangerouslySetInnerHTML={{
                                                __html: `${article.post_content.slice(0, 150)}...`
                                            }}
                                        />
                                    </Link>
                                    <p>
                                        <Link href={`/press/${article.id}/${article.post_slug}`} className="read-article hover-cat-color">Read More</Link>
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
export default dynamic(() => Promise.resolve(Page), { ssr: false });
