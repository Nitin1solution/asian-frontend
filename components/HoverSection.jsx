'use client';
import React, { useEffect, useState } from 'react';
import ThirdSection from './ThirdSection';

const HoverSection = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://asiandispatch.net/api/ads');
      const data = await response.json();
      // console.log(data);
      setAds(Object.values(data.adPosts));
    };

    fetchData();
  }, []);

  return (
   
      <ThirdSection ads={ads} />
   
  );
};

export default HoverSection;
