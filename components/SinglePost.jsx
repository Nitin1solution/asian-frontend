"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "../public/css/single.css";
import "../public/css/singlenew.css";
import { Suspense } from "react";
import Loading from "../app/loading.js";

// Main PostPage component
// Define the stripHtmlAndTruncate function outside the useEffect
function stripHtmlAndTruncate(htmlContent, maxLength = 160) {
  if (typeof window !== 'undefined') {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + "..."
      : textContent;
  }
  return "";
}

const SinglePost = ({ post_slug }) => {
  const slug = post_slug;
  const [post, setPost] = useState(null);
  const [language, setLanguage] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://admin.asiandispatch.net/api/${slug}`);
        const data = await res.json();
        setPost(data.post);
        setKeywords(data.keywords);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (typeof window === 'undefined' || !post) return;

    // Clean up empty paragraphs and headings
    document.querySelectorAll("img").forEach((img) => {
      img.setAttribute("loading", "lazy");
    });
      document
      .querySelectorAll(
        "hr + p, p + hr, hr + h1, h1 + hr, hr + h2, h2 + hr, hr + h3, h3 + hr, hr + h4, h4 + hr, hr + h5, h5 + hr, hr + h6, h6 + hr"
      )
      .forEach((pTag) => {
        if (
          pTag.innerHTML.trim() === "&nbsp;" ||
          pTag.innerHTML.trim() === "&ensp;"
        ) {
          pTag.remove();
        }
      });
    // Toggle functionality for accordion
    const toggleButtons = document.querySelectorAll(".toggle");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const $this = this;
        const $icon = $this.querySelector(".toggle-icon");
        const $answer = $this.nextElementSibling;

        if ($answer.classList.contains("show")) {
          $answer.style.display = "none";
          $answer.classList.remove("show");
          $icon.textContent = "+";
        } else {
          // Close all other answers and reset icons
          toggleButtons.forEach((btn) => {
            const icon = btn.querySelector(".toggle-icon");
            const answer = btn.nextElementSibling;
            answer.style.display = "none";
            answer.classList.remove("show");
            icon.textContent = "+";
          });

          // Open this answer
          $answer.style.display = "block";
          $answer.classList.add("show");
          $icon.textContent = "-";
        }
      });
    });

    // Initialize Swiper
 
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      lazy: true, // Lazy loading for images in the swiper
    });
    

    const links = document.querySelectorAll(".single-new-post-content a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
    });

    const postContent = document.querySelector(".single-new-post-content");

    if (postContent) {
      // Extract all <script> tags
      const scriptTags = postContent.querySelectorAll("script");

      scriptTags.forEach((oldScript) => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;

        // Copy attributes like src
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Replace old script with the new one to ensure it runs
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
      
    }

    if (post.script_status === "yes") {
      // Set padding-top of .pt50 to 0px
      const pt50Element = document.querySelector(".pt50");
      if (pt50Element) {
        pt50Element.style.paddingTop = "0px";
      }

      // Set display to none for .entry_header, .tags, and .disclaimer
      const entryHeader = document.querySelector(".entry-header");
      const tags = document.querySelector(".tags");
      const disclaimer = document.querySelector(".disclaimer");

      if (entryHeader) entryHeader.style.display = "none";
      if (tags) tags.style.display = "none";
      if (disclaimer) disclaimer.style.display = "none";
    }
  }, [post]);

  if (!post) {
    return <Loading />;
  }

  return (
    <>
      <section className="single-page no-sidebar padding-bottom ">
        <Suspense fallback={<Loading />}>
          <div className="parent-container" id="container">
            <div
              className="common-padding"
              style={{ "--category-color": post.category.color }}
            >
              <header className="entry-header ">
                <h2 className="post-title-single">{post.post_title}</h2>
                <p className="short-description open-sans">
                  {post.post_subtitle}
                </p>
                <ul className="single-category-section">
                  <li>
                    <ul className="dlex10">
                      {post.category?.category && (
                        <li className="h0">
                          <Link
                            href={`/category/${post.category.slug}`}
                            className="tag-category-single hover-a-b-color"
                          >
                            {post.category.category}
                          </Link>
                        </li>
                      )}
                      {post.post_brand_image && (
                        <li className="h0">
                          <div className="image-paragraph">
                            <img
                              src={post.post_brand_image}
                              className="brand_image"
                              alt="Brand"
                            />
                          </div>
                        </li>
                      )}
                    </ul>
                  </li>
                  <li className="social-share">
                    <span className="open-sans">Share :</span>
                    {currentUrl && (
                      <>
                        <Link
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                            currentUrl
                          )}&title=${encodeURIComponent(post.post_title)}`}
                          target="_blank"
                          className="tag-category-single hover-a-b-color"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-linkedin"></i>
                        </Link>
                        <Link
                          href={`https://twitter.com/share?url=${encodeURIComponent(
                            currentUrl
                          )}&text=${encodeURIComponent(post.post_title)}`}
                          target="_blank"
                          className="tag-category-single hover-a-b-color"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-twitter-x"></i>
                        </Link>
                        
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            currentUrl
                          )}`}
                          target="_blank"
                          className="tag-category-single hover-a-b-color"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook-f"></i>
                        </Link>
                       
                        <Link
                          href={`https://wa.me/?text=${encodeURIComponent(
                            currentUrl
                          )}`}
                          target="_blank"
                          className="tag-category-single hover-a-b-color"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-whatsapp"></i>
                        </Link>
                      </>
                    )}
                  </li>
                </ul>
                <div className="top-author color-line-category">
                  <div className="helvetica">
                    {post.users.map((user, index) => (
                      <Link
                        key={user.id}
                        href={`/author/${user.id}/${user.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {user.name}
                        {index < post.users.length - 1 && ","}
                      </Link>
                    ))}
                    {post.user_id_name && (
                      <Link href="#" style={{ textTransform: "capitalize" }}>
                        , {post.user_id_name}
                      </Link>
                    )}
                    &nbsp;|&nbsp;
                    <span className="date-author">
                      {new Date(post.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="d-flex">
                    <div id="language" className="language tag-category-single">
                      <div>
                        {post.language}
                        {post.languages && post.languages.length > 1 && (
                          <>
                            <span onClick={handleToggle} style={{ cursor: "pointer" }}>
                              &nbsp;
                              <i
                                className="fa fa-chevron-circle-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                            {isVisible && (
                              <ul>
                                {post.languages.map((lang) =>
                                  lang.language !== post.language ? (
                                    <li key={lang.language}>
                                      <Link href={`/${lang.post_slug}`}>
                                        {lang.language}
                                      </Link>
                                    </li>
                                  ) : null
                                )}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            </div>
            <div className="single-new-container">
              <div
                className="single-new-post-content"
                style={{ "--category-color": post.category.color }}
                dangerouslySetInnerHTML={{ __html: post.post_content }}
              />
            </div>
            <div
              className="tags"
              style={{ "--category-color": post.category.color }}
            >
              {post.tags &&
                JSON.parse(post.tags).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="tag-category-single hover-a-b-color"
                  >
                    {tag}
                  </Link>
                ))}
            </div>
          </div>
          {post.disclaimer && (
            <div className="disclaimer">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1920 63.52"
                style={{ enableBackground: "new 0 0 1920 63.52" }}
                xmlSpace="preserve"
              >
                <style type="text/css">
                  {`.st0 { fill: none; stroke: #000000; stroke-miterlimit: 10; }`}
                </style>
                <polyline
                  className="st0"
                  points="0.5,10.64 483.3,52.87 1920,10.64 "
                />
              </svg>

              <div className="disclaimer-container">
                <p
                  className="single-post-content"
                  style={{ "--category-color": post.category.color }}
                  dangerouslySetInnerHTML={{ __html: post.disclaimer }}
                />
              </div>
            </div>
          )}
        </Suspense>
      </section>
    </>
  );
};

// Export the PostPage component dynamically with SSR disabled
export default dynamic(() => Promise.resolve(SinglePost), {
  ssr: false,
});
