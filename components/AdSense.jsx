'use client';
import { useEffect } from 'react';

export default function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Adsense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7916766114053705"
      data-ad-slot="6211077404"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}