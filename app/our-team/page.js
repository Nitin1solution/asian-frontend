'use client';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '../../public/css/aboutUs/ourTeam.css';

const OurTeam = () => {
    const [members, setMembers] = useState([]);
    const [operations, setOperations] = useState([]);
    const [editorials, setEditorials] = useState([]);
    const [leadership, setLeadership] = useState([]);

    // Create refs for each section
    const leadershipRef = useRef(null);
    const editorialRef = useRef(null);
    const membersRef = useRef(null);
    const operationsRef = useRef(null);

    useEffect(() => {
        document.title = 'Our Team'; // Set the document title dynamically

        const fetchData = async () => {
            try {
                const res = await fetch(`https://www.asiandispatch.net/api/our-team`);
                const data = await res.json();
                setMembers(data.members || []);
                setEditorials(data.editorial || []);
                setOperations(data.operations || []);
                setLeadership(data.leadership || []);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.getElementById('defaultOpen')?.click();

        const updateTime = async (countryName) => {
            try {
                const response = await fetch(`https://www.asiandispatch.net/api/team/${countryName}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const cname = data.name.toLowerCase().replace(' ', '-');
                const elements = document.querySelectorAll(`.${cname}`);

                if (elements.length > 0) {
                    const date = new Date();
                    const options = {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: data.timeZone,
                    };
                    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
                    const timeString = `${formattedTime} ${data.abbreviation}`;
                    elements.forEach((element) => {
                        element.textContent = timeString;
                    });
                }
            } catch (error) {
                console.error('Error fetching time data:', error);
            }
        };

        const updateCountryTimes = () => {
            const countryElements = document.querySelectorAll('.country');
            countryElements.forEach((countryElement) => {
                const classNames = countryElement.className.split(' ');
                const countryName = classNames.find((cls) => cls !== 'country');
                if (countryName) {
                    updateTime(countryName);
                }
            });
        };

        updateCountryTimes();
    }, [members, operations, editorials, leadership]);

    const openCity = (evt, cityName) => {
        const tabcontent = document.querySelectorAll('.tabcontent');
        tabcontent.forEach(content => content.style.display = 'none');

        const tablinks = document.querySelectorAll('.tablinks');
        tablinks.forEach(link => link.classList.remove('active'));

        const section = document.getElementById(cityName);
        if (section) {
            section.style.display = 'block';
        }
        evt.currentTarget.classList.add('active');
    };

    return (
        <>
            <section className="container">
                <div className="heading-div section-heading">
                    <h2 className="short-line">Our Team</h2>
                </div>

                <div className="tab-section">
                    <div className="tab">
                        <button
                            className="tablinks active"
                            onClick={(e) => openCity(e, 'Leadership')}
                            id="defaultOpen"
                        >
                            Leadership
                        </button>
                        <button className="tablinks" onClick={(e) => openCity(e, 'Editorial')}>
                            Editorial & Partnership
                        </button>
                        <button className="tablinks" onClick={(e) => openCity(e, 'Members')}>
                            Members
                        </button>
                        <button className="tablinks" onClick={(e) => openCity(e, 'Operations')}>
                            Operations & Video
                        </button>
                    </div>
                </div>

                <div ref={leadershipRef} id="Leadership" className="tabcontent team">
                    <div className="inner-team">
                        {leadership.map((l) => (
                            <div className="person" key={l.id}>
                                <div className="person-img">
                                    <Image src={l.image} alt="profile image" width={189.71} height={229.68} unoptimized />
                                </div>
                                <div className="person-info">
                                    <h3>{l.name}</h3>
                                    <p>{l.designation}</p>
                                    <p>
                                        <span className={`country ${l.country_name.toLowerCase().replace(' ', '-')}`} />
                                    </p>
                                    {l.email && (
                                        <div className="person-social">
                                            <Link href={`mailto:${l.email}`}>
                                                <i className="fa fa-envelope" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={editorialRef} id="Editorial" className="tabcontent team">
                    <div className="inner-team">
                        {editorials.map((e) => (
                            <div className="person" key={e.id}>
                                <div className="person-img">
                                    <Image src={e.image} alt="profile image" width={189.71} height={229.68} unoptimized />
                                </div>
                                <div className="person-info">
                                    <h3>{e.name}</h3>
                                    <p>{e.designation}</p>
                                    <p>
                                        <span className={`country ${e.country_name.toLowerCase().replace(' ', '-')}`} />
                                    </p>
                                    {e.email && (
                                        <div className="person-social">
                                            <Link href={`mailto:${e.email}`}>
                                                <i className="fa fa-envelope" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={membersRef} id="Members" className="tabcontent team">
                    <div className="inner-team">
                        {members.map((m) => (
                            <div className="person" key={m.id}>
                                <div className="person-img">
                                    <Image src={m.image} alt="profile image" width={189.71} height={229.68} unoptimized />
                                </div>
                                <div className="person-info">
                                    <h3>{m.name}</h3>
                                    <p>{m.designation}</p>
                                    <p>
                                        <span className={`country ${m.country_name.toLowerCase().replace(' ', '-')}`} />
                                    </p>
                                    {m.email && (
                                        <div className="person-social">
                                            <Link href={`mailto:${m.email}`}>
                                                <i className="fa fa-envelope" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={operationsRef} id="Operations" className="tabcontent team">
                    <div className="inner-team">
                        {operations.map((o) => (
                            <div className="person" key={o.id}>
                                <div className="person-img">
                                    <Image src={o.image} alt="profile image" width={189.71} height={229.68} unoptimized />
                                </div>
                                <div className="person-info">
                                    <h3>{o.name}</h3>
                                    <p>{o.designation}</p>
                                    <p>
                                        <span className={`country ${o.country_name.toLowerCase().replace(' ', '-')}`} />
                                    </p>
                                    {o.email && (
                                        <div className="person-social">
                                            <Link href={`mailto:${o.email}`}>
                                                <i className="fa fa-envelope" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurTeam;
