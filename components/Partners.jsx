import Image from 'next/image';
import Link from 'next/link';

export async function getData() {
    try {
        const res = await fetch('https://admin.asiandispatch.net/api/partners', {
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

export default async function Partners() {
    const data = await getData();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <section className="section-partners">
            <div className="container">
                <div className="partners">
                    {data.map((partner, index) => (
                        <figure key={index}>
                            <Link href={partner.link} target="_blank" rel="noopener noreferrer">
                                <Image src={partner.image} alt={`Partner ${index}`} width={108} height={60} unoptimized />
                            </Link>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
