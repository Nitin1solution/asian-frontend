import dynamic from 'next/dynamic';
import '../../public/css/aboutUs/whoWeAre.css';

export  function generateMetadata() {


    return {
        title: 'Who We Are', // Dynamic title based on category name
        
    };
}
 function page() {
  return (
   <>
     <section className="container">
        <div className="heading-div section-heading">

            <h2 className="short-line">Who We Are</h2>
        </div>

        <p>In today’s changing media landscape, news organisations globally are facing greater challenges than ever before.
            Broken business models, audience fragmentation, changing legislature, and surging misinformation have
            contributed to the current crises in the news and information ecosystem. </p>

        <p> At Asian Dispatch, we are working towards solutions, powered by deeper collaborations, communities of action,
            and worthwhile conversations that put the spotlight on Asian stories. Beyond the stereotypes dominating news
            stories from the Asian continent – poverty, crime, corruption, border rivalries, poor leadership and conflict –
            we aim to empower Asian newsrooms to tell their unique stories in their own compelling voice through a web of
            newsrooms and journalists across borders. </p>
        <div className="mission-card">
            <div className="left">
                <h5>Our Mission </h5>
                <h2 className="mission-heading">
                    Unveiling Asia One<br/> Story At A Time
                </h2>

            </div>
            <div className="right">
                <p>
                    Our Mission is to build a robust, independent, pan-Asia public interest digital journalism newsroom and
                    network to unite voices across the region. We seek to amplify the visibility and reach of diverse Asian
                    stories and experiences.
                </p>

                <p>

                    We plan to host a biennial Asian media festival to recognise and celebrate stellar journalistic work in
                    the
                    region. It’s about time Asian media claims its rightful space in the evolving global media industry.
                </p>
                <p>
                    Let’s start by building a space that fosters collaboration and inspires new conversations. Asian
                    Dispatch is
                    where Asian stories come alive.
                </p>

            </div>
        </div>

    </section>

   </>
  )
}
export default dynamic (() => Promise.resolve(page), {ssr: false})