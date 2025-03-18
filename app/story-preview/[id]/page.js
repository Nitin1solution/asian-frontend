"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import "../../../public/css/single.css";
import "../../../public/css/singlenew.css";
import { Suspense } from "react";
import Loading from "../../loading";
function stripHtmlAndTruncate(htmlContent, maxLength = 160) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.length > maxLength
    ? textContent.slice(0, maxLength) + "..."
    : textContent;
}
// Main PostPage component
const PostPage = ({ params }) => {
  const slug = params.id;
  const [post, setPost] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  // const [tags,setTags]=useState([]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    // Wait for the DOM to load
    const searchBox = document.querySelector(".main-header-search");
    if (searchBox && searchBox.classList.contains("active")) {
      searchBox.classList.remove("active");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://admin.asiandispatch.net/api/story-preview/${slug}`
        );
        const data = await res.json();
        setPost(data.post);
        setKeywords(data.meta_keywords);
        setLanguage(data.languages || []);
        // setTags(JSON.parse(data.tags));
        // console.log(tags);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    // Clean up empty paragraphs and headings
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
        const $answer = $this.nextElementSibling; // Assuming .inner is the next sibling

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

    if (post) {
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
        // if (tags) tags.style.display = "none";
        // if (disclaimer) disclaimer.style.display = "none";
      }
    }
  }, [post]);
  useEffect(() => {
    if (post) {
      // Set meta title
      if (document.title !== (post.meta_title || "Asian Dispatch")) {
        document.title = post.meta_title || "Asian Dispatch";
      }

      const plainDescription = stripHtmlAndTruncate(post.meta_description);

      // Set meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", plainDescription);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        metaDescription.content = plainDescription;
        document.head.appendChild(metaDescription);
      }

      // Set meta keywords

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", JSON.parse(post.meta_keywords));
      } else {
        const newMetaKeywords = document.createElement("meta");
        newMetaKeywords.name = "keywords";
        newMetaKeywords.content = JSON.parse(post.meta_keywords);
        document.head.appendChild(newMetaKeywords);
      }

      // Prevent adding multiple OG tags
      const existingOgTitle = document.querySelector(
        'meta[property="og:title"]'
      );
      if (!existingOgTitle) {
        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.content = post.post_title;
        document.head.appendChild(ogTitle);
      }

      const existingOgDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (!existingOgDescription) {
        const ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        ogDescription.content = post.post_subtitle;
        document.head.appendChild(ogDescription);
      }

      const existingOgImage = document.querySelector(
        'meta[property="og:image"]'
      );
      if (!existingOgImage) {
        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.content = post.post_fr_img;
        document.head.appendChild(ogImage);
      }

      // Set canonical link
      if (post.canonical) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement("link");
          canonicalLink.rel = "canonical";
          canonicalLink.href = post.canonical;
          document.head.appendChild(canonicalLink);
        } else {
          canonicalLink.setAttribute("href", post.canonical);
        }
      }
    }
  }, [post]);
  if (!post) {
    return <Loading />;
  }

  return (
    <>
      <section className="single-page no-sidebar padding-bottom pt50">
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
                    <span className="helvetica">Share :</span>
                    <Link
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        window.location.href
                      )}&title=${encodeURIComponent(post.post_title)}`}
                      target="_blank"
                      className="tag-category-single hover-a-b-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link
                      href={`https://twitter.com/share?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(post.post_title)}`}
                      target="_blank"
                      className="tag-category-single hover-a-b-color"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      className="tag-category-single hover-a-b-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook-f"></i>
                    </Link>
                    <Link
                      href={`whatsapp://send?text=${encodeURIComponent(
                        window.location.href
                      )}`}
                      target="_blank"
                      className="tag-category-single hover-a-b-color"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-whatsapp"></i>
                    </Link>
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
                        {index < post.users.length - 1 && ", "}
                      </Link>
                    ))}
                    {post.user_id_name && (
                      <span
                        className="additional_author"
                        style={{ textTransform: "capitalize" }}
                      >
                        , {post.user_id_name}
                      </span>
                    )}
                    &nbsp;|&nbsp;
                    <span className="date-author">
                      {new Date(post.created_at)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .replace(/(\d+)\s([^\d]+)\s(\d+)/, "$1 $2, $3")}
                    </span>
                  </div>
                  <div className="d-flex">
                    <div id="language" className="language tag-category-single">
                      <div className="helvetica">
                        {post.language}
                        {post.languages && post.languages.length > 1 && (
                          <>
                            <span
                              onClick={handleToggle}
                              style={{ cursor: "pointer" }}
                            >
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
export default dynamic(() => Promise.resolve(PostPage), {
  ssr: false,
});
