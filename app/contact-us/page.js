'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import '../../public/css/aboutUs/contactUs.css';
import Icon from '../../public/images/contact/as-icon-email.png';


export default function ContactUs() {
  useEffect(() => {
    document.title = 'Contact-Us'; // Set the document title dynamically
}, []);
  useEffect(() => {
    const clocks = [
      { id: 'clock-ist', digitalId: 'digital-clock-ist', offset: 5.5 },
      { id: 'clock-pkt', digitalId: 'digital-clock-pkt', offset: 5 },
      { id: 'clock-npt', digitalId: 'digital-clock-npt', offset: 5.75 },
      { id: 'clock-bst', digitalId: 'digital-clock-bst', offset: 6 },
      { id: 'clock-mmt', digitalId: 'digital-clock-mmt', offset: 6.5 },
      { id: 'clock-wib', digitalId: 'digital-clock-wib', offset: 7 },
      { id: 'clock-pht', digitalId: 'digital-clock-pht', offset: 8 },
      { id: 'clock-jst', digitalId: 'digital-clock-jst', offset: 9 },
    ];

    function updateClocks() {
      clocks.forEach(clock => {
        const element = document.getElementById(clock.id);
        const hourHand = element.querySelector('.hour');
        const minuteHand = element.querySelector('.minute');
        const secondHand = element.querySelector('.second');
        const digitalElement = document.getElementById(clock.digitalId);

        const now = new Date();
        const utcHours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const utcSeconds = now.getUTCSeconds();

        const offsetHours = Math.floor(clock.offset);
        const offsetMinutes = (clock.offset - offsetHours) * 60;

        const localHours = (utcHours + offsetHours + Math.floor((utcMinutes + offsetMinutes) / 60)) % 24;
        const localMinutes = (utcMinutes + offsetMinutes) % 60;
        const localSeconds = utcSeconds;

        const hourRotation = (localHours % 12) * 30 + localMinutes / 2; // 360deg / 12 hours
        const minuteRotation = localMinutes * 6; // 360deg / 60 minutes
        const secondRotation = localSeconds * 6; // 360deg / 60 seconds

        hourHand.style.transform = `rotate(${hourRotation}deg)`;
        minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
        secondHand.style.transform = `rotate(${secondRotation}deg)`;

        const localDate = now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
        const localTime = `${localHours.toString().padStart(2, '0')}:${localMinutes.toString().padStart(2, '0')}:${localSeconds.toString().padStart(2, '0')}`;

        digitalElement.innerText = `${localDate}, ${localTime}`;
      });
    }

    const intervalId = setInterval(updateClocks, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="heading-div section-heading">
        <h2 className="short-line open-sans fboldi">Contact Us</h2>
      </div>
      
      <section className="pt50">
        <div className="container">
          <div className="row gy-5 gy-lg-0 main-area">
            <div className="col-lg-8">
              <div className="blog-list row gy-5">
                <section className="container">
                  <div>
                    <p className='helvetica'>The Asian Dispatch HQ is currently based out of Delhi, India and we have members all across Asia. Email is the best way to reach us.</p>
                    <p className='helvetica'>We attempt to respond to all queries within a week. If the query is urgent kindly indicate [URGENT] in the subject line. To ensure a timely response, please send your email to the relevant address as listed below:</p>
                  </div>
                  <div className="contact-grid">
                    <div className="box1">
                      <h5 className='open-sans'>To enquire about membership at Asian Dispatch</h5>
                      <div className="contact_inner_box">
                        <Image src={Icon} alt="Email Icon" width={24} height={24} unoptimized/>
                        <div>
                          <h6>Reach out to</h6>
                          <h6><a href="mailto:memberships@asiandispatch.net">memberships@asiandispatch.net</a></h6>
                        </div>
                      </div>
                    </div>
                    <div className="box2">
                      <h5 className='open-sans'>If you are interested in partnering with us,</h5>
                      <div className="contact_inner_box">
                        <Image src={Icon} alt="Email Icon" width={24} height={24} unoptimized/>
                        <div>
                          <h6>Email us at</h6>
                          <h6><a href="mailto:partnerships@asiandispatch.net">partnerships@asiandispatch.net</a></h6>
                        </div>
                      </div>
                    </div>
                    <div className="box3">
                      <h5 className='open-sans'>For all other queries, email </h5>
                      <div className="contact_inner_box">
                        <Image src={Icon} alt="Email Icon" width={24} height={24} unoptimized />
                        <div>
                          <h6>Reach out to</h6>
                          <h6><a href="mailto:hello@asiandispatch.net">hello@asiandispatch.net</a></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar-area">
                <div className="bodysec">
                  {['ist', 'pkt', 'npt', 'bst', 'mmt', 'wib', 'pht', 'jst'].map((tz, index) => (
                    <div className="containersection" key={index}>
                      <div className={`clock`} id={`clock-${tz}`}>
                        <div className="hand hour"></div>
                        <div className="hand minute"></div>
                        <div className="hand second"></div>
                        <div className="center"></div>
                        {[...Array(12).keys()].map(num => (
                          <div className={`number number-${num + 1}`} key={num}>{num + 1}</div>
                        ))}
                      </div>
                      <div className="timezone-label">
                        <div className="digital-clock" id={`digital-clock-${tz}`}></div>, {tz.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br /><br />
    </>
  );
}
