'use client';
import React, { useEffect } from 'react';
import Head from 'next/head';

const MailchimpForm = () => {
  useEffect(() => {
    // Load the Mailchimp validation script dynamically
    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.fnames = ['EMAIL', 'FNAME', 'LNAME', 'MMERGE3', 'MMERGE5', 'MMERGE6'];
      window.ftypes = ['email', 'text', 'text', 'text', 'text', 'text'];
      window.$mcj = jQuery.noConflict(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Add Mailchimp CSS */}
        <link
          href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
          rel="stylesheet"
          type="text/css"
        />
        <style>
          {`
            #mc_embed_signup {
              background: #fff;
              clear: left;
              font: 14px Helvetica, Arial, sans-serif;
              width: 600px;
            }
          `}
        </style>
      </Head>

      <div id="mc_embed_shell" style={{marginBottom:'35px'}}>
        <div id="mc_embed_signup"  >
          <form
            action="https://dataleads.us1.list-manage.com/subscribe/post?u=2ee8fda63c565a2613ae12b21&amp;id=1381243b44&amp;f_id=00e7dee0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
             <h2 className=' text-center' style={{margin:'35px'}}>Subscribe to our Newsletter</h2>
              <div className="indicates-required my-4 text-center">
                <span className="asterisk">*</span> indicates required
              </div>
            <div id="mc_embed_signup_scroll " className='mc_embed_signup_form' >
             
           
              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name <span className="asterisk">*</span></label>
                <input type="text" name="FNAME" className="required text" id="mce-FNAME" required />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">Last Name <span className="asterisk">*</span></label>
                <input type="text" name="LNAME" className="required text" id="mce-LNAME" required />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE3">Institute/Organization Name <span className="asterisk">*</span></label>
                <input type="text" name="MMERGE3" className="required text" id="mce-MMERGE3" required />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE5">Designation <span className="asterisk">*</span></label>
                <input type="text" name="MMERGE5" className="required text" id="mce-MMERGE5" required />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE6">Country <span className="asterisk">*</span></label>
                <input type="text" name="MMERGE6" className="required text" id="mce-MMERGE6" required />
              </div>
              
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input
                  type="text"
                  name="b_2ee8fda63c565a2613ae12b21_1381243b44"
                  tabIndex="-1"
                  value=""
                  readOnly
                />
              </div>
              <div className="clear">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button sub-button" value="Subscribe" />
              </div>
              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MailchimpForm;
