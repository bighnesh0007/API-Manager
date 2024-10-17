'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7916766114053705"
      data-ad-slot="6211077404"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}