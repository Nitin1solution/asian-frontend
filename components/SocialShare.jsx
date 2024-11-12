import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaFacebookF, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { BiTwitter } from 'react-icons/bi';

const SocialShare = ({ currentUrl, title }) => {
  return (
    <li className="social-share">
      <span className="open-sans">Share :</span>
      {currentUrl && (
        <>
          <LinkedinShareButton
            url={currentUrl}
            title={title}
            className="tag-category-single hover-a-b-color"
          >
            <FaLinkedin />
          </LinkedinShareButton>

          <TwitterShareButton
            url={currentUrl}
            title={title}
            className="tag-category-single hover-a-b-color"
          >
            <BiTwitter />
          </TwitterShareButton>

          <FacebookShareButton
            url={currentUrl}
            className="tag-category-single hover-a-b-color"
          >
            <FaFacebookF />
          </FacebookShareButton>

          <WhatsappShareButton
            url={currentUrl}
            title={title}
            separator=": "
            className="tag-category-single hover-a-b-color"
          >
            <FaWhatsapp />
          </WhatsappShareButton>
        </>
      )}
    </li>
  );
};

export default SocialShare;
