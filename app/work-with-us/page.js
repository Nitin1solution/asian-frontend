import Link from 'next/link';
import '../../public/css/aboutUs/workWithUS.css';
import dynamic from 'next/dynamic';
export  function generateMetadata() {


    return {
        title: 'Work With Us', // Dynamic title based on category name
        
    };
}

 function page() {
  return (
   <>
     <section className="container">
        <div className="heading-div section-heading">

            <h2 className="short-line">Work with Us</h2>
        </div>
        <div className="content">
            <p> We are always on the lookout for talented individuals who share our passion for ground breaking
                investigative
                journalism.</p>

            <p> If you share our enthusiasm to produce journalism that advances the public interest and brings together the
                voices
                of the Asian continent:</p>
            <p> <strong>Write to us with a brief cover letter outlining your experience and why you fit in the team
                    along with a CV (two page maximum) on:</strong>
            </p>
            <div>

                <Link href="mailto:careers@asiandispatch.net" className="button-dark" target="_blank">
                careers@asiandispatch.net
                </Link>
    

            </div>    


            <p><strong> Kindly send the cover letter and CV in a single PDF file with the naming convention “NAME_ASIAN
                    DISPATCH”. And
                    please use “Query for Openings” in the subject line.
                </strong></p>


        </div>

    </section>

   

   </>
  )
}
export default dynamic (() => Promise.resolve(page), {ssr: false})