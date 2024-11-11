"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getTopics() {
  try {
    const res = await fetch("https://admin.asiandispatch.net/api/menu", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log("Fetched Topics Data:", data); // Debugging log to check API response
    return data.category || [];
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  }
}

export default function Header() {
  const [category, setCategory] = useState([]); // State to store the topics
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const router = useRouter();

  useEffect(() => {
    async function fetchTopics() {
      const topics = await getTopics();
      setCategory(topics);
      // console.log("Topics array on render:", topics); // Log topics array after setting state
    }
    fetchTopics();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="bottom-header-1">
          <div className="container">
            <div className="main-header-wapper">
              <div className="site-logo">
                <Link href="/">
                  <Image
                    src="/images/White-logo.gif"
                    width={250}
                    height={30}
                    unoptimized
                    priority
                    style={{ width: "250px", height: "30px" }}
                  />
                </Link>
              </div>
              <div className="main-header-info">
                <div className="header-menu-wrap">
                  <ul className="nav-menu">
                    <li>
                      <Link
                        href="#"
                        data-text="Newsroom"
                        className="open-sans hover-a-color"
                      >
                        Newsroom
                      </Link>
                      <ul>
                        <li className="bg-hover-black">
                          <Link
                            href="/original-reporting"
                            className="open-sans hover-a-color"
                          >
                            Original Reporting
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/members-dispatch"
                            className="open-sans hover-a-color"
                          >
                            Members' Dispatch
                          </Link>
                        </li>
                        <li className="bg-hover-black dropdown_menu dropdown-open">
                          <Link href="#" className="open-sans">
                            Topics{" "}
                            <span style={{ paddingLeft: "57px" }}>
                              {" "}
                              &#8594;
                            </span>
                          </Link>

                          <ul>
                            {category.length > 0 ? (
                              category.map((cat) => (
                                <li key={cat.slug} className="bg-hover-black">
                                  <Link href={`/category/${cat.slug}`} className="open-sans">
                                    {cat.category}
                                  </Link>
                                </li>
                              ))
                            ) : (
                             <>
                             <li className="bg-hover-black">
                              <Link  href="/category/science-and-technology" className="open-sans">Science & Technology</Link>

                             </li>
                             <li className="bg-hover-black">
                              <Link  href="/category/politics-and-governance" className="open-sans">Politics & Governance</Link>

                             </li>
                             <li className="bg-hover-black">
                              <Link  href="/category/peoples-rights" className="open-sans">Peoples Rights</Link>

                             </li>
                             <li className="bg-hover-black">
                              <Link  href="/category/health" className="open-sans">Health</Link>

                             </li>
                             <li className="bg-hover-black">
                              <Link  href="/category/climate-change" className="open-sans">Climate Change</Link>

                             </li>
                             </>
                            )}
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        href="#"
                        data-text="About Us"
                        className="open-sans hover-a-color"
                      >
                        About Us
                      </Link>
                      <ul>
                        <li className="bg-hover-black">
                          <Link
                            href="/who-we-are"
                            className="open-sans hover-a-color"
                          >
                            Who we are
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/our-team"
                            className="open-sans hover-a-color"
                          >
                            Our team
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/contact-us"
                            className="open-sans hover-a-color"
                          >
                            Contact us
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/work-with-us"
                            className="open-sans hover-a-color"
                          >
                            Work with us
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/press"
                            className="open-sans hover-a-color"
                          >
                            Press
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        href="#"
                        data-text="Network"
                        className="open-sans hover-a-color"
                      >
                        Network
                      </Link>
                      <ul>
                        <li className="bg-hover-black">
                          <Link
                            href="/members"
                            className="open-sans hover-a-color"
                          >
                            Members
                          </Link>
                        </li>
                        <li className="bg-hover-black">
                          <Link
                            href="/our-partners"
                            className="open-sans hover-a-color"
                          >
                            Partners
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* Search functionality */}
                <div className="menu-right-item">
                  <button className="menu-search" id="search-menu">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 14.811 14.811"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        transform="translate(-2.25 -2.25)"
                      >
                        <circle
                          cx="5.5"
                          cy="5.5"
                          r="5.5"
                          data-name="Ellipse 7"
                          transform="translate(3 3)"
                        ></circle>
                        <path d="m16 16-3.142-3.142"></path>
                      </g>
                    </svg>
                  </button>

                  <button className="mobile-menu-action">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            <div className={`main-header-search`}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  name="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
