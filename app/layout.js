import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";


import "../public/css/bootstrap.min.css";

import "../public/css/venobox.min.css";
import "../public/css/swiper.min.css";

import "../public/css/banner.css";
import "../public/css/main.css";
import "../public/css/bannernew.css";
import "../public/css/responsive1920.css";
import "../public/css/tablet.css";
import "../public/css/landscapeMobile.css";
import { Suspense } from 'react';
import Loading from "./loading";



import Header from "@/components/Header";

// Lazy-load the Footer component
const LazyFooter = React.lazy(() => import("@/components/Footer"));
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Asian Dispatch",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>
     
      </head>

      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
        <Suspense fallback={<div>Loading Footer...</div>}>
        <LazyFooter />
      </Suspense>



        <script src="/js/jquary-3.6.0.min.js" defer></script>
        <script src="/js/bootstrap.min.js" defer></script>
        <script src="/js/popper.min.js" defer></script>
        <script src="/js/venobox.min.js" defer></script>
        <script src="/js/swiper.min.js" defer></script>
        <script src="/js/smooth-scroll.js" defer></script>
        <script src="/js/mailchimp.js" defer></script>
        <script src="/js/main.js" defer></script>
        <script src="/js/most-popular.js" defer></script>
        <script src="/js/myjs.js" defer></script>
      </body>
    </html>
  );
}
