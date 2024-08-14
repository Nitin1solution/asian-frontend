'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../public/css/network/member.css';
import dynamic from 'next/dynamic';

async function getData() {
    try {
        const res = await fetch('https://asiandispatch.net/api/partners', {
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


 function Page() {
    const [partners, setPartners] = useState([]);
    const [animate, setAnimate] = useState('animated-text');

    useEffect(() => {
        setAnimate('animated-text animate');
        document.title = 'Members';
    }, []);

    useEffect(() => {
        async function fetchPartners() {
            const data = await getData();
            if (data) {
                setPartners(data);
            }
        }
        fetchPartners();
    }, []);

    return (
        <>
            <section className="container">
                <div className="member">
                    <div className="left-member">
                        <div className="heading-div section-heading">
                            <h2 className="short-line">Presenting The First Cohort Of<br />
                                <span className={animate}>Asian Dispatch Members</span>
                            </h2>
                        </div>
                    </div>
                    <div className="right-member">
                        <p>We're happy to announce the first cohort of Asian Dispatch Members and Collaborators, representing newsrooms
                            from ten countries: Bangladesh, India, Indonesia, Japan, Malaysia, Myanmar, Nepal, Pakistan, Philippines,
                            and Sri Lanka.
                        </p>
                    </div>
                </div>

                <div className="content">
                    <div className="partners-logos">
                        {partners.map((partner, index) => (
                            <figure key={index}>
                                <Link href={partner.link} target="_blank" rel="noopener noreferrer">
                                    <Image src={partner.image} alt={`Partner ${index}`} width={240} height={135} unoptimized />
                                </Link>
                            </figure>
                        ))}
                    </div>

                    <div className="grid-member">
                        <div className="left">
                            <h3>What do we offer?</h3>
                            <ul>
                                <li>
                                    <p><strong>Collaborative Reporting Projects:</strong></p>
                                    <p>Participation in cross-border, long-form, and investigative reporting projects focusing on issues pertinent to Asian communities.</p>
                                </li>
                                <li>
                                    <p><strong>Visibility to a Global Audience:</strong></p>
                                    <p>Members can access cross-publishing opportunities to promote their regional reporting to a global audience.</p>
                                </li>
                                <li>
                                    <p><strong>Pan-Asia Network Access:</strong></p>
                                    <p>Gain exclusive access to a network of newsrooms, editors, and reporters across Asia within the Asian Dispatch community - fostering mutual growth, learning, and collaboration opportunities.</p>
                                </li>
                                <li>
                                    <p><strong>Exclusive Training Workshops:</strong></p>
                                    <p>Exclusive access to hands-on training workshops by global experts on themes such as digital transformation, audience engagement, leadership, data and investigative journalism, fact-checking, and preparedness programs like HEFAT.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="right">
                            <h3>What do we expect?</h3>
                            <ul>
                                <li>
                                    <p><strong>Participate in Collaborative Reporting Projects:</strong></p>
                                    <p>An opportunity to look beyond your country and connect the dots on pertinent issues affecting the region through cross-border reportage with Asian Dispatch members.</p>
                                </li>
                                <li>
                                    <p><strong>Share Reporting Insights:</strong></p>
                                    <p>Contribute stories from their existing newsroom endeavors to Asian Dispatch for cross-publishing to create a repository of the best reportage from Asia.</p>
                                </li>
                                <li>
                                    <p><strong>Regional Support:</strong></p>
                                    <p>Promote Asian Dispatch initiatives in their country to support the cause of independent and collaborative journalism in Asia.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default dynamic (() => Promise.resolve(Page), {ssr: false})