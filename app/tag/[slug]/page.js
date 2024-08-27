import MainCard from '@/components/MainCard';
import '../../../public/css/search.css';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

export async function getData(slug) {
    try {
        const res = await fetch(`https://asiandispatch.net/api/tag/${slug}`, {
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

export default async function Page({ params }) {
    const slug = params.slug;
    const data = await getData(slug);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { count, data: posts, tag } = data; // Extracting data from the API response

    return (
        <>
            <section className="section-search">
                <div className="container">
                    <h2 className="search-heading">
                        Tag results for: {slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </h2>
                    <h3>Total results: {count}</h3>

                    <div className="row search-card">
                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="col-lg-4 col-md-6 col-sm-12 my-5">
                                    <MainCard 
                                        post={post} 
                                        users={post.users} 
                                        date={formatDate(post.created_at)} // Format the date
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}