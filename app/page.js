
import Featured from "@/components/Featured";

import dynamic from "next/dynamic";

import MemberDispatch from "@/components/MemberDispatch";
import HoverSection from "@/components/HoverSection";
import Image from "next/image";
import Partners from "@/components/Partners";
import { Suspense } from 'react';
import Loading from "./loading";
import RemoveActiveClass from "@/components/RemoveActiveClass";

 function Home() {
  return (
    <>
  <Suspense fallback={<Loading/>}>
  <RemoveActiveClass/>
   <Featured/>
   </Suspense>
   <MemberDispatch/>
   <HoverSection/>
   <section className="about-section pt100 pmt50">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className=""> <img src="/images/about/Ad_.gif" alt="about us" /></div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="section-heading mb-30 mt-30 m0-tab ">
                        
                        <h2>
                            <a href="/who-we-are" className="ml-20"> ABOUT US</a>

                        </h2>
                    </div>

                    <div className="post-excerpt text-grey-400 mb-30 font-18 ">
                        <p className="about-p ml-20">Asian Dispatch is a network and newsroom of digital news publishers
                            from across Asia. We are bringing together the best minds in journalism to report on
                            cross-border issues in the public interest, to unveil Asia one story at a time. </p>


                      
                    </div>

                </div>
            </div>
        </div>
    </section>
    <Partners/>
    </>
  );
}
export default dynamic (() => Promise.resolve(Home), {ssr: false})
