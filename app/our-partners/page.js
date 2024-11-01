'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../public/css/network/member.css';
import dynamic from 'next/dynamic';

async function getData() {
    try {
        const res = await fetch('https://admin.asiandispatch.net/api/our-partners', {
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

function PartnersSection({ data }) {
  return (
    <section className="container">
      <div className="member">
        <div className="left-member">
          <div className="heading-div section-heading">
            <h2 className="short-line">
              Our Partners
            </h2>
          </div>
        </div>
        <div className="right-member">
          <p>
            We’re partnering with stellar organizations from around the world for our collaborative projects to assist in the upliftment of the media landscape of Asia.
          </p>
        </div>
      </div>

      {data.map((item, index) => (
        <div
          key={item.id}
          className={index % 2 === 0 ? 'partner-left' : 'partner-right'}
        >
          <div className="partner-image">
            <Image src={item.image} alt="Partner" width={300} height={150} unoptimized/>
          </div>
          <div className="partner-detail">
            <p dangerouslySetInnerHTML={{ __html: item.detail }}></p>
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              Visit Partner
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

function Page() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        async function fetchPartners() {
            const data = await getData();
            if (data && data.data) {
                setPartners(data.data);
            }
        }
        fetchPartners();
    }, []);

    return (
        <>
          {partners.length > 0 ? (
            <PartnersSection data={partners} />
          ) : (
            <p>Loading partners...</p>
          )}
        </>
    );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
