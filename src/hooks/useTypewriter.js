'use client'

import { useEffect, useState } from 'react'

export default function useTypewriter({
  text = '',
  speed = 25,
  delay = 0,
  enabled = true,
}) {
  const [output, setOutput] = useState(enabled ? '' : text)

  useEffect(() => {
    if (!enabled) return

    let index = 0
    let timeout
    let interval

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setOutput((prev) => {
          if (index >= text.length) {
            clearInterval(interval)
            return prev
          }
          index++
          return text.slice(0, index)
        })
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, delay, enabled])

  return output
}
