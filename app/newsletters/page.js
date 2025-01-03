"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RemoveActiveClass from "@/components/RemoveActiveClass";

export default function Page() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    async function fetchNewsletters() {
      try {
        const response = await fetch(
          "https://admin.asiandispatch.net/api/newsletter"
        );
        const data = await response.json();
        setNewsletters(data.data);
      } catch (error) {
        console.error("Error fetching newsletter data:", error);
      }
    }

    fetchNewsletters();
  }, []);

  if (newsletters.length === 0) {
    return <p></p>;
  }

  return (
    <>
      <RemoveActiveClass />
      <div
        className="container"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          padding: "0 15px",
        }}
      >
        <div className="row justify-content-center">
          {newsletters.map((newsletter) => (
            <div className="col-12 col-md-6 col-lg-4" key={newsletter.id}>
              <div
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div className="card-body" style={{ flexGrow: 1 }}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src={newsletter.image}
                      alt={newsletter.title}
                      width={400}
                      height={200} // Fixed height for images
                      style={{
                        maxWidth: "100%",
                        height: "200px", // Matches the fixed height
                        objectFit: "cover", // Ensures the image scales properly
                      }}
                    />
                  </div>
                  <h1
                    className="newsletter-heading"
                    style={{
                      fontSize: "20px", // Updated font size for title
                      fontWeight: "bold",
                      marginTop: "10px",
                      lineHeight:'28px',
                   
                    }}
                  >
                    {newsletter.title}
                  </h1>
                  <p
                    style={{
                      fontSize: "16px", // Updated font size for description
                      lineHeight: "1.5",
                      textAlign: "justify",
                      marginTop: "10px",
                    }}
                  >
                    {newsletter.detail}
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Link href="/newsletters/form" passHref>
                    <button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        width: "100%",
                        maxWidth: "200px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>+</span>
                      Subscribe
                    </button>
                  </Link>
                  <Link
                    href={newsletter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref
                  >
                    <button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        width: "100%",
                        maxWidth: "200px",
                      }}
                    >
                      View Sample
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
