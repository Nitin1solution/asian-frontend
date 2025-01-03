import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js
import newsletterImage from '../../public/images/newsletter/1.jpeg';
import RemoveActiveClass from '@/components/RemoveActiveClass';

export default function Page() {
  return (
    <>
    <RemoveActiveClass/>
      <div
        className="container"
        style={{
          marginTop: '50px',
          marginBottom: '50px',
          padding: '0 15px',
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <div style={{ textAlign: 'center' }}>
                  <Image
                    src={newsletterImage}
                    alt="Newsletter"
                    width={400}
                    height={250}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <h1 className='newsletter-heading'          >
                  Asian Dispatch Digest
                </h1>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    textAlign: 'justify',
                  }}
                >
                  Asia: is a curated newsletter by the Asian Dispatch team that
                  brings in focus the reportage by our members from their home
                  countries. The hand-picked reportage here brings to you a
                  piece of Asia that when put together with the context that our
                  team weaves with it tells you more about important happenings
                  in the region. These events don't just matter in their country
                  of reporting, but need to be read in the larger picture of
                  Asia to build sensibilities and preparedness as a whole.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <Link href="/newsletters/form" passHref>
                    <button
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        width: '100%',
                        maxWidth: '200px',
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>+</span>
                      Subscribe
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
