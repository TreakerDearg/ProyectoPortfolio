'use client'

import { useEffect, useState } from 'react'

export function useGlitch({ duration = 300 } = {}) {
  const [glitch, setGlitch] = useState(false)

  const triggerGlitch = () => {
    setGlitch(true)
    setTimeout(() => setGlitch(false), duration)
  }

  return {
    glitch,
    triggerGlitch,
  }
}
